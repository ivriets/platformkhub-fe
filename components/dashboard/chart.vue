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
                    <div class="border border-warna-empat rounded-lg py-2 cursor-pointer">
                        <div class="font-semibold text-center">See List</div>
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
                        <div class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer">
                            <div class="font-semibold text-center">See List</div>
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
                                <div class="w-[11px] h-[11px] bg-warna-approved rounded-full mr-2"></div>
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
                        <div class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer">
                            <div class="font-semibold text-center">See List</div>
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
                                <div class="w-[11px] h-[11px] bg-warna-approved rounded-full mr-2"></div>
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
                    <div class="border border-warna-empat rounded-lg py-2 cursor-pointer">
                        <div class="font-semibold text-center">See List</div>
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
                        <div class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer">
                            <div class="font-semibold text-center">See List</div>
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
                                <div class="w-[11px] h-[11px] bg-warna-approved rounded-full mr-2"></div>
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
                        <div class="border border-warna-empat rounded-lg py-2 px-5 cursor-pointer">
                            <div class="font-semibold text-center">See List</div>
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
                                <div class="w-[11px] h-[11px] bg-warna-approved rounded-full mr-2"></div>
                                <div>90% - Approved (38)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-[#9E9E9E] my-[35px] mx-3">

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

                <div class="font-semibold text-warna-dua cursor-pointer">More</div>
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