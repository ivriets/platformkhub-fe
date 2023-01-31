<template>
    <div>
        <div class="mb-5">
            <div class="flex items-center justify-between">
                <button @click="emptyContent" class="flex items-center gap-x-1 button-standar-outline">
                    <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                    <div class="text-warna-empat font-medium">{{ $t('Empty ' + modelTitle + ' List') }}</div>
                </button>
                <button v-if="!toggleEdit" @click="toggleEdit=true" class="flex items-center gap-x-1 button-standar-outline">
                    <img class="w-4 h-4" src="/icons/icon-edit.png" alt="icon-edit">
                    <div class="text-warna-empat font-medium">{{ $t('Edit ' + modelTitle + ' List') }}</div>
                </button>
                <div v-else class="flex items-center gap-x-6">
                    <button @click="addContent" class="flex items-center gap-x-1 button-standar-outline">
                        <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                        <div class="text-warna-empat font-medium">{{ $t('Add ' + modelTitle + ' List') }}</div>
                    </button>
                    <button @click="toggleEdit=false" class="flex items-center gap-x-1 button-standar-outline">
                        <img class="w-4 h-4" src="/icons/icon-cancel.png" alt="icon-cancel">
                        <div class="text-rejected font-medium">{{ $t('Cancel') }}</div>
                    </button>
                </div>
            </div>
        </div>
        <div class="">

            <div class="">
                <ElementsCard 
                    v-model="list"
                    :tipeKonten="modelTitle"
                    :toggleEdit="toggleEdit"
                    :selectedTab="selectedTab"
                />
            </div>
        </div>

        <ElementsModal 
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+'content'"
            :persistent="true"
        >
            <div class="p-6" v-if="modal.type==='newContent'">
                <div class="mb-5">
                    <div class="mb-5">
                        <div class="font-semibold text-warna-utama mb-1">{{ $t('Search Title') }}</div>
                        <div class="w-full">
                            <ElementsSearchBar 
                                v-model="filter.search"
                                :name="'searchtext'"
                            />
                        </div>
                    </div>



                    <div  class="border-lima border-2 rounded-lg bg-white p-3 mb-5 h-[400px] overflow-y-auto">
                        <div class="text-xl text-warna-utama text-center font-bold mb-3">Latest</div>
                        <div v-for="(item, index) in listing" :key="'addblog' + index" v-show="displayRow(item)">
                            <div class="flex justify-between text-sm ">
                                <div class="flex-auto text-warna-utama line-clamp-2 w-10/12">{{ item[targetJudul][bahasa] }}</div>
                                <button  :disabled="addedContent.includes(item) || addedContent.length > 2" @click="pilihItem(item)" class="btn-tambah">
                                    {{ addedContent.includes(item) ? $t('Added') : $t('Add') }}
                                </button>
                                <!-- <button  @click="pilihItem(item)" class="btn-tambah">{{$t('Add')}}</button> -->
                            </div>
                            <hr class="border-warna-tujuh my-3">
                        </div>
                    </div>
                    <div  class="">
                        <div class="text-utama font-semibold mb-5">Added Content</div>
                        <div v-for="(item, index) in addedContent" :key="'added'+index" class="flex mb-4 w-10/12">
                            <div class="text-sm mr-1">{{item[targetJudul][bahasa]}}</div>
                            <button @click="removeItem(index)"><img src="/icons/ic-cancel-dark.png" alt="cancel"></button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-warna-delapan">
                                You can add 
                                <span v-if="addedContent.length < 4">{{addedContent.length}}</span> 
                                <span v-else >0</span> 
                                Content</div>
                        <button @click="tambahkan" :disabled="addedContent.length > 3 || addedContent.length === 0" class="button-standar">{{ $t('Add') }}</button>               
                    </div>
                </div>

            </div>

            <div class="p-6" v-else-if="modal.type==='deleteAll'">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">
                    <p>Are you sure want to remove on</p> <p>Featured {{tipeKonten}}?</p>
                </div>
                <div class="flex items-center gap-x-6">
                    <button @click="confirmDeleteAll" class="button-standar w-1/2">{{ $t('Remove') }}</button>
                    <button @click="tutupModal" class="button-standar-outline w-1/2">{{ $t('Cancel') }}</button>                    
                </div>
            </div>

        </ElementsModal>

    </div>
</template>
<script>
export default {
    props: ['value','selectedTab', 'masterEndPoint', 'targetJudul', 'targetId'],
    data() {
        return {
            listing: [],
            toggleEdit: false,
            modal: {
                status: false,
                title: '',
                key: 0,
                type: ''
            },
            filter: {
                search: ''
            },
            addedContent: [],
            debounceTimeout: null
        }
    },
    mounted() {
        this.initialize()
    },
    computed: {
        modelTitle() {
            return _.startCase(this.selectedTab)
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        list: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        mapList() {
            return this.list.map(e => e[this.targetId])
        }

    },
    watch: {
        'filter.search'(val) {

            if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
            this.debounceTimeout = setTimeout(() => {
                this.masterPoint()
            },300)

        }
    },
    methods: {
        initialize() {
            // this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get(this.masterEndPoint + '&limit=15&offset=0&sortbycreatedat=desc&title='+this.filter.search).then(res => {
                console.log(res.data)
                this.listing = res.data.results
            })
        },
        toogleEditButton() {

        },
        emptyContent() {
            this.modal.type="deleteAll"
            this.modal.title = ''
            this.modal.status = true
            this.modal.key+=1

        },
        addContent() {
            this.masterPoint()
            this.addedContent = []
            this.modal.type="newContent"
            this.modal.title = this.$t('Add') + ' ' + this.$t(this.modelTitle)
            this.modal.status = true
            this.modal.key +=1
        },
        tutupModal() {
            this.modal.type = ''
            this.modal.status = false
            this.modal.key+=1
        },
        pilihItem(item) {
            this.addedContent.push(item)
        },
        removeItem(index) {
            this.addedContent.splice(index,1)
        },
        displayRow(item) {
            return !this.mapList.includes(item[this.targetId])
        },
        tambahkan() {
            this.list = this.list.concat(this.addedContent)
            this.modal.status = false
            this.modal.key +=1
            $nuxt.$emit('updateFeatured', this.selectedTab)
        },
        confirmDeleteAll() {
            this.list = []
            this.modal.status = false
            this.modal.key +=1
            $nuxt.$emit('updateFeatured', this.selectedTab)

        }



    }
}
</script>