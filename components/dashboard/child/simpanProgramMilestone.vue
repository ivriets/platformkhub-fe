<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','fase'],
        data() {
            return {
                listNew: [],
                listUpdated: [],
                listDeleted: []
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {

                this.listUpdated = this.fase.list.filter(e => e.faseId)
                this.listNew = this.fase.list.filter(e => !e.faseId)
                this.listDeleted = this.fase.deleted
                console.log('listnew',this.listNew)
                //update heula
                this.updateBulk()
                //delete

                // this.listNew.forEach(e => {
                //     this.faseBaru(e)
                // })
                this.faseBaru()
                this.listDeleted.forEach(e => {
                    this.deleteFase(e)
                })

            },
            async updateBulk() {
                await this.$apiPlatform.put('moderator/programsfase/', this.listUpdated)
            },
            async deleteFase(e) {
                await this.$apiPlatform.delete('moderator/programsfase/'+e + '/')
            },
            async faseBaru(e) {
                await this.$apiPlatform.put('moderator/programs/'+this.modelId + '/', {fase: this.listNew})
            }
        }
    }
</script>

