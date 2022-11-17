<template>
    <div>
        <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <client-only>
            <date-picker
                :placeholder="placeholder"
                :format="format ? format : 'DD MMMM YYYY'"
                v-model="tanggal" 
                value-type="YYYY-MM-DD"
                :editable="false"
                :input-attr="{name:name, id:name}"
                :disabled="disabled"
                class="w-[300px]"
            />
        </client-only>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'disabled', 'format'],
    data() {
        return {
            tanggal: '',
            loaderDate: false
        }
    },
    watch: {
        tanggal(val) {
            const newVal = val === null ? '' : val
            this.$emit('input',newVal)
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // console.log(this.value)
            if (this.value) {
                this.tanggal = this.$dayjs(this.value).format('YYYY-MM-DD');

            }
        }
    }
}
</script>