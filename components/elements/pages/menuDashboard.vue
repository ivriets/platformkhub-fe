<template>
<div class="px-3 py-6">
    <div class="">
        <div class="grid grid-cols-10 gap-10">
            <!-- chart individu -->
            <div class="col-span-2 " :class="cardClass">
                <div class="">
                    <div class="text-center text-base mb-5">
                        <span class="font-bold text-utama ">{{ $t('Individual') }}</span> <span class="text-delapan">Need Verification</span>
                    </div>
                    <div class="bg-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">{{ totalIndividuNeedVerification }}</div>
                    </div>
                    <button @click="$router.push('/verifications/individu')" class="button-outline px-2 py-2 font-semibold  w-full">
                        {{ $t('See List') }}
                    </button>
                </div>
            </div>

            <div class="col-span-4" :class="cardClass">
                <ElementsDashboardBigCard 
                    :logData="logProgram"
                    :title="$t('Program')"
                    :landingPage="'/moderations/program'"
                />
            </div>
            <div class="col-span-4" :class="cardClass">
                <ElementsDashboardBigCard 
                    :logData="logEvent"
                    :title="$t('Event')"
                    :landingPage="'/moderations/event'"
                />
            </div>

            <!-- chart organisasi -->
            <div class="col-span-2" :class="cardClass">
                <div class="">
                    <div class="text-center text-base mb-5">
                        <span class="font-bold text-utama ">{{ $t('Organization') }}</span> <span class="text-delapan">Need Verification</span>

                    </div>
                    <div class="bg-warna-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">{{ totalOrganisasiNeedVerification }}</div>
                    </div>
                    <button @click="$router.push('/verifications/organisasi')" class="button-outline px-2 py-2 font-semibold  w-full">
                        {{ $t('See List') }}
                    </button>

                </div>
            </div>
            <div class="col-span-4 " :class="cardClass">
                <ElementsDashboardBigCard 
                    :logData="logResources"
                    :title="$t('Resource')"
                    :landingPage="'/moderations/resource'"
                />
            </div>
            <div class="col-span-4 " :class="cardClass">
                <ElementsDashboardBigCard 
                    :logData="logBlog"
                    :title="$t('Blog')"
                    :landingPage="'/moderations/blog'"
                />
            </div>

        </div>
        <hr class="border-[#9E9E9E] my-[35px] ">

        <ElementsDashboardAnalytics />
    </div>
</div>
</template>


<script>
export default {
    middleware: ['general'],
    data() {
        return {
            chartLoading: true,
            cardClass: 'bg-white rounded-3xl shadow-md border border-gray-100 p-6',
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
            logEvent: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            logResources: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
            },
            logBlog: {
                "all": 0,
                "approved": 0,
                "declined": 0,
                "draft": 0,
                "needRevision": 0,
                "underReview": 0
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
                this.logEvent = res.data.logEvent
                this.logResources = res.data.logResource
                this.logBlog = res.data.logBlog
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