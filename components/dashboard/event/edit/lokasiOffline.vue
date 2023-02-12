<template>
    <div>
        <FormLokasi 
            v-model="form"
            :prefixName="prefixName"
            :map="false"
        />
    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            loader: false,
            form1: {
                provinsi: '',
                kota: '',
                jalan: '',
                pinLocation: ''
            }
        }
    },
    computed: {
        form: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },


}
</script>