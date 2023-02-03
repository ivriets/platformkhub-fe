<template>
    <div>
        <div class="flex items-center mb-4">
            <div v-if="loaderPage" class="w-[240px] mr-4">
                <ElementsSearchBarButton 
                    v-model="filter.search"
                    :placeholder="$t('Search')"
                    :name="'searchtext'"
                />
            </div>
            <div v-if="!loaderPage" class="w-[240px] h-[34px] mr-4 animate-pulse bg-gray-200 rounded-md"></div>

            <div class="flex flex-grow">
                <div v-if="loaderPage" class="w-[180px]">
                    <InputSelect 
                        v-model="showRow"
                        :opsi="opsiShowRow"
                        :name="prefixName+'showrow'"
                        :key="'adf'+keyShow"
                    />
                </div>
                <div v-if="!loaderPage" class="w-[180px] h-[34px] mr-4 animate-pulse bg-gray-200 rounded-md"></div>

            </div>
            <button v-if="loaderPage" @click="downloadExcel" :disabled="btnText==='Download'? false: true" class="button-download flex items-center gap-4">
                <img class="h-4 w-4" src="/icons/icon-button-download.png" alt="icon-download">
                <div class="">{{ $t(btnText) }}</div>
            </button>
            <div  v-if="!loaderPage" class="w-[170.02px] h-[38.39px] bg-gray-200 rounded-lg animate-pulse"></div>


        </div>
        <div v-if="loaderPage" class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div v-if="loaderLog" class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
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
                <template v-slot:name="{item}">
                    <NuxtLink class="hover:text-blue-700" :to="'/verifications/individu/'+item.accountId" >
                        <span @click="setStore">{{item.namaIndividu}}</span>
                    </NuxtLink>
                </template>
                <template v-slot:statusVerification="{item}" class="font-semibold">
                    <ElementsDisplayStatusVerifikasi 
                        :status="item.statusVerification"
                    />
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

                <ElementsExcel 
                    :jsonData="excelListing"
                    :fileName="excelFileName"
                    v-if="startExcel"
                />

    </div>
</template>


<script>
import listIndividu from '~/static/data/listindividu.json';

