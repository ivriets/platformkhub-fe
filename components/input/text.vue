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
            :placeholder="placeholder"
            @input="handleInput"
            @change="handleInput"
            :value="value"
            :maxlength="max ? max : 1000"
            autocomplete="chrome-off"
            :disabled="disabled?disabled:false"
            @keyup.enter="keyEnter"
            @keyup.esc="keyEsc"
        >
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
        keyEsc(event) {
            const data = {
                key: 'esc',
                value: ''
            }
            this.$emit('keyup',data)
            this.$emit('input', '')

        }

    },
}
</script>