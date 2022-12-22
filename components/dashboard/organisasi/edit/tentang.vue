<template>
    <div v-if="loaderDetail" role="status">
        <div class="flex items-center justify-center text-center">
            <svg aria-hidden="true" class="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>
    <div v-else>
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9 mb-5 md:mb-10">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.namaOrganisasi"
                        placeholder="Tulis disini"
                        :name="prefixName+'namaorganisasi'"
                        :label="'Nama Organisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.websiteOrganisasi"
                        placeholder="Tulis disini"
                        :name="prefixName+'weborganisasi'"
                        :label="'Web/URL Organisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeOrganisasi"
                        :name="prefixName+'tipeorganisasi'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Organisasi'"
                        :opsi="typeOrganisasi"
                        :value="form.typeOrganisasi"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeorganisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeAudience"
                        :name="prefixName+'tipeaudience'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Audience'"
                        :opsi="typeAudience"
                        :value="form.typeAudience"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeaudience'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeApproach"
                        :name="prefixName+'tipeapproach'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Approach'"
                        :opsi="typeApproach"
                        :value="form.typeApproach"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeapproach'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeIssues"
                        :name="prefixName+'topik'"
                        :placeholder="'Tulis disini'"
                        :label="'Topik'"
                        :opsi="typeIssues"
                        :value="form.typeIssues"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'topik'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputSelect 
                        v-model="form.hierarki"
                        :name="prefixName+'hierarki'"
                        :label="'Hierarki'"
                        :opsi="opsiHierarki"
                        :placeholder="'Pilih'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="font-medium mb-2">Tema Warna Latar Belakang</div>
                <div class="flex items-center gap-x-3">
                    <!-- #222222 -->
                    <div @click="btnWarnaSatu" class="bg-white border rounded-full" :class="form.tampilan === '#222222' ? 'border-latar-satu' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-satu rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #176988 -->
                    <div @click="btnWarnaDua" class="bg-white border rounded-full" :class="form.tampilan === '#176988' ? 'border-latar-dua' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-dua rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #1E784B -->
                    <div @click="btnWarnaTiga" class="bg-white border rounded-full" :class="form.tampilan === '#1E784B' ? 'border-latar-tiga' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-tiga rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #753A00 -->
                    <div @click="btnWarnaEmpat" class="bg-white border rounded-full" :class="form.tampilan === '#753A00' ? 'border-latar-empat' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-empat rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #DB4339 -->
                    <div @click="btnWarnaLima" class="bg-white border rounded-full" :class="form.tampilan === '#DB4339' ? 'border-latar-lima' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-lima rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #BC185D -->
                    <div @click="btnWarnaEnam" class="bg-white border rounded-full" :class="form.tampilan === '#BC185D' ? 'border-latar-enam' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-enam rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #4B4B9D -->
                    <div @click="btnWarnaTujuh" class="bg-white border rounded-full" :class="form.tampilan === '#4B4B9D' ? 'border-latar-tujuh' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-tujuh rounded-full cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr class="border-warna-tujuh my-10">
        <div class="">
            <div class="text-xl font-semibold mb-10">Tentang Organisasi</div>
            
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
                        <!-- <InputText 
                            v-model="lokasi.kota"
                            placeholder="Tulis disini"
                            :name="prefixName+'kota'"
                            :label="'Kota'"
                        /> -->
                        <InputKotaKab 
                            v-model="lokasi.kota"
                            :name="prefixName+'kota'"
                            :label="'Kota'"
                            :provinsi="lokasi.provinsi"
                            :value="lokasi.kota"
                            :placeholder="lokasi.kota"
                        />
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <div class="flex items-start mb-1">
                            <div class="font-medium">Photo/Picture</div>
                            <div class="text-[#DF4B61] ml-1">*</div>
                        </div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <div class="flex items-start mb-1">
                            <div class="font-medium">Foto/Gambar</div>
                            <div class="text-[#DF4B61] ml-1">*</div>
                        </div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-model="form.highlight[1]"
                            placeholder="Write here"
                            :name="prefixName+'highlighten'"
                            :label="'Highlight (English)'"
                        />
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-if="form.highlight !== null"
                            v-model="form.highlight[0]"
                            placeholder="Tulis disini"
                            :name="prefixName+'highlightid'"
                            :label="'Sorotan (Indonesia)'"
                        />
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="">
                        <InputTextArea 
                            v-if="form.highlight !== null"
                            v-model="form.deskripsi[1]"
                            :max="500"
                            placeholder="Write here"
                            :label="'Organization Description (English)'"
                            :name="prefixName+'deskripsien'"
                        />
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="">
                        <InputTextArea 
                            v-model="form.deskripsi[0]"
                            :max="500"
                            placeholder="Tulis disini"
                            :label="'Deskripsi Organisasi (Indonesia)'"
                            :name="prefixName+'deskripsiid'"
                        />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-white shadow-md rounded-xl py-4 px-6 mt-10">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    // props: ['dataOrganisasi'],
    data() {
        return {
            loaderDetail: true,
            prefixName: 'tentang',
            typeApproachId: [],
            typeOrganisasiId: [],
            typeAudienceId: [],
            typeIssuesId: [],
            form: undefined,
            opsiProvinsi: [],
            typeInModule: [],
            typeOrganisasi: [],
            typeAudience: [],
            typeApproach: [],
            typeIssues: [],
            opsiHierarki: []
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }, 
    },
    created() {
        this.initialize()
    },
    watch: {
        form : {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                console.log(this.form)
            }
        }
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

            await this.$apiPlatform.get('daftarList/kategori?kategori1=typeOrganisasi').then(res => {this.typeOrganisasi = _.map(res.data.results, function(o){return {'id':parseInt(o.id), 'label':o.nama}})}).catch(err => {console.log(err)})
            await this.$apiPlatform.get('daftarList/kategori?kategori1=typeAudience').then(res => {this.typeAudience = _.map(res.data.results, function(o){return {'id':parseInt(o.id), 'label':o.nama}})}).catch(err => {console.log(err)})
            await this.$apiPlatform.get('daftarList/kategori?kategori1=typeApproach').then(res => {this.typeApproach = _.map(res.data.results, function(o){return {'id':parseInt(o.id), 'label':o.nama}})}).catch(err => {console.log(err)})
            await this.$apiPlatform.get('daftarList/kategori?kategori1=typeIssues').then(res => {this.typeIssues = _.map(res.data.results, function(o){return {'id':parseInt(o.id), 'label':o.nama}})}).catch(err => {console.log(err)})
            await this.$apiPlatform.get('daftarList/kategori?kategori1=pilihanHierarchy').then(res => {this.opsiHierarki = _.map(res.data.results, function(o){return {'id':parseInt(o.id), 'label':o.nama}})}).catch(err => {console.log(err)})
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                const data = res.data
                this.form = {
                    namaOrganisasi: data.namaOrganisasi,
                    websiteOrganisasi: data.websiteOrganisasi,
                    hierarki: data.hierarchy.id,
                    typeOrganisasi: _.flatMap(data.typeOrganisasi, "id"),
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tampilan: data.tampilan,
                    lokasiOrganisasi: data.lokasiOrganisasi,
                    highlight:[data.highlight[0], data.highlight[1]],
                    deskripsi:[data.deskripsi[0], data.deskripsi[1]]
                }
                
            }).catch(err => {
                console.log(err)
            })
            this.loaderDetail = false
        },

        btnWarnaSatu() {
            this.form.tampilan = '#222222'
        },

        btnWarnaDua() {
            this.form.tampilan = '#176988'
        },

        btnWarnaTiga() {
            this.form.tampilan = '#1E784B'
        },

        btnWarnaEmpat() {
            this.form.tampilan = '#753A00'
        },

        btnWarnaLima() {
            this.form.tampilan = '#DB4339'
        },

        btnWarnaEnam() {
            this.form.tampilan = '#BC185D'
        },

        btnWarnaTujuh() {
            this.form.tampilan = '#4B4B9D'
        },
        
        btnBack() {
            this.$router.push('/verifications/organisasi/'+this.id)
        }
    },
}
</script>