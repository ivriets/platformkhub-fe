<template>
    <div class="bg-[#FAFAFA]">
        <div class="bg-no-repeat bg-cover bg-center pt-40 pb-28 md:pb-40" style="background-image: url('images/shome-1.png');">
            <div class="text-white text-center mb-6 md:mb-[93px] px-4">
                <div class="text-xl md:text-4xlplus mb-3 font-bold">Kiprah CSO dalam PCVE;</div>
                <div class="text-2xl md:text-[72px] leading-tight font-semibold">Mapping Organisasi dan<br>Kolaborasi PCVE</div>
            </div>
            <div class="flex justify-center">
                <button class="border border-white rounded-lg text-white hover:bg-[#222659] px-4 py-2 md:py-3 font-semibold flex items-center gap-x-1">
                    <span class="px-10 text-xs md:text-base">Selengkapnya</span>
                    <img class="w-4 h-4" src="/icons/icon-arrow-right.png" alt="icon-selengkapnya">
                </button>
            </div>
        </div>

        <!-- FILTER SEARCH -->
        <div class="px-4 md:px-6">
            <div class="bg-white max-w-[800px] mx-auto rounded-lg py-3 md:py-6 px-6 md:px-6 -mt-12 md:-mt-28 shadow-md">
                <div>
                    <div class="text-base md:text-2xlplus mb-1 md:mb-4 font-semibold text-warna-empat text-center">{{$t('Cari')}}</div>
                    <div class="mb-3 md:mb-6">
                        <InputText 
                            v-model="filter.search"
                            :placeholder="$t('Saya ingin tahu tentang')"
                            :name="prefixName+'filtersearch'"
                        />
                    </div>
                    <div class="grid grid-cols-6 gap-1 md:gap-x-8 mb-3 md:mb-6">
                        <div class="col-span-6 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.organisasi"
                                :name="prefixName+'filterorg'"
                                :placeholder="$t('Semua Organisasi')"
                                :opsi="opsiTipeOrganisasi"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipeorganisasi'"
                            />
                        </div>
                        <div class="col-span-3 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.pendekatan"
                                :name="prefixName+'filterpend'"
                                :placeholder="$t('Semua Pendekatan')"
                                :opsi="opsiTipePendekatan"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipependekatan'"
                            />
                        </div>
                        <div class="col-span-3 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.topik"
                                :name="prefixName+'filtertopik'"
                                :placeholder="$t('Semua Topik')"
                                :opsi="opsiTipeTopik"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipetopik'"
                            />
                        </div>
                    </div>
                    <div>
                        <button @click="goToSearchResult" class="text-white text-sm md:text-base py-2 md:py-4 w-full bg-warna-utama rounded-lg font-semibold flex items-center justify-center gap-x-1">
                            <img src="/icons/icon-search.png" alt="" height="16" width="16">
                            {{$t('Cari')}}
                        </button>
                    </div>
                    <!-- <pre>{{filter}}</pre> -->
                </div>
            </div>
        </div>
        
        <!-- SECTION PETA -->
        <div class="pt-[80px] pb-[60px]">
            <div class="flex items-center justify-center">
                <div @click="selectPetaProgram" class="px-6 py-3 text-xl font-lato cursor-pointer" :class="selectedPeta === 'program' ? 'border-b-[4px] border-warna-dua text-warna-empat font-bold' : 'text-warna-enam'">Program</div>
                <div @click="selectPetaOrganisasi" class="px-6 py-3 text-xl font-lato cursor-pointer" :class="selectedPeta === 'organisasi' ? 'border-b-[4px] border-warna-dua text-warna-empat font-bold' : 'text-warna-enam'">Organisasi</div>
            </div>
            <div v-if="selectedPeta === 'program'">
                <div class="container mx-auto bg-white h-[500px]">
                    <div class="text-center">Peta Program</div>
                </div>
            </div>
            <div v-else>
                <div class="container mx-auto bg-white h-[500px]">
                    <div class="text-center">Peta Organisasi</div>
                </div>
            </div>
        </div>

        
        <div class="bg-umum py-12 md:py-[100px]">
            <!-- SECTION PUBLIKASI -->
            <div class="section-publikasi bg-no-repeat bg-contain bg-right " style="background-image: url(/images/shome-2.png); height: 100%;">
                <div class="">
                    <div class="container mx-auto mb-[42px] px-4">
                        <h2 class="font-bold text-2xl md:text-4xlplus">{{$t('Publikasi')}}</h2>
                        <div class="lg:flex lg:items-center gap-x-[20px] lg:gap-x-[60px]">
                            <div class="w-6/12 text-xs md:text-base">{{ $t('Banner Resource') }}</div>
                            <div class="max-w-fit mt-5 lg:mt-0">
                                <a href="/resource" class="py-2 md:py-3 px-2 md:px-4 rounded-lg border border-warna-utama bg-umum flex items-center">
                                    <div class="text-center mr-2 md:mr-4 text-xs md:text-base whitespace-nowrap">{{$t('Lihat Semua Publikasi')}}</div>
                                    <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-if="loaderResource">
                        <ElementsCarouselFeatured 
                            :dataCard="dataFeaturedResource"
                            :kategori="'resource'"
                            posisi="kiri"
                            :path="'/resource/'"
                            :idValue="'resourceId'"
                            v-if="loaderResource"
                        />
                    </div>
                    <div v-if="!loaderResource" class="flex items-center justify-center mt-6">
                        <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
                    </div>
                </div>
            </div>

            <hr class="container mx-auto border-warna-lima mt-10 md:mb-20 mb-10">

            <!-- SECTION PROGRAM -->
            <div class="section-program bg-no-repeat bg-contain" style="background-image: url(/images/shome-3.png); height: 100%;">
                <div class="">
                    <div class="container mx-auto mb-[42px] px-4">
                        <div class="grid grid-cols-12">
                            <div class="col-span-6 md:col-span-3"></div>
                            <div class="col-span-6 md:col-span-9">
                                <h2 class="font-bold text-2xl md:text-4xlplus w-full md:w-1/2">{{$t('Program')}}</h2>
                                <div class="lg:flex lg:items-center gap-x-[0px] lg:gap-x-[60px]">
                                    <div class="w-full md:w-1/2 text-xs md:text-base">{{ $t('Banner Program') }}</div>
                                    <div class="max-w-fit mt-5 lg:mt-0">
                                        <a href="/program" class="py-2 md:py-3 px-2 md:px-4 rounded-lg border border-warna-utama bg-umum flex items-center">
                                            <div class="whitespace-nowrap text-center mr-2 md:mr-4 text-xs md:text-base">{{$t('Lihat Semua Program')}}</div>
                                            <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="loaderProgram" class="">
                        <ElementsCarouselFeatured
                            :dataCard="dataFeaturedProgram"
                            :kategori="'program'"
                            posisi="kanan"
                            :path="'/program/'"
                            :idValue="'programId'"
                        />
                    </div>
                    <div v-if="!loaderProgram" class="flex items-center justify-center mt-6">
                        <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
                    </div>
                </div>
            </div>

            <hr class="container mx-auto border-warna-lima mt-10 mb-10 md:mb-20">

            <!-- SECTION BLOG -->
            <div class="section-blog bg-no-repeat bg-contain bg-right " style="background-image: url(/images/shome-4.png); height: 100%;">
                <div class="">
                    <div class="container mx-auto mb-[42px] px-4">
                        <h2 class="font-bold text-2xl md:text-4xlplus">{{$t('Blog')}}</h2>
                        <div class="lg:flex lg:items-center gap-x-[20px] lg:gap-x-[60px]">
                            <div class="w-6/12 text-xs md:text-base">{{ $t('Banner Blog') }}</div>
                            <div class="max-w-fit mt-5 lg:mt-0">
                                <a href="/blog" class="py-2 md:py-3 px-2 md:px-4     rounded-lg border border-warna-utama bg-umum flex items-center">
                                    <div class="text-center mr-2 md:mr-4 text-xs md:text-base">{{$t('Lihat Semua Blog')}}</div>
                                    <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-if="loaderBlog">
                        <ElementsCarouselFeatured
                            :dataCard="dataFeaturedBlog"
                            :kategori="'blog'"
                            posisi="kiri"
                            :path="'/blog/'"
                            :idValue="'blogId'"
                        />
                    </div>
                    <div v-if="!loaderBlog" class="flex items-center justify-center mt-6">
                        <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION VIRTUAL EXHIBITION -->
        <div class="bg-no-repeat bg-cover bg-center" style="background-image: url('/images/shome-5.png'); height: 100%;">
            <div class="" style="background-image: linear-gradient(270deg, rgba(28, 32, 74, 0.9) 0.9%, rgba(28, 32, 74, 0.15) 100%);">
                <div class="container mx-auto text-white pt-16 md:pt-[208px] pb-10 md:pb-[164px]">
                    <div class="grid grid-cols-12">
                        <div class="col-span-5 md:col-span-7"></div>
                        <div class="col-span-7 md:col-span-5 lg:w-3/4 px-4">
                            <div class="text-2xl md:text-7xl mb-4 font-lato font-bold">Virtual Exhibition</div>
                            <div class="text-xs mb-8 md:text-sm">{{ $t('Virtual Exhibition') }}</div>
                            <a href="https://ve-virtual.k-hub.id/" target="_blank">
                                <div class="flex">
                                    <button class="rounded-lg bg-warna-dua py-3 md:py-4 px-10 md:px-24 text-center text-warna-empat font-semibold text-xs md:text-base">{{ $t('Kunjungi') }}</button>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION MITRA ORGANISASI -->
        <div class="bg-no-repeat bg-cover bg-center" style="background-image: url('/images/shome-6.png'); height: 100%;">
            <div class="container mx-auto w-3/4 lg:w-2/3 pt-[80px] pb-[100px]">
                <div class="">
                    <h2 class="text-white text-center mb-10 font-bold text-xl md:text-4xlplus">{{ $t('Organisasi Mitra') }}</h2>
                    <div v-if="loaderMitra" class="flex flex-wrap justify-center gap-x-4 gap-y-6 mb-9">
                        <!-- <div v-for="(item, index) in dataMitra" :key="'mitra'+index" class=" rounded-full w-[125px] h-[125px] lg:w-[175px] lg:h-[175px]  flex items-center justify-center overflow-hidden">
                            <img :src="basePath+item.imgLogoOrganisasi" :alt="'mitra'+item.organisasiId" class="w-9/12 h-auto">
                        </div> -->
                        <div 
                            v-for="(item, index) in dataMitra" :key="'mitra'+index"
                            class="bg-no-repeat bg-center rounded-full border border-warna-lima w-[125px] h-[125px] lg:w-[175px] lg:h-[175px] shadow cursor-pointer bg-white"
                            :style="'background-image: url('+basePath+item.imgLogoOrganisasi+'); background-size: 60%;'"
                            :title="item.namaOrganisasi"
                        >
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <a href="/organization" class="py-3 px-4 rounded-lg border border-white flex items-center">
                            <span class="w-[225px] text-white font-medium text-center text-xs md:text-base">{{$t('Lihat Semua Organisasi')}}</span>
                            <img src="/icons/icon-arrow-right-putih.png" alt="arrow-right" width="16" height="16">
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION DAFTAR -->
        <div class="bg-warna-utama py-20 px-3 md:px-0">
            <div class="bg-no-repeat bg-contain bg-center" style="background-image: url('/images/shome-7.png'); height: 100%;">
                <div class="container mx-auto w-3/4 md:w-1/2 h-full text-white text-center py-[80px] lg:py-[148px]">
                    <div class="text-3xl md:text-[58px] font-lato font-bold leading-[44px] md:leading-[72px] mb-3">
                        <!-- {{Anda individu,<br> komunitas atau organisasi?}} -->
                        {{ $t('Judul Ajakan') }}
                    </div>
                    <div class="text-xs md:text-lg mb-8">
                        <!-- Ingin terhubung dengan sumber data, sumber daya dan<br> sumber dana pada sektor <b>PCVE</b>? -->
                        {{ $t('Deskripsi Ajakan') }}
                    </div>
                    <button @click="goToLogin" class="rounded-lg bg-[#FDCE07] py-3 md:py-4 w-1/2 md:w-[280px] text-center text-warna-empat font-semibold text-xs md:text-base">{{ $t('Daftar Sekarang') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    // props: ['cu'],
    data() {
        return {
            prefixName: 'home',
            filter: {
                search: '',
                organisasi: [],
                pendekatan: [],
                topik: []
            },
            dataFeaturedResource: null,
            dataFeaturedProgram: null,
            dataFeaturedBlog: null,
            dataMitra: null,
            loaderResource: false,
            loaderProgram: false,
            loaderBlog: false,
            loaderMitra: false,
            selectedPeta: 'program'
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        },
        opsiTipeOrganisasi() {
            return this.$store.state.opsi.tipeOrganisasi
        },
        opsiTipePendekatan() {
            return this.$store.state.opsi.tipeApproach
        },
        opsiTipeTopik() {
            return this.$store.state.opsi.tipeIssue
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getFeaturedProgram()
            this.getFeaturedResource()
            this.getFeaturedBlog()
            this.getMitra()
        },

        async getFeaturedProgram() {
            this.loaderProgram = false

            await this.$apiBase.get('featuredprogram/').then(res => {
                this.dataFeaturedProgram = res.data.map(e => {
                    const data = {
                        programId: e.programId,
                        imgThumbnail: e.imgThumbnail,
                        judulActivity: e.judulActivity.length > 0 ? e.judulActivity : 'N/A',
                        myOrganisasi: e.myOrganisasi,
                        tanggalMulai: e.tanggalMulai,
                        tanggalSelesai: e.tanggalSelesai,
                        statusActivity: e.statusActivity
                    }
                    return data
                })

                this.$nextTick(() => {
                    this.loaderProgram = true
                })
            })
        },

        async getFeaturedResource() {
            this.loaderResource = false

            await this.$apiBase.get('featuredresource/').then(res => {
                this.dataFeaturedResource = res.data.map(e => {
                    const data = {
                        resourceId: e.resourceId,
                        imgThumbnail: e.imgThumbnail,
                        judulArtikel: e.judulArtikel.length > 0 ? e.judulArtikel : 'N/A',
                        kategoriArtikel: e.kategoriArtikel,
                        myOrganisasi: e.myOrganisasi,
                        resourcesFiles: e.resourcesFiles
                    }
                    return data
                })

                this.$nextTick(() => {
                    this.loaderResource = true
                })
            })
        },

        async getFeaturedBlog() {
            this.loaderBlog = false

            await this.$apiBase.get('featuredblog/').then(res => {
                this.dataFeaturedBlog = res.data.map(e => {
                    const data = {
                        blogId: e.blogId,
                        imgThumbnail: e.imgThumbnail,
                        judulArtikel: e.judulArtikel.length > 0 ? e.judulArtikel : 'N/A',
                        kategoriArtikel: e.kategoriArtikel,
                        myOrganisasi: e.myOrganisasi,
                        deskripsiPendek: e.judulArtikel.length > 0 ? e.judulArtikel : 'N/A',
                        datePublish: e.datePublish
                    }
                    return data
                })

                this.$nextTick(() => {
                    this.loaderBlog = true
                })
            })
        },

        async getMitra() {
            this.loaderMitra = false

            await this.$apiBase.get('organizations/mitra/').then(res => {

                this.dataMitra = res.data.results

                this.$nextTick(() => {
                    this.loaderMitra = true
                })
            })
        },

        goToSearchResult() {
            const clearSearch = encodeURIComponent(this.filter.search)

            this.$router.push('/search?s='+clearSearch+
                '&tipeOrganisasi='+this.filter.organisasi.toString()+
                '&tipePendekatan='+this.filter.pendekatan.toString()+
                '&tipeTopik='+this.filter.topik.toString()+
                '&sortbytitleitem=desc')
        },

        encodeHTML(s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        },

        selectPetaProgram() {
            this.selectedPeta = 'program'
        },

        selectPetaOrganisasi() {
            this.selectedPeta = 'organisasi'
        },

        goToLogin() {
            this.$router.push('login/')
        }
        
    }
}
</script>