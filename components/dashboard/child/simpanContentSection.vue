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
            counterImage: 0
        }
    },
    watch: {
        counterImage(val) {
                console.log('img baru',this.totalImageBaru)
                console.log('counter',val)

            if (this.totalImageBaru > 0) {

                if (this.totalImageBaru === parseInt(val)) {
                    console.log('beres woy')
                    this.$emit('input', 'done')
                }
            }
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
            }


            this.simpan()
        },
        async simpan() {
                console.log('simpann')
            const forSimpan = {
                deleted: this.deskripsi.deleted,
                updated: this.deskripsi.updated,
                new: this.deskripsi.new
            }

            await this.$apiPlatform.put(this.endPoint+ this.modelId + '/', {deskripsi:forSimpan}).then(res => {
                const listImages = this.deskripsi.new.filter( e => e.typeDeskripsi === 1)
                this.totalImageBaru = listImages.length
                if (listImages.length > 0) {
                    this.counterImage = 0
                    listImages.forEach((e,index) => {
                       this.uploadImage(e.imgDeskripsi.file, res.data.imgDeskripsiId[index], e.imgDeskripsi.name, index )
                    })
                } else {
                    this.$emit('input','done')
                }


            })
        },
         async uploadImage(image, id, name, index) {

            // if (image instanceof Blob){
                var data = new FormData();
                data.append('imgDeskripsi', image, name);
                await this.$apiPlatform.put(this.imgEndPoint+ id +'/', data).then(res => {
                    if (this.totalImageBaru === (index + 1)) {
                     this.$emit('input', 'done')
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