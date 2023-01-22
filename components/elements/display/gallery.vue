<template>
    <div class="flex flex-wrap bg-[#FAFAFA] px-[12px] py-[8px]">
        <div v-for="(item, index) in gallery" :key="'gallery' + index" class="w-[119px] h-[119px] overflow-hidden">
            <div 
                class="bg-no-repeat bg-center bg-contain rounded-[5px] bg-white w-[119px] h-[119px]" 
                :style="'background-image: url('+basePath+item.imgGambar+'); '"
            >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['gallery'],
    computed: {
        basePath() {
            return process.env.BASE_URL
        }
    }
}
</script>