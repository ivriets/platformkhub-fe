<template>

    <div v-if="chartLoading" role="status">
        <div class="flex items-center justify-center text-center">
            <svg aria-hidden="true" class="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>
    <div v-else class="">
        <div class="grid grid-cols-10 gap-4">
            <!-- chart individu -->
            <div class="col-span-2 p-3">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                    <div class="text-center text-base mb-5">
                        Individual Need<br/> Verification
                    </div>
                    <div class="bg-warna-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">{{ totalIndividuNeedVerification }}</div>
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
                        <highchart :options="pieChartProgram" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-under-review rounded-full mr-2"></div>
                                <div>{{ ((logProgram.underReview/logProgram.all)*100).toFixed() }}% - Under Review ({{logProgram.underReview}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>{{ ((logProgram.draft/logProgram.all)*100).toFixed() }}% - Draft ({{logProgram.draft}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>{{ ((logProgram.needRevision/logProgram.all)*100).toFixed() }}% - Need Revision ({{logProgram.needRevision}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>{{ ((logProgram.approved/logProgram.all)*100).toFixed() }}% - Approved ({{logProgram.approved}})</div>
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
                        <highchart :options="pieChartEvent" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-under-review rounded-full mr-2"></div>
                                <div>{{ ((logEvent.underReview/logEvent.all)*100).toFixed() }}% - Under Review ({{logEvent.underReview}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>{{ ((logEvent.draft/logEvent.all)*100).toFixed() }}% - Draft ({{logEvent.draft}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>{{ ((logEvent.needRevision/logEvent.all)*100).toFixed() }}% - Need Revision ({{logEvent.needRevision}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>{{ ((logEvent.approved/logEvent.all)*100).toFixed() }}% - Approved ({{logEvent.approved}})</div>
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
                        <div class="text-3xl">{{ totalOrganisasiNeedVerification }}</div>
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
                        <highchart :options="pieChartResource" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-under-review rounded-full mr-2"></div>
                                <div>{{ ((logResources.underReview/logResources.all)*100).toFixed() }}% - Under Review ({{logResources.underReview}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>{{ ((logResources.draft/logResources.all)*100).toFixed() }}% - Draft ({{logResources.draft}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>{{ ((logResources.needRevision/logResources.all)*100).toFixed() }}% - Need Revision ({{logResources.needRevision}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>{{ ((logResources.approved/logResources.all)*100).toFixed() }}% - Approved ({{logResources.approved}})</div>
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
                        <highchart :options="pieChartBlog" />
                        <div class="text-xs text-warna-dua grid grid-cols-1 gap-y-3">
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-under-review rounded-full mr-2"></div>
                                <div>{{ ((logBlog.underReview/logBlog.all)*100).toFixed() }}% - Under Review ({{logBlog.underReview}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-draft rounded-full mr-2"></div>
                                <div>{{ ((logBlog.draft/logBlog.all)*100).toFixed() }}% - Draft ({{logBlog.draft}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-need-revision rounded-full mr-2"></div>
                                <div>{{ ((logBlog.needRevision/logBlog.all)*100).toFixed() }}% - Need Revision ({{logBlog.needRevision}})</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-[11px] h-[11px] bg-warna-approved-accepted rounded-full mr-2"></div>
                                <div>{{ ((logBlog.approved/logBlog.all)*100).toFixed() }}% - Approved ({{logBlog.approved}})</div>
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
            chartLoading: true,
            totalOrganisasiNeedVerification: 0,
            totalIndividuNeedVerification: 0,
            logProgram: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            pieChartProgram: {
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
            logEvent: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            pieChartEvent: {
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
            logResources: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            pieChartResource: {
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
            logBlog: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            pieChartBlog: {
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
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            this.loaderLog = false

            await this.$apiPlatform.get('moderator/').then(res => {
                this.logProgram = res.data.logProgram
                this.pieChartProgram.title.text = this.logProgram.all.toString()
                this.pieChartProgram.series[0].data =[{name: 'Under Review', y: this.logProgram.underReview,dataLabels:{enabled: false}}, {name: 'Draft',y: this.logProgram.draft,dataLabels: {enabled: false} },{name: 'Need Revision',y: this.logProgram.needRevision,dataLabels: {enabled: false}},{name: 'Approved',y: this.logProgram.approved,dataLabels: {enabled: false}}]
                this.logEvent = res.data.logEvent
                this.pieChartEvent.title.text = this.logEvent.all.toString()
                this.pieChartEvent.series[0].data =[{name: 'Under Review', y: this.logEvent.underReview,dataLabels:{enabled: false}}, {name: 'Draft',y: this.logEvent.draft,dataLabels: {enabled: false} },{name: 'Need Revision',y: this.logEvent.needRevision,dataLabels: {enabled: false}},{name: 'Approved',y: this.logEvent.approved,dataLabels: {enabled: false}}]
                this.logResources = res.data.logResource
                this.pieChartResource.title.text = this.logResources.all.toString()
                this.pieChartResource.series[0].data =[{name: 'Under Review', y: this.logResources.underReview,dataLabels:{enabled: false}}, {name: 'Draft',y: this.logResources.draft,dataLabels: {enabled: false} },{name: 'Need Revision',y: this.logResources.needRevision,dataLabels: {enabled: false}},{name: 'Approved',y: this.logResources.approved,dataLabels: {enabled: false}}]
                this.logBlog = res.data.logBlog
                this.pieChartBlog.title.text = this.logBlog.all.toString()
                this.pieChartBlog.series[0].data =[{name: 'Under Review', y: this.logBlog.underReview,dataLabels:{enabled: false}}, {name: 'Draft',y: this.logBlog.draft,dataLabels: {enabled: false} },{name: 'Need Revision',y: this.logBlog.needRevision,dataLabels: {enabled: false}},{name: 'Approved',y: this.logBlog.approved,dataLabels: {enabled: false}}]
            })
            
            await this.$apiPlatform.get('verificator/logOrganisasi/').then(res => {
                const data = res.data
                this.totalOrganisasiNeedVerification = data.totalPendingOrganisasi
            })
            await this.$apiPlatform.get('verificator/logIndividu/').then(res => {
                const data = res.data
                this.totalIndividuNeedVerification = data.totalPendingIndividu
            })
            this.chartLoading = false
        }
    }
}
</script>