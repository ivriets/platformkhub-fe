<template>
    <div class="">
        <div class="grid grid-cols-10 gap-4">
            <!-- chart individu -->
            <div class="col-span-2 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="text-center text-base mb-5">
                        Individual Need<br/> Verification
                    </div>
                    <div class="bg-warna-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">1</div>
                    </div>
                    <div @click="$router.push('/verifications/individu')" class="border border-warna-empat rounded-lg py-2 cursor-pointer hover:bg-gray-50 text-center">
                        <button class="font-semibold">See List</button>
                    </div>
                </div>
            </div>

            <!-- chart program -->
            <div class="col-span-4 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="flex items-center justify-between">
                        <div class="text-center text-xl">
                            Program
                        </div>
                        <div @click="$router.push('/moderations/program')" class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer hover:bg-gray-50 text-center">
                            <button class="font-semibold">See List</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-around">
                        <highchart :options="pieChartOption1" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-under-review rounded-full mr-2"></div>
                                <div>5% - Under Review (2)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>0% - Draft (0)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>5% - Need Revision (1)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>90% - Approved (38)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- chart event -->
            <div class="col-span-4 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="flex items-center justify-between">
                        <div class="text-center text-xl">
                            Event
                        </div>
                        <div @click="$router.push('/moderations/event')" class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer hover:bg-gray-50 text-center">
                            <button class="font-semibold">See List</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-around">
                        <highchart :options="pieChartOption2" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-suspended rounded-full mr-2"></div>
                                <div>5% - Under Review (2)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>0% - Draft (0)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>5% - Need Revision (1)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>90% - Approved (38)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- chart organisasi -->
            <div class="col-span-2 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="text-center text-base mb-5">
                        Organization Need<br/> Verification
                    </div>
                    <div class="bg-warna-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">1</div>
                    </div>
                    <div @click="$router.push('/verifications/organisasi')" class="border border-warna-empat rounded-lg py-2 cursor-pointer hover:bg-gray-50 text-center">
                        <div class="font-semibold">See List</div>
                    </div>
                </div>
            </div>

            <!-- chart resource -->
            <div class="col-span-4 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="flex items-center justify-between">
                        <div class="text-center text-xl">
                            Resource
                        </div>
                        <div @click="$router.push('/moderations/resource')" class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer hover:bg-gray-50 text-center">
                            <button class="font-semibold">See List</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-around">
                        <highchart :options="pieChartOption1" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-suspended rounded-full mr-2"></div>
                                <div>5% - Under Review (2)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>0% - Draft (0)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>5% - Need Revision (1)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>90% - Approved (38)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- chart blog -->
            <div class="col-span-4 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="flex items-center justify-between">
                        <div class="text-center text-xl">
                            Blog
                        </div>
                        <div @click="$router.push('/moderations/blog')" class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer hover:bg-gray-50 text-center">
                            <button class="font-semibold">See List</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-around">
                        <highchart :options="pieChartOption1" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-suspended rounded-full mr-2"></div>
                                <div>5% - Under Review (2)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>0% - Draft (0)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>5% - Need Revision (1)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>90% - Approved (38)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-[#9E9E9E] my-[35px] mx-3">

        <DashboardAnalytics />
    </div>
</template>


<script>
export default {
    data() {
        return {
            pieChartOption1: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    align:'right',
                    height: '170',
                    width: '170'
                },
                title: {
                    text: '42',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 16
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                // accessibility: {
                //     point: {
                //         valueSuffix: '%'
                //     }
                // },
                colors: [
                    'rgba(0, 19, 255, 1)',
                    'rgba(255, 199, 0, 1)',
                    'rgba(255, 92, 0, 1)',
                    'rgba(18, 149, 85, 1)',
                    'rgba(209, 13, 13, 1)'
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
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
                        // startAngle: -90,
                        // endAngle: 90,
                        // center: ['50%', '75%'],
                        size: '100%'
                    },
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Program',
                        innerSize: '75%',
                        data: [
                            {
                                name: 'Under Review',
                                y: 2,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Draft',
                                y: 0,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Need Revision',
                                y: 2,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Approved',
                                y: 38,
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        ]
                    }
                ]
            },
            pieChartOption2: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    align:'right',
                    height: '170',
                    width: '170'
                },
                title: {
                    text: '42',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 16
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                // accessibility: {
                //     point: {
                //         valueSuffix: '%'
                //     }
                // },
                colors: [
                    'rgba(0, 19, 255, 1)',
                    'rgba(255, 199, 0, 1)',
                    'rgba(255, 92, 0, 1)',
                    'rgba(18, 149, 85, 1)',
                    'rgba(209, 13, 13, 1)'
                ],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
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
                        // startAngle: -90,
                        // endAngle: 90,
                        // center: ['50%', '75%'],
                        size: '100%'
                    },
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Event',
                        innerSize: '75%',
                        data: [
                            {
                                name: 'Under Review',
                                y: 2,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Draft',
                                y: 0,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Need Revision',
                                y: 2,
                                dataLabels: {
                                    enabled: false
                                }
                            },
                            {
                                name: 'Approved',
                                y: 38,
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        ]
                    }
                ]
            },
        }
    },
}
</script>