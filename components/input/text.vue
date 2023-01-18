<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <input 
            type="text" 
            :name="name" 
            :id="name" 
            :ref="name"
            class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
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
        <div v-if="counter && counter === true && max && parseInt(max) > 0" class="text-xs text-warna-dua mt-1 ml-1">{{value.length}}/{{max}}</div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','disabled', 'counter'],
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

