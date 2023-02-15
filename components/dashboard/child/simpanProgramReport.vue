<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','report'],
        data() {
            return {
                listNew: [],
                listUpdated: [],
                listDeleted: [],
                statusSimpan: {
                    baru: false,
                    edit: false,
                    delete: false
                }
            }
        },
        mounted() {
            this.initialize()
        },
        watch: {
            statusSimpan: {
                handler(val) {
                    if (val.baru === true && val.edit === true && val.delete === true) {
                        this.$emit('input', 'done')
                    }
                },
                deep: true
            }
        },
        methods: {
            initialize() {
                this.statusSimpan = {
                    baru: false,
                    edit: false,
                    delete: false
                }
                this.listUpdated = this.report.list.filter(e => e.tipe ==='update' )
                this.listNew = this.report.list.filter(e => e.tipe === 'new')
                this.listDeleted = this.report.deleted
                //delete

                if (this.listNew.length > 0) {
                    this.listNew.forEach((e,index) => {
                        this.reportBaru(e, index)
                    })
                } else {
                    this.statusSimpan.baru = true
                }

                if (this.listUpdated.length > 0) {
                    this.listUpdated.forEach((e,index) => {
                        this.reportUpdate(e.file.file, 'binFile', e.file.name, e.pkFileId, index)
                    })
                } else {
                    this.statusSimpan.edit = true
                }
                if (this.listDeleted.length > 0) {
                    this.listDeleted.forEach((e, index)=> {
                        this.reportDelete(e,index)
                    })
                } else {
                    this.statusSimpan.delete = true
                }


            },
            async reportBaru(item, index) {
                const forSimpan = {
                    activity: this.modelId,
                    deskripsiFile: item.deskripsiFile,
                    isLimitedaccess: item.isLimitedaccess
                }
                await this.$apiPlatform.post('moderator/programsfiles/', forSimpan).then(res => {
                    this.uploadImagePost(item.file.file, 'binFile', item.file.name, res.data.pkFileId, index)
                })
            },

            async uploadImagePost(image, untuk, name, id, index) {
                    var data = new FormData();
                    data.append(untuk, image, name);
                    await this.$apiPlatform.put('moderator/programsfiles/'+id+'/', data).then(res => {
                        if (this.listNew.length === (index + 1)) this.statusSimpan.baru = true
                    }).catch(err => {
                        console.log(err)
                    })
            },
            async reportUpdate(image, untuk, name, id, index) {
                    var data = new FormData();
                    data.append(untuk, image, name);
                    await this.$apiPlatform.put('moderator/programsfiles/'+id+'/', data).then(res => {
                        if (this.listUpdated.length === (index + 1)) this.statusSimpan.edit = true
                    }).catch(err => {
                        console.log(err)
                    })
            },
            async reportDelete(id,index) {
                await this.$apiPlatform.delete('moderator/programsfiles/'+id +'/').then(res => {
                    if (this.listDeleted.length === (index + 1)) this.statusSimpan.delete = true

                })
            }
        }
    }
</script>

