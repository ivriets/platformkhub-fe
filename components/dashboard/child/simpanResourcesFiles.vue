<template>
    <div>
        <!-- {{resourcesFiles}} -->
    </div>
</template>
<script>
export default {
    props: ['value', 'resourcesFiles','modelId'],
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            console.log(this.resourcesFiles)
            // if (this.resourcesFiles.binFile === '' && this.resourcesFiles.embedLink === '') {
            //     this.$emit('input','done')
            // } else if (this.resourcesFiles.binFile && this.resourcesFiles.binFile.file && this.resourcesFiles.pkFileId) {
            //     this.simpanFile()
            // } else {
            //     this.simpan()
            // }
            if (this.resourcesFiles.pkFileId) {
                this.edit()
            } else {
                this.simpan()
            }
        },
        async simpan() {
            // this.$apiPlatform.put('moderator/resourcesfiles/' + this.resourcesFiles.pkFileId + '/', this.resourcesFiles).then(res => {
            //     this.$emit('input','done')
            // })
            this.$apiPlatform.put('moderator/resources/'+this.modelId+'/', this.resourcesFiles).then(res => {
                if (this.resourcesFiles.binFile && this.resourcesFiles.binFile.file )  {
                    this.simpanFile(id)
                } else {
                    this.$emit('input','done')
                }
            })
        },
        async edit() {
            this.$apiPlatform.put('moderator/resourcesfiles/' + this.resourcesFiles.pkFileId + '/', this.resourcesFiles).then(res => {
                if (this.resourcesFiles.binFile && this.resourcesFiles.binFile.file )  {
                    this.simpanFile(this.resourcesFiles.pkFileId)
                } else {
                    this.$emit('input','done')
                }
            })

        },


         async simpanFile(id) {
            // if (image instanceof Blob){
                var data = new FormData();
                data.append('binFile', this.resourcesFiles.binFile.file, this.resourcesFiles.binFile.name);
                await this.$apiPlatform.put('moderator/resourcesfiles/' + id + '/', data).then(res => {
                    this.$emit('input','done')
                }).catch(err => {
                    console.log(err)
                })
            // }
        },


    }
}
</script>