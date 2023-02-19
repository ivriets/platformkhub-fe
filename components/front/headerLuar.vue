<template>
    <div>
        <div class="fixed top-0 left-0 right-0 w-full bg-white z-20 shadow">
            <div class="container mx-auto py-4 flex items-center justify-between">
                <NuxtLink to="/">
                    <nuxt-img src="/images/logo.png" height="45" />
                </NuxtLink>
                <div class="flex items-center gap-x-5">
                    <Nuxt-link to="/login" class="button-standar">LOGIN</Nuxt-link>
                    <ElementsDisplayFlag v-model="bahasa" />
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bahasa: 0
            }
        },
        watch: {
            bahasa(val) {
                this.$i18n.setLocale(val===0?'id':'en')
            }
        }
    }
</script>

