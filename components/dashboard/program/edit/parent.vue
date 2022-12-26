<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Program'"
                :linkParent="'/moderations/programrogram'"
                :child="childBreadcrumb"
            />
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
                        />
                        <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[0].length}}/{{maxTitle}}</div>
                    </div>

                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                        />
                        <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[1].length}}/{{maxTitle}}</div>
                    </div>

                    <div class="">
                        <div class="font-medium mb-1">Main Image</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>200 x 150px</div>
                                <div>JPG, GIF, PNG no larger than 1 MB</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">Content</div>
                        <div class="mb-6">
                            <InputTextArea 
                                v-model="form.deskripsiPanjang[0]"
                                :max="2000"
                                placeholder="Tulis disini"
                                :label="'Content (English)'"
                                :name="prefixName+'deskripsiid'"
                            />
                        </div>
                        <div>
                            <InputTextArea 
                                v-model="form.deskripsiPanjang[1]"
                                :max="2000"
                                placeholder="Tulis disini"
                                :label="'Content (Indonesia)'"
                                :name="prefixName+'deskripsien'"
                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">
                    
                    <div class="mb-10">
                        <div class="text-xl text-warna-utama mb-[28px]">Date & Location</div>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalMulai"
                                    placeholder="Tulis disini"
                                    :label="'Start Date'"
                                    :name="prefixName+'tanggalmulai'"
                                />
                            </div>
                             <div class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalSelesai"
                                    placeholder="Tulis disini"
                                    :label="'End Date'"
                                    :name="prefixName+'tanggalselesai'"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <div class="">Location</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Location</div>
                        </div>
                        <div class="text-xs text-warna-delapan mb-4">Choose Active Location</div>
                        <div>
                            <ElementsTableWithSelect 
                                v-model="tableLokasiProgram"
                                :dataTable="dataTable"
                                :title="'Lokasi'"
                            >

                            </ElementsTableWithSelect>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="mb-10">
                        <div class="text-xl mb-1">Gallery</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>You can choose multiple images.</div>
                                <div>JPG, GIF, PNG no larger than 1 MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                        </div>
                    </div>


                    <div class="flex items-center lg:gap-4 gap-2">
                        <div class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
                        </div>
                        <div class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
                        </div>
                        <div class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
                        </div>
                        <div class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-xl">Testimony</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                             <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div @click="btnAddTestimony" class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Testimony</div>
                            </div>
                        </div>
                        <div class="text-xs text-warna-delapan mb-4">Choose Testimony</div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    
                    <div class="">
                        <div class="flex items-center justify-between mb-4">
                            <div class=" text-xl mb-1">Milestone</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Milestone</div>
                            </div>
                        </div>
                        <div class="">
                            <ElementsTableWithoutHeader 
                                v-model="tableMilestone"
                                :dataTable="dataTableMilestone"
                                :title="'Milestone'"
                                :untuk="'faseprogram'"
                            >
                            </ElementsTableWithoutHeader>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-xl">Report</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Report</div>
                            </div>
                        </div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="mb-10">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-xl text-warna-utama">Journey</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Journey</div>
                            </div>
                        </div>
                        <div class="">
                            <ElementsTableWithoutHeader 
                                v-model="tableJourney"
                                :dataTable="dataTableJourney"
                                :title="'Journey'"
                                :untuk="'journeyprogram'"
                            >
                            </ElementsTableWithoutHeader>
                        </div>
                    </div>

                    <div class="text-xl mb-8 text-warna-utama">Impact</div>

                    <div class="mb-10">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow font-semibold mb-1">Baseline-Endline Survey</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add</div>
                            </div>
                        </div>

                        <div class="flex flex-grow font-semibold mb-1">Variable Pengukuran</div>                        

                    </div>


                    <div class="">
                        <div class="flex flex-grow font-semibold mb-1 text-warna-utama">Retention</div>
                        
                            <div class="grid grid-cols-12 gap-5">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="my-6 text-warna-utama font-semibold">During the Program</div>
                                    <div class="max-w-[250px]">
                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="form.retentionSaatProgramMen"
                                                :name="prefixName+'retentionsaatprogrammen'"
                                                :label="'Men'"
                                                :step=0.1
                                            />
                                        </div>

                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="form.retentionSaatProgramWomen"
                                                :name="prefixName+'retentionsaatprogramwomen'"
                                                :label="'Women'"
                                                :step=1
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-span-12 lg:col-span-6">
                                    <div class="my-6 text-warna-utama font-semibold">Post-Program</div>
                                    <div class="max-w-[250px]">
                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="form.retentionPostProgramMen"
                                                :name="prefixName+'retentionpascaprogrammen'"
                                                :label="'Men'"
                                                :step=1
                                            />
                                        </div>

                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="form.retentionPostProgramWomen"
                                                :name="prefixName+'retentionpasceprogramwomen'"
                                                :label="'Women'"
                                                :step=1
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="font-semibold mb-1 text-warna-utama">Satisfaction</div>
                    </div>



                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="font-semibold mb-1 text-warna-utama">Customer Acquisition Score (CAC)</div>
                    </div>

                </div>



                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="mb-6">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <div class="text-approved-accepted ml-1">Approved</div>
                            </div>
                            <div class="flex items-center text-sm text-warna-sembilan">
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">3123</div>
                            </div>
                        </div>
                        <div class="bg-warna-empat text-white rounded-lg py-4 text-center mx-0 cursor-pointer hover:bg-blue-900">Submit</div>
                    </div>

                    <div class="">
                        <div class="font-medium">Thumbnail</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>jpg or png no larger than 25MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Pilih File</div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.officer"
                            :name="prefixName+'officer'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Officer')"
                            :opsi="officer"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'officer'"
                        />
                    </div>

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.partner"
                            :name="prefixName+'partner'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Partner')"
                            :opsi="partner"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'partner'"
                        />
                    </div>

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'tipeaudience'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Audience Type')"
                            :opsi="typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tipeaudience'"
                        />
                    </div>

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'tipeapproach'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Approach')"
                            :opsi="typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tipeapproach'"
                        />
                    </div>

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'topik'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Topic')"
                            :opsi="typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'topik'"
                        />
                    </div>

                    <div class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.tag"
                            :name="prefixName+'tag'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Tag')"
                            :opsi="opsiTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tag'"
                        />
                    </div>

                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>

        <pre>{{form}}</pre>

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'tambahTestimony'"
            :persistent="persistent"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="font-medium mb-1">Foto Profil</div>
                    <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>200 x 200px</div>
                            <div>JPG or PNG no larger than 1 MB.</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                    </div>

                    <InputText 
                        v-model="form.namatestimony"
                        placeholder="Tulis disini"
                        :name="prefixName+'namatestimony'"
                        :label="'Nama'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.tambahTestimony"
                        placeholder="Tulis testimony"
                        :name="prefixName+'tambahTestimony'"
                        :label="'Testimony'"
                    />
                </div>

                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Add Testimony</div>
                </div>
            </div>
        </ElementsModal>
    </div>
