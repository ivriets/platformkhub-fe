<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="$t('Resources')"
                :linkParent="'/moderations/resource'"
                :child="childBreadcrumb"
            />
        </div>
        <div  class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-9">
                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulArtikel[0]"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulArtikel[1]"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <DashboardResourceEditFile 
                            v-model="form.resourcesFiles"
                            :key="'resourcetype'+keyMaster"
                        />

                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Content') }}</div>
                        <InputContentSectionBaru 
                            v-if="deskripsi"
                            v-model="deskripsi"
                        />
                    </div>

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
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">-</div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <InputImageUploadSingle 
                            :label="'Thumbnail'"
                            v-model="imgThumbnail"
                            :accept="'.png, .jpg, .jpeg'"
                            :maxSize="1"
                            :useCrop="true"
                            :cropRatio="4/3"
                            v-if="imageThumbnailLoader"
                            :key="'imgthumbnail'+imageThumbnailKey"
                        />
                    </div>

                    

                    <hr class="border-warna-tujuh my-[28px]">

                    <div>
                        <InputRadio 
                            v-model="form.kategoriArtikel"
                            :label="$t('Kategori Publikasi')"
                            :opsiRadio="opsiRadio"
                            :name="prefixName+'kategoriartikel'"
                            :orientasi="'vertikal'"
                            :key="'kategoriartikel'+keyMaster"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'tipeaudience'"
                            :placeholder="'Tulis disini'"
                            :label="'Tipe Audience'"
                            :opsi="typeAudience"
                            :value="form.typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeaudience'+keyMaster"
                            :multilang="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'tipeapproach'"
                            :label="'Tipe Approach'"
                            :opsi="typeApproach"
                            :value="form.typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeapproach'+keyMaster"
                            :multilang="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'topik'"
                            :label="'Topik'"
                            :opsi="typeIssues"
                            :value="form.typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'typeIssues'+keyMaster"
                            :multilang="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.resourcesTag"
                            :name="prefixName+'tag'"
                            :label="$t('Tag')"
                            :opsi="listTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tag'+keyMaster"
                            :multilang="true"
                            :addNew="true"

                        />
                    </div>

                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div @click="simpan" class="button-standar">{{ $t(btnText) }}</div>
            </div>
        </div>
        <!-- <pre>{{ form }}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            btnText: 'Save',
            prefixName: 'resource',
            keyMaster: 0,
            maxTitle: 80,
            dataDetail: null,
            // childBreadcrumb: [],
            form: {
                submission: 1,
                judulArtikel: ['',''],
                deskripsi:  ['',''],
                kategoriArtikel: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                resourcesTag: [],
                resourcesFiles: {
                        pkFileId: '',
                        typeResources: '',
                        embedLink: '',
                        deskripsiFile: ['',''],
                        typeVisibility: 1
                }
            },
            opsiRadio: [],
            imgThumbnail: null, 
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
            listTag: null,
            deskripsi: {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },
            imgThumbnail: {
                file: null,
                displayImage: ''
            },
            imageThumbnailLoader: false,
            imageThumbnailKey: 0,

            
        }
    },
    computed: {
        async typeOrganisasi() {
            return this.$store.state.daftarlist.typeOrganisasi
        },
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
            return this.$t('resource')
        },
        id() {
            return this.$route.params.id
        },
        basePath() {
            return process.env.BASE_URL
        },
        childBreadcrumb() {
            return  [
                {
                    label: this.$t('Detail'),
                    link: '/moderations/resource/'+this.id
                },
                {
                    label: this.$t('Editor'),
                    link: ''
                }
            ]
        }
        
    },
    watch: {
        imageThumbnailLoader() {
            this.imageThumbnailKey +=1
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.opsiRadio = this.kategoriArtikel
            this.getTag();
            this.imageThumbnailLoader = false
            this.$nextTick(() => {
                this.masterPoint()
            })
            
        },
        async getTag() {
            await this.$apiPlatform.get('daftarList/tag/').then(res => {
                this.listTag = _.flatMap(res.data.results, function(o){
                    return {"id":o.id, 'label':o.nama}
                })
            }).catch(err => {
                console.log(err)
            })
        },
        async masterPoint() {

            await this.$apiPlatform.get('moderator/resources/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.form.judulArtikel = data.judulArtikel
                var forDeskripsi = data.deskripsi
                this.form = {
                    submission: data.submission,
                    judulArtikel: data.judulArtikel,
                    deskripsi: data.deskripsi,
                    kategoriArtikel: _.flatMap(data.kategoriArtikel, "id")[0],
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    resourcesTag: _.flatMap(data.resourcesTag, "pilihanTagId.id"),
                    resourcesFiles: data.resourcesFiles ? {
                        pkFileId: data.resourcesFiles.pkFileId,
                        binFile: data.resourcesFiles.binFile === '/assets/file.pdf' ? '' : data.resourcesFiles.binFile,
                        typeResources: data.resourcesFiles.typeResources.id,
                        embedLink: data.resourcesFiles.embedLink === 'https://' ? '' : data.resourcesFiles.embedLink,
                        deskripsiFile: data.resourcesFiles.deskripsiFile,
                        typeVisibility: data.resourcesFiles.typeVisibility
                    } : {
                        pkFileId: '',
                        binFile: '',
                        typeResources: '',
                        embedLink: '',
                        deskripsiFile: ['',''],
                        typeVisibility: 1
                    }
                }
                this.deskripsi.list = this.form.deskripsi
                this.imgThumbnail.displayImage = data.imgThumbnail


                this.imgThumbnail = data.imgThumbnail
                if (!data.deskripsi || data.deskripsi.length == 0){
                    forDeskripsi = []
                    forDeskripsi.push({"typeDeskripsi": 2,"imgDeskripsi": "","caption": ["-","-"],"paragraf": data.deskripsiPanjang, "sorter": 0})
                    this.form.deskripsi = forDeskripsi
                }

                this.$nextTick(() => {
                    this.imageThumbnailLoader = true
                    this.keyMaster +=1
                })

            }).catch(err => {
                console.log(err)
            })
        },
        async putData(data) {
            await this.$apiPlatform.put('moderator/resources/'+this.id+'/', data).then(res => {
                console.log(res)
            })
        },

        simpan() {
            console.log(this.form)
        },
        btnBack() {
            this.$router.push('/moderations/resource/'+this.id)
        }
    }
}
</script>