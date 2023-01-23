<template>
    <div>
        <div class="flex items-center mb-4">
            <div class="w-[240px] mr-4">
                <ElementsSearchBarButton 
                    v-model="filter.search"
                    :placeholder="$t('Search')"
                    :name="'searchtext'"
                />
            </div>
            <div class="flex flex-grow">
                <div class="w-[180px]">
                    <InputSelect 
                        v-model="showRow"
                        :opsi="opsiShowRow"
                        :name="prefixName+'showrow'"
                        :key="'showrow'+keyShow"
                    />
                </div>
            </div>
            <button @click="downloadExcel" :disabled="btnText==='Download'? false: true" class="button-standar flex items-center gap-4">
                <img class="h-4 w-4" src="/icons/icon-button-download.png" alt="icon-download">
                <div class="">{{ $t(btnText) }}</div>
            </button>
        </div>
        <div class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
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
        <div class="bg-white rounded-xl shadow-md border border-gray-100 text-sm overflow-hidden relative">
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="dataTable"
                :key="'keytable'+keyTable"
            >
                <template v-slot:namaOrganisasi="{item}">
                    <NuxtLink class="hover:text-blue-700" :to="'/verifications/organisasi/'+item.accountId" >
                        <span @click="setStore">{{item.namaOrganisasi}}</span>
                    </NuxtLink>
                </template>
                <template v-slot:emailIsVerified="{item}">
                    <ElementsDisplayEmailIsVerified :email="item.emailIsVerified" />
                </template>
                <template v-slot:statusVerification="{item}" class="font-semibold">
                    <ElementsDisplayStatusVerifikasi 
                        :status="item.statusVerification"
                    />
                </template>
                <!-- <template v-slot:submission="{ item }">
                    <ElementsDisplayStatusSubmission :submission="item.submission" />
                </template> -->

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
            excelFileName: 'List-of-verification-Organisasi',
            startExcel: false,

            dataTable: [],
            kapsul: [
                {
                    id: 'all',
                    label: 'All',
                    endpoint: 'katalogOrganisasi'
                },
                {
                    id: 'needverification',
                    label: 'Need Verification',
                    endpoint: 'pendingOrganizations'
                },
                {
                    id: 'accepted',
                    label: 'Accepted',
                    endpoint: 'verifiedOrganizations'
                },
                {
                    id: 'suspended',
                    label: 'Suspended',
                    endpoint: 'suspendedOrganizations'
                },
                {
                    id: 'rejected',
                    label: 'Rejected',
                    endpoint: 'rejectedOrganizations'
                },
                {
                    id: 'deleted',
                    label: 'Deleted',
                    endpoint: 'deletedOrganizations'
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

        }
    },
    computed: {
        tableDetail() {
            const list = [
                {
                    header: this.$t('Organization Name'),
                    itemValue: 'namaOrganisasi'
                },
                {
                    header: this.$t('Email'),
                    itemValue: 'email',
                    itemClass: 'w-3/12'
                },
                {
                    header: 'Email is Verified',
                    itemValue: 'emailIsVerified',
                    itemClass: 'w-2/12'
                },
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
            return this.$store.state.halamanOrganisasi
        },


    },
    watch: {
        currentPage(val) {
            // this.$store.commit('setHalamanOrganisasi', val)
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
                this.dataTable = res.data.results.map(e => {
                    const data = {
                        accountId: e.accountId,
                        organisasiId: e.organisasiId,
                        namaOrganisasi: e.namaOrganisasi,
                        email: e.email,
                        // emailIsVerified: e.emailIsVerified,
                        emailIsVerified: true,
                        statusVerification: e.statusVerification,
                        createdAt: e.createdAt
                    }
                    return data
                })
                this.totalPage = Math.ceil(res.data.length / this.limit)
                this.keyPage += 1

                this.$nextTick(() => {
                    this.loaderPage = true
                    this.$store.commit('setHalamanOrganisasi', null)
                    this.statusStore = false;
                })
            })
        },

        async getLogUser() {
            this.loaderLog = false
             await this.$apiPlatform.get('verificator/logOrganisasi/').then(res => {
                // console.log(res.data)
                const data = res.data
                this.kapsul = [
                    {
                        id: 'all',
                        label: 'All',
                        length: data.totalOrganisasi,
                        endpoint: 'katalogOrganisasi'
                    },
                    {
                        id: 'needverification',
                        label: 'Need Verification',
                        length: data.totalPendingOrganisasi,
                        endpoint: 'pendingOrganisasi'
                    },
                    {
                        id: 'accepted',
                        label: 'Accepted',
                        length: data.totalVerifiedOrganisasi,
                        endpoint: 'verifiedOrganisasi'
                    },
                    {
                        id: 'suspended',
                        label: 'Suspended',
                        length: data.totalSuspendedOrganisasi,
                        endpoint: 'suspendedOrganisasi'
                    },
                    {
                        id: 'rejected',
                        label: 'Rejected',
                        length: data.totalRejectedOrganisasi,
                        endpoint: 'rejectedOrganisasi'
                    },
                    {
                        id: 'deleted',
                        label: 'Deleted',
                        length: data.totalDeletedOrganisasi,
                        endpoint: 'deletedOrganisasi'
                    }
                ]
                this.$nextTick(() => {
                    this.loaderLog = true
                })
            })
        },
        setStore() {

            const forStore = {
                page: this.currentPage,
                search: this.filter.search,
                kapsul: this.selectedKapsul,
                row: this.showRow
            }
            // console.log(forStore)
            this.$store.commit('setHalamanOrganisasi', forStore)
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
                        [this.$t('Organization Name')]: e.namaOrganisasi,
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