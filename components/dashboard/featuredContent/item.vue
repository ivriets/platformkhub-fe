<template>
    <div>
        {{selectedTab}}
    </div>
</template>
<script>
export default {
    props: ['selectedTab'],
    data() {
        return {
            list: []
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
            await this.$apiBase.get('featuredcontent//').then(res => {
                console.log(res.data)
                // var featuredContent = res.data
                // this.featuredProgram = featuredContent.featuredProgram
                // this.featuredEvent = featuredContent.featuredEvent
                // this.featuredResource = featuredContent.featuredResource
                // this.featuredBlog = featuredContent.featuredBlog
            }).catch(err => {
                console.log(err)
            })
        },

    }
}
</script>