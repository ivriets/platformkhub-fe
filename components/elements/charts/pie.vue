<template>
    <highchart :options="chartOptionPie" />
</template>
<script>
export default {
    props: ['ukuran', 'seriesData', 'seriesName','title'],
    data() {
        return {
        }
    },
    computed: {

        // defaultWarna() {
        //     return this.$store.state.def.chartLegendColor
        // },

        chartOptionPie() {
            return {
                title: {
                    text: this.title,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 16
                },

                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    align:'left',
                    marginTop:0,
                    marginLeft:0,
                    marginBottom:0,
                    marginRight:0,
                    height: this.ukuran ? this.ukuran : '100%',
                    // width: this.ukuran ? this.ukuran : '100%',
                },

                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b>:{point.percentage:.0f}% ({point.y})',
                    split:true
                    // pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                colors: this.$store.state.def.chartLegendColor,
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        size: '100%',
                    },
                },

                series: [{
                    name: this.seriesName,
                    dataLabels: {enabled: false},
                    type: 'pie',
                    colorByPoint: true,
                    innerSize: '75%',

                    data: this.seriesData
                }]
            }
        },


    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {

        }
    }
}
</script>