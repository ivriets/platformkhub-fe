<template>
    <div v-if="form" class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Events'"
                :linkParent="'/moderations/event'"
                :child="childBreadcrumb"
            />
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div v-if="form.judulActivity" class="col-span-12 lg:col-span-9">
                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[0]"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[0].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulActivity[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="$t('Title (English)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[1].length}}/{{maxTitle}}</div> -->
                    </div>
                    
                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Registration Type') }}</div>
                        <div class="mb-5">
                        <InputRadio 
                            v-model="form.tipeRegistrasi"
                            :label="''"
                            :opsiRadio="opsiTipeRegistransi"
                            :name="prefixName+'tipeRegistrasi'"
                            :orientasi="'horizontal'"
                        />
                        </div>
                        <div>
                            <InputText 
                                v-model="form.registrasiExternalLink"
                                :label="''"
                                :name="prefixName+'registrasiExtrenalLink'"
                            />
                        </div>
                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Registration Date') }}</div>
                    <div class="grid grid-cols-12 gap-2">
                        <div  class="col-span-12 md:col-span-6 ">
                            <InputDate
                                v-model="form.registrationStartDate"
                                :label="$t('Start Date')"
                                :name="prefixName+'registrationStartDate'"
                                :key="'registrationStartDate'+keyTanggal1"
                            />
                        </div>
                        <div  class="col-span-12 md:col-span-6">
                            <InputDate
                                v-model="form.registrationEndDate"
                                :label="$t('End Date')"
                                :name="prefixName+'registrationEndDate'"
                                :disabledBefore="true"
                                :disabledDate="form.registrationStartDate"
                                :key="'registrationEndDate'+keyTanggal1"

                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Event Date') }}</div>
                    <div class="grid grid-cols-12 gap-2">
                        <div  class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputDate
                                v-model="form.tanggalMulai"
                                :value="form.tanggalMulai"
                                :label="$t('Start Date')"
                                :name="prefixName+'tanggalMulai'"
                                :key="'tanggalMulai'+keyTanggal2"
                            />
                        </div>
                        <div  class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputDate
                                v-model="form.tanggalSelesai"
                                :label="$t('End Date')"
                                :name="prefixName+'tanggalSelesai'"
                                :disabledBefore="true"
                                :disabledDate="form.tanggalMulai"
                                :key="'tanggalSelesai'+keyTanggal2"

                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Content') }}</div>
                        <InputContentSectionBaru
                            v-if="deskripsi"
                            v-model="deskripsi"
                        />
                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Kontak Acara') }}</div>

                    <div class="grid grid-cols-12 gap-5 mb-10">
                        <div class="col-span-12 md:col-span-6">
                            <InputText 
                                v-model="form.kontakEmail"
                                :label="'Surel'"
                                :placeholder="'Tulis di sini'"
                                :name="prefixName+'kontakemail'"
                            />
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <InputText 
                                v-model="form.kontakNama"
                                :label="'Kontak'"
                                :placeholder="'Tulis di sini'"
                                :name="prefixName+'kontaknama'"
                            />
                        </div>
                    </div>
                    <div class="text-xl text-warna-utama mb-1">{{ $t('Tipe Acara') }}</div>
                        <div class="mb-8">
                            <InputSelect 
                                v-model="tipeAcara"
                                :opsi="opsiTipeAcara"
                            />
                        </div>
                    <div v-if="[3,1].includes(tipeAcara)">
                        <div class="text-xl text-warna-utama mb-1">{{ $t('Lokasi Online') }}</div>
                        <div class="mb-8">
                            <FormLokasiOnline 
                                v-model="form.lokasiOnline[0]"
                                :prefixName="prefixName"
                                v-if="loaderAll"
                                :key="'lokasionline'+keyMaster"
                            />
                        </div>
                    </div>

                    <div v-if="[2,1].includes(tipeAcara)">
                        <div class="text-xl text-warna-utama mb-1">{{ $t('Lokasi Offline') }}</div>
                        <FormLokasi 
                            v-model="form.lokasi[0]"
                            :prefixName="prefixName"
                            v-if="loaderAll"
                            :key="'lokasi'+keyMaster"
                            :map="false"

                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="my-10">
                        <InputGalleries 
                            v-model="daftarGalleri"
                        />
                    </div>


                </div>
                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="mb-6">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <ElementsDisplayStatusSubmission 
                                    :submission="form.submission"
                                />
                            </div>
                            <div class="flex items-center text-sm text-warna-sembilan">
                                <div class="">{{ $t('Bookmarked by:') }} </div>
                                <div class="ml-1">{{ totalBookmark }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <InputImageUploadSingle 
                            :label="$t('Thumbnail')"
                            v-model="imgThumbnail"
                            :accept="'.png, .jpg, .jpeg'"
                            :maxSize="1"
                            :useCrop="true"
                            :cropRatio="1"
                            v-if="loaderAll"
                            :key="'imgthumbnail'+keyMaster"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="typeAudience && form.typeAudience" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'tipeaudience'"
                            :label="$t('Audience Type')"
                            :opsi="typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeaufda'+keyMaster"
                            :multilang="true"
                        />
                    </div>
                    <div v-if="typeApproach && form.typeApproach" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'tipeapproach'"
                            :label="$t('Approach')"
                            :opsi="typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeapproach'+keyMaster"
                            :multilang="true"
                            
                        />
                    </div>
                    <div v-if="typeIssues && form.typeIssues" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'topik'"
                            :label="$t('Issues')"
                            :opsi="typeIssues"
                            :value="form.typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'topik'+keyMaster"
                            :multilang="true"
                        />
                    </div>

                    <div v-if="listTag && form.tag" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.tag"
                            :name="prefixName+'tag'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Tag')"
                            :opsi="listTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tag'+keyMaster"
                            :multilang="true"
                            :addNew="true"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">

                    <div class="mb-1">{{ $t('Event Status') }}</div>
                    <div>
                        <div v-if="form.statusActivity" class="flex items-center justify-center rounded-full text-white bg-warna-empat w-[147px] h-[34px] text-sm mb-2">{{form.statusActivity.nama[0]}}</div>
                    </div>
                    <div class="text-xs text-warna-dua">{{ $t('Event Status will change when event is finished') }}</div>
                    
                    <!-- <hr class="border-warna-tujuh my-[28px]"> -->
                    <!-- <button class="button-outline text-md py-3 w-full text-center mb-5">Download Report</button>
                    <button class="button-outline text-md py-3 w-full text-center ">Export ke Program</button> -->

                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <button @click="simpan" :disabled="btnText==='Updating'?true : false" class="button-standar">{{ $t(btnText) }}</button>
            </div>
        </div>
        <pre> {{ deskripsi }}</pre>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'event',
            btnText: 'Save',
            maxTitle: 80,
            form: {
                judulActivity: ['',''],
                deskripsi: ['',''],
                typeAudience: ['',''],
                typeApproach: ['',''],
                typeIssues: ['',''],
                statusActivity: {id:'', nama: ['','']},
                tag: ['',''],
                tanggalMulai: '',
                tanggalSelesai: '',
                lokasi: '',
                registrationStartDate: '',
                registrationEndDate: '',
                kontakEmail: '',
                kontakNama: '',
                registrasiExternalLink: ''
                
            },
            deskripsi: {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },

            opsiTipeRegistransi: [
                {
                    id:1,
                    label: ['KHUB (GRATIS)', 'KHUB (FREE)']
                },
                {
                    id:2,
                    label: ['Tautan Eksternal', 'External Link']
                }
            ],
            opsiTag: [],
            daftarGalleri: [],
            totalBookmark: 0,
            listIndividu: undefined,
            listOrganisasi: undefined,
            listTag: undefined,
            opsiProvinsi: [],
            provinsi: [],
            opsiKota: [],
            imgThumbnail: null,
            lokasi: {
                    // lokasiId: '',
                  provinsi: '',
                  kota: '',
                  jalan: '',
                  pinLocation: ''
            },
            lokasiOnline: {
                // lokasiOnlineId: '',
                typeChannel: null,
                url: '',
                jadwal: '',
                contactPerson: '',
                telpReservasi: ''
            },
            tipeAcara: 1,
            opsiTipeAcara: [
                {
                    id: 1,
                    label: ['Luring & Daring','Offline & Online']
                },
                {
                    id: 2,
                    label: ['Luring','Offline']
                },
                {
                    id: 3,
                    label: ['Daring','Online']
                }
            ],
            loaderAll: false,
            keyMaster: 0,
            imageThumbnailLoader: false,
            keyTanggal1: 0,
            keyTanggal2: 0,

        }
    },
    computed: {
        typeAudience() {
            return this.$store.state.opsi.typeAudience
        },

        typeApproach() {
            return this.$store.state.opsi.typeApproach
        },

        typeIssues() {
            return this.$store.state.opsi.typeIssues
        },

        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        title() {
            return this.$t('Blog')
        },
        id() {
            return this.$route.params.id;
        },
        basePath() {
            return process.env.BASE_URL
        },
        childBreadcrumb() {
            return [
                {
                    label: 'Detail',
                    link: '/moderations/event/'+this.$route.params.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
        }
        
    },
    watch: {
        tipeAcara(val) {
            if (val === 2) {
                this.form.lokasiOnline = [];
                this.form.lokasi = [_.cloneDeep(this.lokasi)]
            } else if (val === 3) {
                this.form.lokasi = []
                this.form.lokasiOnline = [_.cloneDeep(this.lokasiOnline)]
            }
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.btnText = 'Save'
            this.loaderAll = false
            this.masterPoint()
        },

        async masterPoint() {

            await this.$apiPlatform.get('verificator/listOrganisasi/').then(res => {
                this.listOrganisasi = res.data
            }).catch(err => {
                console.log(err)
            })
            await this.$apiPlatform.get('daftarList/tag/').then(res => {
                this.listTag = _.flatMap(res.data.results, function(o){
                    return {"id":o.id, 'label':o.nama}
                })
            }).catch(err => {
                console.log(err)
            })
            await this.$apiPlatform.get('moderator/events/'+this.id+'/').then(res => {
                var data = res.data
                this.form = {
                    submission: data.submission,
                    judulActivity: data.judulActivity,
                    deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    statusActivity: data.statusActivity,
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tag: _.flatMap(_.map(data.tag, function(o){return o.pilihanTagId}), "id"),
                    lokasi:data.lokasi && data.lokasi.length > 0 ? data.lokasi : [_.cloneDeep(this.lokasi)],
                    lokasiOnline: data.lokasiOnline && data.lokasiOnline.length > 0 ? data.lokasiOnline : [_.cloneDeep(this.lokasiOnline)],
                    deskripsi: data.deskripsi,
                    registrationStartDate: data.registrationStartDate ? data.registrationStartDate : '',
                    registrationEndDate: data.registrationEndDate ? data.registrationEndDate: '',

                    tipeRegistrasi: '',
                    kontakEmail: '',
                    kontakNama: '',
                    registrasiExternalLink: ''



                },
                this.daftarGalleri = data.galleries
                this.deskripsi.list = this.form.deskripsi
                
                this.imgThumbnail= {
                    displayImage: data.imgThumbnail,
                    file: null
                }

                this.$nextTick(() => {
                    this.loaderAll = true
                    this.keyTanggal1 +=1
                    this.keyTanggal2 +=1
                    this.keyMaster +=1
                })
            })
        },

        errorNotif(msg) {
            this.$toast.show({
                type: 'danger',
                title: 'Error',
                message: msg,
            })
        },
        focusField(id) {
            document.getElementById(this.prefixName + id).focus()
        },
        errorField(msg, id) {
            this.errorNotif(msg);
            this.focusField(id)
        },
        btnBack() {
            this.$router.push('/moderations/event/'+this.id)
        },
        simpan() {
            //validasi disini
            if (this.form.judulActivity[0] === '') {
                this.errorField(this.$t('titleIdBlank'), 'titleid')
            } else if (this.form.judulActivity[1] === '') {
                this.errorField(this.$t('titleEnBlank'), 'titleen')
            } else if (this.form.registrationStartDate === '') {
                this.errorField(this.$t('registrationStartDateBlank'), 'registrationStartDate')
            } else if (this.form.registrationEndDate === '') {
                this.errorField(this.$t('registrationEndDateBlank'), 'registrationEndDate')
            } else {
                this.putData()
            }


            
        },
        async putData() {
            this.btnText = 'Updating'
            var forSimpan = _.cloneDeep(this.form)
            forSimpan.registrationStartDate = new Date(forSimpan.registrationStartDate)
            forSimpan.registrationEndDate = new Date(forSimpan.registrationEndDate)
            forSimpan.tanggalMulai = new Date(forSimpan.tanggalMulai)
            forSimpan.tanggalSelesai = new Date(forSimpan.tanggalSelesai)
            forSimpan.statusActivity = forSimpan.statusActivity.id

            await this.$apiPlatform.put('moderator/events/'+this.id+'/', forSimpan).then(res => {
                console.log(res)

                if (this.imgThumbnail.file !== null) {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.$toast.show(this.$t('Event')+ ' ' + this.$t('updated successfully'))
                    this.initialize()
                }

            })
        },
        async putData1() {
            const forSimpan = {
                lokasi: this.form.lokasi
            }
            await this.$apiPlatform.put('moderator/events/'+this.id+'/', forSimpan).then(res => {
                console.log(res)

                if (this.imgThumbnail.file !== null) {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.$toast.show(this.$t('Event')+ ' ' + this.$t('updated successfully'))
                    this.initialize()
                }

            })
        },


         async uploadImage(image, untuk, name) {

            console.log('image', image)
            console.log('untuk', untuk)
            console.log('name', name)


            console.log('upload image')
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/events/'+this.id+'/', data).then(res => {
                    this.$toast.show(this.$t('Event')+ ' ' + this.$t('updated successfully'))
                    this.initialize()
                }).catch(err => {
                    console.log(err)
                })
        },


    }
}
</script>