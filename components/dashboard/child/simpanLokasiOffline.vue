<template>
    <div>
        lokasioffline

    </div>
</template>

<script>
export default {
    props: ['value','lokasi', 'model', 'modelId'],
    data() {
        return {
            baru: [],
            edit: [],
            deleted: [],
            endPointRoot: '',
            endPointLokasi: '',
            fieldLokasi: '',
            counterBaru: 0
        }
    },
    watch: {
        counterBaru(val) {
            if (val > 0) {
                if (val >= this.baru.length) this.$emit('input', 'done')
            }
        }
    },
    mounted() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.counterBaru = 0
            //
            if (this.model === 'event') {
                this.endPointRoot = 'moderator/events/'+this.modelId+'/';
                this.endPointLokasi = 'moderator/eventslokasi/'
                this.fieldLokasi = 'lokasi'
            } 




            if (this.lokasi.deleted.length > 0) {
                this.lokasi.deleted.forEach(e => {
                    this.deleteLokasi(e)
                })
                
            }
            // //simpan root
            this.baru = this.lokasi.list.filter(e => !e.pkLokasiActivityId || e.pkLokasiActivityId !== '')
            if (this.baru.length > 0)  {
                this.baru.forEach(e => {
                    this.postLokasi(e)
                })
            } 
            this.edit = this.lokasi.list.filter(e => !e.pkLokasiActivityId || e.pkLokasiActivityId !== '')

           
        },
        async postLokasi(item) {
            
            const req = {
                lokasi : item,
                // event: this.modelId
            }
            await this.$apiPlatform.put(this.endPointRoot  , req).then(res => {
                console.log(res.data)
                // this.uploadImage(item.file, item.name, res.data.pkGalleryId)
                // this.putLokasi(item, res.data.pkLokasiActivityId)
            })
        },
        async putLokasi(item,pkLokasiActivityId) {
            await this.$apiPlatform.put(this.endPointLokasi + '/' + pkLokasiActivityId + '/', item).then(res => {
                console.log(res.data)
                // this.uploadImage(item.file, item.name, res.data.pkGalleryId)
            })
        },


        //  async uploadImage(image, name, id) {
        //     if (image instanceof Blob){
        //         var data = new FormData();
        //         data.append('imgGambar', image, name);
        //         await this.$apiPlatform.put(this.endPointLokasi + id +'/'   , data).then(res => {
        //             // this.btnText = 'Save'
        //             this.counterBaru +=1
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     }
        // },
        async deleteLokasi(item) {
            await this.$apiPlatform.delete(this.endPointLokasi + item).then(res => {
                console.log(res.data)
            })
        }

    }

}
</script>

