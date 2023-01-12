<template>
    <div>
        verifing ....
        {{codeToken}}
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
    methods: {
        initialize() {
            this.verify()
        },
        async verify() {
            console.log('id')
            const req = {
                code: this.codeToken,
                redirect_uri: 'http://localhost:3333/callback'
            }
            await this.$axios.post('https://base.api.k-hub.org/a3/authGoogle/',req).then(res => {
                    const tokenCookiz = res.data.token
                    this.$cookies.set('jtoken', tokenCookiz)
                    window.location.href="/"

            }).catch(err => console.log(err))
        },

    }
}
</script>