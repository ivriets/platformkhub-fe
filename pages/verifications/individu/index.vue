<template>
    <div class="container mx-auto">
        <div class="px-6 py-11">
            <ElementsTab 
                :listTab="listTab"
                :selectedTab="selectedTab"
            />
            <DashboardIndividuOverview />
        </div>
    </div>
</template>


<script>
export default {
    middleware: ['general'],
    data() {
        return {
            selectedTab: 'overview',
            listTab: [
                {
                    id: 'overview',
                    label: 'Overview',
                    url: '/verifications/individu/overview'
                },
                {
                    id: 'userlist',
                    label: 'User List',
                    url: '/verifications/individu/user-list'
                }
            ]
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        title() {
            return this.$t('Verifikasi Individu')
        }
    },
    watch: {
        lang() {
            this.initialize()
        }
    },
    mounted() {
        this.initialize()
    },
    head() {
        return{
            title: this.title
        }
    },
    methods: {
        initialize() {
            this.$store.commit('setPageTitle', this.title)
        }
    },
}
</script>