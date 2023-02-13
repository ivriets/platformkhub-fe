<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','model','modelId','testimony'],
        data() {
            return {
                endPointRoot: '',
                endPointTestimony: '',
                inputField: '',
                listDeleted: [],
                listNew: [],
                listUpdated: [],
                statusSimpan: {
                    baru: false,
                    delete:false,
                    edit: false
                }
            }
        },
        mounted() {
            this.initialize()
        },
        watch: {
            statusSimpan: {
                handler(val) {
                    console.log(val)
                    if (val.baru === true && val.delete === true && val.edit === true) {
                        this.$emit('input','done')
                    }
                },
                deep:true
            }
        },
        methods: {
            initialize() {
                this.statusSimpan = {
                    baru: false,
                    delete:false,
                    edit: false
                }
                if (this.model === 'event') {
                    this.endPointRoot = 'moderator/events/' + this.modelId +'/'
                    this.endPointTestimony = 'moderator/testimoninonuser/'
                    this.inputField = 'testimoniNonUser'
                }
                this.listNew = this.testimony.list.filter(e => e.tipe ==='new')
                this.listUpdated = this.testimony.list.filter(e => e.tipe ==='update')
                this.listDeleted = this.testimony.deleted

                if (this.listNew.length > 0) {
                    this.listNew.forEach((e,index)=> {
                        this.testimoniBaru(e, index)
                    })
                } else {
                    this.statusSimpan.baru = true
                }
                if (this.listUpdated.length > 0) {
                    this.listUpdated.forEach((e,index) => {
                        this.updateTestimoni(e, index)
                    })
                } else {
                    this.statusSimpan.edit = true
                }
                if (this.listDeleted.length > 0) {
                    this.listDeleted.forEach((e,index) => {
                        this.deleteTestimoni(e,index)
                    })
                } else {
                    this.statusSimpan.delete = true
                }

            },
            async testimoniBaru(item, index) {
                const forSimpan = {
                    nama: item.nama,
                    deskripsi: item.deskripsi
                }
                await this.$apiPlatform.put(this.endPointRoot, { [this.inputField] : forSimpan}).then(res => {
                    // console.log(res.data)
                    if (this.listNew.length === (index + 1)) this.statusSimpan.baru = true
                })
            },
            async updateTestimoni(item, index) {
                var newForm = new FormData();
                newForm.append('nama', item.nama)
                newForm.append('deskripsi', item.deskripsi)

                if (item.imgTestimoni && item.imgTestimoni.status === 'belumUpload') {
                    newForm.append('imgTestimoni', item.imgTestimoni.file, item.imgTestimoni.name);
                }
                await this.$apiPlatform.put(this.endPointTestimony  + item.pkTestimoniNonUserId + '/' , newForm).then(res => {
                    // this.btnText = 'Save'
                    // this.counterBaru +=1
                    if (this.listUpdated.length === (index + 1)) this.statusSimpan.edit = true

                }).catch(err => {
                    console.log(err)
                })
            },
            async deleteTestimoni(id,index) {
                await this.$apiPlatform.delete(this.endPointTestimony  + id + '/').then(res => {
                    if (this.listDeleted.length === (index + 1)) this.statusSimpan.delete = true
                    
                })


            }
        }
    }
</script>

