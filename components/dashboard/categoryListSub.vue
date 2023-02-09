<template>
    <div class="mb-20">
        <div class="bg-white rounded-xl shadow-md p-5 mb-9 w-full">
            <div class="grid grid-cols-12 gap-x-4 items-center">
                <div class="col-span-12 lg:col-span-2 font-medium">{{ $t('New List') }}</div>
                <div class="col-span-12 lg:col-span-10">
                    <div class="w-full grid grid-cols-12 gap-5 items-end">
                        <div class="col-span-5">
                            <InputText 
                                v-model="form.nama[0]"
                                :name="selectedTab+'newItem'"
                                :label="'Bahasa Indonesia'"
                            />
                        </div>
                        <div class="col-span-5">
                            <InputText 
                                v-model="form.nama[1]"
                                :name="selectedTab+'newItem'"
                                :label="'English'"
                            />
                        </div>
                        <div class="col-span-2">
                            <button 
                                :disabled="form.nama[0] === '' || form.nama[1] === '' ? true : false" 
                                @click="addItem"
                                class="button-outline py-1 px-2">
                                + Add
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="table-area rounded-lg shadow-xl overflow-hidden text-sm">
            <ElementsTable 
                v-model="list"
                :tableDetail="tableDetail"
            >
                <template v-slot:judulIndo="{ item, index }">
                    <div v-if="item.editMode">
                        <InputText 
                            v-model="list[index].nama[0]"
                            :label="''"
                            :name="'listing'+index+'nama0'"
                        />
                    </div>
                    <div v-else>
                        {{ item.nama[0] }}
                    </div>
                </template>

                <template v-slot:judulEn="{ item, index }">
                    <div v-if="item.editMode">
                        <InputText 
                            v-model="list[index].nama[1]"
                            :label="''"
                            :name="'listing'+index+'nama1'"
                        />
                    </div>
                    <div v-else>
                        {{ item.nama[1] }}
                    </div>
                </template>
                <template v-slot:actions="{ item, index }">
                    <div v-if="item.editMode" class="flex items-center justify-end gap-3">
                        <button 
                            :title="$t('Edit')" 
                            :disabled="list[index].nama[0] === '' || list[index].nama[1] === '' ? true : false"
                            @click="applyItem(item, index)" 
                            class="border-b pb-0.5 border-empat text-empat opacity-100 hover:opacity-60 disabled:border-gray-200 disabled:text-gray-200 disabled:hover:opacity-100">{{ $t('Edit') }}</button>
                        <button 
                            :title="$t('Cancel')" 
                            @click="cancelItem(item, index)" 
                            class="border-b pb-0.5 border-empat text-empat opacity-100 hover:opacity-60">{{ $t('Cancel') }}</button>

                    </div>
                    <div v-else class="flex items-center justify-end">
                        <button :title="$t('Edit')" @click="editItem(item, index)" class="button-edit w-[15px] h-[15px]"></button>
                    </div>
                </template>

            </ElementsTable>
        </div>
    </div>
</template>

<script>
    export default {
        props:['selectedTab'],
        data() {
            return {
                defaultList: [],
                form: {
                    nama: ['','']
                },
                list: []
            }
        },
        computed: {
            kategoriName() {
                // return this.selectedTab === 'topic' ? 'Type_Issues' : 'Type_Approach'
                return this.selectedTab === 'topic' ? 'typeIssues' : 'typeApproach'
            },
            kategoriLabel() {
                return this.selectedTab === 'topic' ? this.$t('Issues') : this.$t('Approach')
            },
            tableDetail() {
                const table = [
                    {
                        header: 'No.',
                        itemValue: 'index',
                        type: 'index',
                        itemClass: 'w-10'
                    },
                    {
                        header: this.$t('Category') + ' ' + this.kategoriLabel,
                        itemValue: 'judulIndo'
                    },
                    {
                        header: '',
                        itemValue: 'judulEn'
                    },
                    {
                        header: '',
                        itemValue: 'actions',
                        itemClass: 'w-44 '
                    }

                ]
                return table;
            },
            endPoint() {
                return 'daftarList/kategori/?kategori1='+this.kategoriName;
            }
        },  
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.masterPoint()
            },
            async masterPoint() {
                await this.$apiPlatform.get(this.endPoint).then(res => {

                    const dataRes = res.data

                    const list = dataRes.map(e => {
                        e.editMode = false
                        return e
                    })

                    this.list = _.orderBy(list, 'sorter')
                    this.defaultList = _.cloneDeep(this.list)

                })
            },
            async addItem() {

                await this.$apiPlatform.post(this.endPoint, this.form).then(res => {
                    this.$toast.show(this.kategoriLabel + ' ' + this.$t('addedSukses'))
                    this.initialize()
                })
            },
            editItem(item, index) {
                // console.log(item)
                this.list[index].editMode = true
            },
            cancelItem(item, index) {
                this.list[index].editMode = false
                this.list[index].nama[0] = _.cloneDeep(this.defaultList[index].nama[0])
                this.list[index].nama[1] = _.cloneDeep(this.defaultList[index].nama[1])
                // console.log(this.defaultList[index])
                // this.list[index] = _.cloneDeep(this.defaultList[index])


            },
            async applyItem(item, index) {
                console.log(item)
                await this.$apiPlatform.put('/daftarList/kategori/'+item.id+'/?kategori1='+this.kategoriName, item).then(res => {
                    this.$toast.show(this.kategoriLabel+' '+this.$t('updateSukses'));
                    this.initialize()
                })
            }
        }
    }
</script>

