<template>
    <div>
        <div v-if="label" class="text-sm text-black font-medium  cursor-pointer">
            {{label}}
        </div>
        <div class="relative">
            <input 
                type="text" 
                :name="name" 
                :id="name" 
                :ref="name"
                class="focus:outline-none w-full border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                :class="prefix && prefix !=='' ? 'pl-[35px]' : 'pl-2' "
                :placeholder="placeholder"
                v-model="model"
                :maxlength="max ? max : 1000"
                autocomplete="off"
                :disabled="disabled?disabled:false"
                pattern="\d+((\.|,)\d+)?"
                :data-custom-dua="dataCustomDua"
                :data-custom="dataCustom"
                @keyup.enter="keyEnter"
                @keyup.esc="keyEsc"
                @keyup="keyup"

            >
            <div class="text-sm absolute top-0 left-0 h-[34px] px-2 flex items-center">
                <div>{{prefix}}</div>
            </div>
            <div class="text-sm absolute top-0 right-0 h-[34px] px-2 flex items-center">
                <div>{{suffix}}</div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','disabled', 'prefix','suffix', 'dataCustom','dataCustomDua'],
    data() {
        return {
            debounceTimeout: null
        }
    },
    computed: {
        model: {
            get() {
                return this.value ? this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : this.value
            },
            set(value) {
               
                if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
                this.debounceTimeout = setTimeout(() => {
                    this.$emit('input', Number(value.replaceAll(',','')))
                },150)

            }
        },
    },
    methods: {
        handleInput(event) {
            // console.log(event.clipboardData)
            const allowed = ['1','2','3','4','5','6','7','8','9','0']
             if (!allowed.includes(event.key)) {
                event.returnValue = false
            } else {
                event.returnValue = true
            }
        },
        keyEnter(event) {
            const data = {
                key: 'enter',
                value: event.target.value
            }
            this.$emit('keyup',data)
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
        keyEsc(event) {
            const data = {
                key: 'esc',
                value: ''
            }
            this.$emit('keyup',data)
            this.$emit('input', '')

        }
    }

}
</script>