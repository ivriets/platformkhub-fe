<template>
    <div>
        <pre></pre>
    </div>
</template>


<script>
export default {
    data() {
        return {
            testing: []
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('moderator/blogs/?limit=5&offset=1').then(res => {
                console.log(res.data)
            })
        }
    },
}
</script>