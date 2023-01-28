<template>
    <div>
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9 mb-10">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.teleponOrganisasi"
                        :name="prefixName+'teleponOrganisasi'"
                        :label="$t('Phone')"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.emailOrganisasi"
                        :name="prefixName+'email'"
                        :label="$t('Email')"
                        :required="true"

                    />
                </div>
            </div>
        </div>

        <div v-for="(lokasi, index) in form.lokasiOrganisasi" :key="'hshd'+index" class="">
            <InputLokasiOrganisasi 
                v-model="form.lokasiOrganisasi[index]"
                :prefixName="prefixName+index"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            prefixName: 'lok',
            form: {
                teleponOrganisasi: '',
                email: '',
                lokasiOrganisasi: []
            }
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    watch: {
        value(val) {
            // console.log(val)
            if (val === true) {
                this.save();
                setTimeout(() => {
                    this.$emit('input', false)
                },500)
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },
        async masterPoint() {
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                const data = res.data
                this.form = {
                    teleponOrganisasi: data.teleponOrganisasi,
                    emailOrganisasi: data.emailOrganisasi,
                    lokasiOrganisasi: data.lokasiOrganisasi,
                }

            })
        },
        save() {
             var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
             if ( this.form.emailOrganisasi==='') {
                this.$toast.show(this.$t('emailBlank'))
             } else if ( !this.form.emailOrganisasi.match(validRegexEmail)) {
                this.$toast.show(this.$t('emailFormatBlank'))
             } else {
                this.updateData()
             }
        },
        async updateData() {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', this.form).then(res => {
                const data = res.data
                this.$toast.show(data.message)
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>