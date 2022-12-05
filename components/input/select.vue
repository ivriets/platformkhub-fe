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
                class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50">
                    <option selected disabled value="" v-if="placeholder">{{placeholder}}</option>
                    <option
                        v-for="(i, index) in opsi" :key="name+'opsi'+index" 
                        :value="i[itemValue] ? i[itemValue] : i.id"
                    >
                    {{i[itemLabel] ? i[itemLabel][bahasa]: i.label[bahasa]}}
                    </option>
            </select>
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">                
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'opsi', 'itemValue', 'itemLabel', 'disabled'],
    data() {
        return {
            valueSelect: '',
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        }
    },
    watch: {
        valueSelect(val) {
            this.$emit('input',val)
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // if (this.value !== '') {
                this.valueSelect = this.value
            // }
        },
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    }
    
}
</script>