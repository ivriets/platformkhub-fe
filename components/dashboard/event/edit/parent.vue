<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Events'"
                :linkParent="'/moderations/eventent'"
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
                    
                    <hr class="border-warna-tujuh my-10">

                    <div class="text-warna-utama mb-[28px]">Registration Type</div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">Registration Date</div>
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputDate
                                v-model="form.tanggalMulai"
                                placeholder="Tulis disini"
                                :label="'Start Date'"
                                :name="prefixName+'tanggalmulaidaftar'"
                            />
                        </div>
                            <div class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputDate
                                v-model="form.tanggalSelesai"
                                placeholder="Tulis disini"
                                :label="'End Date'"
                                :name="prefixName+'tanggalselesaidaftar'"
                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">Event Date</div>
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputDate
                                v-model="form.tanggalMulai"
                                placeholder="Tulis disini"
                                :label="'Start Date'"
                                :name="prefixName+'tanggalmulaievent'"
                            />
                        </div>
                            <div class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputDate
                                v-model="form.tanggalSelesai"
                                placeholder="Tulis disini"
                                :label="'End Date'"
                                :name="prefixName+'tanggalselesaievent'"
                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">About</div>
                    <div class="mb-6">
                        <InputTextArea 
                            v-model="form.deskripsiPanjang[0]"
                            :max="500"
                            placeholder="Tulis disini"
                            :label="'About (English)'"
                            :name="prefixName+'deskripsiid'"
                        />
                    </div>
                    <div>
                        <InputTextArea 
                            v-model="form.deskripsiPanjang[1]"
                            :max="500"
                            placeholder="Tulis disini"
                            :label="'About (Indonesia)'"
                            :name="prefixName+'deskripsien'"
                        />
                    </div>

                    <div class="text-xl text-warna-utama mb-[28px]">Event Location</div>
                    <div class="grid grid-cols-12 gap-2 mb-10">
                        <div class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputSelect
                                v-model="form.provinsi"
                                placeholder="Tulis disini"
                                :label="'Province'"
                                :name="prefixName+'provinsi'"
                            />
                        </div>
                            <div class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputSelect
                                v-model="form.kota"
                                placeholder="Tulis disini"
                                :label="'City'"
                                :name="prefixName+'kota'"
                            />
                        </div>
                    </div>

                    <div class="mb-10">
                        <InputText
                            v-model="form.address"
                            placeholder="Tulis disini"
                            :label="'Address'"
                            :name="prefixName+'address'"
                        />
                    </div>

                    <div class="mb-5">
                        <div class="text-xl mb-1">Gallery</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>You can choose multiple images.</div>
                                <div>JPG, GIF, PNG no larger than 1 MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                        </div>
                    </div>


                    <div class="flex items-center lg:gap-4 gap-2 mb-10">
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


                    <div class="">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow text-xl mb-1">Testimony</div>
                            <div class="text-sm text-warna-empat font-medium cursor-pointer underline">+ Add Testimony</div>
                        </div>
                        <div class="text-xs text-warna-delapan mb-3">Choose Testimony</div>
                        <div class="">
                            tabel
                        </div>
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
                        <div class="bg-warna-empat text-white rounded-lg w-[240px] py-4 text-center mx-0 cursor-pointer hover:bg-blue-900">Submit</div>
                    </div>

                    <div class="">
                        <div class="font-medium">Thumbnail</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>JPG or PNG no larger than 1MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Pilih File</div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    <div class="">
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

                    <hr class="border-warna-tujuh my-[28px]">

                    <div class="">
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

                    <hr class="border-warna-tujuh my-[28px]">

                    <div class="">
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

                    <hr class="border-warna-tujuh my-[28px]">

                    <div class="mb-3">
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


                    <div class="mb-1">Event Status</div>
                    <div>
                        <div class="flex items-center justify-center rounded-full text-white bg-warna-empat w-[147px] h-[34px] text-sm mb-2">Upcoming Event</div>
                    </div>
                    <div class="text-xs text-warna-dua">Event Status will change when event is finished</div>
                    
                    <hr class="border-warna-tujuh my-[28px]">

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
        
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'blog',
            maxTitle: 80,
            childBreadcrumb: [],
            form: {
                judulActivity: ['',''],
                deskripsiPanjang: ['',''],
                kategoriArtikel: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: [],
                tanggalMulai: [],
                tanggalSelesai: [],
                provinsi:[],
                kota:[],
                address:[],
                
            },
            opsiRadio: [],
            opsiTag: [
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
        kategoriArtikel() {
            return this.$store.state.opsi.kategoriArtikel
        },

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
                    link: '/moderations/event/'+this.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
        },

        btnBack() {
            this.$router.push('/moderations/event/'+this.id)
        }
    }
}
</script>