<template>
    <div class="">
        <div class="flex items-center justify-between mb-5">
            <div class="text-center text-xl">
                {{title}}
            </div>
            <button @click="$router.push(landingPage)" class="button-standar-outline">{{ $t('See List') }}</button>
        </div>
        <div class="w-full flex items-center gap-4">
            <!-- <highchart :options="pieChartProgram" /> -->
            <div class="w-5/12">
                <ElementsChartsPie 
                    :seriesData="seriesData"
                    :seriesName="title"
                    :title="chartTitle"
                />
            </div>
            <div class="w-7/12">
                <div class="text-xs text-dua grid grid-cols-1 gap-y-3">
                    <div 
                        v-for="(item, index) in chartLegend" :key="'keychart'+title+index" 
                        class="flex items-center">
                        <div class="w-[11px] h-[11px] rounded-full mr-2" :style="'background:'+item.color+';'"></div>
                        <div class="w-[25px]">
                            {{item.persen}}%
                        </div>
                        <div>- {{ item.name }} ({{item.y}})</div>
                        <!-- <div>{{ ((logData.underReview/logData.all)*100).toFixed() }}% - Under Review ({{logData.underReview}})</div> -->
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: ['logData', 'title', 'landingPage'],
    data() {
        return {

        }
    },
    computed: {
        defaultWarna() {
            return this.$store.state.def.chartLegendColor
        },

        seriesData() {
            const convert = Object.entries(this.logData);
            const convert2 = convert.map(e => {
                const data = {
                    name: _.startCase(e[0]),
                    y:e[1]
                }
                return data;
            }).filter(e => e.name !== 'All' && e.name !=='Declined')
            return convert2
        },
        chartTitle() {
            const total = this.logData.all
            return '<span style="font-size:14px;">Total</span><br><span style="font-size:30px;font-weight:600;">'+ total +'</span>'
        },
        chartLegend() {
            const all = this.logData.all
            return this.seriesData.map((e,index) => {
                e.color = this.defaultWarna[index];
                e.persen = ((e.y/all) * 100).toFixed()
                return e;
            })
        }


    }
}
</script>