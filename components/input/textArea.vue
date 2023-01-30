<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}} <span class="text-[#DF4B61] font-semibold" v-if="required && required === true">*</span>
        </div>
        <textarea 
            :id="name" 
            :placeholder="placeholder ? placeholder : $t('tulisDisini')"
            @input="handleInput"
            :disabled="disabled ? disabled : false"
            :maxlength="max ? max : 1000"
            :minlength="min ? min : 0"
            :rows="rows?rows:'4'"
            v-model="newVal"
            :style="'height:'+tinggi+';'"
            class="border border-warna-tujuh placeholder-[#9E9E9E] text-sm rounded-lg focus:outline-none focus:border-warna-tujuh/50 w-full px-2 py-1.5 disabled:bg-gray-400 "
        />
        <div v-if="counter && counter === true && max && parseInt(max) > 0" class="text-xs text-warna-dua mt-1 ml-1">{{newVal.length}}/{{max}}</div>

    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'max','min', 'disabled', 'rows','counter', 'autoHeight', 'required'],
    data() {
        return {
            tinggi: '34px'
        }
    },
    computed: {
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input',value)
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            const defRow = this.rows ? this.rows : 4
            this.tinggi = (defRow * 34) + 'px' 
        },

        handleInput(element) {
            if (this.autoHeight && this.autoHeight === true) {
                const defRow = this.rows ? this.rows : 4
                this.tinggi = (defRow * 34) + 'px' 
                this.tinggi = element.target.scrollHeight + 'px'
            }

        }
    }
}
</script>