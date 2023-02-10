<template>
    <div></div>
</template>
<script>
export default {
    props: ['value', 'lokasiOnline', 'modelId'],
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
                if (this.lokasiOnline.typeChannel===0) {
                    this.deleteValue()
                } else {
                    this.updateValue()
                }
                
            } else  {
                this.tambahValue()
            }
        },
        async updateValue() {
            await this.$apiPlatform.put('moderator/eventslokasionline/'+this.lokasiOnline.pkLokasiOnlineId + '/', this.lokasiOnline).then(res => {
                this.$emit('input','done')
            })
        },
        async deleteValue() {
            await this.$apiPlatform.delete('moderator/eventslokasionline/'+this.lokasiOnline.pkLokasiOnlineId + '/').then(res => {
                this.$emit('input', 'done')
            })
        },

        async tambahValue() {
            const buatBaru = {
                typeChannel: this.lokasiOnline.typeChannel,
                url: this.lokasiOnline.url,
                jadwal: "2020-02-01",
                contactPerson: "",
                telpReservasi: ""
            }
            await this.$apiPlatform.put('moderator/events/'+this.modelId+'/', {lokasiOnline:[buatBaru]}).then(res => {
                this.$emit('input', 'done')
            })
        },

    }
}
</script>