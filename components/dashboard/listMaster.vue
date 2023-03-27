<template>
    <div class="py-10 px-6">
        <div class="flex items-center mb-4">
            <div v-if="loaderPage" class="w-[240px] mr-4">
                <ElementsSearchBarButton 
                    v-model="filter.search"
                    :placeholder="$t('Search')"
                    :name="'searchtext'"
                />
            </div>
            <div v-if="!loaderPage" class="w-[240px] h-[34px] mr-4 animate-pulse bg-gray-200 rounded-md"></div>
            <div v-if="loaderPage" class="w-[180px] input-overide-show">
                <InputSelect 
                    v-model="showRow"
                    :opsi="opsiShowRow"
                    :name="prefixName+'showrow'"
                    :key="'ks'+keyShow"
                    :multilang="true"
                />
            </div>
            <div v-if="!loaderPage" class="w-[180px] h-[34px] mr-4 animate-pulse bg-gray-200 rounded-md"></div>

        </div>

        <div v-if="loaderPage" class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div  class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
                <button 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    @click="selectKapsul(item)"
                    :disabled="selectedKapsul.id === item.id ||  item.length === 0"
                    :class="selectedKapsul.id === item.id ? 'border-warna-empat' : ' border-warna-tujuh'"
                    class="button-kapsul"
                >
                {{item.label}} ({{item.length}})
                </button>
            </div>
            <div class="px-[14px] py-[9px]">
                <div class="flex items-center">
                    <div class="text-sm font-semibold text-[#757575]">{{ $t('Sort by') }}:</div>
                    <select v-model="sorter.createdAt" name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                        <option value="desc">{{ $t('Latest') }}</option>
                        <option value="asc">{{ $t('Oldest') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="!loaderPage"
            class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5"
        >
            <div class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7] animate-pulse">
            <button 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    class="button-kapsul bg-gray-200 text-gray-200"
                    disabled
                >
                {{item.label}} ({{item.length}})
                </button>
            </div>
            <div class="px-[14px] py-[9px]">
                <div class="flex items-center animate-pulse">
                    <div class="h-[20px] w-[50px] bg-gray-200 "></div>
                    <div class="h-[20px] w-[90px] bg-gray-200 mx-2 my-[6px]"></div>
                </div>
            </div>
        
        </div>
        <div class="bg-white rounded-xl shadow-md border border-gray-100 text-sm overflow-hidden relative min-h-[150px]">
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="dataTable"
                :key="'keytable'+keyTable"

            >
                <template v-slot:title="{item}">
                    <NuxtLink class="hover:text-blue-700" :to="'/moderations/'+ model +'/'+item.id" >
                        <span @click="setStore">{{item.title[bahasa]}}</span>
                    </NuxtLink>
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
    props: ['model','masterEndpoint', 'storeState', 'storeCommit', 'targetId', 'targetTitle', 'targetLog'],
    data() {
        return {
            // prefixName: 'listblog',
            statusStore: false,
            keyShow: 0,

            keyTable:0,
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
                    id: 50,
                    label: ['50 baris per halaman', '50 row per page']
                },
                {
                    id: 100,
                    label: ['100 baris per halaman', '100 row per page']
                }
            ],
            filter: {
                search: '',
            },
            sorter: {
                createdAt: 'desc'
            },


        }
    },
    watch: {
        currentPage(val) {
            if (!this.statusStore) this.masterPoint()
        },

        'sorter.createdAt'() {
            if (!this.statusStore) {
                this.currentPage = 1;
                this.masterPoint()
            }

        },

        showRow(val) {
            if (!this.statusStore) {
                this.limit = val
                this.masterPoint()
            }

        },
        'filter.search'(val) {
            if (!this.statusStore) {
                this.currentPage = 1
                this.masterPoint()
            }

        },
        // bahasa() {
        //     this.keyTable +=1
        // },



    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        halamanStore() {
            return this.$store.state[this.storeState]
        },
        prefixName() {
            return 'list' + this.model
        },

        tableDetail() {
            const list = [
                {
                    header: this.$t('Title'),
                    itemValue: 'title'
                },
                {
                    header: this.$t('Organization'),
                    itemValue: 'namaOrganisasi',
                    itemClass: 'w-3/12'
                },
                {
                    header: 'Status',
                    itemValue: 'submission',
                    itemClass: 'w-2/12'
                },
                {
                    header: this.$t('Created At'),
                    itemValue: 'createdAt',
                    type: 'date',
                    format: 'DD MMM YYYY HH:mm',
                    itemClass: 'w-2/12'
                }
            ]
            return list;
        }

    },


    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.dataTable = []
            // this.getLogBlog()
            if (this.halamanStore) {
                this.statusStore = true
                this.selectedKapsul = this.halamanStore.kapsul
                this.filter.search = this.halamanStore.search
                this.showRow = this.halamanStore.row
                this.currentPage = this.halamanStore.page
                this.sorter = this.halamanStore.sorter
                this.keyShow+=1
                this.$nextTick(() => {
                    this.masterPoint();
                })

            } else {
                this.statusStore = false
                this.selectKapsul(this.kapsul[0])
            }
        },

        keyUp(event) {
            // console.log(event)
            // if (event.key === 'enter') {
            //     this.masterPoint()
            // }
        },

        selectKapsul(item) {
            this.selectedKapsul = item
            this.currentPage = 1
            this.masterPoint()
        },

        async masterPoint() {
            const item = this.selectedKapsul

            this.limit = this.showRow

            this.loaderPage = false
            this.startIndex = (this.currentPage - 1) * this.limit

            await this.$apiPlatform.get(this.masterEndpoint+item.endpoint+'&limit='+this.limit+'&offset='+this.startIndex+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {
                
                this.dataTable = res.data.results.map(e => {
                    const data = {
                        id: e[this.targetId],
                        title: e[this.targetTitle],
                        namaOrganisasi: e.myOrganisasi.namaOrganisasi,
                        submission: e.submission,
                        createdAt: e.createdAt
                    }
                    return data
                })
                this.totalPage = Math.ceil(res.data.length / this.limit);
                this.getLog(res.data.logSubmission);
                this.keyPage += 1

                this.$nextTick(() => {
                    this.loaderPage = true
                    this.$store.commit(this.storeCommit, null)
                    this.statusStore = false;

                })
            })
        },
        setStore() {

            const forStore = {
                page: this.currentPage,
                search: this.filter.search,
                kapsul: this.selectedKapsul,
                row: this.showRow,
                sorter: this.sorter
            }
            // console.log(forStore)
            this.$store.commit(this.storeCommit, forStore)
        },

        getLog(data) {
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
        },

        async getLogBlog() {
            this.loaderLog = false;
            
            await this.$apiPlatform.get('moderator/').then(res => {
                const data = res.data[this.targetLog]
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