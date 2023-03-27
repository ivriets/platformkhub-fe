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
                arEndpoint: 'moderator/programsactivityresult/',
                newAr: null
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {

                if (_.isArray(this.activityResult) == false && this.activityResult !==null) {
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
                console.log('edit ar', this.activityResult)
                const newAr = this.activityResult;
               newAr.baselineEndlineSurvey = this.activityResult.baselineEndlineSurvey.filter(e => !_.isArray(e.variablePerubahan) && e.variablePerubahan.length > 0 );
                await this.$apiPlatform.put(this.arEndpoint+this.activityResult.pkActivityResultId+'/', newAr).then(res => {
                    this.$emit('input','done')

                })
            },
            async insertAr() {
                const newAr = this.activityResult.baselineEndlineSurvey.filter(e => !_.isArray(e.variablePerubahan) && e.variablePerubahan.length > 0 );

                await this.$apiPlatform.put(this.rootEndpoint+this.modelId+'/', { activityResult:newAr}).then(res => {
                    this.$emit('input','done')
                })
            }
        }

    }
</script>