</template>


<script>
export default {
    data() {
        return {
            modalAction: false,
            modalTitle: 'Add Testimony',
            modalWidth: '',
            keyModal:0,
            persistent: true,
            prefixName: 'program',
            maxTitle: 80,
            tableLokasiProgram: null,
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
            childBreadcrumb: [],
            form: {
                judulActivity: ['',''],
                deskripsiPanjang: ['',''],
                tanggalMulai: '',
                tanggalSelesai: '',
                officer:[],
                partner:[],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: [],
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
            dataTableMilestone: [
                {
                    faseId: "bGLmvyZq",
                    nomorUrut: 0,
                    deskripsi: [
                        "Selesai mendaki Gunung Semeru",
                        "Finished climbing Mount Semeru"
                    ],
                    resources: null,
                    binFaseFile: "",
                    isDone: false,
                    systemRowId: "HVLdKEjv"
                },
                {
                    faseId: "bGLmvyZq",
                    nomorUrut: 0,
                    deskripsi: [
                        "Selesai mendaki Gunung Gede",
                        "Finished climbing Mount Gede"
                    ],
                    resources: null,
                    binFaseFile: "",
                    isDone: true,
                    systemRowId: "HVLdKEjv"
                }
            ],
            tableJourney: null,
            dataTableJourney: [
                {
                    pkJourneyId: "rPPrSiYK",
                    nomorUrut: 0,
                    judulJourney: [
                        "Wawancara lapangan",
                        "N/A"
                    ],
                    deskripsi: [
                        "Melakukan wawancara lapangan untuk mendapat data dan informasi terkait penelitian Kondisi Kebebasan Beragama/Berkeyakinan.",
                        "N/A"
                    ],
                    imgThumbnailJourney: "/assets/placeholder/journey.jpg",
                    systemRowId: "taHstkFN"
                },
                {
                    pkJourneyId: "rPPrSiYK",
                    nomorUrut: 0,
                    judulJourney: [
                        "Wawancara lapangan",
                        "N/A"
                    ],
                    deskripsi: [
                        "Melakukan wawancara lapangan untuk mendapat data dan informasi terkait penelitian Kondisi Kebebasan Beragama/Berkeyakinan.",
                        "N/A"
                    ],
                    imgThumbnailJourney: "/assets/placeholder/journey.jpg",
                    systemRowId: "taHstkFN"
                },
            ],
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
            this.setBreadcrumb()
            await this.$apiPlatform.get('moderator/programs/'+this.id+'/').then(res => {
                var data = res.data
                this.form = {
                    judulActivity: data.judulActivity,
                    deskripsiPanjang: data.deskripsiPanjang,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    officer:data.tanggalSelesai,
                    partner:data.tanggalSelesai,
                    typeAudience: data.typeAudience,
                    typeApproach: data.typeApproach,
                    typeIssues: data.typeIssues,
                    tag: data.tag,
                    tambahTestimony:[],
                    namaTestimony:[],
                    retentionSaatProgramMen:'',
                }
            })

        },

        setBreadcrumb() {
            this.childBreadcrumb = [
                {
                    label: 'Detail',
                    link: '/moderations/program/'+this.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
        },

        btnBack() {
            this.$router.push('/moderations/program/'+this.id)
        },

        btnAddTestimony() {
            this.modalAction = true
            this.keyModal += 1
        },
    }
}
</script>