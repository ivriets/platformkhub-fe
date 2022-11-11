<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <div class="relative">
            <select 
                :id="name" 
                :name="name" 
                v-model="valueSelect" 
                :disabled="disabled && disabled === true ? true : false" 
                class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50">
                    <option selected disabled value="" v-if="placeholder">{{placeholder}}</option>
                    <option
                        v-for="(i, index) in opsi" :key="name+'opsi'+index" 
                        :value="i.id"
                        :disabled="selectedValue.map(e=>e.id).includes(i.id)"
                    >
                    {{i.label}}
                    </option>
            </select>
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12"><path fill="currentColor" d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372l4.092 7.17Z"/></svg> -->
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
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
    props: ['value','name', 'placeholder', 'label', 'opsi', 'disabled', 'addNew'],
    data() {
        return {
            valueSelect: '',
            selectedValue: [],
        }
    },
    created() {

    },
    watch: {
        valueSelect(val) {
            // this.$emit('input',val)
            if (val !== '') {
                const cariLabel = this.opsi.filter(e => e.id === val);

                const fullVal = {
                    id: val,
                    label: cariLabel && cariLabel.length > 0 ? cariLabel[0].label : '' 
                }
                this.selectedValue.push(fullVal)
                

                this.$nextTick(() => {
                    this.updateValue();
                    this.valueSelect = ''
                })
            }

        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // console.log('inputselecvalue', this.value)
            if (this.value && this.value.length > 0) {
                this.valueSelect = ''
                this.selectedValue = this.value.map(e => {
                    const cariLabel = this.opsi.filter(x => x.id === e);
                    const data = {
                        id: e,
                        label: cariLabel && cariLabel.length > 0 ? cariLabel[0].label : '' 
                    }
                    return data;
                })
            } else {
                this.valueSelect = ''
                this.selectedValue = []
            }
            // if (this.value !== '') {
                // this.valueSelect = this.value
            // }
        },
        removeChip(value){
            // console.log(value)
            const posisi = this.selectedValue.indexOf(value)
            this.selectedValue.splice(posisi, 1)
            this.$nextTick(() => {
                this.updateValue();
            })
        },
        updateValue() {
            this.$emit('input',this.selectedValue.map(e=> e.id))
        }
    }
    
}
</script>


<!-- <InputSelectMulti
    v-model="form.typeOrganisasi"
    :name="prefixName+'tipeorganisasi'"
    :opsi="typeOrganisasi"
    :label="'Tipe Organisasi'"
    :placeholder="'Pilih tipe'"
    :key="'tipeorganisasi'"
/> -->