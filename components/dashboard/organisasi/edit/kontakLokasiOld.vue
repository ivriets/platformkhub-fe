<template>
    <div v-if="form">
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.noTelepon"
                        placeholder="Tulis disini"
                        :name="prefixName+'notelepon'"
                        :label="'Nomor Telepon'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.email"
                        placeholder="Tulis disini"
                        :name="prefixName+'email'"
                        :label="'Email'"
                    />
                </div>
            </div>   
            <div class="col-span-12">   
                <div v-for="(lokasi, index) in form.lokasiOrganisasi" :key="index" class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9 mb-10">
                    <div class="col-span-12 md:col-span-6">
                        <div class="">
                            <InputSelect 
                                v-model="lokasi.provinsi"
                                :name="prefixName+'provinsi'"
                                :label="'Provinsi'"
                                :opsi="opsiProvinsi"
                                :placeholder="lokasi.provinsi"
                            />
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <div class="">
                            <div v-if="opsiKota.length > 0">
                                <div class="font-medium mb-1"> Kota </div>
                                <div class="relative">
                                    <select 
                                        v-model="lokasi.kota" 
                                        class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                                    >
                                        <option selected disabled value="">{{lokasi.kota}}</option>
                                        <option
                                            v-for="(i, index2) in opsiKota[index]" :key="index2" 
                                            :value="i.id"
                                        >
                                        {{i.label[bahasa]}}
                                        </option>
                                    </select>
                                    <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">                
                                        <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <div class="">
                            <InputText 
                                v-model="lokasi.jalan"
                                placeholder="Tulis disini"
                                :name="prefixName+'jalan'"
                                :label="'Jalan'"
                            />
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <div class="font-medium mb-1">
                            Pin Location
                        </div>
                        <div>
                            <InputPinLocation
                                v-model="lokasi.pinLocation"
                            />
                        </div>
                    </div>
                </div>
            </div>     
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6 mt-10">
            <div class="flex items-center justify-end">
                <div @click="save" class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'kontaklokasi',
            form: undefined,
            opsiProvinsi: [],
            organisasiId: undefined,
            provinsi: [],
            opsiKota: [],
        }
    },   
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
        },
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        }
    },
    watch: {
        // ngalilieur maneh her, kudu dirubah cara pendekatanna
        form : {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (oldValue && newValue){
                    if (oldValue.lokasiOrganisasi && newValue.lokasiOrganisasi){
                        let _this = this
                        if (_.flatMap(this.form.lokasiOrganisasi, "provinsi") !== this.provinsi){
                            this.provinsi =  _.flatMap(this.form.lokasiOrganisasi, "provinsi")
                            if (_.flatMap(this.form.lokasiOrganisasi, "provinsi").length > 0){
                                // 
                                _.flatMap(this.form.lokasiOrganisasi, "provinsi").forEach(o => {
                                    this.$apiBase.get('kotakab?provinsi='+ o).then(res => {
                                        var indexKota = _.flatMap(this.form.lokasiOrganisasi, "provinsi").indexOf(o)
                                        var daftarKota = _.map(res.data, function(o){
                                            return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                                        })
                                        _this.$set(_this.opsiKota, indexKota, daftarKota)
                                    }) 
                                })
                            }
                        }
                    }
                }
            }
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint() 
        },

        async masterPoint() {
            await this.$apiBase.get('provinsi/').then(res => {
                const data = res.data
                this.opsiProvinsi = _.map(data, function(o){
                    return {'id':o.provinsi, 'label':[o.provinsi, o.provinsi]}
                })

            }).catch(err => {
                console.log(err)
            })

            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                const data = res.data
                this.accountId = data.accountId
                this.organisasiId = data.organisasiId
                this.form = {
                    noTelepon: data.teleponOrganisasi,
                    email: data.emailOrganisasi,
                    lokasiOrganisasi: data.lokasiOrganisasi,
                }
                this.provinsi =  _.flatMap(data.lokasiOrganisasi, "provinsi")
                const _this = this;
                if (this.provinsi.length > 0){
                    this.provinsi.forEach(o => {
                        this.$apiBase.get('kotakab?provinsi='+ o).then(res => {
                            _this.opsiKota.push(_.map(res.data, function(o){
                                return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                            }))
                        }) 
                    })
                }
                
            }).catch(err => {
                console.log(err)
            })
            this.loaderDetail = false
        },
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data
                this.message = data.message
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
        save () {
            this.updateData(this.form)
        }
    }
}
</script>