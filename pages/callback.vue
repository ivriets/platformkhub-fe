<template>
    <div class="h-screen">
        verifing ....
    </div>
</template>
<script>
export default {
    layout:'login',
    middleware: ['anonim'],

    data() {
        return {
        }
    },
    computed: {
        // parameter() {
        //     return this.$route.query
        // }
        codeToken() {
            return this.$route.query.code
        },
        baseUrl() {
            return process.env.BASE_URL
        }
    },
    mounted() {
        this.initialize()
    },
    watch : {
    },
    methods: {
        initialize() {
            this.verify()
        },
        async verify() {
            const req = {
                code: this.codeToken,
                redirect_uri: 'https://superadmin.k-hub.org/callback'
            }
            await this.$axios.post('https://base.api.k-hub.org/a3/authGoogle/',req).then(res => {
                    const tokenCookiz = res.data.token
                    this.$cookies.set('jtoken', tokenCookiz)
                    window.location.href="/"
            }).catch(err => 
                this.$modal.show({
                    type: 'warning',
                    title: 'warning',
                    body: 'Terdapat error pada komunikasi google, mohon login memakai username dan login'
                })
            )
        },

    }
}
</script>