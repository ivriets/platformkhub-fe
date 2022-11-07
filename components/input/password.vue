<template>
    <div class="relative">
        <input 
            :type="show ? 'password': 'text'" 
            :name="name" 
            :id="name" 
            :ref="name"
            class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
            :placeholder="placeholder"
            @input="handleInput"
            @change="handleInput"
            :maxlength="max ? max : 1000"
            autocomplete="chrome-off"
            :disabled="disabled?disabled:false"
        >
        <div @click="show=!show" class="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <i v-if="!show" class="ri-eye-fill"></i>
            <i v-if="show" class="ri-eye-off-fill"></i>
        </div>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','disabled'],
    data() {
        return {
            show: true
        }
    },

    mounted() {

    },

    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    },
}
</script>