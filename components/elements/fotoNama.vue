<template>
    <div>
        <div class="mb-5 text-sm text-warna-delapan font-semibold">{{label}} ({{ jumlah }})</div>
        <div class="grid grid-cols-6 gap-x-1 gap-y-4 items-center">
            <div v-for="(item, index) in fromData" :key="'databranch' + index" :class="index <= 6 ? 'col-span-3' : ''">
                <div v-if="index <= 6" class="flex items-center gap-2">
                    <img :src="identitas === 'organisasi' ? item.image : item.imgFotoProfile" alt="img" class="rounded-full w-6 h-6 bg-green-200">
                    <div class="text-sm font-semibold">{{ identitas === 'organisasi' ? item.namaOrganisasi : item.individu }}</div>
                </div>
                <div v-if="jumlah >= 7 && index === 7">
                    <div @click="goTo" class="underline text-sm font-semibold text-warna-empat cursor-pointer">More</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['label', 'jumlah', 'fromData', 'clickMore', 'identitas'],
    data() {
        return {
            
        }
    },
    methods: {
        goTo() {
            this.$router.push(this.clickMore)
        }
    },
}
</script>