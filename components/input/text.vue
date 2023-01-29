<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}} <span class="text-[#DF4B61] font-semibold" v-if="required && required === true">*</span>

        </div>
        <div class="relative">
            <div 
                v-if="prefix && prefix !==''"
                class=" absolute top-0 left-0 py-1.5 bg-gray-100 border rounded-l-lg text-sm text-utama pl-2 pr-2"
            >{{prefix}}</div>
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                class="focus:outline-none w-full border border-tujuh rounded-lg pr-2 py-1.5 text-sm text-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                :style="prefix && prefix !== '' ? ' padding-left:'+ ((prefix.length * 6)+32) +'px; ' : ' padding-left:0.5rem; '"
                :placeholder="placeholder ? placeholder : $t('tulisDisini') "
                @input="handleInput"
                @change="handleInput"
                :value="value"
                :maxlength="max ? max : 1000"
                autocomplete="chrome-off"
                :disabled="disabled?disabled:false"
                @keyup.enter="keyEnter"
                @keyup.esc="keyEsc"
                @keyup="keyup"
            >
        </div>
        <div v-if="counter && counter === true && max && parseInt(max) > 0" class="text-xs text-warna-dua mt-1 ml-1">{{value.length}}/{{max}}</div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','disabled', 'counter','required', 'prefix'],
    data() {
        return {
            
        }
    },

    mounted() {

    },
    computed: {
        ukuranPrefix() {
            if (this.prefix && this.prefix !=='') {
                const totalKarakter = this.prefix.length
                return parseInt(totalKarakter) * 1.5;
            }
        }
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
        keyup(event) {
            // console.log('key',event)
            if (event.key==='ArrowDown') {
                const data = {
                    key: event.key,
                    value: ''
                }

                this.$emit('keyup',data)
            }
        },

    },
}
</script>

