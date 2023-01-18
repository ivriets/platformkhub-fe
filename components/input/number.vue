<template>
    <div class="flex items-center">
        <div v-if="label && label !==''" class="flex flex-grow font-medium mb-1">
            {{label}}
        </div>
        <div class="relative">
            <button @click="btnDikurang" class="absolute top-0 left-0 bg-white rounded-full cursor-pointer flex items-center ml-2 mt-2 hover:bg-gray-100">
                <img  class="w-[16px] h-[16px]" src="/icons/icon-minus.png" alt="icon-add">
            </button>
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                :placeholder="0"
                class="focus:outline-none border text-center w-32 border-warna-tujuh rounded px-3 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                v-model="newVal"
                autocomplete="chrome-off"
                :disabled="disabled?disabled:false"
                @keyup.enter="keyEnter"
                @keyup.esc="keyEsc"
            >
            <button @click="btnDitambah" class="absolute top-0 right-0 bg-white rounded-full cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                <img   class="w-[16px] h-[16px]" src="/icons/icon-plus.png" alt="icon-add">
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'label', 'max', 'min', 'step', 'disabled', 'decimal'],
    data() {
        return {
            newVal: 0
        }
    },

    watch: {
        newVal(val) {
            //convert 2 decimal
            // const vA = isNaN(val) || val === undefined ? 0 : parseFloat(val).toFixed(2)
            this.$emit('input',parseFloat(this.round(parseFloat(val))))
        }
    },
    mounted() {
        this.newVal = this.value
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

        btnDikurang() {
            if (this.newVal == undefined || this.newVal == NaN) {
                this.newVal = -this.step
            } else {
                console.log(this.step)
                const hitung = parseFloat(this.newVal)-(parseFloat(this.step) * 1);
                this.newVal = this.round(hitung)
            }

        },
        round(value) {
            const decimals = this.decimal ? this.decimal : 0
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
        },
        btnDitambah() {
            if (this.newVal == undefined || this.newVal == NaN) {
                this.newVal = this.step
            } else {
                const hitung = parseFloat(this.newVal)+parseFloat(this.step)
                this.newVal = this.round(hitung)
            }


        }

    },
}
</script>