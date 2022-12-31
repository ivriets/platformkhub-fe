<template>
    <div v-if="form" class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Events'"
                :linkParent="'/moderations/eventent'"
                :child="childBreadcrumb"
            />
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div v-if="form.judulActivity" class="col-span-12 lg:col-span-9">
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
                        <div v-if="form.tanggalMulai" class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputDate
                                v-model="form.tanggalMulai"
                                :value="form.tanggalMulai"
                                :label="'Start Date'"
                                :name="prefixName+'tanggalmulai'"
                            />
                        </div>
                        <div v-if="form.tanggalSelesai" class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputDate
                                v-model="form.tanggalSelesai"
                                :value="form.tanggalSelesai"
                                :label="'End Date'"
                                :name="prefixName+'tanggalselesai'"
                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">Event Date</div>
                    <div class="grid grid-cols-12 gap-2">
                        <div v-if="form.tanggalMulai" class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputDate
                                v-model="form.tanggalMulai"
                                :value="form.tanggalMulai"
                                :label="'Start Date'"
                                :name="prefixName+'tanggalmulai'"
                            />
                        </div>
                        <div v-if="form.tanggalSelesai" class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            <InputDate
                                v-model="form.tanggalSelesai"
                                :value="form.tanggalSelesai"
                                :label="'End Date'"
                                :name="prefixName+'tanggalselesai'"
                            />
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="text-xl text-warna-utama mb-[28px]">About</div>
                    <InputContentSection 
                        v-if="form.deskripsi"
                        v-model="form.deskripsi"
                        :list="form.deskripsi"
                    />
                    <div class="text-xl text-warna-utama mb-[28px]">Event Location</div>
                    <div class="grid grid-cols-12 gap-2 mb-10">
                        <div class="col-span-12 lg:col-span-6 mr-5 md:mr-0">
                            <InputSelect 
                                v-model="form.lokasi[0].provinsi"
                                :name="prefixName+'provinsi'"
                                :label="'Provinsi'"
                                :opsi="opsiProvinsi"
                                :placeholder="form.lokasi[0].provinsi"

                            />
                        </div>
                            <div class="col-span-12 lg:col-span-6 ml-5 md:ml-0">
                            
                            <div class="">
                                <div v-if="opsiKota.length > 0">
                                    <div class="font-medium mb-1"> Kota </div>
                                    <div class="relative">
                                        <select 
                                            v-model="form.lokasi[0].kota" 
                                            class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                                        >
                                            <option selected disabled value="">{{form.lokasi[0].kota}}</option>
                                            <option
                                                v-for="(i, index2) in opsiKota" :key="index2" 
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
                    </div>

                    <div class="mb-10">
                        <InputText
                            v-model="form.lokasi[0].jalan"
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


                    <div class="flex items-center lg:gap-4 gap-2">
                        <div v-for="(item, index) in daftarGalleri" :key="'galleri'+index" class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" :src="basePath+item.imgGambar" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
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
                                <div class="ml-1">{{ totalBookmark }}</div>
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
                    <div v-if="typeAudience && form.typeAudience" class="mb-6">
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
                    <div v-if="typeApproach && form.typeApproach" class="mb-6">
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
                    <div v-if="typeIssues && form.typeIssues" class="mb-6">
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

                    <div v-if="listTag && form.tag" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.tag"
                            :name="prefixName+'tag'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Tag')"
                            :opsi="listTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tag'"
                        />
                    </div>


                    <div class="mb-1">Event Status</div>
                    <div>
                        <div v-if="form.statusActivity" class="flex items-center justify-center rounded-full text-white bg-warna-empat w-[147px] h-[34px] text-sm mb-2">{{form.statusActivity.nama[0]}}</div>
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
                judulActivity: undefined,
                deskripsi: undefined,
                typeAudience: undefined,
                typeApproach: undefined,
                typeIssues: undefined,
                statusActivity: undefined,
                tag: undefined,
                tanggalMulai: undefined,
                tanggalSelesai: undefined,
                lokasi: undefined
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
            ],
            daftarGalleri: [],
            totalBookmark: 0,
            listIndividu: undefined,
            listOrganisasi: undefined,
            listTag: undefined,
            opsiProvinsi: [],
            provinsi: [],
            opsiKota: []

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
    watch: {
        form : {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (oldValue && newValue){
                    if (oldValue.lokasi && newValue.lokasi){
                        let _this = this
                        if (this.form.lokasi[0].provinsi !== this.provinsi){
                            this.provinsi = this.form.lokasi[0].provinsi
                            this.$apiBase.get('kotakab?provinsi='+ this.form.lokasi[0].provinsi).then(res => {
                                _this.opsiKota = _.map(res.data, function(o){
                                    return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                                })
                            }) 
                        }
                    }
                }
            }
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
            await this.$apiBase.get('provinsi/').then(res => {
                const data = res.data
                this.opsiProvinsi = _.map(data, function(o){
                    return {'id':o.provinsi, 'label':[o.provinsi, o.provinsi]}
                })

            }).catch(err => {
                console.log(err)
            })
            await this.$apiPlatform.get('verificator/listIndividu/').then(res => {
                this.listIndividu = res.data
            }).catch(err => {
                console.log(err)
            })
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
                    judulActivity: data.judulActivity,
                    deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    statusActivity: data.statusActivity,
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tag: _.flatMap(_.map(data.tag, function(o){return o.pilihanTagId}), "id"),
                    lokasi:data.lokasi,
                },
                this.daftarGalleri = data.galleries
                if (!data.deskripsi || data.deskripsi.length == 0){
                    this.form.deskripsi = []
                    this.form.deskripsi.push({"typeDeskripsi": 2,"imgDeskripsi": "","caption": ["-","-"],"paragraf": data.deskripsiPanjang, "sorter": 0})
                }
                this.provinsi = data.lokasi[0].provinsi
                const _this = this;
                this.$apiBase.get('kotakab?provinsi='+ this.provinsi).then(res => {
                    _this.opsiKota = _.map(res.data, function(o){
                        return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                    })
                }) 
                console.log(this.opsiKota)
            })
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