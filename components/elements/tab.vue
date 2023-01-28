<template>
    <div class="">
        <div class="tab-area flex items-center">
            <button v-for="(item, index) in listTab" :key="'tab' + index" 
                class="px-8 py-3 " 
                :class="selectedTab === item.id ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua hover:opacity-60'" 
                :disabled="selectedTab === item.id ? true : false"
                @click="goTo(item)"
            >
                <div>{{ $t(item.label)}}</div>
            </button>
        </div>

        <hr class="border-[#c2c2c2] -mt-[1px] mb-10">

    </div>
</template>


<script>
export default {
    props: ['listTab', 'selectedTab', 'landing', 'value'],
    data() {
        return {
            
        }
    },
    methods: {
        goTo(item) {
            // console.log(item)
            if (this.landing && this.landing === 'spa') {
                this.$emit('input', item.id)
            } else {
                this.$router.push(item.url)
            }
        }
    }
}
</script>