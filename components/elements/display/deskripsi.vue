<template>
    <div class="display-deskripsi">
        <div  class=" ">
            <div class="w-full font-normal p-3" v-for="(i, index) in dataDesk" :key="'deskripsi' + index" >
                <div class="mb-3" v-if="i.typeDeskripsi === 2"
                    v-html="i.paragraf[tempBahasa]"
                ></div>
                <div v-else>
                    <!-- <img :src="basePath+i.imgDeskripsiLarge" :alt="i.caption[tempBahasa]"> -->
                    <!-- <img :src="basePath+i.imgDeskripsiLarge" :alt="i.caption[tempBahasa]"> -->
                    <!-- <div class="mb-3" v-html="i.caption[tempBahasa]"></div> -->
                    <nuxt-img format="webp" :src="basePath+i.imgDeskripsiLarge" loading="lazy" />
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: ['list', 'selectedFlag'],
    computed: {
        basePath() {
            return process.env.BASE_URL
        },
        tempBahasa() {
            return this.selectedFlag === 'indonesia' ? 0 : 1
        },
        dataDesk: {
            get() {
                const vA = _.orderBy(this.list, 'sorter')
                return vA
            }
        }
    }
}
</script>