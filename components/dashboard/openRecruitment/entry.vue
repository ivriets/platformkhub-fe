<template>
    <div>
        <div class="bg-white p-5 shadow-md">
            <div class="text-xl font-semibold text-warna-utama mb-[28px]">{{ title }}</div>
            <div class="grid grid-cols-12 gap-x-4 gap-y-[28px] mb-7">
                <div class="col-span-12 md:col-span-6">
                    <InputText 
                        placeholder="Write Here"
                        :name="prefixName+'titleid'"
                        :label="'Indonesia Title'"
                        v-model="form.judul[0]"
                    />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <InputText 
                        placeholder="Write here"
                        :name="prefixName+'titleen'"
                        :label="'English Title'"
                        v-model="form.judul[1]"
                    />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <InputAutocompleteMulti 
                        v-model="form.kategori"
                        :name="prefixName+'department'"
                        :placeholder="'Search or Add'"
                        :label="'Department'"
                        :opsi="opsiDepartment"
                        :itemValue="'id'"
                        :itemLabel="'nama'"
                        :key="keyMaster+'dept'"
                        :multilang="true"
                        :addNew="true"
                    />
                </div>
                <div class="col-span-12 md:col-span-6 w-full">
                    <InputSelect 
                        v-model="form.statusKarir"
                        :label="'Status'"
                        :name="'status'"
                        :opsi="opsiStatusOpenRec"
                        :itemValue="'id'"
                        :itemLabel="'nama'"
                        :multilang="true"
                        :key="'statuskarir'+keyMaster"
                    />
                </div>
            </div>
        
            <div class="mb-7">
                <div class="font-medium mb-1">{{$t('Deskripsi')}} (Indonesia)</div>
                <InputTextEditor 
                    v-model="form.deskripsi[0]"
                    :name="prefixName+'deskripsiid'"
                />
            </div>
            <div class="mb-7">
                <div class="font-medium mb-1">{{$t('Deskripsi')}} (English)</div>
                <InputTextEditor 
                    v-model="form.deskripsi[1]"
                    :name="prefixName+'deskripsien'"
                />
            </div>
        </div>

        <hr class="border-warna-lima my-10">

        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button class="button-standar-outline" @click="btnBack"> {{$t('Back')}} </button>
                <button class="button-standar" @click="simpan"> {{$t('Save')}} </button>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    data() { 
        return {
            prefixName: 'newopenrec',
            form: {
                judul: ['', ''],
                kategori: [],
                statusKarir: '',
                deskripsi: ['', '']
            },
            opsiDepartment: [],
            opsiStatusOpenRec: [],
            keyMaster: 100
        }
    },
    computed: {
        formMode() {
            return this.$route.query.id ? 'put' : 'post'
        },
        lang() {
            return this.$i18n.locale
        },
        id() {
            return this.$route.query.id
        },

        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        title() {
            return this.$route.query.id ? this.$t('Edit Recruitment Editor') : this.$t('Recruitment Editor')
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getKategori()
        },
        async getKategori() {
            await this.$apiPlatform('/daftarList/kategori').then(res=> {
                console.log(res.data.results)
                const dataRes = res.data.results
                this.opsiDepartment = dataRes.Pilihan_Kat_Karir
                this.opsiStatusOpenRec = _.orderBy(dataRes.Status_Karir, 'id')
                this.$nextTick(() => {
                    this.keyMaster+=1
                    if (this.formMode === 'put') this.initPut()
                })
            })
        },
        async initPut() {
            await this.$apiPlatform.get('daftarloker/' + this.id + '/').then(res => {
                console.log(res.data.results)
                const dataRes = res.data.results
                this.form = {
                    judul: dataRes.judul,
                    kategori: _.flatMap(dataRes.kategori, 'kategori.id'),
                    statusKarir: dataRes.statusKarir.id,
                    deskripsi: dataRes.deskripsi
                }
                this.$nextTick(() => {
                    this.keyMaster+=1
                })
            })
        },  

        btnBack() {
            this.$router.push('/career/open-recruitment/')
        },
        simpan() {
            if (this.formMode === 'post') {
             this.realSimpan()
            } else {
                this.realUpdate()
            }
        },
        async realSimpan() {
            await this.$apiPlatform.post('daftarloker/', this.form).then(res => {
                this.$toast.show(this.$t('Karir') + ' ' + this.$t('addedSukses'))
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        async realUpdate() {
            await this.$apiPlatform.put('daftarloker/'+this.id+'/', this.form).then(res => {
                this.$toast.show(this.$t('Karir') + ' ' + this.$t('updateSukses'))
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        }

    },
// {
//   "title": [
//     "indonesia",
//     "english"
//   ],
//   "department": [
//     1
//   ],
//   "status": 3,
//   "deskripsi": [
//     "<p>deskripsi Indonesia</p>",
//     "<p>deskripsi English</p>"
//   ]
// }

    
}
</script>