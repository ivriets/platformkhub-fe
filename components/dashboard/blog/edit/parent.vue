<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Blog'"
                :linkParent="'/moderations/blog'"
                :child="childBreadcrumb"
                v-if="childBreadcrumb && childBreadcrumb.length > 0"

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
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[0].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulArtikel[1]"
                            :name="prefixName+'titleen'"
                           :label="$t('Title (English)')"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[1].length}}/{{maxTitle}}</div> -->
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">{{ $t('Content') }}</div>
                        <InputContentSectionBaru
                            v-if="deskripsi"
                            v-model="deskripsi"
                            :key="'desk'+keyMaster"
                        />
                      <!-- <pre> diluar:  {{ deskripsi }} </pre> -->
                    </div>

                    <hr class="border-warna-tujuh my-10">
                        <InputGalleries 
                            v-model="daftarGalleri"
                        />

                </div>
                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <ElementsDisplayStatusSubmission 
                                    :submission="dataDetail.submission"
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
                            :label="$t('Blog Type')"
                            :opsiRadio="opsiRadio"
                            :name="prefixName+'kategoriArtikel'"
                            :orientasi="'vertikal'"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    <div v-if="typeAudience && form.typeAudience">
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'typeAudience'"
                            :label="$t('Audience Type')"
                            :opsi="typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :multilang="true"
                            :required="true"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="typeApproach && form.typeApproach">
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'typeApproach'"
                            :label="$t('Approach')"
                            :opsi="typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :multilang="true"
                            :required="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="typeIssues && form.typeIssues">
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'typeIssues'"
                            :label="$t('Issues')"
                            :opsi="typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
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
            <DashboardChildSimpanTag 
                v-model="saving.tag"
                :tag="formTag"
                :model="'blog'"
                :modelId="id"
                v-if="saving.statusTag"
            />
            <DashboardChildSimpanGalleri 
                v-model="saving.galleri"
                :model="'blog'"
                :modelId="id"
                :galleri="daftarGalleri"
                v-if="saving.statusGalleri"
            />
            <DashboardChildSimpanContentSection 
                v-model="saving.deskripsi"
                :model="'blog'"
                :modelId="id"
                :deskripsi="deskripsi"
                v-if="saving.statusDeskripsi"
            />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            btnText: 'Save',
            prefixName: 'blog',
            daftarGalleri: {
                list: [],
                deleted: []
            },
            keyMaster: 0,
            maxTitle: 80,
            dataDetail: null,
            // childBreadcrumb: [],
            deskripsi: {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },
            form: {
                judulArtikel: ['',''],
                deskripsi: null,
                kategoriArtikel: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: [],
            },
            formTag: {
                list: [],
                deleted: [],
                api: []
            },
            opsiRadio: [],
            imgThumbnail: {
                file: null,
                displayImage: ''
            },
            imageThumbnailLoader: false,
            imageThumbnailKey: 0,
            opsiTag: [],
            listTag: undefined, 
            saving: {
                tag: '',
                statusTag: false,
                galleri: '',
                statusGalleri: false,
                deskripsi: '',
                statusDeskripsi: false,
            },

            checkSaving: {
                root: false,
                thumbnail: false,
                // tag: false,
                galleri: false,
                deskripsi: false
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
            return this.$t('blog')
        },
        id() {
            return this.$route.params.id
        },
        basePath() {
            return process.env.BASE_URL
        },
        childBreadcrumb() {
            const vA = [
                {
                    label: 'Detail',
                    link: '/moderations/blog/'+this.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
            return vA
        }
    },
    watch: {
        'saving.galleri' (val) {
            if (val==='done') this.checkSaving.galleri = true
        },
        'saving.deskripsi' (val) {
            if (val==='done') this.checkSaving.deskripsi = true
        },

        checkSaving: {
            handler(val) {
                if (
                    val.root === true &&  val.thumbnail === true && 
                    val.galleri === true 
                    && val.deskripsi === true
                    ) 
                {
                     this.$toast.show(this.$t('Blog')+ ' ' + this.$t('updated successfully'))
                        this.initialize()

                    //  setTimeout(() => {
                    //     this.initialize()
                    //  },1000)
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
            // this.setBreadcrumb()
            console.log('baru')
            this.btnText = 'Save'

            this.deskripsi = {
                list: [],
                deleted: [],
                updated: [],
                new: []
            },

            this.checkSaving = {
                root: false,
                thumbnail: false,
                // tag: false,
                galleri: false,
                deskripsi: false,
            }
            this.saving = {
                // tag: '',
                statusTag: false,
                galleri: '',
                statusGalleri: false,
                deskripsi: '',
                statusDeskripsi: false,
            },
            this.imageThumbnailLoader = false
            

            this.opsiRadio = this.kategoriArtikel
            this.masterPoint()
        },

        async masterPoint() {

            await this.$apiPlatform.get('moderator/blogs/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.form.judulArtikel = data.judulArtikel
                // var forDeskripsi = data.deskripsi
                this.form = {
                    judulArtikel: data.judulArtikel,
                    // deskripsi: data.deskripsi,
                    kategoriArtikel: _.flatMap(data.kategoriArtikel, "id")[0],
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    // blogsTag: _.flatMap(data.blogsTag, "pilihanTagId.id"),
                }
                // this.formTag.list = _.flatMap(data.blogsTag, "pilihanTagId.id")
                this.formTag.api = data.blogsTag

                this.imgThumbnail.displayImage = data.imgThumbnail
                this.deskripsi.list = data.deskripsi
                this.daftarGalleri.list = data.blogsGalleries

                this.$nextTick(() => {
                    this.imageThumbnailLoader = true
                    this.imageThumbnailKey +=1
                    this.keyMaster+=1
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
            // forSimpan.deskripsi = this.deskripsi

            await this.$apiPlatform.put('moderator/blogs/'+this.id+'/', forSimpan).then(res => {

                this.checkSaving.root = true

                if (this.imgThumbnail.file !== null) {
                    this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
                } else {
                    this.checkSaving.thumbnail = true
                } 
                this.savingDeskripsi()
                this.savingTag()
                this.savingGallery();

                // else {
                //     this.btnText = 'Save'
                //     this.$toast.show(this.$t('Blog')+ ' ' + this.$t('updated successfully'))

                //     this.initialize()
                // }



            }).catch(err => {
                this.btnText = 'Save'
            })
        },
         async uploadImage(image, untuk, name) {
            if (image instanceof Blob){
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/blogs/'+this.id+'/', data).then(res => {
                    // this.$toast.show('Blog updated successfuly')
                    // this.initialize()
                    this.checkSaving.thumbnail = true
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        btnBack() {
            this.$router.push('/moderations/blog/'+this.id)
        },
        savingGallery() {
            this.saving.statusGalleri = true
            // setTimeout(() => {
            //     this.saving.statusGalleri = false;
            // }, 2000)
        },
        savingTag() {
            this.saving.statusTag = true
            // setTimeout(() => {
            //     this.saving.statusTag = false
            // }, 500)
        },
        savingDeskripsi() {
            this.saving.statusDeskripsi = true
            // setTimeout(() => {
            //     this.saving.statusDeskripsi = false
            // }, 2000)
        }

    }
}
</script>