<template>
    <div>
        <div v-if="label" class="text-sm text-black font-medium  cursor-pointer">
            {{label}}
        </div>
        <div class="relative">
            <select 
                :id="name" 
                :name="name" 
                v-model="valueSelect" 
                :disabled="disabled && disabled === true ? true : false" 
                class="cursor-pointer  w-full focus:outline-none border border-utama rounded px-2 py-1.5 text-base placeholder-gray-300 focus:border-utama/50">
                <option selected disabled value=""  v-if="placeholder">{{placeholder}}</option>
                <option
                    v-for="(i, index) in opsi" :key="name+'opsi'+index" 
                    :value="i[itemValue] ? i[itemValue] : i.id"
                >
                {{i[itemLabel] ? i[itemLabel]: i.label}}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'name', 'placeholder', 'label', 'opsi', 'itemValue', 'itemLabel', 'disabled'],
    data() {
        return {
            valueSelect: ''
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
        // handleInput(event) {
        //     this.$emit('input', event.target.value)
        // }
    }
    
}
</script>