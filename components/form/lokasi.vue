<template>
    <div v-if="loader">
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-5 mb-10">
                <div class="col-span-12 " :class="colClass">
                    <div class="">
                        <InputSelect 
                            v-model="newVal.provinsi"
                            :label="$t('Provinsi')"
                            :name="prefixName+'provinsi'"
                            :opsi="opsiProvinsi"
                            :key="'prov'+keyProvinsi"
                            :placeholder="$t('Pilih Provinsi')"
                        />
                    </div>
                </div>
                <div class="col-span-12 ">
                    <InputSelect 
                        v-model="newVal.kota"
                        :label="$t('KotaKab')"
                        :name="prefixName+'provinsi'"
                        :opsi="opsiKotaKab"
                        :key="'kota'+keyKota"
                        :disabled="newVal.provinsi===''?true:false"
                        :placeholder="$t('Pilih Kota / Kabupaten')"
                    />
                </div>
                <div class="col-span-12 ">
                    <InputText 
                            v-model="newVal.jalan"
                            placeholder="Tulis disini"
                            :name="prefixName+'jalan'"
                            :label="$t('Jalan')"
                        />
                </div>
                <div class="col-span-12 ">
                    <InputPinLocation
                            v-model="newVal.pinLocation"
                            :label="$t('Pin Location')"
                        />
                </div>              

        </div>
        <!-- <div class="flex items-center justify-end pb-5 px-4">
            <slot>
            <button @click="simpan"  class="button-standar">{{ btnText ? btnText : 'Tambah' }}</button>
            </slot>
        </div> -->
    </div>
</template>
<script>
export default {
    props: ['value','disabled','prefixName', 'colClass', 'btnText'],
    data() {
        return {
            // btnText: 'Tambahkan',
            valueSelectProvinsi: '',
            valueSelectKotaKab: '',
            valueProvinsi: "",
            opsiProvinsi: [],
            opsiKotaKab: [],
            pinLokasi: false,
            // newVal: {
            //     provinsi: '',
            //     kota: '',
            //     jalan: '',
            //     pinLocation: ''
            // },
            loader: false,
            keyProvinsi: 0,
            keyKota: 0
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input',value)
            }
        }
    },
    watch: {
        'newVal.provinsi'(val) {
            if (val !== '') {
                this.newVal.kota = ''
                this.getKota()
            }
        }
        // valueSelect(val) {
        //     this.$emit('input',val)
        // }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loader = false
            // this.newVal = _.cloneDeep(this.value)

            this.getProv();
            // this.getKota()
            if (this.value.kota !== '') {
                this.getKota();
                this.$nextTick(() => {

                })
            }

        },
        async getProv() {
            await this.$apiBase.get('provinsi/').then(res => {
                const data = res.data
                this.opsiProvinsi = _.map(data, function(o){
                    return {'id':o.provinsi, 'label':[o.provinsi, o.provinsi]}
                })
                this.$nextTick(() => {
                    // this.newVal.kota = ''
                    if (this.value.kota && this.value.kota !== '') this.newVal.kota = this.value.kota
                    this.loader = true
                    this.keyProvinsi+=1
                    this.keyKota+=1
                })

            }).catch(err => {
                console.log(err)
            })
        },
        async getKota() {
            await this.$apiBase.get('kotakab?provinsi='+ this.newVal.provinsi).then(res => {
                const data = res.data
                this.opsiKotaKab = _.map(data, function(o){
                    return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                })
                this.keyKota +=1
            })
        },
        // simpan() {
        //     if (this.newVal.provinsi === '') {
        //         this.$toast.show('Provinsi masih kosong')
        //     } else if (this.newVal.kota === '') {
        //         this.$toast.show('Kota masih kosong')
        //     } else if (this.newVal.jalan === '') {
        //         this.$toast.show('Jalan masih kosong')
        //     } else {
        //      this.$emit('input', this.newVal)
        //     }
        // }

        // handleInput(event) {
        //     this.$emit('input', event.target.value)
        // }
    }
    
}
</script>