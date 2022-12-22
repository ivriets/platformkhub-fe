<template>
    <div>
        <div class="grid grid-cols-10 gap-10">
            <div class="col-span-4">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-verified.png" alt="icon-verified">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">{{ totalAccepted }}</div>
                            <div class="text-warna-dua">Account Verified</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-rejected.png" alt="icon-rejected">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">{{ totalRejected }}</div>
                            <div class="text-warna-dua">Total Rejected<br>Organization</div>
                        </div>
                    </div>
                </div>

                <div class="bg-warna-empat rounded-3xl shadow-md border border-gray-100 py-6 px-8 cursor-pointer">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[48px] w-[48px]" src="/icons/individu/icon-download.png" alt="icon-download">
                        </div>
                        <div class="text-center">
                            <div class="text-white text-xl">Download All Verified &<br> Unverified Email</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-need.png" alt="icon-need">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">{{ totalNeedVerification }}</div>
                            <div class="text-warna-dua">Need Verification</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-suspended.png" alt="icon-suspended">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">{{ totalSuspended }}</div>
                            <div class="text-warna-dua">Total Suspended<br> Organization</div>
                        </div>
                    </div>
                </div>
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
            totalNewOrganizations: ''
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
        }
    }
}
</script>