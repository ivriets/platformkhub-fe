<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="$t('Resources')"
                :linkParent="'/moderations/resource'"
                :child="childBreadcrumb"
            />
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-9">
                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulArtikel[0]"
                            :name="prefixName+'titleid'"
                            :label="$t('Title (Bahasa Indonesia)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulArtikel[1]"
                            :name="prefixName+'titleen'"
                            :label="$t('Title (English)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <DashboardResourceEditFile 
                            v-model="resourcesFiles"
                            :key="'resourcetype'+keyMaster"
                        />

                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Content') }}</div>
                        <!-- <InputContentSectionBaru 
                            v-if="deskripsi"
                            v-model="deskripsi"
                        /> -->
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
                                <div class="">{{ $t('Bookmarked by:') }} </div>
                                <div class="ml-1">-</div>
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
                            :name="prefixName+'typeAudience'"
                             :label="$t('Audience Type')"
                            :opsi="typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeaudience'+keyMaster"
                            :multilang="true"
                            :required="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'typeApproach'"
                            :label="$t('Approach')"
                            :opsi="typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'tipeapproach'+keyMaster"
                            :multilang="true"
                            :required="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'typeIssues'"
                            :label="$t('Issues')"
                            :opsi="typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="'typeIssues'+keyMaster"
                            :multilang="true"
                            :required="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div >
                        <InputFieldTag
                            v-model="formTag"
                            :name="prefixName+'tag'"
                            :label="$t('Tag')"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :multilang="true"
                            :addNew="true"
                        />
<!-- {{opsiTag}} -->

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

        <div class="ah hidden">
            <DashboardChildSimpanTag 
                v-model="saving.tag"
                :tag="formTag"
                :model="'resource'"
                :modelId="id"
                v-if="saving.statusTag"
            />
            <DashboardChildSimpanResourcesFiles 
                v-model="saving.resourcesFiles"
                :resourcesFiles="resourcesFiles"
                :modelId="id"
                v-if="saving.statusResourcesFiles"
            />
        </div>

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
                // resourcesTag: [],

            },
                resourcesFiles: {
                        pkFileId: '',
                        typeResources: '',
                        embedLink: '',
                        deskripsiFile: ['',''],
                        typeVisibility: 1
                },

            formTag: {
                list: [],
                deleted: [],
                api: []
            },

            opsiRadio: [],
            imgThumbnail: null, 
            opsiTag: [],
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
            saving: {
                tag: '',
                statusTag: false,
                resourcesFiles: '',
                statusResourcesFiles: false
            },
            checkSaving: {
                root: false,
                thumbnail: false,
                resourcesFiles: false
            }



            
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
        },
        'saving.resourcesFiles'(val) {
            if (val === 'done') this.checkSaving.resourcesFiles = true
        },

        checkSaving: {
            handler(val) {
                if (
                    val.root === true && 
                    val.thumbnail === true && val.resourcesFiles === true
                    ) 
                {
                     this.$toast.show(this.$t('Resources')+ ' ' + this.$t('updated successfully'))
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
            console.log('inisial')
            this.saving = {
                tag: '',
                statusTag: false,
                resourcesFiles: '',
                statusResourcesFiles: false
            },

            this.checkSaving = {
                root: false,
                thumbnail: false,
                resourcesFiles: false,
            }
            this.btnText = 'Save'
            this.opsiRadio = this.kategoriArtikel
            // this.getTag();
            this.imageThumbnailLoader = false
            this.$nextTick(() => {
                this.masterPoint()
            })
            
        },

        async masterPoint() {
            // await this.$apiPlatform.get('daftarList/tag/').then(res => {
            //     this.opsiTag = _.flatMap(res.data.results, function(o){
            //         return {"id":o.id, 'label':o.nama}
            //     })
            // }).catch(err => {
            //     console.log(err)
            // })


            await this.$apiPlatform.get('moderator/resources/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.form.judulArtikel = data.judulArtikel
                var forDeskripsi = data.deskripsi
                this.form = {
                    submission: data.submission,
                    judulArtikel: data.judulArtikel,
                    // deskripsi: data.deskripsi,
                    kategoriArtikel: _.flatMap(data.kategoriArtikel, "id")[0],
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    // resourcesTag: _.flatMap(data.resourcesTag, "pilihanTagId.id"),

                }
                this.resourcesFiles = data.resourcesFiles ? {
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
                this.formTag.api = data.resourcesTag
                this.deskripsi.list = this.form.deskripsi
                this.imgThumbnail.displayImage = data.imgThumbnail



                this.$nextTick(() => {
                    this.imageThumbnailLoader = true
                    this.keyMaster +=1
                })

            }).catch(err => {
                console.log(err)
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

        simpan() {
            this.form.judulArtikel[0] = this.form.judulArtikel[0] === '' ? 'N/A' : this.form.judulArtikel[0]
            this.form.judulArtikel[1] = this.form.judulArtikel[1] === '' ? 'N/A' : this.form.judulArtikel[1]

            if (this.form.typeAudience.length === 0) {
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
            forSimpan.kategoriArtikel = [forSimpan.kategoriArtikel]


            await this.$apiPlatform.put('moderator/resources/'+this.id+'/', forSimpan).then(res => {
                console.log(res)

                this.checkSaving.root = true
                if (this.imgThumbnail.file !== null) {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.checkSaving.thumbnail = true

                }
                this.savingTag()
                this.savingResourcesFiles()
                
                // else {
                //     this.$toast.show(this.$t('Resources')+ ' ' + this.$t('updated successfully'))
                //     this.initialize()
                // }


            })
        },

         async uploadImage(image, untuk, name) {
            console.log('image', image)
            console.log('untuk', untuk)
            console.log('name', name)
            if (image instanceof Blob){
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/resources/'+this.id+'/', data).then(res => {
                    this.$toast.show(this.$t('Resources')+ ' ' + this.$t('updated successfully'))
                    this.initialize()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        btnBack() {
            this.$router.push('/moderations/resource/'+this.id)
        },

        savingTag() {
            this.saving.statusTag = true
            setTimeout(() => {
                this.saving.statusTag = false
            }, 500)
        },
        savingResourcesFiles() {
            this.saving.statusResourcesFiles = true
            setTimeout(() => {
                this.saving.statusResourcesFiles = false
            }, 500)

        }

    }
}
</script>