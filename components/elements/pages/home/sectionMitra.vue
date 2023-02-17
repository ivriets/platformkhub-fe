<template>
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
</template>

<script>
    export default {
        data() {
            return {
                dataMitra:null,
                loaderMitra: false
            }
        },
        mounted() {
            this.initialize()
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
    },


        methods: {
            initialize() {
                this.getMitra()
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
        }
    }
</script>

