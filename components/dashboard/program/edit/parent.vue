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

                    <div class="">
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
                        <div class="grid grid-cols-12 gap-2">
                            <div class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                                <InputDate
                                    v-model="form.tanggalMulai"
                                    placeholder="Tulis disini"
                                    :label="'Start Date'"
                                    :name="prefixName+'tanggalmulai'"
                                />
                            </div>
                             <div class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
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
                        <div class="font-medium text-warna-utama mb-1">Location</div>
                        
                        
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
                        <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                        </div>
                        <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                        </div>
                        <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                        </div>
                        <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" src="/images/logo.png" alt="main-image">
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow text-xl mb-1">Testimony</div>
                            <div @click="btnAddTestimony" class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Testimony</div>
                        </div>
                        <div class="text-xs text-warna-delapan mb-3">Choose Testimony</div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    
                    <div class="">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow text-xl mb-1">Milestone</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Milestone</div>
                        </div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow text-xl mb-1">Report</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Report</div>
                        </div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow text-xl mb-1">Journey</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Journey</div>
                        </div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <div class="">
                        <div class="text-xl mb-1">Impact</div>
                        
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow font-semibold mb-1">Baseline-Endline Survey</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add</div>
                        </div>
                        
                        <div class="flex flex-grow font-semibold mb-1">Retention</div>

                        <InputText 
                            v-model="form.judulActivity[0]"
                            placeholder="Tulis disini"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                        />


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
                        <div class="bg-warna-empat text-white rounded-lg w-[240px] py-4 text-center mx-auto cursor-pointer hover:bg-blue-900">Submit</div>
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
            childBreadcrumb: [],
            form: {
                judulActivity: ['',''],
                deskripsiPanjang: ['',''],
                tanggalMulai: [],
                tanggalSelesai: [],
                officer:[],
                partner:[],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: [],
                tambahTestimony:[],
                namaTestimony:[],
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
            ]
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

        masterPoint() {
            this.setBreadcrumb()
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

        btnAddTestimony() {
            this.modalAction = true
            this.keyModal += 1
        },
    }
}
</script>