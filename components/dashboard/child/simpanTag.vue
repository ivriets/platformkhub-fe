<template>
    <div>
        {{tag}}

    </div>
</template>
<script>
export default {
    props: ['value','tag', 'model', 'modelId'],
    data() {
        return {
            endPoint: '',
            fieldTag: '',
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
            await this.$apiPlatform.put('moderator/blogs/'+this.modelId+'/', req).then(res => {
                console.log(res.data)
            })
        },
        async deleteTag(e) {
            await this.$apiPlatform.delete(this.endPoint+ e + '/').then(res => {
                console.log(res.data)
            })
        }
    }
}
</script>