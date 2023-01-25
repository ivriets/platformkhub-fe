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
                @keydown.tab="keyTab"
            >
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">
                <img :class="statusDropdown ? 'rotate-180 ' : '' " src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4 transition-all">
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
                        :class="i[parseId]==='listbaru' ? 'text-blue-500' : 'text-black' "
                        :disabled="selectedValue.map(e=>e[parseId]).includes(i[parseId])"
                        >
                            <span v-if="multilang && multilang === true">{{i[parseLabel][bahasa]}}</span>
                            <span v-else>{{i[parseLabel]}}</span>
                            
                    </button>
            </div>
        </div>
        <div class="chip-container mt-2 flex items-center flex-wrap gap-2">
            <div v-for="(item, index) in selectedValue" :key="'listSel'+name+index" @click="removeChip(item,index)">
                <ElementsChip
                :item="item.nama" />
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: ['value', 'label','required', 'name', 'disabled', 'placeholder',  'itemValue', 'itemLabel', 'multilang', 'addNew'],
    data() {
        return {
            statusDropdown: false,
            listing: [],
            newVal: '',
            selectedValue: [],
            deletedValue: [],
            finalValue: {
                list: [],
                deleted: [],
                api: []
            },
            opsi: []
        }
    },
    watch: {
        newVal(val) {
             this.getApi(val);
        },

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
        },

    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getOpsiTag();
        },

        async getOpsiTag() {
            await this.$apiPlatform.get('daftarList/tag/').then(res => {
                this.opsi = _.flatMap(res.data.results, function(o){
                    return {"id":o.id, 'label':o.nama}
                });
                this.listing = this.opsi
                this.$nextTick(() => {
                    this.initValue()
                })
            }).catch(err => {
                console.log(err)
            })
        },

        initValue() {
            if (this.value) {
                this.value.api.every((e,index) => {
                    // this.getItemApi(e)
                    const cari = this.listing.filter(x => x[this.parseId]=== e.pilihanTagId.id)
                    // const cari = 
                    if (cari && cari.length > 0) this.selectedValue.push({
                        pkTagId: e.pkTagId,
                        id: e.pilihanTagId.id,
                        nama:e.pilihanTagId.nama[this.bahasa]
                        })
                    if (this.value.api.length === index + 1) {

                        this.updateValue()
                        
                        // return false
                        console.log('dhfakfh')

                    } else {
                        return true;
                    }
                });
            }
        },


        focusText() {
            this.getApi()
            this.statusDropdown = true
        },
        
        async getApi(val) {
            var listingFilter = []
            if (val === '' || val === undefined) {
                listingFilter = this.listing
            } else {
                listingFilter = this.opsi.filter(e => { 
                    return e[this.itemLabel].toString().toLowerCase().includes(val.toLowerCase())
                })
            }
            this.statusDropdown = true
            this.listing = listingFilter
        },

        closeDropdown() {
            this.statusDropdown = false
        },

        submitOpsi() {

            if (this.addNew && this.addNew === true) {
                const addNew = {
                    // [this.parseId] : this.newVal,
                    // [this.parseLabel]: this.multilang && this.multilang === true ?  [this.newVal, this.newVal] : this.newVal
                    id:'',
                    nama: this.newVal
                }
                this.selectedValue.push(addNew)
                this.$nextTick(() => {
                    this.newVal = ''
                    this.updateValue()
                })
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
                this.selectedValue.push({
                        pkTagId: '',
                        id: item.id,
                        nama:item.label[this.bahasa]
                })
                this.updateValue()
                // this.$emit('input',item.id)
            }
            this.closeDropdown()
        },

        updateValue() {

            this.finalValue = {
                list: this.selectedValue,
                deleted: this.deletedValue,
                api: this.value.api
            }
             this.$emit('input', this.finalValue)
        },

        removeChip(item,index){
            if (item.pkTagId && item.pkTagId !== '') this.deletedValue.push(item.pkTagId)
            
           this.selectedValue.splice(index, 1);
            this.selectedValue = _.uniq(this.selectedValue)
            this.$nextTick(() => {
                this.updateValue()
            })
        },


    }
}
</script>