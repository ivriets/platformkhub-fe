<template>
    <div class="barchart-persen-dashboard">
        <highchart :options="chartOptions" />
    </div>
</template>
<script>
export default {
    props: ['series', 'kategori', 'ukuran', 'title'],
    data() {
        return {

        }
    },
    computed: {
        chartOptions() {

            return {

                chart: {
                        type: 'bar',
                        marginTop:10,
                        marginLeft:0,
                        marginBottom:0,
                        marginRight:0,

                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        categories: ['/About', '2020/21', '2019/20', '2018/19', '2017/18'],
                        crosshair: false,
                        title: null,
                        labels: {
                            enabled:true
                        }

                    },
                    yAxis: {
                        min: 0,
                        crosshair: false,
                        gridLineWidth: 0,
                        minorGridLineWidth: 0,

                        title: {
                            text: null
                        },
                        labels: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true
                    },
                    plotOptions: {
                        bar: {
                            stacking: 'percent',
                            showInLegend: false,
                            // pointWidth: 10,
                        }
                    },
                    series: [
                    {
                        name: 'Total',
                        color: '#F0F1FF',
                        data: [18, 18, 18, 18, 18]
                    },
                    {
                        name: 'Page View',
                        color: '#222659',
                        dataLabels: {
                            enabled: true,
                            inside: false
                        },
                        data: [4, 4, 2, 4, 4]
                    }, ]

            }

        }
    }
}
</script>

