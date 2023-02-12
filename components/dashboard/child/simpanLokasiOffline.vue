<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','lokasi', 'model', 'modelId'],
        data() {
            return {
                endPointRoot: '',
                endPointLokasi: '',
                fieldLokasi: ''
            }
        },  
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                if (this.model === 'event') {
                    this.endPointRoot = 'moderator/events/'+this.modelId+'/';
                    this.endPointLokasi = 'moderator/eventslokasi/'
                    this.fieldLokasi = 'lokasi'
                } 
                if (this.lokasi.pkLokasiActivityId && this.lokasi.pkLokasiActivityId !=='') {
                    this.editLokasi()
                } else {
                    this.lokasiBaru()
                }
            },
            async lokasiBaru() {
                const forSimpan = {
                    [this.fieldLokasi] : [this.lokasi]
                }
                await this.$apiPlatform.put(this.endPointRoot, forSimpan).then(res => {
                    this.$emit('input', 'done')
                })

            },
            async editLokasi() {
                await this.$apiPlatform.put(this.endPointLokasi+this.lokasi.pkLokasiActivityId+'/',this.lokasi).then(res => {
                    this.$emit('input', 'done')
                })
            }
        }
        
    }
</script>

