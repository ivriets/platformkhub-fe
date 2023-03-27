<template>
    <div>
        
    </div>
</template>


<script>
export default {
    props: ['value', 'files', 'modelId', 'pkFileId'],
    data() {
        return {
            
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            if (this.files.pkFileId && this.files.binFile !== '') {
                console.log('MASUK EDIT')
                this.edit()
            } else if (this.files.pkFileId && this.files.binFile === '') {
                console.log('MASUK HAPUS')
                this.hapus(this.files.pkFileId)
            } else {
                this.simpanDeskripsi()
            }
        },

        async simpanDeskripsi() {
            const data = {
                activity: this.modelId,
                deskripsiFile: ['khub', 'khub']
            }

            await this.$apiPlatform.post('moderator/eventsfiles/', data).then(res => {
                console.log(res.data)
                this.simpanFile(res.data.pkFileId)
            })
        },

        async hapus(id) {
            await this.$apiPlatform.delete('moderator/eventsfiles/'+id+'/').then(res => {
                console.log(res.data)
                this.$emit('input','done')
            })
        },

        simpan() {
            // console.log('MASUK KE SIMPAN FILE')
            console.log(this.modelId)

            const forSimpan = this.files
            forSimpan.deskripsiFile = ['khub', 'khub']
            // await this.$apiPlatform.put('resources/'+this.modelId+'/', {resourcesFiles: forSimpan}).then(res => {
                if (this.files.binFile && this.files.binFile.file ) {
                    this.simpanFile(this.pkFileId) //res.data.pkFileId
                } else {
                    this.$emit('input','done')
                }
            // })
        },

        async edit() {
            // console.log('MASUK KE EDIT FILE')
            
            this.$apiPlatform.put('moderator/eventsfiles/' + this.files.pkFileId + '/', this.files).then(res => {
                if (this.files.binFile && this.files.binFile.file )  {
                    this.simpanFile(this.files.pkFileId)
                } else {
                    this.$emit('input','done')
                }
            })
        },

        async simpanFile(id) {
            // if (image instanceof Blob){
                var data = new FormData();
                data.append('binFile', this.files.binFile.file, this.files.binFile.name);
                await this.$apiPlatform.put('moderator/eventsfiles/' + id + '/', data).then(res => {
                    this.$emit('input','done')
                }).catch(err => {
                    console.log(err)
                })
            // }
        },
    }
}
</script>