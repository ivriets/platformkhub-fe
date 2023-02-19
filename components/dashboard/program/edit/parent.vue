<template>
    <div v-if="form" class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Program'"
                :linkParent="'/moderations/program'"
                :child="childBreadcrumb"
                v-if="childBreadcrumb && childBreadcrumb.length > 0"
            />
            <!-- {{childBreadcrumb}} -->
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-9">
                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[0]"
                            :name="prefixName+'titleid'"
                            :label="$t('Title (Bahasa Indonesia)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[1]"
                            :name="prefixName+'titleen'"
                            :label="$t('Title (English)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <div>
                        <InputImageUploadSingle 
                            :label="$t('gambarUtama')"
                            v-model="imgMainImage"
                            :accept="'.png, .jpg, .jpeg'"
                            :maxSize="10"
                            :useCrop="true"
                            :cropRatio="4/3"
                            v-if="imageLoader"
                            :key="'imgmainimage'+imageKey"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Content') }}</div>                       
                        <InputContentSectionBaru
                            v-if="deskripsi"
                            v-model="deskripsi"
                            :key="'desk'+keyMaster"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                    
                    <div class="mb-10">
                        <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Date & Location') }}</div>
                        <div class="grid grid-cols-12 gap-4">
                            <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalMulai"
                                    :label="$t('Start Date')"
                                    :name="prefixName+'tanggalMulai'"
                                    :key="'tglmulai'+keyTanggal"
                                />
                            </div>
                             <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalSelesai"
                                    :label="$t('End Date')"
                                    :name="prefixName+'tanggalSelesai'"
                                    :key="'tglselesai'+keyTanggal"
                                    :disabledBefore="disBefore"
                                    :disabledDate="disDate"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <DashboardProgramEditLokasi 
                            v-model="lokasi"
                            :prefixName="prefixName"
                            :key="'eyfda'+keyMaster"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <InputGalleries 
                            v-model="daftarGalleri"
                        />

                    <hr class="border-warna-tujuh my-10">

                    <InputFieldTestimony 
                        v-model="testimony"
                        :prefixName="prefixName"
                    />
                    <hr class="border-warna-tujuh my-10">
                    <div class="">
                        <DashboardProgramEditMilestone 
                            v-model="fase"
                            :prefixName="prefixName"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <DashboardProgramEditReport
                            v-model="daftarReport"
                            :prefixName="prefixName"

                        />


                    <hr class="border-warna-tujuh my-10">

                    <div class="mb-10">
                        <DashboardProgramEditJourney 
                            v-model="daftarJourney"
                            :prefixName="prefixName"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-10">
                        <DashboardProgramEditActivityResult 
                            v-model="activityResult"
                            :prefixName="prefixName"
                            :key="'activityResult'+keyMaster"
                        />
                        <pre>
                          <!-- front:  {{ activityResult }} -->
                        </pre>
                    <hr class="border-warna-tujuh my-10">


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
                                <div class="ml-1">{{totalBookmark}}</div>
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
                            v-if="imageThumbnailLoader"
                            :key="'imgthumbnail'+imageThumbnailKey"
                        />


                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    

                    <div  class="mb-6">
                        <InputAutocompleteApiMulti 
                            v-model="form.officer"
                            :name="prefixName+'officer'"
                            :label="$t('Officer')"
                            :endPoint="'verificator/listIndividu/?limit=10&offset=0'"
                            :searchQuery="'title'"
                            :itemValue="'userId'"
                            :itemLabel="'namaIndividu'"
                            :key="'formoficer'+keyMaster"
                        />


                    </div>
                    <div  class="mb-6">
                        <!-- <InputAutocompleteApiMulti 
                            v-model="form.partner"
                            :name="prefixName+'partner'"
                            :label="$t('Partner')"
                            :endPoint="'verificator/katalogOrganisasi/?limit=10&offset=0'"
                            :searchQuery="'title'"
                            :itemValue="'organisasiId'"
                            :itemLabel="'namaOrganisasi'"
                            :keyRespon="'res.data.results'"
                            :key="'formorganisasi'+keyMaster"
                        /> -->

                        <InputAutocompleteApiMulti 
                            v-model="form.partner"
                            :name="prefixName+'partner'"
                            :label="$t('Partner')"
                            :endPoint="'verificator/listOrganisasiPartner/?limit=10&offset=0'"
                            :searchQuery="'title'"
                            :itemValue="'organisasiId'"
                            :itemLabel="'namaOrganisasi'"
                            :key="'formorganisasi'+keyMaster"
                            :keyRespon="'res.data.results'"
                        />

