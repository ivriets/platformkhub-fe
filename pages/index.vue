<template>
  <div>
    <div class="container mx-auto">
        <ElementsPagesMenuDashboard />
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
            return this.$t('Dasbor')
        }
    },
    // created() {
    //     window.addEventListener('resize', this.handleResize);
    //     this.handleResize();
    // },
    // destroyed() {
    //     window.removeEventListener('resize', this.handleResize);
    // },
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
        },

        // handleResize() {
        //     this.window.width = window.innerWidth;
        //     this.window.height = window.innerHeight;
        // }
    },
}
</script>
