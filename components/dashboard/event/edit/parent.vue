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
                    </div>
                    
                    <hr class="border-warna-tujuh my-10">

                   <div class="mb-5">
                        <InputRadio 
                            v-model="form.typeRegistrasi"
                            :label="$t('Registration Type')"
                            :opsiRadio="opsiTipeRegistransi"
                            :name="prefixName+'typeRegistrasi'"
                            :orientasi="'horizontal'"
                            :required="true"
                            :key="'registrasitipe'+keyMaster"
                            :order="'id'"
                        />
                        </div>
                        <div>
                            <InputText 
                                v-model="form.urlRegistrasiEksternal"
                                :label="''"
                                :name="prefixName+'urlRegistrasiEksternal'"
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
                                v-model="form.email"
                                :label="'Surel'"
                                :placeholder="'Tulis di sini'"
                                :name="prefixName+'email'"
                            />
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <InputText 
                                v-model="form.kontak"
                                :label="'Kontak'"
                                :placeholder="'Tulis di sini'"
                                :name="prefixName+'kontak'"
                            />
                        </div>
                    </div>
                    <div class="text-xl text-warna-utama mb-1">{{ $t('Tipe Acara') }}</div>
                        <div class="mb-8">
                            <InputSelect 
                                v-model="tipeAcara"
                                :opsi="opsiTipeAcara"
                                :key="'tipeacara'+keyMaster"
                                :multilang="true"
                            />
                        </div>
                    <div v-if="[3,1].includes(tipeAcara)">
                        <div class="text-xl text-warna-utama mb-1">{{ $t('Lokasi Online') }}</div>
                        <div class="mb-8">
                            <FormLokasiOnline 
                                v-model="lokasiOnline"
                                :prefixName="prefixName"
                                v-if="loaderAll"
                                :key="'lokasionline'+keyMaster"
                            />
                        </div>
                    </div>

                    <div v-if="[2,1].includes(tipeAcara)">
                        <div class="text-xl text-warna-utama mb-1">{{ $t('Lokasi Offline') }}</div>
                        <DashboardEventEditLokasiOffline 
                            v-model="formLokasiOffline"
                            :prefixName="prefixName"
                            v-if="loaderAll"
                            :key="'lokasi'+keyMaster"
                        />

                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="my-10">
                        <InputGalleries 
                            v-model="daftarGalleri"
                        />
                    </div>
                    <!-- <InputTestimony 
                        v-model="testimony"
                        v-if="form.progress === 'completed'"
                    /> -->
                    <InputFieldTestimony 
                        v-model="testimony"
                    />
