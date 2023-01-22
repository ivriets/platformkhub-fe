<template>
    <div class="py-10 px-6">
        <div class="flex items-center mb-4">
            <div class="w-[240px] mr-4">
                <ElementsSearchBarResponsive 
                    v-model="filter.search"
                    :placeholder="'Search'"
                    :gaya="'icon'"
                    :name="'searchtext'"
                />
            </div>
            <div class="flex flex-grow">
                <select name="filtertotalpage" id="filtertotalpage" class="w-[180px] outline-none border border-warna-empat rounded-md px-2 py-[6px] cursor-pointer">
                    <option value="10">10 row per page</option>
                    <option value="20">50 row per page</option>
                    <option value="50">100 row per page</option>
                </select>
            </div>
        </div>
        <div class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div v-if="loaderLog" class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
                <button 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    @click="selectKapsul(item)"
                    :disabled="selectedKapsul.id === item.id || item.length === 0"
                    :class="selectedKapsul.id === item.id ? 'border-warna-empat' : ' border-warna-tujuh'"
                    class="button-kapsul"

                >
                {{item.label}} ({{item.length}})
                </button>
            </div>
            <div class="px-[14px] py-[9px]">
                <div class="flex items-center">
                    <div class="text-sm font-semibold text-[#757575]">Sort by:</div>
                    <select v-model="sorter.createdAt" name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                        <option value="desc">Latest</option>
                        <option value="asc">Oldest</option>
                    </select>
                </div>
            </div>
        </div>


        <div class="bg-white rounded-xl shadow-md border border-gray-100 text-sm overflow-hidden relative">
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="dataTable"
            >
                <template v-slot:namaEvent="{item}">
                    <NuxtLink class="hover:text-blue-700" :to="'/moderations/event/'+item.eventId" >{{item.namaEvent[bahasa]}}</NuxtLink>
                </template>
                <template v-slot:submission="{ item }">
                    <ElementsDisplayStatusSubmission :submission="item.submission" />
                </template>

            </ElementsTable>
            <div v-if="!loaderPage" class="absolute top-0 right-0 left-0 bottom-0 bg-white/80 flex items-center justify-center">
                <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
            </div>
        </div>
        <div  class="pagination-area text-center mt-6">
            <ElementsPaginasiSpa 
                v-model="currentPage"
                :totalPage="totalPage"
                :totalVisible="totalVisible"
                :loaderPage="!loaderPage"
                :key="'pageset'+keyPage"
            />
        </div>

    </div>
</template>


<script>

export default {
    data() {
        return {
            prefixName: 'listevent',
            loaderPage: false,
            loaderLog: false,
            selectedKapsul: null,
            showRow: 10,

            // KEBUTUHAN PAGINASI
            startIndex: 0,
            totalVisible: 5,
            limit: 10,
            keyPage: 0,
            offset: 0,
            totalPage: 1,
            currentPage: 1,
            //
            dataTable:[],
            kapsul: [
                {
                    id: 'all',
                    label: 'All',
                    endpoint: '',
                },
                {
                    id: 'draft',
                    label: 'Draft',
                    endpoint: '2',
                },
                {
                    id: 'underreview',
                    label: 'Under Review',
                    endpoint: '1',
                },
                {
                    id: 'approved',
                    label: 'Approved',
                    endpoint: '4',
                },
                {
                    id: 'needrevision',
                    label: 'Need Revision',
                    endpoint: '3',
                }
            ],
            opsiShowRow:[
                {
                    id: 10,
                    label: ['10 baris per halaman', '10 row per page']
                },
                {
                    id: 20,
                    label: ['20 baris per halaman', '20 row per page']
                },
                {
                    id: 50,
                    label: ['50 baris per halaman', '50 row per page']
                }
            ],
            filter: {
                search: '',
            },
            sorter: {
                createdAt: 'desc'
            },
            masterTable: [
                {
                    header: 'Title',
                    value: 'namaEvent',
                    tipe: 'string',
                    display: true,
                    klik: true
                },
                {
                    header: 'Organization',
                    value: 'namaOrganisasi',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'submission',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Created At',
                    value: 'createdAt',
                    tipe: 'date',
                    display: true
                },
            ],
            tableDetail: [
                {
                    header: 'Title',
                    itemValue: 'namaEvent'
                },
                {
                    header: 'Organization',
                    itemValue: 'namaOrganisasi',
                    itemClass: 'w-3/12'

                },
                {
                    header: 'Status',
                    itemValue: 'submission',
                    itemClass: 'w-2/12'

                },
                {
                    header: 'Created At',
                    itemValue: 'createdAt',
                    type: 'date',
                    format: 'DD MMM YYYY HH:ss',
                    itemClass: 'w-2/12'
                }
            ]


        }
    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        halamanStore() {
            return this.$store.state.halamanEvent
        }

    },


    watch: {
        currentPage(val) {
            this.$store.commit('setHalamanEvent', val)
            this.masterPoint()
        },

        'sorter.createdAt'() {
            this.currentPage = 1;
            this.masterPoint()
        },

        showRow(val) {
            this.limit = val
            this.masterPoint()
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.getLogEvent()
            this.selectKapsul(this.kapsul[0])
            this.currentPage = this.halamanStore
            this.masterPoint()
        },

        keyUp(event) {
            // console.log(event)
            if (event.key === 'enter') {
                this.masterPoint()
            }
        },

        selectKapsul(item) {
            this.selectedKapsul = item
            this.currentPage = 1
            this.masterPoint()
        },

        async masterPoint() {
            const item = this.selectedKapsul

            this.loaderPage = false
            this.startIndex = (this.currentPage - 1) * this.limit

            await this.$apiPlatform.get('moderator/events/?submission='+item.endpoint+'&limit='+this.limit+'&offset='+this.startIndex+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {
                
                this.dataTable = res.data.results.map(e => {
                    const data = {
                        eventId: e.eventId,
                        namaEvent: e.judulActivity,
                        namaOrganisasi: e.myOrganisasi.namaOrganisasi,
                        submission: e.submission,
                        createdAt: e.createdAt
                    }
                    return data
                })
                this.totalPage = Math.ceil(res.data.length / this.limit)
                this.keyPage += 1

                this.$nextTick(() => {
                    this.loaderPage = true
                })
            })
        },

        async getLogEvent() {
            this.loaderLog
            
            await this.$apiPlatform.get('moderator/').then(res => {
                const data = res.data.logEvent
                this.kapsul= [
                    {
                        id: 'all',
                        label: 'All',
                        length: data.all,
                        endpoint: ''
                    },
                    {
                        id: 'draft',
                        label: 'Draft',
                        length: data.draft,
                        endpoint: '2'
                    },
                    {
                        id: 'underreview',
                        label: 'Under Review',
                        length: data.underReview,
                        endpoint: '1'
                    },
                    {
                        id: 'approved',
                        label: 'Approved',
                        length: data.approved,
                        endpoint: '4'
                    },
                    {
                        id: 'needrevision',
                        label: 'Need Revision',
                        length: data.needRevision,
                        endpoint: '3'
                    }
                ]

                this.$nextTick(() => {
                    this.loaderLog = true
                })
            })
        }

    }
}
</script>