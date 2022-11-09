<template>
    <div class="">
        <div class="tab-area flex items-center">
            <div v-for="(item, index) in listTab" :key="'tab' + index" 
                class="px-8 py-3 cursor-pointer" 
                :class="selectedTab === item.id ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'" 
                @click="$router.push(item.url)"
            >
                <div>{{item.label}}</div>
            </div>
        </div>

        <hr class="border-[#c2c2c2] -mt-[1px] mb-10">

    </div>
</template>


<script>
export default {
    props: ['listTab', 'selectedTab'],
    data() {
        return {
            
        }
    }
}
</script>