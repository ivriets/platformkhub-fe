<template>
    <div>
    </div>
</template>
<script>
export default {
    props: ['value','tag', 'model', 'modelId'],
    data() {
        return {
            endPoint: '',
            fieldTag: '',
            modelEndPoint: '',
            newTag: {
                list: [],
                deleted: []
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            if (this.model === 'blog') {
                this.endPoint = 'moderator/blogtags/'
                this.fieldTag = 'blogsTag'
                this.modelEndPoint = 'moderator/blogs/'
            } else if (this.model === 'resource') {
                this.endPoint = 'moderator/resourcestags/'
                this.fieldTag = 'resourcesTag'
                this.modelEndPoint = 'moderator/resources/'
            } else if (this.model === 'event') {
                this.endPoint = 'moderator/eventstag/'
                this.fieldTag = 'tag'
                this.modelEndPoint = 'moderator/events/'
            } else if (this.model === 'program') {
                this.endPoint = 'moderator/programstag/'
                this.fieldTag = 'tag'
                this.modelEndPoint = 'moderator/programs/'
            }


            if (this.tag && this.tag.deleted.length > 0) {
                this.tag.deleted.forEach(e => {
                    this.deleteTag(e)
                })
            }

            if (this.tag.list.length > 0) {
                const list = this.tag.list.map(e => e.id === '' ? e.nama : e.id )
                this.simpanList(list)
            }
        },
        async simpanList(list) {
            const req = {
                [this.fieldTag]: list
            }
            await this.$apiPlatform.put(this.modelEndPoint+this.modelId+'/', req).then(res => {
                console.log(res.data)
            })
        },
        async deleteTag(e) {
            console.log('e',e)
            console.log(this.endPoint)
            await this.$apiPlatform.delete(this.endPoint + e + '/').then(res => {
                console.log(res.data)
            })
        }
    }
}
</script>