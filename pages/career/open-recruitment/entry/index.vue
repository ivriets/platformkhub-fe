<template>
    <div class="container mx-auto">
        <div class="px-6 py-10">
            <DashboardOpenRecruitmentEntry />
        </div>
    </div>
</template>


<script>
export default {
    middleware: ['general'],
    data() {
        return {

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
            return this.$t('Open Recruitment')
        },

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