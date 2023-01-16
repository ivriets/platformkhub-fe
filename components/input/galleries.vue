<template>
    <div>
            <div class="text-xl mb-1">Gallery</div>
            <InputImageUploadMulti 
                v-model="newImages"
                :label="''"
                :maxSize="1"
                :accept="'.png, .jpg, .jpeg'"
                :key="'key1'+imageKey"
            />
            <div class="flex items-center lg:gap-4 gap-2">
                <div v-for="(item, index) in newVal" :key="'galleri'+index" class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                    <img class="h-16" :src="item.type && item.type !=='' ? item.imgGambar : basePath+item.imgGambar" alt="gallery-image">
                    <button @click="deleteImage(index)" class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                        <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                    </button>
                </div>
            </div> 
    <!-- {{newVal}} -->
    </div>
    </template>
    
    <script>
    export default {
        props: ['value'],
        data() {
            return {
                newImages: [],
                // newVal: []
                imageKey:0,
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
            }
    
    
        },
        watch: {
            itemsLength(val) {
                const image = _.cloneDeep(this.newImages)
                const images = image.map(e => {
                    e.deskripsiGambar = ['','']
                    return e;
                })
                this.newVal = this.newVal.concat(images)
                this.newImages = [];
                this.imageKey +=1
            }
            // newImages(val) {
            //     this.newVal.push(val);
            //     this.$nextTick(() => {
            //         this.newImages = []
            //     })
            // }
        },
        methods: {
            deleteImage(index) {
                this.newVal.splice(index, 1)
            }
        }
    }
    </script>