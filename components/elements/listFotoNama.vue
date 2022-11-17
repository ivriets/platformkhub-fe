<template>
    <div>
        <div class="mb-5 text-sm text-warna-delapan font-semibold">{{title}} ({{ jumlah }})</div>
        <div class="grid grid-cols-6 gap-x-1 gap-y-4 items-center">
            <div v-for="(item, index) in fromData" :key="'databranch' + index" :class="index <= maxItem-1 ? 'col-span-3' : ''">
                <div v-if="index <= maxItem-1 " class="flex items-center gap-2">
                    <img :src="basePath+item.image" alt="img" class="rounded-full w-6 h-6 bg-green-200">
                    <div class="text-sm font-semibold">{{item.nama}}</div>
                </div>
                <div v-if="jumlah >= maxItem && index === maxItem">
                    <div @click="goTo" class="underline text-sm font-semibold text-warna-empat cursor-pointer">More</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['title', 'jumlah', 'fromData', 'clickMore', 'maxItem'],
    data() {
        return {
            
        }
    },
    computed: {
        basePath() {
            return process.env.BASE_URL
        }
    },
    methods: {
        goTo() {
            this.$router.push(this.clickMore)
        }
    },
}
</script>