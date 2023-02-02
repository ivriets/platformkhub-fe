<template>
    <div></div>
</template>
<script>
export default {
    props: ['value', 'deskripsi','model', 'modelId'],
    data() {
        return {
            endPoint: '',
            imgEndPoint: ''
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
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
                console.log('resss',res.data)

                // const findImageNew = this.deskripsi.new.filter(e =>  e.imgDeskripsi && e.imgDeskripsi.status ==='belumUpload');
                // console.log(findImageNew)
                // if (findImageNew.length > 0) {
                //     this.deskripsi.new.forEach((x,index) => {
                //         if (x.imgDeskripsi && x.imgDeskripsi.file !== null) {
                //             this.uploadImage(x.imgDeskripsi.file, res.data.deskripsi.new[index], x.imgDeskripsi.name)
                //         }       
                //     })
                // } 

                //for new image
                const responImage = res.data.new
                const listImages = this.deskripsi.list.filter( e => e.typeDeskripsi === 1)

            })
        },
         async uploadImage(image, id, name) {
            // if (image instanceof Blob){
                var data = new FormData();
                data.append('imgDeskripsi', image, name);
                await this.$apiPlatform.put(this.imgEndPoint+ id +'/', data).then(res => {
                    // this.$toast.show('Blog updated successfuly')
                    // this.initialize()
                    // this.checkSaving.thumbnail = true
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            // }
        },
    }
}
</script>