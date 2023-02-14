<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['value','lokasi', 'model', 'modelId'],
        data() {
            return {
                endPointRoot: '',
                endPointLokasi: '',
                fieldLokasi: '',
                listNew: [],
                listUpdated: [],
                listDeleted: [],
                checkSimpan: {
                    baru: false,
                    edit: false,
                    delete: false
                }
            }
        },  
        mounted() {
            this.checkSimpan ={
                    baru: false,
                    edit: false,
                    delete: false
                }
            this.initialize()
        },
        watch: {
            checkSimpan: {
                handler(val) {
                    if (val.baru === true && val.edit === true && val.delete === true) {
                        this.$emit('input','done')
                    }
                },
                deep:true
            }
        },
        methods: {
            initialize() {
                if (this.model === 'program') {
                    this.endPointRoot = 'moderator/programs/'+this.modelId+'/';
                    this.endPointLokasi = 'moderator/programslokasi/'
                    this.fieldLokasi = 'lokasi'
                } 

                this.listNew = this.lokasi.list.filter(e => !e.pkLokasiActivityId)
                this.listUpdated = this.lokasi.list.filter(e => e.pkLokasiActivityId )
                this.listDeleted = this.lokasi.deleted
                
                if (this.listNew.length > 0) {
                    this.lokasiBaru()
                } else {
                    this.checkSimpan.baru = true
                }


                if (this.listUpdated.length > 0) {
                    this.listUpdated.forEach((e,index) => {
                        this.editLokasi(e,index)
                    })
                } else {
                    this.checkSimpan.edit = true
                }
                if (this.listDeleted.length > 0) {
                    this.listDeleted.forEach((e,index) => {
                        this.deleteLokasi(e,index)
                    })
                } else {
                    this.checkSimpan.delete = true
                }



            },
            async lokasiBaru() {
                const forSimpan = {
                    [this.fieldLokasi] : this.listNew
                }
                await this.$apiPlatform.put(this.endPointRoot, forSimpan).then(res => {
                    this.checkSimpan.baru = true
                })

            },
            async editLokasi(e, index) {
                await this.$apiPlatform.put(this.endPointLokasi+e.pkLokasiActivityId+'/',e).then(res => {
                    // this.$emit('input', 'done')
                    if (this.listUpdated.length === (index + 1)) this.checkSimpan.edit = true
                })
            },
            async deleteLokasi(e, index) {
                await this.$apiPlatform.delete(this.endPointLokasi+e+'/').then(res => {
                    // this.$emit('input', 'done')
                    if (this.listDeleted.length === (index + 1)) this.checkSimpan.delete = true

                })
            }

        }
        
    }
</script>

