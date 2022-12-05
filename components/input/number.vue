<template>
    <div class="flex items-center">
        <div v-if="label" class="flex flex-grow font-medium mb-1">
            {{label}}
        </div>
        <div class="relative">
            <div class="absolute top-0 left-0 bg-white rounded-full cursor-pointer flex items-center ml-2 mt-2 hover:bg-gray-100">
                <img @click="btnDikurang" class="w-[16px] h-[16px]" src="/icons/icon-minus.png" alt="icon-add">
            </div>
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                :placeholder="0"
                class="focus:outline-none border text-center w-32 border-warna-tujuh rounded px-2 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                @input="handleInput"
                @change="handleInput"
                :value="value"
                autocomplete="chrome-off"
                :disabled="disabled?disabled:false"
                @keyup.enter="keyEnter"
                @keyup.esc="keyEsc"
            >
            <div class="absolute top-0 right-0 bg-white rounded-full cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                <img  @click="btnDitambah" class="w-[16px] h-[16px]" src="/icons/icon-plus.png" alt="icon-add">
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'label', 'max', 'min', 'step', 'disabled'],
    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value)
        },

        keyEnter(event) {
            const data = {
                key: 'enter',
                value: event.target.value
            }
            this.$emit('keyup',data)
        },
        keyEsc(event) {
            const data = {
                key: 'esc',
                value: ''
            }
            this.$emit('keyup',data)
            this.$emit('input', '')

        },

        btnDikurang(event) {
            if (this.value == undefined || this.value == NaN) {
                this.value = -this.step
            } else {
                this.value = parseFloat(this.value)-this.step
            }
        },

        btnDitambah(event) {
            if (this.value == undefined || this.value == NaN) {
                this.value = this.step
            } else {
                this.value = parseFloat(this.value)+this.step
            }
        }

    },
}
</script>