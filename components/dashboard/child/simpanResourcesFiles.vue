<template>
    <div>
        {{resourcesFiles}}
    </div>
</template>
<script>
export default {
    props: ['value', 'resourcesFiles'],
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            console.log(this.resourcesFiles)
            if (this.resourcesFiles.binFile === '' && this.resourcesFiles.embedLink === '') {
                this.$emit('input','done')
            } else if (this.resourcesFiles.binFile !== '') {
                this.simpanFile()
            } else {
                this.simpan()
            }
        },
        async simpan() {
            this.$apiPlatform.put('moderator/resourcesfiles/' + this.resourcesFiles.pkFileId + '/', this.resourcesFiles).then(res => {
                this.$emit('input','done')
            })
        },
         async simpanFile() {
            this
            // if (image instanceof Blob){
                var data = new FormData();
                data.append('binFile', this.resourcesFiles.binFile.file, this.resourcesFiles.binFile.name);
                await this.$apiPlatform.put('moderator/resourcesfiles/' + this.resourcesFiles.pkFileId + '/', data).then(res => {
                    this.$emit('input','done')
                }).catch(err => {
                    console.log(err)
                })
            // }
        },


    }
}
</script>