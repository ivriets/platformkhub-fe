<template>
    <div></div>
</template>
<script>
export default {
    props: ['value', 'deskripsi','model', 'modelId'],
    data() {
        return {
            endPoint: '',
            imgEndPoint: '',
            totalImageBaru: 0,
            totalImageUpdate: 0,
            counterImage: 0,
            checkSimpan: {
                imageBaru: false,
                imageUpdate: false
            }
        }
    },
    watch: {
        checkSimpan: {
            handler(val) {
                if (val.imageBaru === true && val.imageUpdate === true) this.$emit('input', 'done')
            },
            deep: true
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.counterImage = 0
            this.totalImageBaru = 0
            if (this.model === 'blog') {
                this.endPoint = 'moderator/blogs/'
                this.imgEndPoint = 'moderator/blogdeskripsiimg/'
            } else if (this.model === 'event') {
                this.endPoint = 'moderator/events/'
                this.imgEndPoint = 'moderator/eventsdeskripsiimg/'
            } else if (this.model === 'resource') {
                this.endPoint = 'moderator/resources/'
                this.imgEndPoint = 'moderator/resourcesdeskripsiimg/'
            }


            this.simpan()
        },
        async simpan() {
            const forSimpan = {
                deleted: this.deskripsi.deleted,
                updated: this.deskripsi.list.filter(e => e.txtDeskripsiId !== '' ),
                new: this.deskripsi.new
            }
            const forImageUpdate = this.deskripsi.list.filter(e=> (e.imgDeskripsi && e.imgDeskripsi.status === 'belumUpload'))
            this.totalImageUpdate = forImageUpdate.length

            const listImages = this.deskripsi.new.filter( e => e.typeDeskripsi === 1)
            this.totalImageBaru = listImages.length
            

            await this.$apiPlatform.put(this.endPoint+ this.modelId + '/', {deskripsi:forSimpan}).then(res => {

                if (listImages.length > 0) {
                    listImages.forEach((e,index) => {
                       this.uploadImage(e.imgDeskripsi.file, res.data.imgDeskripsiId[index], e.imgDeskripsi.name, index )
                    })
                } else {
                    this.checkSimpan.imageBaru = true
                }
                if (forImageUpdate.length > 0) {
                    forImageUpdate.forEach((e, index) => {
                        this.uploadImage(e.imgDeskripsi.file, e.imgDeskripsiId, e.imgDeskripsi.name, index)
                    })
                } else {
                    this.checkSimpan.imageUpdate = true
                }



            })
        },
         async uploadImage(image, id, name, index) {

            // if (image instanceof Blob){
                var data = new FormData();
                data.append('imgDeskripsi', image, name);
                await this.$apiPlatform.put(this.imgEndPoint+ id +'/', data).then(res => {
                    if (this.totalImageBaru === (index + 1)) {
                    //  this.$emit('input', 'done')
                        this.checkSimpan.imageBaru = true
                    }
                    if (this.totalImageUpdate === (index + 1)) {
                        this.checkSimpan.imageUpdate = true
                    }
                }).catch(err => {
                    console.log(err)
                })
            // }
        },
        updateDone() {
             this.$emit('input','done')
        }
    }
}
</script>