<template>
    <div>
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
                type: 'column',
                height: this.ukuran ? this.ukuran : 70,
                marginTop:0,
                marginLeft:0,
                marginBottom:0,
                marginRight:0,
            },
            title: {
                text: this.title ,
            },

            xAxis: {
                categories: this.kategori,
                crosshair: false,
                // visible: false,
                labels: {
                    enabled: true
                }
            },
            credits: {
                enabled: false,
            },
            yAxis: {
                min: 0,
                visible: false,
                labels: {
                    enabled: false
                },
                title: {
                    text: ''
                }

            },

            tooltip: {
                headerFormat: '<b>{point.key}</b>: {point.y}',
                pointFormat: '',
                footerFormat: '',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 10,
                    showInLegend: false
                },
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
            series: this.series

            }


        }

    }
}
</script>