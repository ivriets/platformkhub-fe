<template>
    <div class="pl-5 h-[350px] overflow-hidden">
        <div class="hidden md:hidden lg:block">
            <div  :class="posisi==='kanan' ? 'flex justify-end' : 'flex'" class="gap-5">
                <ElementsSkeletonCarouselItem 
                    v-for="(item) in 4" :key="model+item"
                    :segmen="segmen"
                />
            </div>
        </div>
        <div class="hidden md:block lg:hidden">
            <div  :class="posisi==='kanan' ? 'flex justify-end' : 'flex'" class="gap-5">
                <ElementsSkeletonCarouselItem 
                    v-for="(item) in 3" :key="model+item"
                    :segmen="segmen"
                />
            </div>
        </div>
        <div class="block md:hidden lg:hidden">
            <div  :class="posisi==='kanan' ? 'flex justify-end' : 'flex'" class="gap-5">
                <ElementsSkeletonCarouselItem 
                    v-for="(item) in 1" :key="model+item"
                    :segmen="segmen"
                />
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:['posisi', 'model'],
        computed: {
            segmen() {
                if (this.model === 'resources') {
                    return ['image', 'chip','title', 'desc', 'author']
                } else if (this.model === 'program') {
                    return ['image','title','desc','author']
                } else if (this.model === 'blog') {
                    return ['image','title','desc','kategori']

                }
            }
        }

    }
</script>

