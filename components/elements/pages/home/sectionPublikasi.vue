<template>
    <div class="section-publikasi bg-no-repeat bg-contain bg-right " style="background-image: url(/images/shome-2.png); height: 100%;">
        <div class="">
            <div class="container mx-auto mb-[42px] px-4">
                <h2 class="font-bold text-2xl md:text-4xlplus">{{$t('Publikasi')}}</h2>
                <div class="lg:flex lg:items-center gap-x-[20px] lg:gap-x-[60px]">
                    <div class="w-6/12 text-xs md:text-base">{{ $t('Banner Resource') }}</div>
                    <div class="max-w-fit mt-5 lg:mt-0">
                        <!-- <NuxtLink to="/resource" class="py-2 md:py-3 px-2 md:px-4 rounded-lg border border-warna-utama bg-umum flex items-center">
                            <div class="text-center mr-2 md:mr-4 text-xs md:text-base whitespace-nowrap">{{$t('Lihat Semua Publikasi')}}</div>
                            <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                        </NuxtLink> -->
                        <!-- <NuxtLink to="/resource" class="btn-readmore-home text-xs md:text-base py-2 md:py-3 px-2 md:px-4">
                            {{$t('Lihat Semua Publikasi')}}
                        </NuxtLink> -->

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
            <div v-if="!loaderResource">
                <ElementsSkeletonCarousel 
                    :posisi="'kiri'"
                    :model="'resources'"
                />
            </div>
            <!-- <div v-if="loaderResource" class="flex items-center justify-center mt-6">
                <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataFeaturedResource: null,
                loaderResource: false

            }
        },
        mounted() {
            this.getFeaturedResource()
        },
        methods: {
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

        }
        
    }
</script>