export default {
    props: ['model'],
    data() {
        return {
            statusStore: false,
            keyShow: 0,

            btnText: 'Download',
            prefixName: 'listind',
            loaderPage: false,
            loaderLog: false,
            selectedKapsul: null,
            showRow: 10,
            keyTable: 0,

            // KEBUTUHAN PAGINASI
            startIndex: 0,
            totalVisible: 5,
            limit: 10,
            keyPage:0,
            offset: 0,
            totalPage: 1,
            currentPage: 1,
            //
            excelListing: [],
            excelFileName: 'List-of-verification-Individu',
            startExcel: false,

            dataTable: [],
            kapsul: [
                {
                    id: 'all',
                    label: 'All',
                    endpoint: 'katalogIndividu'
                },
                {
                    id: 'needverification',
                    label: 'Need Verification',
                    endpoint: 'pendingIndividu'
                },
                {
                    id: 'accepted',
                    label: 'Accepted',
                    endpoint: 'verifiedIndividu'
                },
                {
                    id: 'suspended',
                    label: 'Suspended',
                    endpoint: 'suspendedIndividu'
                },
                {
                    id: 'rejected',
                    label: 'Rejected',
                    endpoint: 'rejectedIndividu'
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
    computed: {
        tableDetail() {
            const list = [
                {
                    header: this.$t('Name'),
                    itemValue: 'name'
                },
                {
                    header: this.$t('Email'),
                    itemValue: 'email',
                    itemClass: 'w-3/12'
                },
                // {
                //     header: 'Email is Verified',
                //     itemValue: 'emailIsVerified',
                //     itemClass: 'w-2/12'
                // },
                {
                    header: 'Status',
                    itemValue: 'statusVerification',
                    itemClass: 'w-2/12'
                },
                {
                    header: this.$t('Created'),
                    itemValue: 'createdAt',
                    type: 'date',
                    format: 'DD MMM YYYY HH:mm',
                    itemClass: 'w-2/12'
                }
            ]
            return list;
        },
        halamanStore() {
            return this.$store.state.halamanIndividu
        },


    },
    watch: {
        currentPage(val) {
            // this.$store.commit('setHalamanIndividu', val)
            if (!this.statusStore)  this.masterPoint()
        },
        'sorter.createdAt'() {
            if (!this.statusStore) {
                this.currentPage = 1
                this.masterPoint()
            }
        },
        showRow(val) {
            if (!this.statusStore) {
                this.currentPage = 1
                this.limit = val
                this.masterPoint()  
            }
        },
        'filter.search'(val) {
            if (!this.statusStore) {
                this.currentPage = 1;
                this.masterPoint()
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.btnText = 'Download'
            this.startExcel = false
            this.getLogUser()
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
            await this.$apiPlatform.get('verificator/'+item.endpoint+'/?limit='+this.limit+'&offset='+this.startIndex+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {
                // console.log(res.data)

                this.dataTable = res.data.results
                this.totalPage = Math.ceil(res.data.length / this.limit)
                this.keyPage += 1
                this.keyTable+=1

                this.$nextTick(() => {
                    this.loaderPage = true
                    this.$store.commit('setHalamanIndividu', null)
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
            this.$store.commit('setHalamanIndividu', forStore)
        },
        async getLogUser() {
            this.loaderLog = false
            await this.$apiPlatform.get('verificator/logIndividu/').then(res => {
                // console.log(res.data)
                const data = res.data
                this.kapsul = [
                    {
                        id: 'all',
                        label: 'All',
                        length: data.totalIndividu,
                        endpoint: 'katalogIndividu'
                    },
                    {
                        id: 'needverification',
                        label: 'Need Verification',
                        length: data.totalPendingIndividu,
                        endpoint: 'pendingIndividu'
                    },
                    {
                        id: 'accepted',
                        label: 'Accepted',
                        length: data.totalVerifiedIndividu,
                        endpoint: 'verifiedIndividu'
                    },
                    {
                        id: 'suspended',
                        label: 'Suspended',
                        length: data.totalSuspendedIndividu,
                        endpoint: 'suspendedIndividu'
                    },
                    {
                        id: 'rejected',
                        label: 'Rejected',
                        length: data.totalRejectedIndividu,
                        endpoint: 'rejectedIndividu'
                    },
                    {
                        id: 'deleted',
                        label: 'Deleted',
                        length: data.totalDeletedIndividu,
                        endpoint: 'deletedIndividu'
                    }

                ]
                this.$nextTick(() => {
                    this.loaderLog = true
                })
            })
        },
        async downloadExcel() {
            this.btnText = 'Downloading'
            const item = this.selectedKapsul
            const limit = 100000
            const offset = 0
            await this.$apiPlatform.get('verificator/'+item.endpoint+'/?limit='+limit+'&offset='+offset+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {

                const forExcel = res.data.results.map(e => {
                    var statusnya = ''
                    if (e.statusVerification === 1) {
                        statusnya = 'Need Verification'
                    } else if (e.statusVerification === 2) {
                        statusnya = 'Rejected'
                    } else if (e.statusVerification === 3) {
                        statusnya = 'Accepted'
                    } else if (e.statusVerification === 4) {
                        statusnya = 'Suspended'
                    }
                    const data = {
                        [this.$t('Name')]: e.namaIndividu,
                        [this.$t('Email')]: e.email,
                        'Status': statusnya,
                        [this.$t('Created')]: this.$dayjs(e.createdAt).format('YYYY/MM/DD HH:mm')
                    }
                    return data;
                });
                this.excelListing = forExcel

                this.$nextTick(() => {
                    this.startExcel = true
                    setTimeout(() => {
                        this.btnText = 'Download'
                        this.startExcel = false

                    }, 2000)


                })
            })
        }
    }
}
</script>