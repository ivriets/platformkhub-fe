<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','testimony'],
        data() {
            return {
                endPointRoot: '',
                endPointTestimony: '',
                inputField: ''
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                if (this.model === 'event') {
                    this.endPointRoot = 'moderator/events/' + this.modelId
                    this.endPointTestimony = 'moderator/testimoninonuser/'
                    this.inputField = 'testimoniNonUser'
                }
            }
        }
    }
</script>

