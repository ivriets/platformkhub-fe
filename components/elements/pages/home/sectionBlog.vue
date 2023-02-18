<template>
    <div class="section-blog bg-no-repeat bg-contain bg-right " style="background-image: url(/images/shome-4.png); height: 100%;">
        <div class="">
            <div class="container mx-auto mb-[42px] px-4">
                <h2 class="font-bold text-2xl md:text-4xlplus">{{$t('Blog')}}</h2>
                <div class="lg:flex lg:items-center gap-x-[20px] lg:gap-x-[60px]">
                    <div class="w-6/12 text-xs md:text-base">{{ $t('Banner Blog') }}</div>
                    <!-- <div class="max-w-fit mt-5 lg:mt-0">
                        <a href="/blog" class="py-2 md:py-3 px-2 md:px-4     rounded-lg border border-warna-utama bg-umum flex items-center">
                            <div class="text-center mr-2 md:mr-4 text-xs md:text-base">{{$t('Lihat Semua Blog')}}</div>
                            <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                        </a>
                    </div> -->
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
            <div v-if="!loaderBlog">
                <ElementsSkeletonCarousel 
                    :posisi="'kiri'"
                    :model="'blog'"
                />
            </div>
            <!-- <div v-if="!loaderBlog" class="flex items-center justify-center mt-6">
                <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loaderBlog: false,
                dataFeaturedBlog: null,

            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.getFeaturedBlog()
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

        }
    }
</script>

