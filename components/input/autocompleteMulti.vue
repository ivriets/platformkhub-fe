<template>
    <div v-click-outside="closeDropdown">
        <div v-if="label" class="font-medium mb-1">
            {{label}} <span class="text-[#DF4B61] font-semibold" v-if="required && required === true">*</span>
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
                @keyup="keyUp"
            >
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12"><path fill="currentColor" d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372l4.092 7.17Z"/></svg> -->
                <button @click="statusDropdown=!statusDropdown">
                    <img :class="statusDropdown ? 'rotate-180 ' : '' " src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4 transition-all opacity-100 hover:opacity-60">
                </button>
            </div>
        </div>
        <div class="relative " v-if="statusDropdown">
            <div class="bg-white absolute top-0 left-0 right-0 z-10 rounded-md shadow-md border border-warna-tujuh overflow-x-hidden overflow-y-auto max-h-96 " >
                    <div v-if="(addNew && addNew === true) && newVal !== ''" class="text-sm text-gray-600 py-0.5 px-2">Press enter to make new {{ label }}</div>
                    <button 
                        v-for="(i, index) in listing"
                        :key="name+'list'+index"
                        class="list-options block w-full text-left text-sm py-0.5 px-2 bg-white  hover:bg-blue-500  hover:text-white disabled:hover:bg-white disabled:hover:text-gray-400 disabled:text-gray-400 cursor-pointer disabled:cursor-default"
                        @click="pilihItem(i)"
                        :class="kelasRow(i)"
                        :disabled="selectedValue.map(e=>e[parseId]).includes(i[parseId])"
                        >
                            <span v-if="multilang && multilang === true">{{i[parseLabel][bahasa]}}</span>
                            <span v-else>{{i[parseLabel]}}</span>
                            
                    </button>
            </div>
        </div>
        <div v-if="selectedValue.length>0" class="chip-container mt-2 flex items-center flex-wrap gap-2">
            <div v-for="(item, index) in selectedValue" :key="'listSel'+name+index" @click="removeChip(index)">
            <ElementsChip 
                :item="multilang && multilang === true ? item[parseLabel][bahasa] : item[parseLabel]"
                v-if="item[parseLabel]"
            />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'label','required', 'name', 'disabled', 'placeholder', 'opsi', 'itemValue', 'itemLabel', 'multilang', 'addNew'],
    data() {
        return {
            statusDropdown: false,
            listing: [],
            newVal: '',
            selectedValue: [],
            selectedIndex: null
        }
    },
    watch: {
        newVal(val) {
             this.getApi(val);
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
            this.listing = this.opsi
            if (this.value && this.value.length > 0) {
                const unik = _.uniq(this.value)
                unik.every((e,index) => {
                    // this.getItemApi(e)
                    const cari = this.listing.filter(x => x[this.parseId]=== e)
                    if (cari && cari.length > 0) this.selectedValue.push(cari[0])
                    if (this.value.length === index + 1) {
                        return false
                    } else {
                        return true;
                    }
                })
            }

        },

        focusText() {
            this.getApi()
            this.statusDropdown = true
        },
        
        async getApi(val) {
            var listingFilter = []
            if (val === '' || val === undefined) {
                listingFilter = this.opsi
            } else {
                if (this.multilang && this.multilang===true) {
                    listingFilter = this.opsi.filter(e => e[this.parseLabel][this.bahasa].toLowerCase().includes(val.toLowerCase()))
                } else {
                    listingFilter = this.opsi.filter(e => e[this.parseLabel].toLowerCase().includes(val.toLowerCase()))
                }
            }
            // this.statusDropdown = listingFilter.length > 0 ? true : false
            this.statusDropdown = true
            this.listing = listingFilter

        },

        closeDropdown() {
            this.statusDropdown = false
        },

        submitOpsi() {
            //check di list sebelumnya ada gak
            var listingFilter = []
            if (this.multilang && this.multilang===true) {
                    listingFilter = this.opsi.filter(e => e[this.parseLabel][this.bahasa].includes(this.newVal))
            } else {
                listingFilter = this.opsi.filter(e => e[this.parseLabel].includes(this.newVal))
            }
            
            if (this.addNew && this.addNew === true && listingFilter.length === 0) {
                const addNew = {
                    [this.parseId] : this.newVal,
                    [this.parseLabel]: this.multilang && this.multilang === true ?  [this.newVal, this.newVal] : this.newVal
                }
                this.selectedValue.push(addNew)
                this.$nextTick(() => {
                    this.newVal = ''
                    this.updateValue()
                   
                })
            }
            setTimeout(() => {
                this.closeDropdown()
            },500)
        },

        handleInput(event) {
            this.statusDropdown = true
        },

        clearOpsi() {
            this.newVal = ''
        },

        pilihItem(item) {
            this.newVal = ''
            this.selectedValue.push(item)
            this.updateValue()
            this.closeDropdown()
        },

        updateValue() {
            const unikval = _.uniq(this.selectedValue.map(e=> e[this.itemValue]))
             this.$emit('input', unikval)
        },

        removeChip(index){
           this.selectedValue.splice(index, 1);
            this.selectedValue = _.uniq(this.selectedValue)
            this.$nextTick(() => {
                this.updateValue()
            })
        },
        keyUp(event) {
            if (event.key==='ArrowDown') {

            }
        },  
        kelasRow(item) {
            return item[this.parseId]==='listbaru' ? 'text-blue-500' : 'text-black' 
        }
    }
}
</script>