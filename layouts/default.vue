<template>
    <div>
        <FrontHeader 
            v-if="loader"
            :currentUser="currentUser"
        />
        <div v-if="loader" class="">
            <FrontDrawer />
            <div class="pt-16 transition-all" :style="statusDrawer ? 'padding-left:'+styleOpen : 'padding-left:'+styleClose">
                <Nuxt />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loader: false,
            currentUser: null,
            keyHeader: 0
        }
    },
    computed: {
        statusDrawer() {
            return this.$store.state.drawer;
        },

        styleOpen() {
            const widthDrawer = this.$store.state.drawerOpen;
            return widthDrawer +'px'
        },

        styleClose() {
            const widthDrawer = this.$store.state.drawerClose;
            return widthDrawer +'px'
        },

        currentUrl() {
            // console.log(this.$route.path)
            return this.$route.path
        }
    },
    watch: {
        currentUrl(val) {
            this.getCurrentUser()
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getCurrentUser()
        },

        btnToggle() {
            const toggle = !this.statusDrawer
            this.$store.commit('setDrawer', toggle);
        },

        async getCurrentUser() {
            await this.$apiBase.get('accounts/').then(res => {
                // console.log(res.data)
                this.loader = true
                this.currentUser = res.data.results
                this.keyHeader += 1
            }).catch(err => {
                this.$router.push('/clear')
                // window.location.href="/clear"
            })
        }
    },
}
</script>