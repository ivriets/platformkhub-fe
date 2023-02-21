<template>
    <div v-click-outside="closeDropdown" class="w-full">
        <div v-if="label && label !== ''" class="text-sm text-black font-medium  cursor-pointer">
            {{label}}
        </div>
        <div class="relative w-full">
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                :placeholder="placeholder"
                v-model="newVal"
                autocomplete="off"
                :disabled="disabled?disabled:false"
                @focus="focusText"
                @keyup.enter="submitOpsi"
                @keyup.esc="clearOpsi"
                @keydown.tab="keyTab"
                @keydown="keyDown"
            >


            <button @click="statusDropdown = !statusDropdown" class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4 transition-all" :class="statusDropdown ? 'rotate-180' : '' ">
                
            </button>
            <!-- <button v-if="newVal !== ''" @click="clearOpsi" class="absolute top-0 right-5 h-[34px] items-center flex px-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4l-66.1.3c-4.4 0-8-3.5-8-8c0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4l66-.3c4.4 0 8 3.5 8 8c0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2c0 4.4-3.6 8-8 8z"/></svg>
            </button> -->

        </div>
        <div class="relative " v-if="statusDropdown">
            <div class="bg-white absolute top-0 left-0 right-0 z-10 rounded-b shadow-md border border-utama overflow-x-hidden overflow-y-auto max-h-96 " >
                <div 
                    v-for="(item, index) in listing"
                    tabindex="0"
                    :key="name+'list'+index"
                    :id="name+'list'+index"
                    :posisi="index"
                    class="list-options border-b border-utama/10 text-sm py-0.5 px-2 bg-white hover:bg-utama hover:text-white cursor-pointer focus:bg-utama focus:text-white focus:outline-none"
                    @click="pilihItem(item)"
                    @keydown.enter="pilihItem(item)"
                    @keydown="keyDownDropDown"
                    >
                        <div>
                            <slot :name="parseId" v-bind:item="item" v-bind:index="index">
                            <span v-if="multilang && multilang === true">{{item[parseLabel][bahasa]}}</span>
                            <span v-else>{{item[parseLabel]}}</span>
                            </slot>
                        </div>
                        
                </div>
            </div>
        </div>

        <!-- <ElementsModal
            v-model="modalMaster"
            :key="'modalMasterSelect'+name+keyMaster"
            :title="label ? label : 'item' + ' baru' "
            :persistent="true"
        >
            <div class="container mx-auto">
                <slot />
            </div>

        </ElementsModal> -->
    </div>
</template>
<script>
export default {
    props: ['value','label','name', 'disabled', 'placeholder','opsi', 'itemValue', 'itemLabel',  'multilang', 'output'],
    data() {
        return {
            statusDropdown: false,
            listing: [],
            newVal: '',
            modalMaster: false,
            keyMaster: 0,
            selectedItem: null,
            debounceTimeout: null
        }
    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        parseLabel() {
            return this.itemLabel ? this.itemLabel : 'label'
        },
        parseId() {
            return this.itemValue ? this.itemValue : 'id'
        }

    },

    watch: {
        newVal() {
            if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
            this.debounceTimeout = setTimeout(() => {
                this.getApi();
            },300)
        }
    },
    created() {
        this.$nuxt.$on('closeModalMaster', () => {
                this.modalMaster = false
                this.keyMaster +=1
        })
    },

    watch: {
        newVal(val) {
            if (val!=='') {
             this.getApi(val);
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // if (this.value !== '') {
            //     setTimeout(() => {
            //     const cari = this.opsi.filter(e => e[this.itemValue] === this.value)
            //     this.newVal = cari.length > 0 ? cari[0][this.itemLabel] : '';
            //     this.$nextTick(() => {
            //         this.closeDropdown();
            //     })
            //     },300)

            // }
            this.listing = this.opsi

        },
        focusText() {
            this.getApi()
            this.statusDropdown = true
        },
        clearOpsi() {
            this.newVal = ''
        },

        async getApi(val) {

            var listingFilter = []
            if (val === '' || val === undefined) {
                listingFilter = this.opsi
            } else {
                if (this.multilang && this.multilang === true) {
                    listingFilter = this.opsi.filter(e => e[this.parseLabel][this.bahasa].toLowerCase().includes(val.toLowerCase()))
                } else {
                    listingFilter = this.opsi.filter(e => e[this.parseLabel].toLowerCase().includes(val.toLowerCase()))
                }
            }
            this.listing = listingFilter

            if (listingFilter.length > 0) {
                this.statusDropdown = listingFilter.length > 0 ? true : false
            } else {
                this.$emit('input',val)
            }
        },
        closeDropdown() {
            this.statusDropdown = false
        },
        submitOpsi() {
            if (this.listing.length > 0) {
                this.pilihItem(this.listing[0])
            } else {
                // this.$toast.warning('Pilihan tidak ada dalam list')
                // this.newVal = ''
                this.$emit('input', this.newVal)
            }
        },
        handleInput(event) {
            this.statusDropdown = true
        },
        clearOpsi() {
            this.newVal = ''
        },
        pilihItem(item) {
            // if (item[this.itemValue] ==='new-item') {
            //     this.modalMaster = true
            //     this.keyMaster +=1
            // } else {
            //     this.newVal = this.multilang && this.multilang===true ? item[this.parseLabel][this.bahasa] : item[this.parseLabel]
            //     if (this.output && this.output === 'obj') {
            //         this.$emit('input', item)
            //     } else {
            //         this.$emit('input', item[this.parseId])
            //     }
            // }
            this.newVal = this.multilang && this.multilang===true ? item[this.parseLabel][this.bahasa] : item[this.parseLabel]
                if (this.output && this.output === 'obj') {
                    this.$emit('input', item)
                } else {
                    this.$emit('input', item[this.parseId])
                }

            this.$nextTick(() => {
                this.closeDropdown()
            })
        },

        keyDown(event) {
            var hitung = 0
            if (event.key==='ArrowDown') {
                if (this.listing.length > 0) {
                    this.statusDropdown = true
                    this.$nextTick(() => {
                        const listItem = this.name + 'list' + hitung;
                        document.getElementById(listItem).focus();
                        hitung +=1
                    })

                }

            }
        },
        keyDownDropDown(event) {
            const posisi = event.target.attributes.posisi.value
            const listItem = this.name + 'list'
            if (event.code==='ArrowDown') {
                const target = parseInt(posisi) + 1
                if (this.listing.length > target) {
                    document.getElementById(listItem+(parseInt(posisi) + 1)).focus();
                }
            } else if (event.code === 'ArrowUp') {
                if (parseInt(posisi) > 0) {
                    document.getElementById(listItem+(parseInt(posisi) - 1)).focus();
                } else {
                    document.getElementById(this.name).focus();
                    this.closeDropdown()
                }
            }
        },
        keyTab(event) {
            // const newLabel = this.label && this.label !== '' ? this.label : 'isian '
            // if (event.target.value === '') {
            //     this.$toast.warning(newLabel + ' mohon diisi')
            //     event.preventDefault()

            // } else {
            //     const cari = this.listing.filter(e => e[this.itemLabel] === event.target.value)
            //     if (cari && cari.length > 0) {
            //         this.pilihItem(cari[0])
            //     } else {
            //         this.$toast.warning('Masukan '+ newLabel +' sesuai dengan salah satu list ')
            //         event.preventDefault()
            //     }


            // }
        }

    }
}
</script>