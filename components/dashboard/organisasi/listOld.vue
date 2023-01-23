<template>
    <div>
        <div class="flex items-center mb-4">
            <div class="w-[240px] mr-4">
                <ElementsSearchBar 
                    v-model="filter.search"
                    placeholder="Search"
                    :name="'searchtext'"
                    @keyup="keyUp"
                />
            </div>
            <div class="flex flex-grow">
                <div class="w-[180px]">
                    <InputSelect 
                        v-model="showRow"
                        :opsi="opsiShowRow"
                        :name="prefixName+'showrow'"
                    />
                </div>
            </div>
            <div class="px-3 py-[6px] bg-warna-empat rounded-lg text-white flex items-center">
                <img class="h-4 w-4" src="/icons/icon-button-download.png" alt="icon-download">
                <div class="ml-1">Download</div>
            </div>
        </div>
        <div class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div v-if="loaderLog" class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
                <!-- <ElementsKapsul 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    :label="item.label"
                    :jumlah="item.length"
                    :klik="item.klik"
                /> -->
                <button 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    @click="selectKapsul(item)"
                    class="text-sm font-semibold border border-warna-tujuh text-warna-empat rounded-2xl px-3 py-[6px] hover:bg-gray-50 cursor-pointer;"
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
        <div v-if="loaderPage" class="bg-white rounded-lg shadow-md border border-gray-100">
            <ElementsTableFlat 
                :masterTable="masterTable"
                :dataTable="dataTable"
                :path="'/verifications/organisasi/'"
                :idValue="'accountId'"
            />
        </div>
        <div v-if="!loaderPage" class="flex items-center justify-center mt-6">
            <img class=" w-10 h-10" src="/images/animated-loading.svg" alt="loading-animasi">
        </div>
        <div v-if="loaderPage" class="pagination-area text-center mt-6">
            <ElementsPaginasiSpa 
                v-model="currentPage"
                :totalPage="totalPage"
                :totalVisible="totalVisible"
                :key="'pagset'+keyPage"
            />
        </div>
        <!-- <pre>{{currentKapsul}}</pre> -->
    </div>
</template>


<script>

export default {
    data() {
        return {
            prefixName: 'listorg',
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
            masterTable: [
                {
                    header: 'Organization Name',
                    value: 'namaOrganisasi',
                    tipe: 'string',
                    display: true,
                    klik: true
                },
                {
                    header: 'Email',
                    value: 'email',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Email is Verified',
                    value: 'emailIsVerified',
                    tipe: 'boolean',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'statusVerification',
                    tipe: 'integer',
                    display: true
                },
                {
                    header: 'Created',
                    value: 'createdAt',
                    tipe: 'date',
                    display: true
                },
            ]
        }
    },
    watch: {
        currentPage(val) {
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
            this.getLogOrganisasi()
            this.selectKapsul(this.kapsul[0])
            this.masterPoint()
        },

        keyUp(event) {
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

            // await this.$api1.get('verificator/'+item.endpoint+'/?limit='+this.limit+'&offset='+this.startIndex+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {
            await this.$apiPlatform.get('verificator/'+item.endpoint+'/?limit='+this.limit+'&offset='+this.startIndex+'&title='+this.filter.search+'&sortbycreatedat='+this.sorter.createdAt).then(res => {
                this.dataTable = res.data.results.map(e => {
                    const data = {
                        accountId: e.accountId,
                        organisasiId: e.organisasiId,
                        namaOrganisasi: e.namaOrganisasi !== "" ? e.namaOrganisasi : 'N/A',
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
                })
            })
        },

        async getLogOrganisasi() {
            this.loaderLog = false

            await this.$apiPlatform.get('verificator/logOrganisasi/').then(res => {

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
        }
    }
}
</script>