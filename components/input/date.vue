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
                :disabled-date="disabledRange"
            />
        </client-only>
    </div>
</template>


<script>
export default {
    props: ['value','name', 'placeholder', 'label', 'disabled', 'format',,'disabledBefore','disabledDate'],
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
        },
        disabledRange(date) {
            if (this.disabledBefore && this.disabledBefore === true) {
                var hariIni = this.disabledDate ? new Date(this.disabledDate) :  new Date()
                var kemarin = hariIni.setDate(hariIni.getDate() - 1)
                return date <= kemarin
            }
        }

    }
}
</script>