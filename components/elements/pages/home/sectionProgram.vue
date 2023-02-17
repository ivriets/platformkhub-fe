<template>
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
                                <NuxtLink to="/resource" class="btn-readmore-home text-xs md:text-base py-2 md:py-3 px-2 md:px-4">
                                    {{$t('Lihat Semua Publikasi')}}
                                </NuxtLink>

                                <!-- <a href="/program" class="py-2 md:py-3 px-2 md:px-4 rounded-lg border border-warna-utama bg-umum flex items-center">
                                    <div class="whitespace-nowrap text-center mr-2 md:mr-4 text-xs md:text-base">{{$t('Lihat Semua Program')}}</div>
                                    <img src="/icons/icon-arrow-right-hitam.png" alt="arrow-right" width="16" height="16">
                                </a> -->
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
            <div v-if="!loaderProgram">
                <ElementsSkeletonCarousel 
                    :posisi="'kanan'"
                    :model="'program'"
                />
            </div>
            <!-- <div v-if="!loaderProgram" class="flex items-center justify-center mt-6">
                <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataFeaturedProgram: null,
                loaderProgram: false
            }
        },
        mounted() {
            this.getFeaturedProgram()
        },
        methods: {
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

        }
    }
</script>

