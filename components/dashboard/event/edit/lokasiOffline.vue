<template>
    <div>
        <FormLokasi 
            v-model="form"
            :prefixName="prefixName"
            :map="false"
            v-if="loader"
        />

    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            loader: false,
            form: {
                provinsi: '',
                kota: '',
                jalan: '',
                pinLocation: ''
            }
        }
    },
    mounted() {
        this.initialize()
    },
    watch: {
        form: {
            handler(val) {
                this.updateValue()
            },
            deep:true
        }
    },
    methods: {
        initialize() {
            this.loader = false
            if (this.value.api.length > 0) {
                this.form = this.value.api[0]
            } else {
                this.form = {
                    provinsi: '',
                    kota: '',
                    jalan: '',
                    pinLocation: ''
                }
            }
            this.$nextTick(() => {
                this.loader=true;
            })
        },
        updateValue() {
            const buatUpdate = {
                list: [this.form],
                deleted: [],
                api: this.value.api
            }
            this.$emit('input',buatUpdate)
        }
    }

}
</script>