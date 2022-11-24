<template>
    <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Blogs'"
                :linkParent="'/moderations/blog'"
                :child="childBreadcrumb"
            />
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
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
                        <div class="mb-6">
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
                        </div>

                    <div class="grid grid-cols-12 gap-5 mt-3">
                        <div class="col-span-12 lg:col-span-6">
                             <div class="text-center bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ image</div>
                        </div>

                        <div class="col-span-12 lg:col-span-6">
                              <div class="text-center bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ text</div>
                        </div>

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
                judulArtikel: ['',''],
                deskripsiPanjang: ['',''],
                kategoriArtikel: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tag: []
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
            this.opsiRadio = this.kategoriArtikel
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
        }
    }
}
</script>