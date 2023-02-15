<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','journey'],
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
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.listNew = this.journey.list.filter(e => e.tipe === 'new')
                this.listUpdated = this.journey.list.filter(e => e.tipe !== 'new')
                this.listDeleted = this.journey.deleted

                if (this.listNew.length > 0) {
                    this.listNew.forEach((e,index) => {
                        this.tambahJourney(e,index)
                    })
                } else {
                    this.statusSimpan.baru = true
                }

                if (this.listUpdated.length > 0) {
                    this.listUpdated.forEach((e,index) => {
                        this.editJourney(e,index)
                    })
                } else {
                    this.statusSimpan.edit = true
                }
                if (this.listDeleted.length > 0) {
                    this.listDeleted.forEach((e,index) => {
                        this.deleteJourney(e,index)
                    })
                } else {
                    this.statusSimpan.delete = true
                }

            },
            async tambahJourney(item,index) {
                const req = {
                    journey: [
                        {
                            activity: this.modelId,
                            nomorUrut: item.nomorUrut,
                            judulJourney: item.judulJourney,
                            deskripsi: item.deskripsi
                        }
                    ]
                }
                await this.$apiPlatform.post('moderator/programsjourney/', req).then(res=> {
                    if (item.file && item.file.status === 'belumUpload') {
                        this.uploadImage(item.file.file, 'imgThumbnailJourney', item.file.name, res.data.journey[0].pkJourneyId, index)
                    } else {
                        if (this.listNew.length === (index + 1)) this.statusSimpan.baru = true
                    }
                })
            },

            async uploadImage(image, fieldName, name, id, index) {
                    var data = new FormData();
                    data.append(fieldName, image, name);
                    await this.$apiPlatform.put('moderator/programsjourney/'+id+'/', data).then(res => {
                        if (this.listNew.length === (index + 1)) this.statusSimpan.baru = true
                    }).catch(err => {
                        console.log(err)
                    })
            },
            async editJourney(item, index) {
                const req = {
                    nomorUrut: item.nomorUrut,
                    judulJourney: item.judulJourney,
                    deskripsi: item.deskripsi
                }
                await this.$apiPlatform.put('moderator/programsjourney/'+item.pkJourneyId+'/',req).then(res => {
                    if (item.file && item.file.status === 'belumUpload') {
                        this.uploadImagePut(item.file.file, 'imgThumbnailJourney', item.file.name, item.pkJourneyId, index)
                    } else {
                        if (this.listUpdated.length === (index + 1)) this.statusSimpan.edit = true
                    }
                })
            },
            async uploadImagePut(image, fieldName, name, id, index) {
                    var data = new FormData();
                    data.append(fieldName, image, name);
                    await this.$apiPlatform.put('moderator/programsjourney/'+id+'/', data).then(res => {
                        if (this.listNew.length === (index + 1)) this.statusSimpan.edit = true
                    }).catch(err => {
                        console.log(err)
                    })
            },
            async deleteJourney(id, index) {
                await this.$apiPlatform.delete('moderator/programsjourney/'+id +'/').then(res => {
                    if (this.listDeleted.length === (index + 1)) this.statusSimpan.delete = true

                })
            }


        }
        
    }
</script>

