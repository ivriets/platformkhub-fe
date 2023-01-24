<template>
    <div>
            <div class="text-xl mb-1">{{ $t('Gallery') }}</div>
            <InputImageUploadMulti 
                v-model="newImages"
                :label="''"
                :maxSize="1"
                :accept="'.png, .jpg, .jpeg'"
                :maxFiles="maxTotalFiles"
                :useCrop="true"
                :cropRatio="4/3"
                :disabled="disUpload"
            />

            <div class="flex flex-wrap items-center lg:gap-4 gap-2 mt-10">
                <div 
                    v-for="(item, index) in newVal.list" :key="'galleri'+index" 
                    class="relative bg-white shadow-none hover:shadow-md transition-all duration-200 ease-in-out overflow-hidden border border-gray-50 rounded-xl w-[115px] h-[64px]">
                    <img class="w-[115px] h-[64px] object-cover" :src="item.type && item.type !=='' ? item.imgGambar : basePath+item.imgGambar" alt="gallery-image">

                    <button @click="deleteImage(item,index)" class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                        <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                    </button>
                </div>
            </div> 
    </div>
</template>

<script>
export default {
    props: ['value'],
        data() {
            return {
                disUpload: true,
                newImages: [],
                imageKey:0,
                // maxTotalFiles: 5,
                newImage: {
                    file: null,
                    displayImage: ''
                },
                defaultMaxImages: 5
            }
        },
        computed: {
            newVal: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input',value)
                } 
            },
            basePath() {
                return process.env.BASE_URL
            },
            itemsLength() {
                return this.newImages.length
            },
            newValLength() {
                return this.newVal.list.length
            },
            maxTotalFiles() {
                //5
                return parseInt(this.defaultMaxImages) - parseInt(this.newVal.list.length) 
            }
    
    
        },
        watch: {
            itemsLength(val) {
                const image = this.newImages
                const images = image.map((e,index) => {
                    e.deskripsiGambar = ['khub' + index,'khub' + index]
                    e.imgGambar= e.displayImage

                    return e;
                })
                this.newVal.list = this.newVal.list.concat(images)
                this.newImages = [];
                this.imageKey +=1
            },
            maxTotalFiles(val) {
                if (parseInt(val) < 1  ) {
                    this.disUpload = true
                } else {
                    this.disUpload = false
                }
            }

            // newImages(val) {
            //     this.newVal.push(val);
            //     this.$nextTick(() => {
            //         this.newImages = []
            //     })
            // }
        },
        mounted() {
            if (this.newVal.list.length > (this.defaultMaxImages - 1)) {
                this.disUpload = true 
            } else {
                this.disUpload = false
            }
        },
        methods: {
            deleteImage(item,index) {
                if(item.pkGalleryId) this.newVal.deleted.push(item.pkGalleryId)
                this.newVal.list.splice(index, 1)
            }
        }
}
</script>

