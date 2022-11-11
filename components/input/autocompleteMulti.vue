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
                :placeholder="placeholder"
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
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12"><path fill="currentColor" d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372l4.092 7.17Z"/></svg> -->
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
            </div>
        </div>
        <div class="relative " v-if="statusDropdown">
            <div class="bg-white absolute top-0 left-0 right-0 z-10 rounded-md shadow-md border border-warna-tujuh overflow-x-hidden overflow-y-auto max-h-96 " >
                <button 
                    v-for="(i, index) in listing"
                    :key="name+'list'+index"
                    class="list-options block w-full text-left text-sm py-0.5 px-2 bg-white text-black hover:bg-blue-500  hover:text-white disabled:hover:bg-white disabled:hover:text-gray-400 disabled:text-gray-400 cursor-pointer disabled:cursor-default"
                    @click="pilihItem(i)"
                    :disabled="selectedValue.map(e=>e.id).includes(i.id)"
                    >
                        {{i.label}}
                </button>
            </div>
        </div>
        <div class="chip-container mt-2 flex items-center flex-wrap gap-2">
            <ElementsChip 
                v-for="(item, index) in selectedValue" :key="'listSel'+name+index"
                :item="item"
                @click="removeChip"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'label', 'name', 'disabled', 'placeholder', 'opsi', 'itemValue', 'itemLabel'],
    data() {
        return {
            statusDropdown: false,
            listing: [],
            newVal: '',
            selectedValue: []
        }
    },
    watch: {
        newVal(val) {
             this.getApi(val);
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.listing = this.opsi

            if (this.value && this.value.length > 0) {
                this.value.forEach(e => {
                    const cari = this.opsi.filter(x => x[this.itemValue] === e);
                    if (cari && cari.length > 0) {
                        this.selectedValue.push({
                            id: e,
                            label: cari[0][this.itemLabel] 
                        })
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
                listingFilter = this.opsi.filter(e => e[this.itemLabel].toLowerCase().includes(val.toLowerCase()))
            }
            this.statusDropdown = listingFilter.length > 0 ? true : false
            this.listing = listingFilter
        },

        closeDropdown() {
            this.statusDropdown = false
        },

        submitOpsi() {
            if (this.listing.length > 0) {
                this.pilihItem(this.listing[0])
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
            // console.log(value)
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
        }
    }
}
</script>