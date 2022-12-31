<template>
    <div class="displayjourney">
        <div v-for="(item, index) in journey" :key="'journey'+index" class="journeyitem flex items-center gap-7 pb-10">
            <div class="ji-img-wrapper w-[86px] h-[86px] rounded-full bg-[#F5F5F5]">
                <div class="ji-img flex items-center justify-center w-[86px] h-[86px] bg-[#F5F5F5] border border-warna-empat rounded-full overflow-hidden">
                    <div class="rounded-full flex-none border border-warna-empat bg-no-repeat bg-cover bg-center w-16 h-16" :style="'background-image: url('+basePath+item.imgThumbnailJourney+');'"></div>
                </div>
            </div>
            <div class="flex-auto">
                <div class="font-lato text-warna-empat leading-6 mb-2">{{ selectedFlag === 'indonesia' ? item.judulJourney[0] : item.judulJourney[1] }}</div>
                <div class="text-sm text-warna-enam leading-5plus">{{ selectedFlag === 'indonesia' ? item.deskripsi[0] : item.deskripsi[1] }}</div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props: ['journey', 'selectedFlag'],
    data() {
        return {
            
        }
    },
    computed: {
        basePath() {
            return process.env.BASE_URL
        }
    }
}
</script>