<template>
        <div>
            <div :class="(posisi==='kanan') ? 'flex justify-end' : ''">
                <div class="carousel-default w-full md:w-10/12 mb-6">
                    <VueSlickCarousel ref="carousel" v-bind="slickOptions">
                        <div v-for="(item, index) in dataCard" :key="'card'+index" class="px-2">
                            <div class="bg-white rounded-xl px-3 pt-3 pb-5">
                                <div 
                                    class="w-full h-[150px] bg-no-repeat bg-cover bg-center rounded mb-3 lg:mb-4 p-2 shadow"
                                    :style="'background-image: url('+basePath+item.imgThumbnail+');'"
                                >
                                </div>
                                <!-- <div class="wrapper-img rounded overflow-hidden mb-3">
                                    <img :src="basePath+item.imgThumbnail" alt="thumbnail" class="w-full h-full">
                                </div> -->
                                <div class="flex">
                                    <div v-if="kategori === 'resource'" class="text-xs px-3 py-[2px] rounded-xl text-warna-utama bg-warna-tujuh border border-warna-delapan mb-2">{{ item.resourcesFiles.typeResources.nama[bahasa] }}</div>
                                </div>
                                <div v-if="kategori === 'program'" class="text-xs text-warna-enam mb-2">{{ $dayjs(item.tanggalMulai).format('DD MMM YYYY') }} - {{ $dayjs(item.tanggalSelesai).format('DD MMM YYYY') }}</div>
                                
                                <div class="mb-[6px] font-lato font-semibold text-warna-empat">
                                    <div v-if="['resource', 'blog'].includes(kategori)" class="text-sm md:text-base line-clamp-3 h-14 md:h-[72px]">{{ item.judulArtikel[bahasa] }}</div>
                                    <div v-else-if="['program', 'event'].includes(kategori)" class="text-sm md:text-base line-clamp-3 h-14 md:h-[72px]">{{ item.judulActivity[bahasa] }}</div>
                                </div>
            
                                <div v-if="kategori === 'blog'">
                                    <div class="line-clamp-4 text-sm text-warna-enam mb-2 h-20" v-html="item.deskripsiPendek[bahasa]"></div>
                                    
                                    <div class="mb-2">
                                        <div v-for="(item2, index2) in item.kategoriArtikel" :key="'kategori'+index2" class="text-warna-enam font-extrabold text-xs inline-block mr-1">
                                            
                                            <div v-if="index2 < maxKategoriArtikel">
                                                <span class="">{{ item2.nama[bahasa] }}</span><span v-if="index2 + 1 < item.kategoriArtikel.length">, </span><span v-if="index2== maxKategoriArtikel-1 && item.kategoriArtikel.length > maxKategoriArtikel">dll</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-xs text-warna-enam mb-2">{{ $dayjs(item.dataPublish).format('DD MMMM YYYY') }}</div>
                                </div>
                                
                                
                                <div class="text-xs md:text-sm text-warna-enam truncate">{{ item.myOrganisasi.namaOrganisasi }}</div>
                            </div>
                        </div>
                    </VueSlickCarousel>
                    
                </div>
                
            </div>
            <div class="container px-4 md:px-0 md:mx-auto gap-x-6" :class="(posisi==='kiri') ? 'flex' : 'flex justify-end'">
                <button @click="showPrev" class="btn-prev-next"><img src="/icons/icon-left.png" alt="i-left" width="20px" height="20px" class="mx-auto"></button>
                <button @click="showNext" class="btn-prev-next"><img src="/icons/icon-right.png" alt="i-right" width="20px" height="20px" class="mx-auto"></button>
            </div>
        </div>
</template>


<script>
export default {
    props: ['dataCard', 'kategori', 'posisi', 'path', 'idValue'],
    data() {
        return {
            maxKategoriArtikel: 3,
            slickOptions: {
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000,
                dots: false,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 1440,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1280,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    }
                ]
            }
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
        }
    },
    methods: {
        showNext() {
            this.$refs.carousel.next()
        },

        showPrev() {
            this.$refs.carousel.prev()
        },

        goto(item) {
            this.$router.push(this.path+item[this.idValue])
        },

        doNothing() {
            
        },
    }
}
</script>