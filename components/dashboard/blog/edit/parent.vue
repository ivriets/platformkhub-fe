<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Blogs'"
                :linkParent="'/moderations/blog'"
                :child="childBreadcrumb"
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
                        />
                        <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[0].length}}/{{maxTitle}}</div>
                    </div>

                    <div class="">
                        <InputText 
                            v-model="form.judulArtikel[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                        />
                        <div class="text-xs text-warna-dua mt-1">{{form.judulArtikel[1].length}}/{{maxTitle}}</div>
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

                        <InputContentSection 
                            v-model="form.deskripsi"
                        />

                        <pre>{{form.deskripsi}}</pre>

                    </div>

                </div>
                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <div v-if="dataDetail.submission === 1" class="text-under-review ml-1">Under Review</div>
                                <div v-if="dataDetail.submission === 2" class="text-draft ml-1">Draft</div>
                                <div v-if="dataDetail.submission === 3" class="text-need-revision ml-1">Need Revision</div>
                                <div v-if="dataDetail.submission === 4" class="text-approved-accepted ml-1">Approved</div>
                            </div>
                            <div class="flex items-center text-sm text-warna-sembilan">
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">-</div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <InputFileUpload 
                            :label="'Thumbnail'"
                            v-model="form.imgThumbnail"
                            :accept="'.png, .jpg, .jpeg'"
                            :multiple="false"
                            :maxSize="5"
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

                    <div class="">
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
        <!-- <pre>{{dataDetail}}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'blog',
            maxTitle: 80,
            dataDetail: null,
            childBreadcrumb: [],
            form: {
                judulArtikel: ['',''],
                deskripsiPanjang: ['',''],
                imgThumbnail: {},
                kategoriArtikel: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: [],
                deskripsi: []
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
            return this.$route.params.id
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
            this.setBreadcrumb()
            this.opsiRadio = this.kategoriArtikel
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('moderator/blogs/'+this.id+'/').then(res => {
                console.log(res.data)
                const data = res.data

                this.dataDetail = data
                this.form.judulArtikel = data.judulArtikel
            }).catch(err => {
                console.log(err)
            })
        },

        setBreadcrumb() {
            this.childBreadcrumb = [
                {
                    label: 'Detail',
                    link: '/moderations/blog/'+this.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
        },

         btnBack() {
            this.$router.push('/moderations/blog/'+this.id)
        }
    }
}
</script>