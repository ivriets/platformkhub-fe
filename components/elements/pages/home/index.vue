<template>
    <div class="bg-[#FAFAFA]">
      

        
        <div class="bg-umum py-12 md:py-[100px]">
            <render-on-scroll>
                <section>
                    <ElementsPagesHomeSectionPublikasi />
                </section>
            </render-on-scroll>

            <hr class="container mx-auto border-warna-lima mt-10 md:mb-20 mb-10">
            <render-on-scroll>
                <section class="min-h-[100px]">
                    <ElementsPagesHomeSectionProgram />
                </section>
            </render-on-scroll>


            <hr class="container mx-auto border-warna-lima mt-10 mb-10 md:mb-20">
            <render-on-scroll>
                <section class="min-h-[100px]">
                    <ElementsPagesHomeSectionBlog />
                </section>
            </render-on-scroll>

        </div>
        <!-- <render-on-scroll>
            <section class="min-h-[100px]">
                <ElementsPagesHomeSectionVirtual />
            </section>
        </render-on-scroll>

        <render-on-scroll>
            <section class="min-h-[100px]">
                <ElementsPagesHomeSectionMitra />
            </section>
        </render-on-scroll> -->


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
import RenderOnScroll from 'nuxt-render-on-scroll'
export default {
    // props: ['cu'],
    components: {
        RenderOnScroll,
    },


    data() {
        return {
            prefixName: 'home',
            filter: {
                search: '',
                organisasi: [],
                pendekatan: [],
                topik: []
            },
            dataFeaturedProgram: null,
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
        // opsiTipeOrganisasi() {
        //     return this.$store.state.opsi.tipeOrganisasi
        // },
        // opsiTipePendekatan() {
        //     return this.$store.state.opsi.tipeApproach
        // },
        // opsiTipeTopik() {
        //     return this.$store.state.opsi.tipeIssue
        // }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // UNTUK MENGURANGI BEBAN AWAL, TOLONG JANGAN DITUMPUK DIDEPAN SEMUA, 
            // this.getFeaturedProgram()
            // this.getFeaturedResource()
            // this.getFeaturedBlog()
            // this.getMitra()
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