<template>
<div class="px-3 py-6">
    <!-- <div v-if="chartLoading" role="status">
        <div class="flex items-center justify-center text-center">
            <svg aria-hidden="true" class="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div> -->
    <div class="">
        <div class="grid grid-cols-10 gap-10">
            <!-- chart individu -->
            <div class="col-span-2 " :class="cardClass">
                <div class="">
                    <div class="text-center text-base mb-5">
                        Individual Need<br/> Verification
                    </div>
                    <div class="bg-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">{{ totalIndividuNeedVerification }}</div>
                    </div>
                    <button @click="$router.push('/verifications/individu')" class="button-standar-outline w-full">
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
                        Organization Need<br/> Verification
                    </div>
                    <div class="bg-warna-tiga rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
                        <div class="text-3xl">{{ totalOrganisasiNeedVerification }}</div>
                    </div>
                    <button @click="$router.push('/verifications/organisasi')" class="button-standar-outline w-full">
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
        <hr class="border-[#9E9E9E] my-[35px] mx-3">

        <DashboardAnalytics />
    </div>
</div>
</template>


<script>
export default {
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