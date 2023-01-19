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
                            placeholder="Tulis disini"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[0].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulArtikel[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[1].length}}/{{maxTitle}}</div> -->
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">Content</div>
                        <!-- <div class="mb-6">
                            <InputTextArea 
                                v-model="form.deskripsiPanjang[0]"
                                :max="500"
                                placeholder="Tulis disini"
                                :label="'Content (English)'"
                                :name="prefixName+'deskripsiid'"
                            />
                        </div>
                        <div>
                            <InputTextArea 
                                v-model="form.deskripsiPanjang[1]"
                                :max="500"
                                placeholder="Tulis disini"
                                :label="'Content (Indonesia)'"
                                :name="prefixName+'deskripsien'"
                            />
                        </div> -->

                        <InputContentSectionBaru
                            v-if="deskripsi"
                            v-model="deskripsi"
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
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">-</div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <!-- <InputFileUpload 
                            :label="'Thumbnail'"
                            v-model="form.imgThumbnail"
                            :accept="'.png, .jpg, .jpeg'"
                            :multiple="false"
                            :maxSize="5"
                        /> -->
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
                            :label="$t('Blog Type')"
                            :opsiRadio="opsiRadio"
                            :name="prefixName+'kategoriartikel'"
                            :orientasi="'vertikal'"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    <div v-if="typeAudience && form.typeAudience">
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
                            :multilang="true"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="typeApproach && form.typeApproach">
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
                            :multilang="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="typeIssues && form.typeIssues">
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
                            :multilang="true"

                        />
                    </div>
                    <hr class="border-warna-tujuh my-[28px]">
                    <div v-if="listTag && form.blogsTag">
                        <InputAutocompleteMulti 
                            v-model="form.blogsTag"
                            :name="prefixName+'tag'"
                            :label="$t('Tag')"
                            :opsi="listTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tag'"
                            :multilang="true"
                            :addNew="true"

                        />
                    </div>

                        <!-- <InputAutocompleteApiMulti 
                            v-model="form.blogsTag"
                            :name="prefixName+'tag'"
                            :label="$t('Tag')"
                            :endPoint="'daftarList/tag/?limit=10&offset=0'"
                            :itemEndPoint="'daftarList/tag/?id='"
                            :searchQuery="'nama'"
                            :itemValue="'id'"
                            :itemLabel="'nama'"
                            :key="'tag'+keyMaster"
                        /> -->



                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</button>
                <button @click="simpan" :disabled="btnText==='Updating'?true : false" class="button-standar">{{ $t(btnText) }}</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            btnText: 'Save',
            prefixName: 'blog',
            daftarGalleri: [],
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
                deskripsi: undefined,
                kategoriArtikel: undefined,
                typeAudience: undefined,
                typeApproach: undefined,
                typeIssues: undefined,
                tag: undefined,
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
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // this.setBreadcrumb()
            this.btnText = 'Save'
            

            this.opsiRadio = this.kategoriArtikel
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('daftarList/tag/').then(res => {
                this.listTag = _.flatMap(res.data.results, function(o){
                    return {"id":o.id, 'label':o.nama}
                })
            }).catch(err => {
                console.log(err)
            })
            await this.$apiPlatform.get('moderator/blogs/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.form.judulArtikel = data.judulArtikel
                var forDeskripsi = data.deskripsi
                this.form = {
                    judulArtikel: data.judulArtikel,
                    deskripsi: data.deskripsi,
                    kategoriArtikel: _.flatMap(data.kategoriArtikel, "id")[0],
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    blogsTag: _.flatMap(data.blogsTag, "pilihanTagId.id"),
                }
                this.imgThumbnail.displayImage = data.imgThumbnail
                this.deskripsi.list = this.form.deskripsi
                this.daftarGalleri = data.blogsGalleries

                this.$nextTick(() => {
                    this.imageThumbnailLoader = true
                    this.imageThumbnailKey +=1
                })
                
                // if (!data.deskripsi || data.deskripsi.length == 0){
                //     forDeskripsi = []
                //     forDeskripsi.push({"typeDeskripsi": 2,"imgDeskripsi": "","caption": ["-","-"],"paragraf": data.deskripsiPanjang, "sorter": 0})
                //     this.form.deskripsi = forDeskripsi
                // } else {
                //     this.form.deskripsi = data.deskripsi
                // }
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


            console.log(this.form)
            console.log(this.deskripsi)
            if (this.form.judulArtikel[0] === '') {
                this.errorField(this.$t('titleIdBlank'), 'titleid')
            } else if (this.form.judulArtikel[1]==='') {
                this.errorField(this.$t('titleEnBlank'), 'titleen')
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

            if (this.imgThumbnail.file !== null) {
                this.uploadImage(this.imgThumbnail.file, "imgThumbnail", this.imgThumbnail.name)
            } else {
                this.btnText = 'Save'

                this.$toast.show('Blog updated successfuly')
                this.initialize()
            }



            }).catch(err => {
                this.btnText = 'Save'
            })
        },
         async uploadImage(image, untuk, name) {
            if (image instanceof Blob){
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiPlatform.put('moderator/blogs/'+this.id+'/', data).then(res => {
                    this.btnText = 'Save'

                    this.$toast.show('Blog updated successfuly')
                    this.initialize()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        btnBack() {
            this.$router.push('/moderations/blog/'+this.id)
        }
    }
}
</script>