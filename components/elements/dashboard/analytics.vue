<template>
    <div>
        <h2 class="text-[#616161] text-md font-semibold ">Google Analytics</h2>
        <div class="my-5">
            <div class="grid grid-cols-12 gap-10">
                <div class="col-span-12 md:col-span-6">
                    <div class="w-full grid grid-cols-12 gap-10">
                        <div class="col-span-12" :class="cardClass">
                            <h3 class="text-md text-empat">{{ $t('User in last 30 days') }}</h3>
                            <div class="text-[34px] text-empat mb-5">{{ total }}</div>
                            <div class="text-[#616161] text-sm font-semibold">{{ $t('User per Day') }}</div>
                            <ElementsChartsKolom 
                                :series="series"
                                :kategori="kategori"
                            />
                        </div>
                        <div class="col-span-6" :class="cardClass">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-sm text-dua">Session</div>
                                <div class="bg-[#DFF7EB] text-rejected px-3 rounded font-semibold flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 8l6 6H6z" fill="rgba(18,149,85,1)"/></svg>    
                                    <div>10</div>
                                </div>
                            </div>
                            <div class="text-[34px] text-center text-warna-utama">00:00:26</div>
                        </div>
                        <div class="col-span-6" :class="cardClass">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-sm text-dua">Avg Session</div>
                                <div class="bg-[#DFF7EB] text-rejected px-3 rounded font-semibold flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 8l6 6H6z" fill="rgba(18,149,85,1)"/></svg>    
                                    <div>10</div>
                                </div>
                            </div>
                            <div class="text-[34px] text-center text-warna-utama">00:00:26</div>
                        </div>
                        <div class="col-span-12">
                            <a href="https://analytics.google.com/analytics/web/#/" target="_blank" 
                            class="font-semibold text-dua hover:text-dua/60">More</a>

                        </div>
                    </div>
                    
                </div>
                <div class="col-span-12 md:col-span-6" :class="cardClass">
                    <h3 class="text-md text-empat">{{ $t('Page View') }}</h3>
                    <div class="text-[34px] text-empat mb-5">{{ total }}</div>
                    <ElementsChartsBarStatic 
                        :dataSeries="pageView"
                        :total="totalPageView"
                    />
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    data() {
        return {
            // total: 10,
            cardClass: 'bg-white rounded-3xl shadow-md border border-gray-100 p-6',
            kategori: ['1 Des 2020', '2 Des 2020', '3 Des 2020', '4 Des 2020', '5 Des 2020', '7 Des 2020'],
            series: [{
                name: 'User per Day',
                color: '#222659',
                data: [
                    56,78,32,45,0,54,98,12,13,15,85,21,22,16,17,18,13,14,22,21,23,28,56,68,78,95,95,65,47,48
                ]
            }],
            pageView: [
                {
                    path: '/about',
                    value: 153
                },
                {
                    path: '/product',
                    value: 685
                },
                {
                    path: '/blog',
                    value: 457
                },
                {
                    path: '/program',
                    value: 445
                },
                {
                    path: '/organization',
                    value: 578
                }
            ]

        }
    },
    computed: {
        total() {
            return _.sum(this.series[0].data)
        },
        totalPageView() {
            return _.sumBy(this.pageView, 'value')
        }
    },
    mounted() {
        this.ambilData()
    },
    methods: {
        async ambilData() {

            const req = {
                currencyCode: 'IDR',
                "dateRanges": [{ "startDate": "29daysAgo", "endDate": "today" }],
                "metrics": [{ "name": "sessions" }]

            }
            const endPoint = 'https://analyticsdata.googleapis.com/v1beta/properties/266892916:runReport'
            await this.$axios.post(endPoint,req,{
                headers: {
                    Authorization: 'Bearer ' + this.$cookies.get('atoken')
                }
            }).then(res => {
                console.log(res.data)
            })
        }
    }
}
</script>