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
                    :label="'Total Rejected<br>Organization'"
                    :content="totalRejected"
                    :icon="'/icons/individu/icon-rejected.png'"
                    @click="goToList('rejected')"
                />

                <button @click="downloadExcel" :disabled="btnText==='Downloading'? true: false" class="w-full button-download-gede">
                        <div class="flex items-center justify-center h-[48px] w-[48px] gap-5 bg-empat overflow-hidden rounded-full">
                            <img class="h-[48px] w-[48px] object-contain bg-empat" src="/icons/individu/icon-download.png" alt="icon-download">
                        </div>
                        <div class="text-center">
                            <div class=" text-xl" v-html="btnText"></div>
                        </div>
                </button>
                <!-- <div class="bg-warna-empat rounded-3xl shadow-md border border-gray-100 py-6 px-8 cursor-pointer">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[48px] w-[48px]" src="/icons/individu/icon-download.png" alt="icon-download">
                        </div>
                        <div class="text-center">
                            <div class="text-white text-xl">Download All Verified &<br> Unverified Email</div>
                        </div>
                    </div>
                </div> -->
                
            </div>
            <div class="col-span-4">
                <ElementsDisplayButtonOverview 
                    :label="'Need Verification'"
                    :content="totalNeedVerification"
                    :icon="'/icons/individu/icon-need.png'"
                    @click="goToList('needVerification')"
                />
                <ElementsDisplayButtonOverview 
                    :label="'Total Suspended<br> Organization'"
                    :content="totalSuspended"
                    :icon="'/icons/individu/icon-suspended.png'"
                    @click="goToList('suspended')"
                />
            </div>
            <div class="col-span-2">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                    <div class="">
                        <div class="text-center grid grid-cols-1 gap-y-10">
                            <div>
                                <div class="text-warna-dua mb-2">Total Organization</div>
                                <div class="text-[26px] text-warna-utama font-semibold">{{ totalOrganizations }}</div>
                            </div>
                            <div>
                                <div class="text-warna-dua mb-2">New Organization</div>
                                <div class="text-[26px] text-warna-empat font-semibold">{{ totalNewOrganizations }}</div>
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
            totalOrganizations: '',
            totalNeedVerification: '',
            totalSuspended: '',
            totalRejected: '',
            totalAccepted: '',
            totalNewOrganizations: '',
            kapsul: [
                {
                    id: 'all',
                    label: 'All',
                    endpoint: 'katalogOrganisasi'
                },
                {
                    id: 'needverification',
                    label: 'Need Verification',
                    endpoint: 'pendingOrganisasi'
                },
                {
                    id: 'accepted',
                    label: 'Accepted',
                    endpoint: 'verifiedOrganisasi'
                },
                {
                    id: 'suspended',
                    label: 'Suspended',
                    endpoint: 'suspendedOrganisasi'
                },
                {
                    id: 'rejected',
                    label: 'Rejected',
                    endpoint: 'rejectedOrganisasi'
                },
                {
                    id: 'deleted',
                    label: 'Deleted',
                    endpoint: 'deletedOrganisasi'
                }
            ],

            startExcel: false,
            excelFileName: 'List-Organisasi',
            excelListing: [],
            btnText: 'Download All Verified &<br> Unverified Email',


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

            await this.$apiPlatform.get('verificator/logOrganisasi/').then(res => {
                console.log(res.data)
                const data = res.data

                this.totalOrganizations = data.totalOrganisasi
                this.totalNewOrganizations = 10
                this.totalNeedVerification = data.totalPendingOrganisasi
                this.totalSuspended = data.totalSuspendedOrganisasi
                this.totalRejected = data.totalRejectedOrganisasi
                this.totalAccepted = data.totalVerifiedOrganisasi
            })
        },

        goToList(item) {
            var forStore = {
                    page: 1,
                    search: '',
                    kapsul: null,
                    row: 10
            }
            if (item === 'accountVerified') {
                forStore.kapsul = this.kapsul[2]
            } else if (item === 'rejected') {
                forStore.kapsul = this.kapsul[4]
            } else if (item === 'needVerification') {
                forStore.kapsul = this.kapsul[1]
            } else if (item === 'suspended') {
                forStore.kapsul = this.kapsul[3]
            }
             this.$store.commit('setHalamanOrganisasi', forStore)


            this.$router.push('/verifications/organisasi/organisasi-list')
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
                        this.btnText = 'Download All Verified &<br> Unverified Email'
                        this.startExcel = false

                    }, 2000)


                })
            })
        }


    }
}
</script>