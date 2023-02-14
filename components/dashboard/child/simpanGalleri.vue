<template>
    <div>
    </div>
</template>
<script>
export default {
    props: ['value','galleri', 'model', 'modelId'],
    data() {
        return {
            baru: [],
            deleted: [],
            endPointRoot: '',
            endPointGalleri: '',
            fieldGalleri: '',
            counterBaru: 0,
            inputField: ''
        }
    },
    mounted() {
        this.initialize()
    },
    watch: {
        counterBaru(val) {
            if (val > 0) {
                if (val >= this.baru.length) this.$emit('input', 'done')
            }
        }
    },

    methods: {
        initialize() {
            this.counterBaru = 0
            //
            if (this.model === 'blog') {
                this.endPointRoot = 'moderator/blogs/'+this.modelId+'/';
                this.endPointGalleri = 'moderator/bloggalleries/'
                this.fieldGalleri = 'blogsGalleries'
                this.inputField = 'blog'
            } else if (this.model === 'event') {
                this.endPointRoot = 'moderator/events/'+this.modelId+'/';
                this.endPointGalleri = 'moderator/eventsgalleries/'
                this.fieldGalleri = 'galleries'
                this.inputField = 'activity'
            } else if (this.model === 'program') {
                this.endPointRoot = 'moderator/programs/'+this.modelId+'/';
                this.endPointGalleri = 'moderator/programsgalleries/'
                this.fieldGalleri = 'galleries'
                this.inputField = 'activity'
            }

            if (this.galleri.deleted.length > 0) {
                this.galleri.deleted.forEach(e => {
                    this.deleteGallery(e)
                })
                
            }
            // //simpan root
            this.baru = this.galleri.list.filter(e => e.status === 'belumUpload')
            if (this.baru.length > 0)  {
                this.baru.forEach(e => {
                    this.postDeskripsi(e)
                })
            } else {
                this.$emit('input', 'done')
            }

           
        },
        async postDeskripsi(item) {
            
            const req = {
                [this.inputField]: this.modelId,
                deskripsiGambar: ['khub','khub']
            }
            await this.$apiPlatform.post(this.endPointGalleri, req).then(res => {
                // console.log(res.data)
                this.uploadImage(item.file, item.name, res.data.pkGalleryId)
            })
        },
         async uploadImage(image, name, id) {
            // if (image instanceof Blob){
                var data = new FormData();
                data.append('imgGambar', image, name);
                await this.$apiPlatform.put(this.endPointGalleri + id +'/'   , data).then(res => {
                    // this.btnText = 'Save'
                    this.counterBaru +=1
                }).catch(err => {
                    console.log(err)
                })
            // }
        },
        async deleteGallery(item) {
            await this.$apiPlatform.delete(this.endPointGalleri + item).then(res => {
                console.log(res.data)
            })
        }

    }
}

// {
//     "pkGalleryId": 62515305,
//     "imgGambar": "https://platform.api.k-hub.org/assets/placeholder/gallery.jpg",
//     "deskripsiGambar": [
//         "wadaw",
//         "wadaw"
//     ]
// }
</script>