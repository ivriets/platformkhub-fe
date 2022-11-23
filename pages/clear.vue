<template>
    <div>
        
    </div>
</template>


<script>
export default {
    layout: 'login',
    middleware: ['anonim'],
    data() {
        return {
            
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.$cookies.removeAll();
            localStorage.clear();
            this.$nextTick(() => {
                // $nuxt.$emit('refreshPage')
                window.location.href="/login"
                // this.$router.push('/login')

            })
        }
    }
}
</script>