<template>
    <div>
    <CoolLightBox 
      :items="galleryItems" 
      :index="selectedImage"
      :effect="'fade'"
      @close="selectedImage = null">
    </CoolLightBox>

    <div class="flex flex-wrap bg-[#FAFAFA] px-[12px] py-[8px] gap-5 images-wrapper">
      <div
        class="h-[119px] w-[119px] bg-cover cursor-pointer hover:shadow-lg duration-300 transition-all ease-in-out "
        v-for="(image, imageIndex) in galleryItems"
        :key="imageIndex"
        @click="selectedImage = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')' }"
      ></div>
    </div>
    </div>

</template>
<script>
export default {
    props: ['gallery'],
    data() {
        return {
            selectedImage: null,
        }
    },
    computed: {
        basePath() {
            return process.env.BASE_URL
        },
        galleryItems() {
            return this.gallery.map(e => this.basePath+e.imgGambar)
        }
    }
}
</script>