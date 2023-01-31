<template>
    <div class="rounded-3xl shadow-md bg-white overflow-hidden">
        <div class="grid grid-cols-4">
            <div class="col-span-2 bg-empat">
                <img src="/images/featured-login.png" alt="image-login" width="400" class="w-[350px] h-auto object-cover" >
            </div>
            <div class="col-span-2 p-6">
                <div class="mb-[35px] text-warna-utama">
                    <div class="text-[26px] mb-3">Login</div>
                    <div class="text-sm">Welcome back, please login to your account</div>
                </div>
                <div>
                    <form @submit.prevent="userLogin">
                        <div class="mb-[10px] text-warna-utama">
                            <div class="font-semibold mb-1">Email</div>
                            <InputText 
                                v-model="form.email"
                                placeholder="Input Email"
                                name="inputemail"
                            />
                        </div>
                        <div class="mb-[28px] text-warna-utama">
                            <div class="font-semibold mb-1">Password</div>
                            <InputPassword 
                                v-model="form.password"
                                placeholder="Input Password"
                                name="inputpassword"
                            />
                        </div>
                        <button class="rounded-lg py-2 w-full bg-warna-empat text-white" type="submit">
                            Login
                        </button>
                    </form>
                        <button @click="loginGoogle" class="rounded-md py-2.5 w-full bg-warna-empat text-white mt-10">
                            Sign In with Google
                        </button>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },

    mounted() {
        // docum
    },

    methods: {
        // btnLogin() {
        //     this.$router.push('/')
        // }

        async userLogin() {
            try {
                await this.$auth.loginWith('local', { data: this.form }).then(res => {
                    const tokenCookiz = res.data.token
                    this.$cookies.set('jtoken', tokenCookiz)
                    window.location.href="/signed"
                })
            } catch (err) {
                console.log(err)
            }
        },
        loginGoogle() {
            this.$auth.loginWith('google', { params: { prompt: "select_account" } })
        }
    },
}
</script>