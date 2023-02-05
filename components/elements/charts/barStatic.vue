<template>
    <div>
        <div v-for="(item, index) in dataCharts" :key="'haruspulang'+index" class="mb-5">
            <div class="flex text-[#3D3D3D] items-center justify-between text-md mb-1">
                <h4 class="">{{ item.path }}</h4>
                <div>{{ item.value }}</div>
            </div>
            <div class="w-full h-[20px] bg-[#F0F1FF]">
                <div class="h-[20px] bg-[#222659]" :style="'width:'+item.persen+'%;'"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dataSeries','total'],
        computed: {
            dataCharts() {
                return this.dataSeries.map(e => {
                    e.persen = ((e.value / this.total) * 100).toFixed() 
                    return e;
                })
            }
        }
        
    }
</script>

