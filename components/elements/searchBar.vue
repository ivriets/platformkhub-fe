<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <div class="flex items-center relative">
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                :placeholder="placeholder ? placeholder : this.$t('tulisDisini')"
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
            <button  class="absolute top-0 right-0 translate-y-1/2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#9E9E9E" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></svg>
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','disabled'],
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
        performSearch() {
            // console.log('this.value', this.value)
            this.$emit('input', this.value)
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