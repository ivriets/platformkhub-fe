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
                            placeholder="Tulis disini"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[0].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[1].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div>
                        <InputImageUploadSingle 
                            :label="$t('gambarUtama')"
                            v-model="imgMainImage"
                            :accept="'.png, .jpg, .jpeg'"
                            :maxSize="1"
                            :useCrop="true"
                            :cropRatio="4/3"
                            v-if="imageLoader"
                            :key="'imgmainimage'+imageKey"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">Content</div>                       
                        <InputContentSection 
                            v-if="form.deskripsi"
                            v-model="form.deskripsi"
                            :list="form.deskripsi"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                    
                    <div class="mb-10">
                        <div class="text-xl text-warna-utama mb-[28px]">Date & Location</div>
                        <div class="grid grid-cols-12 gap-4">
                            <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalMulai"
                                    :value="form.tanggalMulai"
                                    :label="'Start Date'"
                                    :name="prefixName+'tanggalmulai'"
                                    :key="'tglmulai'+keyTanggal"
                                />
                            </div>
                             <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalSelesai"
                                    :value="form.tanggalSelesai"
                                    :label="'End Date'"
                                    :name="prefixName+'tanggalselesai'"
                                    :key="'tglselesai'+keyTanggal"
                                    :disabledBefore="disBefore"
                                    :disabledDate="disDate"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <DashboardProgramEditLokasi 
                            v-model="form.lokasi"
                            :prefixName="prefixName"
                            :key="'eyfda'+keyMaster"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <InputGalleries 
                            v-model="daftarGalleri"
                        />

                    <hr class="border-warna-tujuh my-10">

                    <InputTestimony 
                        v-model="form.testimoniNonUser"
                        :prefixName="prefixName"
                    />

                    <hr class="border-warna-tujuh my-10">
                    <div class="">
                        <DashboardProgramEditMilestone 
                            v-model="form.fase"
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
                        v-if="activityResult"
                    />
                    <hr class="border-warna-tujuh my-10">


                </div>



                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="mb-6">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <div class="text-approved-accepted ml-1">
                                    <span>{{ originalResult.statusActivity.nama[bahasa] }}</span>
                                </div>
                            </div>
                            <div class="flex items-center text-sm text-warna-sembilan">
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">{{totalBookmark}}</div>
                            </div>
                        </div>
                        <div class="bg-warna-empat text-white rounded-lg py-4 text-center mx-0 cursor-pointer hover:bg-blue-900">Submit</div>
                    </div>

                    <div class="">
                        <!-- <div class="font-medium">Thumbnail</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>jpg or png no larger than 25MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Pilih File</div>
                        </div> -->
                        <InputImageUploadSingle 
                            :label="'Thumbnail'"
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
                        <!-- <InputAutocompleteMulti 
                            v-model="form.officer"
                            :name="prefixName+'officer'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Officer')"
                            :opsi="listIndividu"
                            :itemValue="'userId'"
                            :itemLabel="'namaIndividu'"
                            :multilang="false"
                        /> -->

                        <InputAutocompleteApiMulti 
                            v-model="form.officer"
                            :name="prefixName+'partner'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Officer')"
                            :endPoint="'verificator/listIndividu/?limit=10&offset=0'"
                            :searchQuery="'title'"
                            :itemValue="'userId'"
                            :itemLabel="'namaIndividu'"
                            :key="'formoficer'+keyMaster"


                        />


                    </div>
                    <!-- {{listOrganisasi}} -->
                    <div v-if="listOrganisasi && form.partner" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.partner"
                            :name="prefixName+'partner'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Partner')"
                            :opsi="listOrganisasi"
                            :itemValue="'organisasiId'"
                            :itemLabel="'namaOrganisasi'"
                            :multilang="false"

                        />



                    </div>



                    <div v-if="typeAudience && form.typeAudience" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'tipeaudience'"
                            :placeholder="'Tulis disini'"
                            :label="'Tipe Audience'"
                            :opsi="typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :multilang="true"

                        />
                    </div>
                    <div v-if="typeApproach && form.typeApproach" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'tipeapproach'"
                            :placeholder="'Tulis disini'"
                            :label="'Tipe Approach'"
                            :opsi="typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :multilang="true"

                        />
                    </div>
                    <div v-if="typeIssues && form.typeIssues" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'topik'"
                            :placeholder="'Tulis disini'"
                            :label="'Topik'"
                            :opsi="typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
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
                            :multilang="true"

                        />
                    </div>
                    <!-- {{form.tag}} -->
                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div @click="simpan" class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>



        <pre>{{ form }}</pre>
    </div>
