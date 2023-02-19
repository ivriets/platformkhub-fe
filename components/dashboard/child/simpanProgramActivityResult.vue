<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','activityResult'],
        data() {
            return {
                rootEndpoint: 'moderator/programs/',
                arEndpoint: 'moderator/programsactivityresult/'
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                if (_.isArray(this.value) == false && this.value !==null) {
                    console.log(this.activityResult)
                    if (this.activityResult.pkActivityResultId) {
                        console.log('edit')
                        this.editAr()
                    } else {
                        this.insertAr()
                    }
                } else {
                    this.$emit('input','done')
                }

            },
            async editAr() {
                await this.$apiPlatform.put(this.arEndpoint+this.activityResult.pkActivityResultId+'/', this.activityResult).then(res => {
                    this.$emit('input','done')

                })
            },
            async insertAr() {
                await this.$apiPlatform.put(this.rootEndpoint+this.modelId+'/', { activityResult: this.activityResult}).then(res => {
                    this.$emit('input','done')
                })
            }
        }

    }
</script>