<!-- {{ testimony }} -->
                </div>
                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="">
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
                            <div class="flex items-center text-sm text-warna-sembilan mt-10">
                                <div class="">{{ $t('Event Status') }}: </div>
                                <div class="ml-1">{{ $t('event-'+form.progress) | capitalize({ onlyFirstLetter: true }) }}</div>
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
                    <div class="mb-6">
                        <InputFieldKategoriMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'typeAudience'"
                            :label="$t('Audience Type')"
                            :key="keyMaster+'typeAudience'"
                            :multilang="true"
                            :kategori="'typeAudience'"
                            :required="true"
                        />
                    </div>
                    <div class="mb-6">
                        <InputFieldKategoriMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'typeApproach'"
                            :label="$t('Approach')"
                            :key="keyMaster+'typeApproach'"
                            :multilang="true"
                            :kategori="'typeApproach'"
                            :required="true"
                        />
                    </div>
                    <div class="mb-6">
                        <InputFieldKategoriMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'typeIssues'"
                            :label="$t('Issues')"
                            :key="keyMaster+'typeIssues'"
                            :multilang="true"
                            :kategori="'typeIssues'"
                            :required="true"
                        />
                    </div>

                    <div  class="mb-6">
                        <InputFieldTag
                            v-model="formTag"
                            :name="prefixName+'tag'"
                            :label="$t('Tag')"
                            :itemValue="'id'"
                            :itemLabel="'nama'"
                            :multilang="true"
                            :addNew="true"
                            :key="'keytag'+keyMaster"
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
        <div class="ah">
            <DashboardChildSimpanTag 
                v-model="saving.tag"
                :tag="formTag"
                :model="'event'"
                :modelId="id"
                v-if="saving.statusTag"
            />
            <DashboardChildSimpanGalleri 
                v-model="saving.galleri"
                :model="'event'"
                :modelId="id"
                :galleri="daftarGalleri"
                v-if="saving.statusGalleri"
            />
            <DashboardChildSimpanLokasiOnline 
                v-model="saving.lokasiOnline"
                :lokasiOnline="lokasiOnline"
                :modelId="id"
                v-if="saving.statusLokasiOnline"
            />

            <DashboardChildSimpanLokasiOffline
                v-model="saving.lokasiOffline" 
                :lokasi="formLokasiOffline"
                :model="'event'"
                :modelId="id"
                v-if="saving.statusLokasiOffline"
            />
            <DashboardChildSimpanContentSection 
                v-model="saving.deskripsi"
                :model="'event'"
                :modelId="id"
                :deskripsi="deskripsi"
                v-if="saving.statusDeskripsi"
            />
            <DashboardChildSimpanTestimony 
                v-model="saving.testimony"
                :model="'event'"
                :modelId="id"
                :testimony="testimony"
                v-if="saving.testimony"
            />


        </div>

        <!-- <button @click="savingLokasiOffline">simpan lokasi</button>
        <button @click="savingGallery">simpan galleri</button> -->

        <!-- <pre>{{formLokasiOffline}}</pre> -->

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
                email: '',
                kontak: '',
                urlRegistrasiEksternal: ''
                
            },
            dataDetail: null,
            deskripsi: {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },
            testimony: {
                list: [],
                deleted: [],
                new: [],
                updated: []
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
            daftarGalleri: {
                list: [],
                deleted: []
            },
            totalBookmark: 0,
            listIndividu: null,
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
            formTag: {
                list: [],
                deleted: [],
                api: []
            },
            formLokasiOffline: null,

            saving: {
                tag: '',
                statusTag: false,
                galleri: '',
                statusGalleri: false,
                lokasiOffline: '',
                statusLokasiOffline: false,
                deskripsi: '',
                statusDeskripsi: false,
                lokasiOnline: '',
                statusLokasiOnline: false,
                testimony: '',
                statusTestimony:false
            },

            checkSaving: {
                root: false,
                thumbnail: false,
                galleri: false,
                deskripsi: false,
                testimony: false
            }


        }
    },
    computed: {

        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        title() {
            return this.$t('Events')
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
        // tipeAcara(val) {
        //     if (val === 2) {
        //         this.form.lokasiOnline = [];
        //         this.form.lokasi = [_.cloneDeep(this.lokasi)]
        //     } else if (val === 3) {
        //         this.form.lokasi = []
        //         this.form.lokasiOnline = [_.cloneDeep(this.lokasiOnline)]
        //     }
        // },

        'saving.galleri' (val) {
            console.log('savegal', val)
            if (val==='done') this.checkSaving.galleri = true
        },
        'saving.deskripsi' (val) {
            if (val==='done') this.checkSaving.deskripsi = true
        },
        checkSaving: {
            handler(val) {
                // console.log('cheksaving',val)
                if (
                    val.root === true && 
                    val.thumbnail === true && 
                    val.galleri === true && 
                    val.deskripsi === true &&
                    val.testimony === true
                    ) 
                {
                     this.$toast.show(this.$t('Event')+ ' ' + this.$t('updated successfully'))
                     this.initialize()
                }

            },
            deep: true
        }

    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.btnText = 'Save'

            this.saving = {
                tag: '',
                statusTag: false,
                galleri: '',
                statusGalleri: false,
                lokasiOffline: '',
                statusLokasiOffline: '',
                deskripsi: '',
                statusDeskripsi: false,
                testimony: '',
                statusTestimony: false
            },

            this.checkSaving= {
                root: false,
                thumbnail: false,
                galleri: false,
                deskripsi: false,
                testimony: false
            }


            this.loaderAll = false
            this.masterPoint()
        },

        async masterPoint() {

            await this.$apiPlatform.get('moderator/events/'+this.id+'/').then(res => {
                var data = res.data
                this.dataDetail = _.cloneDeep(data)
                this.form = {
                    submission: data.submission,
                    progress: data.progress,
                    judulActivity: data.judulActivity,
                    // deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    statusActivity: data.statusActivity,
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    registrationStartDate: data.registrationStartDate ? data.registrationStartDate : '',
                    registrationEndDate: data.registrationEndDate ? data.registrationEndDate: '',

                    typeRegistrasi: data.typeRegistrasi ? data.typeRegistrasi : '',
                    email: data.email ? data.email : '',
                    kontak: data.kontak ? data.kontak : '',
                    urlRegistrasiEksternal: data.urlRegistrasiEksternal



                },

                this.daftarGalleri.list = data.galleries
                this.formTag.api = data.tag
                // this.formLokasiOffline.api = data.lokasi ? data.lokasi : []
                this.formLokasiOffline = data.lokasi && data.lokasi.length > 0 ? data.lokasi[0] : this.lokasi
                this.testimony.list = data.testimoniNonUser
                this.lokasiOnline = data.lokasiOnline && data.lokasiOnline.length > 0 ? data.lokasiOnline[0] : {typeChannel:0, url: ''}
                if (data.lokasi.length > 0 && data.lokasiOnline.length > 0) {
                    this.tipeAcara = 1
                } else if (data.lokasi.length > 0 && data.lokasiOnline.length === 0 ) {
                    this.tipeAcara = 2
                } else {
                    this.tipeAcara = 3
                }




                this.deskripsi.list = data.deskripsi
                
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
            }).catch(error => {
                this.$toast.show('Error dari sisi server')
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
        scroll(kelas) {
            this.$scrollTo(kelas, 250, {easing: 'ease-in-out', offset: -80})
        },
        btnBack() {
            this.$router.push('/moderations/event/'+this.id)
        },
        simpan() {
            //validasi disini
            this.form.judulActivity[0] = this.form.judulActivity[0] === '' ? 'N/A' : this.form.judulActivity[0]
            this.form.judulActivity[1] = this.form.judulActivity[1] === '' ? 'N/A' : this.form.judulActivity[1]

            if (this.form.typeRegistrasi === '') {
                this.errorField(this.$t('typeRegistrasiBlank'), 'typeRegistrasi1')

            } else if (this.form.typeAudience.length === 0) {
                this.errorField(this.$t('typeAudienceBlank'), 'typeAudience')
            } else if (this.form.typeApproach.length === 0) {
                this.errorField(this.$t('typeApproachBlank'), 'typeApproach')
            } else if (this.form.typeIssues.length === 0) {
                this.errorField(this.$t('typeIssuesBlank'), 'typeIssues')
            } else {
                this.putData()
            }


            
        },
        async putData() {
            this.btnText = 'Updating'
            const forSimpan = _.cloneDeep(this.form)
            forSimpan.registrationStartDate = new Date(forSimpan.registrationStartDate)
            forSimpan.registrationEndDate = new Date(forSimpan.registrationEndDate)
            forSimpan.tanggalMulai = new Date(forSimpan.tanggalMulai)
            forSimpan.tanggalSelesai = new Date(forSimpan.tanggalSelesai)
            forSimpan.statusActivity = forSimpan.statusActivity.id

            await this.$apiPlatform.put('moderator/events/'+this.id+'/', forSimpan).then(res => {
                // console.log(res)
                this.checkSaving.root = true

                if (this.imgThumbnail.status == 'belumUpload') {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.checkSaving.thumbnail = true
                } 

                //simpan child
                if (this.tipeAcara === 1) {
                    this.saving.statusLokasiOffline = true
                    this.saving.statusLokasiOnline = true
                } else if (this.tipeAcara === 2) {
                    this.saving.statusLokasiOffline = true
                    //delete semua online
                    this.deleteAllLokasiOnline()

                } else if (this.tipeAcara === 3) {
                    this.saving.statusLokasiOnline = true
                    //delete semua offline
                    this.deleteAllLokasiOffline()

                }

                this.saving.statusDeskripsi = true
                this.saving.statusGalleri = true
                this.saving.statusTestimony = true
                this.saving.statusTag = true


                //handling error endpoint dulu
                // this.checkSaving.deskripsi = true //supaya gak error aja
                // this.checkSaving.galleri = true




            }).catch(error => {
                this.$toast.show('Error dari sisi server')
            })
        },


         async uploadImage(image, untuk, name) {
                // console.log('upload thumbnail')
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/events/'+this.id+'/', data).then(res => {
                    this.checkSaving.thumbnail = true
                }).catch(err => {
                    console.log(err)
                })
        },
        deleteAllLokasiOnline() {
            if (this.dataDetail.lokasiOnline.filter(e => e.pkLokasiOnlineId && e.pkLokasiOnlineId !=='').length > 0) {
                this.dataDetail.lokasiOnline.forEach(e => {
                    this.deleteLokasiOnline(e.pkLokasiOnlineId)
                })
            }
        },
        async deleteLokasiOnline(id) {
            await this.$apiPlatform.delete('moderator/eventslokasionline/'+id+'/')
        },
        deleteAllLokasiOffline() {
            if (this.dataDetail.lokasi.filter(e => e.pkLokasiActivityId && e.pkLokasiActivityId !=='').length > 0) {
                this.dataDetail.lokasi.forEach(e => {
                    this.deleteLokasiOffline(e.pkLokasiActivityId)
                })
            }
        },
        async deleteLokasiOffline(id) {
            await this.$apiPlatform.delete('moderator/eventslokasi/'+id+'/')
        }
 



    }
}
</script>