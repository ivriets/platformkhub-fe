<template>
        <!-- <div class="bg-no-repeat bg-cover bg-center" style="background-image: url('/images/shome-5.png'); height: 100%;">
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
        </div> -->
        <div class="relative">
            <ElementsVideoPlayer :options="videoOptions" />
            <div class="absolute top-0 right-0 bottom-0 left-0" >
                <div class="h-full" :style="'background-image: linear-gradient(270deg, rgba(28, 32, 74, 0.9) 0.9%, rgba(28, 32, 74, 0.15) 100%);'" >
                    <div class="container mx-auto text-white pt-3 md:pt-[208px] pb-10 md:pb-[164px]">
                        <div class="grid grid-cols-12">
                            <div class="col-span-12 md:col-span-7"></div>
                            <div class="col-span-12 md:col-span-5 lg:w-3/4 px-4">
                                <div class="text-2xl md:text-7xl mb-4 font-lato font-bold">{{ $t('Virtual Exhibition') }}</div>
                                <div class="text-xs mb-8 md:text-sm">{{ $t('virtualExhibitionText') }}</div>
                                <a 
                                    href="https://ve-virtual.k-hub.id/" 
                                    target="_blank"
                                    class="rounded-lg bg-dua hover:bg-dua/60 transition-all duration-300 py-2 md:py-4 px-3 md:px-24 text-center text-empat font-semibold text-xs md:text-base"
                                >
                                    {{ $t('Kunjungi') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
</template>

<script>
    export default {
        computed: {
            videoOptions() {
                const def = {
                    autoplay: true,
                    controls: false,
                    muted:true,
                    loop:true,
                    fluid:true,
                    sources: [
                        { src: '/data/vid/hi-1080.mp4',type: 'video/mp4' },
                        { src: '/data/vid/med-1080.mp4',type: 'video/mp4' },
                        { src: '/data/vid/hi-480.mp4',type: 'video/mp4' },
                        { src: '/data/vid/med-480.mp4',type: 'video/mp4' },
                    ]
                }
                return def;
            }
        },
    }
</script>

