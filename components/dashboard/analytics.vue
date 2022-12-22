<template>
            <div class="grid grid-cols-10 gap-4">
            <!-- chart user in last 30 day -->
            <div class="col-span-4 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 text-warna-dua mb-8">
                    <div class="mb-5">
                        <div class="text-base">User in last 30 days</div>
                        <div class="text-[34px] text-warna-utama">23</div>
                    </div>
                    <div class="text-base mb-5">
                        <div>User per Day</div>
                        <div>grafik</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-sm text-warna-dua">Session</div>
                            <div class="bg-[#DFF7EB] text-rejected px-3 rounded font-semibold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 8l6 6H6z" fill="rgba(18,149,85,1)"/></svg>    
                                <div>10</div>
                            </div>
                        </div>
                        <div class="text-[34px] text-center text-warna-utama">00:00:26</div>
                    </div>
                    <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-sm text-warna-dua">Avg Session</div>
                            <div class="bg-[#DFF7EB] text-rejected px-3 rounded font-semibold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 8l6 6H6z" fill="rgba(18,149,85,1)"/></svg>    
                                <div>10</div>
                            </div>
                        </div>
                        <div class="text-[34px] text-center text-warna-utama">00:00:26</div>
                    </div>
                </div>

                <div class="font-semibold text-warna-dua cursor-pointer">Morea</div>
            </div>
            <div class="col-span-6 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 text-warna-dua">
                    <div class="mb-5">
                        <div class="text-base">Page View</div>
                        <div class="text-[34px] text-warna-utama">23</div>
                    </div>
                    <div class="grid grid-cols-1 gap-y-5">
                        <div>
                            <div class="flex items-center justify-between">
                                <div>/About</div>
                                <div>1234</div>
                            </div>
                            <div>
                                grafik
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <div>/Product</div>
                                <div>1234</div>
                            </div>
                            <div>
                                grafik
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <div>/Blog</div>
                                <div>1234</div>
                            </div>
                            <div>
                                grafik
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <div>/Program</div>
                                <div>1234</div>
                            </div>
                            <div>
                                grafik
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <div>/Organization</div>
                                <div>1234</div>
                            </div>
                            <div>
                                grafik
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// const {BetaAnalyticsDataClient} = require('@google-analytics/data');
// import { BetaAnalyticsDataClient } from '@google-analytics/data';


// const analyticsDataClient = new BetaAnalyticsDataClient();
export default {


    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getAnalytics()
        },
        async getAnalytics() {
            // const propertyId = 'G-XZNG8PQKQG';
            // const analyticsDataClient = new analyticsDataClient()

            // const result = await analyticsDataClient.runReport({
            //     property: `properties/${propertyId}`,
            //     dateRanges: [
            //         {
            //         startDate: '2020-03-31',
            //         endDate: 'today',
            //         },
            //     ],
            //     dimensions: [
            //         {
            //         name: 'city',
            //         },
            //     ],
            //     metrics: [
            //         {
            //         name: 'activeUsers',
            //         },
            //     ],
            // });

            // console.log('Report result:', result);
        }
    }

}
    
</script>