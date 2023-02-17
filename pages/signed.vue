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
        this.initialize()
    },
    methods: {
        initialize() {
            this.$router.push('/dashboard')
        }
    }
}
</script>