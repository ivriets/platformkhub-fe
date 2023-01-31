<template>
    <div>
        <div class="grid grid-cols-10 gap-10">
            <div class="col-span-4">
                <ElementsDisplayButtonOverview 
                    :label="'Account Verified'"
                    :content="totalAccepted"
                    :icon="'/icons/individu/icon-verified.png'"
                    @click="goToList('accountVerified')"
                />
                <ElementsDisplayButtonOverview 
                    :label="'Total Rejected User'"
                    :content="totalRejected"
                    :icon="'/icons/individu/icon-rejected.png'"
                    @click="goToList('rejectedUser')"
                />


                <button @click="downloadExcel" :disabled="btnText==='Downloading'? true: false" class="w-full button-download-gede">
                        <div class="flex items-center justify-center h-[48px] w-[48px] gap-5 bg-empat overflow-hidden rounded-full">
                            <img class="h-[48px] w-[48px] object-contain bg-empat" src="/icons/individu/icon-download.png" alt="icon-download">
                        </div>
                        <div class="text-center">
                            <div class=" text-xl" v-html="btnText"></div>
                        </div>
                </button>
            </div>
            <div class="col-span-4">
                <ElementsDisplayButtonOverview 
                    :label="'Need Verification'"
                    :content="totalNeedVerification"
                    :icon="'/icons/individu/icon-need.png'"
                    @click="goToList('needVerification')"
                />

                <ElementsDisplayButtonOverview 
                    :label="'Total Suspended User'"
                    :content="totalSuspended"
                    :icon="'/icons/individu/icon-suspended.png'"
                    @click="goToList('suspendedUser')"
                />

            </div>
            <div class="col-span-2">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                    <div class="">
                        <div class="text-center grid grid-cols-1 gap-y-10">
                            <div>
                                <div class="text-warna-dua mb-2">Total User</div>
                                <div class="text-[26px] text-warna-utama font-semibold">{{ totalUser }}</div>
                            </div>
                            <div>
                                <div class="text-warna-dua mb-2">Total User (Email is Verified)</div>
                                <div class="text-[26px] text-approved-accepted font-semibold">{{ totalEmailVerified }}</div>
                            </div>
                            <div>
                                <div class="text-warna-dua mb-2">Total User (Email is Not Verified)</div>
                                <div class="text-[26px] text-rejected font-semibold">{{ totalEmailNotVerified }}</div>
                            </div>
                            <div>
                                <div class="text-warna-dua mb-2">New User</div>
                                <div class="text-[26px] text-warna-empat font-semibold">{{ totalNewUser }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    data() {
        return {
            totalUser: '',
            totalNeedVerification: '',
            totalSuspended: '',
            totalRejected: '',
            totalAccepted: '',
            totalEmailVerified: '',
            totalEmailNotVerified: '',
            totalNewUser: 10,

            startExcel: false,
            excelFileName: 'List-Individu',
            excelListing: [],
            btnText: 'Download All Verified &<br> Unverified Email',
            // btnText: 'Downloading',
            
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
            this.startExcel = false
            this.loaderLog = false

            await this.$apiPlatform.get('verificator/logIndividu/').then(res => {
                console.log(res.data)
                const data = res.data

                this.totalUser = data.totalIndividu + data.totalUnverifiedEmailIndividu
                this.totalNeedVerification = data.totalPendingIndividu
                this.totalSuspended = data.totalSuspendedIndividu
                this.totalRejected = data.totalRejectedIndividu
                this.totalAccepted = data.totalVerifiedIndividu
                this.totalEmailVerified = data.totalIndividu
                this.totalEmailNotVerified = data.totalUnverifiedEmailIndividu
            })
        },
        goToList(item) {
            var forStore = {
                    page: 1,
                    search: '',
                    kapsul: null,
                    row: 10,
                    sorter: {createdAt: 'desc'}

            }
            if (item === 'accountVerified') {
                forStore.kapsul = this.kapsul[2]
            } else if (item === 'rejectedUser') {
                forStore.kapsul = this.kapsul[4]
            } else if (item === 'needVerification') {
                forStore.kapsul = this.kapsul[1]
            } else if (item === 'suspendedUser') {
                forStore.kapsul = this.kapsul[3]
            }
             this.$store.commit('setHalamanIndividu', forStore)


            this.$router.push('/verifications/individu/user-list')
        },

        async downloadExcel() {
            this.btnText = 'Downloading'
            const item = this.kapsul[0]
            const limit = 100000
            const offset = 0
            await this.$apiPlatform.get('verificator/'+item.endpoint+'/?limit='+limit+'&offset='+offset+'&sortbycreatedat=asc').then(res => {

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
                        // this.btnText = 'Download'
                        this.btnText = 'Download All Verified &<br> Unverified Email',
                        this.startExcel = false

                    }, 2000)


                })
            })
        }

    }
}
</script>