</template>


<script>
export default {
    data() {
        return {
            keyMaster: 0,
            keyTanggal: 0,
            disBefore: false,
            disDate: '',
            loaderMaster: false,

            // MODAL TESTIMONI
            modalAction: false,
            modalTitle: 'Testimoni',
            modalWidth: '',
            keyModal:0,
            persistent: true,
            // kenapa gak dibuat object aja

            //





            formEntry: {
                milestone: {
                    status: 0,
                    judul: ['', '']
                },
                journey: {
                    judul: ['', ''],
                    deskripsi: ['', ''],
                    image: ''
                }
            },
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

            opsiProvinsi: [],
            opsiKota: [],
            opsiStatusMilestone: [
                {
                    id: 1,
                    label: ['Selesai', 'Completed']
                },
                {
                    id: 2,
                    label: ['Belum Selesai', 'Incompleted']
                }
            ],


            prefixName: 'program',
            maxTitle: 80,
            tableLokasiProgram: null,
            activityResult: undefined,
            dataTable: [
                {
                    pkLokasiActivityId: "LyFYfUVW",
                    provinsi: "DKI Jakarta",
                    kota: "Jakarta Pusat",
                    jalan: "jalan sudirman no 80",
                    pinLocation: "VW25+RP",
                    systemRowId: "sFlsjzvO"
                },
                {
                    pkLokasiActivityId: "LyFYfUVW",
                    provinsi: "Jawa Barat",
                    kota: "Bandung",
                    jalan: "Jalan Oto Iskandar Dinata no 15",
                    pinLocation: "VW25+RP",
                    systemRowId: "sFlsjzvO"
                }
            ],
            form: {
                judulActivity: ['',''],
                // deskripsiPanjang: ['',''],
                deskripsi:undefined,
                tanggalMulai: '',
                tanggalSelesai: '',
                officer:undefined,
                partner:undefined,
                typeAudience: undefined,
                typeApproach: undefined,
                typeIssues: undefined,
                tag: undefined,
                tambahTestimony:[],
                namaTestimony:[],
                retentionSaatProgramMen:'',
            },
            opsiTag: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            officer: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            partner: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            tableMilestone: null,
            tableJourney: null,
            daftarGalleri: [],
            daftarJourney: [],
            totalBookmark: 0,
            listIndividu: undefined,
            listOrganisasi: undefined,
            listTag: undefined, 
            daftarReport: [],
            originalResult: {
                statusActivity: {
                    nama: ['','']
                }
            }
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
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loaderMaster = false;
            this.imageLoader = false;
            // this.setBreadcrumb()

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


            // await this.$apiPlatform.get('verificator/listIndividu/?limit=10&offset=0').then(res => {
            //     this.listIndividu = res.data
            // }).catch(err => {
            //     console.log(err)
            // })


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


            await this.$apiPlatform.get('moderator/programs/'+this.id+'/').then(res => {
                var data = res.data
                this.originalResult = data
                // console.log(data)
                this.form = {
                    judulActivity: data.judulActivity,
                    deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    officer: data.officer.map(e=> e.userId),
                    partner: _.map(data.partnerActivityInternal, function(o){return o.partner}),
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tag: _.flatMap(_.map(data.tag, function(o){return o.pilihanTagId}), "id"),
                    lokasi:data.lokasi,
                    retentionSaatProgramMen:'',
                    fase: data.fase,
                    // journey : data.journey,
                    testimoniNonUser: data.testimoniNonUser
                }
                this.imgMainImage.displayImage = data.imgMainImage;
                this.imgThumbnail.displayImage = data.imgThumbnail
                this.daftarGalleri = data.galleries ? data.galleries : []
                this.daftarReport = data.files ? data.files : [];
                this.daftarJourney = data.journey ? data.journey : [];
                this.activityResult = data.activityResult[0]
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
            console.log(this.form)
        },


        btnBack() {
            this.$router.push('/moderations/program/'+this.id)
        },

        // btnAddTestimony() {
        //     this.modalAction = true
        //     this.keyModal += 1
        // },

        // btnAddLokasi() {
        //     this.modalActionLokasi = true
        //     this.keyModalLokasi += 1
        // },

        // btnAddMilestone() {
        //     this.modalActionMilestone = true
        //     this.keyModalMilestone += 1
        // },

        // btnAddReport() {
        //     this.modalActionReport = true
        //     this.keyModalReport += 1
        // },

        // btnAddJourney() {
        //     this.modalActionJourney = true
        //     this.keyModalJourney += 1
        // },
    }
}
</script>