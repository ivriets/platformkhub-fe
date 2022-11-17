<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <textarea 
            :id="name" 
            :placeholder="placeholder"
            @input="handleInput"
            :value="value ? value : ''"
            :disabled="disabled ? disabled : false"
            :maxlength="max ? max : 1000"
            :minlength="min ? min : 0"
            rows="4"
            class="border border-warna-tujuh placeholder-[#9E9E9E] text-sm rounded-lg focus:outline-none focus:border-warna-tujuh/50 w-full p-2 disabled:bg-gray-400 "
        />
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','min', 'disabled'],
    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>