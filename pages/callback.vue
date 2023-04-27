<template>
    <div class="">
        <div class="h-screen flex justify-center items-center" v-if="!showError">
            <div class="bg-utama px-5 text-white rounded text-center">
                verifing .....
            </div>
        </div>
        <div class="h-screen flex justify-center items-center" v-else>
            <div class="w-[350px] bg-empat text-white p-5 text-center rounded shadow-lg">
                <h1 class="text-lg font-bold">ERROR</h1>
                <div class="my-10">
                    Terdapat error pada komunikasi google, mohon login memakai username dan password
                </div>
                <div class="my-10">
                    There's an error with Google communication, please login using your username and password
                </div>

                <NuxtLink to="/login">Kembali Login</NuxtLink>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    layout:'login',
    middleware: ['anonim'],

    data() {
        return {
            showError: false
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
        },
        callBackUrl() {
            return process.env.NODE_ENV === 'development' ? 'http://localhost:3333/callback' : 'https://superadmin.k-hub.org/callback'
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
                redirect_uri: this.callBackUrl
                // redirect_uri: 'http://localhost:3333/callback'
            }
            await this.$axios.post('https://base.api.k-hub.org/a3/authGoogle/',req).then(res => {
                // console.log(res.data)
                this.showError = false
                    const tokenCookiz = res.data.token
                    this.$cookies.set('jtoken', tokenCookiz)
                    this.$cookies.set('atoken', res.data.accessToken)
                    window.location.href="/"
            }).catch(err => 
                this.showError = true
                // this.$modal.show({
                //     type: 'warning',
                //     title: 'warning',
                //     body: 'Terdapat error pada komunikasi google, mohon login memakai username dan login',
                //     primary: {
                //         label: 'Login',
                //         theme: 'red',
                //         actions: () => this.$router.push('/login')
                //     }
                // })
            )
        },

    }
}
</script>