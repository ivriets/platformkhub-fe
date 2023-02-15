<template>
    <div v-click-outside="closeDropdown">
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <div class="relative">
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                :placeholder="placeholder ? placeholder : $t('tulisDisini')"
                v-model="newVal"
                autocomplete="off"
                :disabled="disabled?disabled:false"
                @focus="focusText"
                @input="handleInput"
                @keyup.enter="submitOpsi"
                @keyup.esc="clearOpsi"
                @keydown.tab="keyTab"
            >
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
            </div>
        </div>
        <div class="relative " v-if="statusDropdown" @keyup="keyUpDrop" tabindex="2">
            <div class="bg-white absolute top-0 left-0 right-0 z-10 rounded-md shadow-md border border-warna-tujuh overflow-x-hidden overflow-y-auto max-h-96 " >
                <button 
                    v-for="(i, index) in listing"
                    :key="name+'list'+index"
                    class="list-options block w-full text-left text-sm py-0.5 px-2 bg-white text-black hover:bg-blue-500  hover:text-white disabled:hover:bg-white disabled:hover:text-gray-400 disabled:text-gray-400 cursor-pointer disabled:cursor-default"
                    @click="pilihItem(i)"
                    :class="selectedItemIndex===index ? ' bg-red-700 ': '' "
                    :disabled="selectedValue.map(e=>e[parseId]).includes(i[parseId])"
                    >
                        <span v-if="multilang && multilang === true">{{i[parseLabel][bahasa]}}</span>
                        <span v-else>{{i[parseLabel]}}</span>
                        
                </button>
            </div>
        </div>
        <div class="chip-container mt-2 flex items-center flex-wrap gap-2">
            <ElementsChip 
                v-for="(item, index) in selectedValue" :key="'listSel'+name+index"
                :item="multilang && multilang===true ? item[parseLabel][bahasa]:item[parseLabel]"
                @click="removeChip"
            />
            <!-- {{ listing }} -->
            <!-- {{ selectedValue }} -->
        </div>
       <!-- <pre> {{selectedValue}} </pre> -->
    </div>
</template>
<script>
export default {
    props: [
        'value', // v-model Array
        'label', // opt string
        'name', //req, takut double dengan yg lain string
        'disabled', // opt boolean
        'placeholder', //opt string
        // 'opsi', 
        'itemValue', // req string
        'itemLabel', // req string
        'multilang', // opt boolean | belum dicoba dengan res api multilang
        'endPoint',  // req string
        'searchQuery', // req string | 
        'itemEndPoint', //opt string | endpoint untuk ngambil detail. kalau tidak maka akan mensplice dari endPoint, 
        'keyRespon'
        ],
    data() {
        return {
            statusDropdown: false,
            listing: [],
            newVal: '',
            selectedValue: [],
            debounceTimeout: null,
            selectedItemIndex: null
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
    computed: {
        lang() {
            return this.$i18n.locale
        },
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
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            //set exsisting value
            //diasumsikan value adalah array (karena ini multi)
            if (this.value && this.value.length > 0) {
                this.value.every((e,index) => {
                    this.getItemApi(e)
                    if (this.value.length === index + 1) {
                        return false
                    } else {
                        return true;
                    }
                })
            }
        },
        async getItemApi(e) {
            const potong = this.endPoint.split('/').slice(0,-1);
            const gabung = potong.join('/') + '/'
            const endPoint = this.itemEndPoint ? this.itemEndPoint : gabung
            this.$apiPlatform.get(endPoint + e +'/').then(res => {
                this.selectedValue.push(res.data)
            })
        },


        focusText() {
            this.getApi()
            this.statusDropdown = true
        },
        
        async getApi() {
            // if (val === '' || val === undefined) {
            //     listingFilter = this.opsi
            // } else {
            //     listingFilter = this.opsi.filter(e => { 
            //         return e[this.itemLabel].toString().toLowerCase().includes(val.toLowerCase())
            //     })
            // }
            // this.statusDropdown = listingFilter.length > 0 ? true : false
            // this.listing = listingFilter
            const endPoint = this.endPoint + '&' + this.searchQuery + '=' + this.newVal
            this.$apiPlatform.get(endPoint).then(res => {
                // console.log(eval(this.keyRespon))
                this.listing = this.keyRespon === undefined ? res.data : eval(this.keyRespon)
            })

        },

        closeDropdown() {
            this.statusDropdown = false
        },

        submitOpsi() {
            if (this.listing.length > 0) {
                const pertama = this.listing[0]
                const reduceListing = this.selectedValue.map(e=>e[this.parseId]).includes(pertama[this.parseId])
                if (!reduceListing) this.pilihItem(pertama)
                // this.pilihItem(this.listing[0])
            }
        },

        handleInput(event) {
            this.statusDropdown = true
        },

        clearOpsi() {
            this.newVal = ''
        },

        pilihItem(item) {
            if (item.id ==='new-item') {
                this.modalMaster = true
                this.keyMaster +=1
            } else {
                this.newVal = ''
                this.selectedValue.push(item)
                this.updateValue()
                // this.$emit('input',item.id)
            }
            this.closeDropdown()
        },

        updateValue() {
             this.$emit('input',this.selectedValue.map(e=> e[this.itemValue]))
        },

        removeChip(value){
            console.log(value)
            const posisi = this.selectedValue.indexOf(value)
            this.selectedValue.splice(posisi, 1)
            this.$nextTick(() => {
                this.updateValue();
            })
        },

        keyTab(event) {
            const newLabel = this.label && this.label !== '' ? this.label : 'isian '
            if (this.listing.length === 0) {
                this.$toast.warning(newLabel + ' mohon diisi')
                event.preventDefault()
            } 
        },
        keyUpDrop(e) {
            if (this.dropDownFocus) {
                const currentIndex = this.selectedItemIndex ? this.selectedItemIndex : 0;
                if (e.key==='ArrowDown' && currentIndex < this.list.length - 1) {
                    this.selectedItemIndex = parseInt(currentIndex) + 1
                } else if (e.key==='ArrowUp' && currentIndex > 0) {
                    this.selectedItemIndex = parseInt(currentIndex) - 1
                } else if (e.key==='Enter') {
                    const item = this.list[currentIndex]
                    this.pilihItem(item)
                    // console.log(item)
                }
            }
        },

    }
}
</script>