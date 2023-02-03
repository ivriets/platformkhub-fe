<template>
    <div></div>
</template>
<script>
export default {
    props: ['value', 'lokasiOnline'],
    data() {
        return {

        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            if (this.lokasiOnline && this.lokasiOnline.pkLokasiOnlineId) {
                this.updateValue()
            } else  {

            }
        },
        async updateValue() {
            await this.$apiPlatform.put('moderator/eventslokasionline/'+this.lokasiOnline.pkLokasiOnlineId + '/', this.lokasiOnline).then(res => {
                this.$emit('input','done')
            })
        }
    }
}
</script>