<!-- {{ form.partner }} -->
                    </div>
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

            <DashboardChildSimpanContentSection 
                v-model="saving.deskripsi"
                :model="'program'"
                :modelId="id"
                :deskripsi="deskripsi"
                v-if="saving.statusDeskripsi"
            />
            <DashboardChildSimpanGalleri 
                v-model="saving.galleri"
                :model="'program'"
                :modelId="id"
                :galleri="daftarGalleri"
                v-if="saving.statusGalleri"
            />
            <DashboardChildSimpanTag 
                v-model="saving.tag"
                :tag="formTag"
                :model="'program'"
                :modelId="id"
                v-if="saving.statusTag"
            />
            <DashboardChildSimpanProgramLokasi 
                v-model="saving.lokasi"
                :lokasi="lokasi"
                :model="'program'"
                :modelId="id"
                v-if="saving.statusLokasi"
            />
            <DashboardChildSimpanTestimony 
                v-model="saving.testimony"
                :model="'program'"
                :modelId="id"
                :testimony="testimony"
                v-if="saving.statusTestimony"
            />
            <DashboardChildSimpanProgramMilestone 
                v-model="saving.milestone"
                :model="'program'"
                :modelId="id"
                :fase="fase"
                v-if="saving.statusMilestone"
            />
            <DashboardChildSimpanProgramReport
                v-model="saving.report"
                :model="'program'"
                :modelId="id"
                :report="daftarReport"
                v-if="saving.statusReport"
            />
            <DashboardChildSimpanProgramJourney
                v-model="saving.journey"
                :model="'program'"
                :modelId="id"
                :journey="daftarJourney"
                v-if="saving.statusJourney"
            />
            <DashboardChildSimpanProgramActivityResult
                v-model="saving.activityResult"
                :model="'program'"
                :modelId="id"
                :activityResult="activityResult"
                v-if="saving.statusActivityResult"
            />

        </div>

        <!-- <pre>{{ deskripsi }}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            btnText: 'Save',
            keyMaster: 0,
            keyTanggal: 0,
            disBefore: false,
            disDate: '',
            loaderMaster: false,

            // MODAL TESTIMONI


            imgMainImage: {
                file: null,
                displayImage: ''
            },
            imageLoader: false,
            imageKey: 0,
            imgThumbnail: {
                file: null,
                displayImage: ''
            },
            imageThumbnailLoader: false,
            imageThumbnailKey: false,


            prefixName: 'program',
            maxTitle: 80,
            activityResult: null,
            deskripsi: {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },
            form: {
                judulActivity: ['',''],
                // deskripsiPanjang: ['',''],
                tanggalMulai: '',
                tanggalSelesai: '',
                officer:undefined,
                partner:undefined,
                typeAudience: undefined,
                typeApproach: undefined,
                typeIssues: undefined,
                tag: undefined,
                retentionSaatProgramMen:null,
                submission: 1
            },
            daftarReport: {
                list: [],
                deleted: []
            },
            daftarJourney: {
                list: [],
                deleted: []
            },
            daftarGalleri: {
                list: [],
                deleted: []
            },

            testimony: {
                list: [],
                deleted: [],
            },
            fase: {
                list: [],
                deleted: []
            },

            totalBookmark: 0,
            lokasi: {
                list: [],
                deleted: [],
            },
            formTag: {
                list: [],
                deleted: [],
                api: []
            },
            saving: {
                tag: '',
                statusTag: false,
                deskripsi: '',
                statusDeskripsi: false,
                lokasi: '',
                statusLokasi: false,
                galleri: '',
                statusGalleri: false,
                testimony: '',
                statusTestimony: false,
                milestone: '',
                statusMilestone: false,
                report: '',
                statusReport: false,
                journey: '',
                statusJourney: false,
                activityResult: '',
                statusActivityResult: false
            },

            checkSaving: {
                root: false,
                thumbnail: false,
                mainImage: false,
                deskripsi: false,
                lokasi: false,
                galleri: false,
                testimony: false,
                report: false,
                journey: false,
                activityResult: false
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
            return this.$t('Blog')
        },

        id() {
            return this.$route.params.id;
        },

        basePath() {
            return process.env.BASE_URL
        },
        childBreadcrumb() {
            const awal = [
                {
                    label: 'Detail',
                    link: '/moderations/program/'+this.$route.params.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ];
            return awal;
        }
    },
    watch: {
        'form.tanggalMulai'(val) {
            if (val !== '') {
                this.disBefore = true
                this.disDate = val
                this.keyTanggal +=1
            } else {
                this.disBefore = false
                this.disDate = ''
                this.keyTanggal +=1
            }
        },

        'saving.galleri' (val) {
            console.log('savegal', val)
            if (val==='done') this.checkSaving.galleri = true
        },
        'saving.deskripsi'(val) {
            if (val==='done') this.checkSaving.deskripsi = true
        },
        'saving.lokasi'(val) {
            if (val==='done') this.checkSaving.lokasi = true
        },
        'saving.testimony'(val) {
            if (val==='done') this.checkSaving.testimony = true
        },
        'saving.report'(val) {
            if (val==='done') this.checkSaving.report = true
        },
        'saving.journey'(val) {
            if (val==='done') this.checkSaving.journey = true
        },
        checkSaving: {
            handler(val) {
                console.log('cheksaving',val)
                if (
                    val.root === true 
                    && val.thumbnail === true 
                    && val.mainImage === true 
                    && val.deskripsi === true 
                    && val.lokasi === true
                    && val.galleri === true
                    && val.testimony === true
                    && val.report === true
                    && val.journey === true
                    ) 
                {
                     this.$toast.show(this.$t('Program')+ ' ' + this.$t('updateSukses'))
                    //  this.initialize()
                    this.btnBack()
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

            this.saving = {
                tag: '',
                statusTag: false,
                deskripsi: '',
                statusDeskripsi: false,
                lokasi: '',
                statusLokasi: false,
                galleri: '',
                statusGalleri: false,
                testimony: '',
                statusTestimony: false,
                milestone: '',
                statusMilestone: false,
                report: '',
                statusReport: false,
                journey: '',
                statusJourney: false,
                activityResult: '',
                statusActivityResult: false
                
            },

            this.checkSaving = {
                root: false,
                thumbnail: false,
                mainImage: false,
                deskripsi: false,
                lokasi:false,
                galleri: false,
                testimony: false,
                report: false,
                journey:  false,
                activityResult: false
            }

            this.btnText = 'Save'
            this.loaderMaster = false;
            this.imageLoader = false;
            // this.setBreadcrumb()

            this.imgThumbnail = {
                file: null,
                displayImage: ''
            }
            this.imgMainImage = {
                file: null,
                displayImage: ''
            }
            this.masterPoint()
        },

        async masterPoint() {

            await this.$apiPlatform.get('moderator/programs/'+this.id+'/').then(res => {
                var data = res.data
                this.originalResult = _.cloneDeep(data)
                // console.log(data)
                this.form = {
                    judulActivity: data.judulActivity,
                    // deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    officer: data.officer.map(e=> e.userId),
                    // partner: _.map(data.partnerActivityInternal, function(o){return o.partner}),
                    partner: data.partnerActivityInternal.map(e => e.partner.organisasiId),
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    // tag: _.flatMap(_.map(data.tag, function(o){return o.pilihanTagId}), "id"),
                    // lokasi:data.lokasi,
                    // retentionSaatProgramMen:data.retentionSaatProgramMen ? data.retentionSaatProgramMen : null,
                    typeActivity: _.flatMap(data.typeActivity, "id"),
                    // journey : data.journey,
                    // testimoniNonUser: data.testimoniNonUser,
                    submission: data.submission
                }

                this.deskripsi.list = data.deskripsi.map(e => {
                    e.tipe = !e.txtDeskripsiId && !e.imgDeskripsiId ? 'new': ''
                    return e;
                })
                this.lokasi = {
                    list: data.lokasi,
                    deleted: []
                }
                this.testimony = {
                    list:  data.testimoniNonUser,
                    deleted: []
                }
                this.fase = {
                    list: data.fase,
                    deleted: []
                }
                this.daftarReport = {
                    list: data.files,
                    deleted: []
                }
                this.daftarJourney = {
                    list: data.journey,
                    deleted: []
                }

                this.formTag.api = data.tag
                this.imgMainImage.displayImage = data.imgMainImage;
                this.imgThumbnail.displayImage = data.imgThumbnail
                 this.deskripsi.list = data.deskripsi.map(e => {
                    e.tipe = !e.txtDeskripsiId && !e.imgDeskripsiId ? 'new': ''
                    return e;
                })

                // this.activityResult = data.activityResult && data.activityResult.length > 0 ? data.activityResult[0] : null 
                this.activityResult = data.activityResult 
                this.totalBookmark = data.totalBookmark
                this.$nextTick(() => {
                    this.imageLoader = true;
                    this.imageThumbnailLoader = true
                    this.loaderMaster = true;
                    this.imageKey +=1
                    this.keyTanggal +=1
                    this.keyMaster +=1
                    this.imageThumbnailKey +=1
                })
            })

        },
        simpan() {
            //validasi disini
            this.submitToApi()
        },
        async submitToApi() {
            this.btnText = 'Updating'
            // const forSimpan = _.cloneDeep(this.form)
            console.log(this.form)
            const forSimpan = {
                judulActivity: this.form.judulActivity,
                tanggalMulai: new Date(this.form.tanggalMulai),
                tanggalSelesai: new Date(this.form.tanggalSelesai),
                cancelReason: null,
                archieved: [],
                typeActivity: this.form.typeActivity, 
                statusActivity: 1,
                typeAudience: this.form.typeAudience,
                typeApproach: this.form.typeApproach,
                typeIssues: this.form.typeIssues,
                retentionSaatProgramMen: 30,
                officer: this.form.officer,
                partnerActivityInternal: [],

            }

            await this.$apiPlatform.put('moderator/programs/'+this.id+'/', forSimpan).then(res => {
                console.log(res.data)
                // this.updateChild()
                this.checkSaving.root = true
                if (this.imgMainImage.file !== null) {
                    this.uploadImage(this.imgMainImage.file, "imgMainImage", this.imgMainImage.name)
                } else {
                    this.checkSaving.mainImage = true
                }

                if (this.imgThumbnail.file !== null) {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.checkSaving.thumbnail = true
                }

                //saving child
                this.saving.statusActivityResult = true

                this.saving.statusMilestone = true
                this.saving.statusReport = true
                this.saving.statusGalleri = true
                this.saving.statusJourney = true
                this.saving.statusDeskripsi = true
                this.saving.statusTag = true
                this.saving.statusLokasi = true
                this.saving.statusTestimony = true



                
                //supaya tidak error yg endpointnya butut
                // this.checkSaving.deskripsi = true


            })
        },
         async uploadImage(image, untuk, name) {

            // if (image instanceof Blob){
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/programs/'+this.id+'/', data).then(res => {
                    if (untuk==='imgMainImage') {
                        this.checkSaving.mainImage = true
                    } else if (untuk==='imgThumbnail') {
                        this.checkSaving.thumbnail = true
                    }


                    // this.btnText = 'Save'

                    // this.$toast.show(this.$t('Program')+ ' ' + this.$t('updated successfully'))
                    // this.initialize()
                }).catch(err => {
                    console.log(err)
                })
            // }
        },
        btnBack() {
            this.$router.push('/moderations/program/'+this.id)
        },



    }
}
</script>