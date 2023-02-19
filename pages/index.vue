<template>
  <div>
    <!-- <div v-if="payload==='final'" class="fds">
        <div v-if="statusAuth" class="container mx-auto">
        </div>
        <div v-else>
            <ElementsPagesFrontPage />
        </div>
    </div> -->
    <ElementsPagesFrontPage />
  </div>
</template>

<script>
export default {
    // middleware: ['general'],
    layout: 'blank',
    data() {
        return {
            payload: 'start',
            statusAuth: false
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
            return 'KHUB'
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
            this.statusAuth = false
            this.payload = 'start'
            this.$store.commit('setPageTitle', this.title)
            this.getAccounts()
        },
        async getAccounts() {
            await this.$apiBase.get('accounts/').then(res => {
                console.log(res.data)
                // this.statusAuth = true
                this.payload = 'final'
                // this.$router.push('/dashboard')
            }).catch(err => {
                this.statusAuth = false
                this.$nextTick(() => {
                    this.payload = 'final'
                })

            })

        }

        // handleResize() {
        //     this.window.width = window.innerWidth;
        //     this.window.height = window.innerHeight;
        // }
    },
}
</script>
