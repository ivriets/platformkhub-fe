<template>
    <div class="mt-[32px]">

        <ElementsTab 
            v-model="selectedTab"
            :listTab="listTab"
            :selectedTab="selectedTab"
            :landing="'spa'"
        />

        <DashboardOrganisasiEditSubCabang 
            :selectedTab="selectedTab"
            :key="'keytab'+keyTable"
        />

    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'terkirim',
            listTab: [
                {
                    id: 'terkirim',
                    label: 'Terkirim'
                },
                {
                    id: 'diterima',
                    label: 'Diterima'
                }
            ],
            filterTerkirim: {
                search: ''
            },
            filterDiterima: {
                search: ''
            },
            formTerkirim: {
                cariOrganisasi: ''
            },
            actions: {
                status: true,
                button: {
                    edit: {
                        status: false,
                        tipe: 'modal',
                        path: ''
                    },
                    // path: this.fullUrl+'/edit'
                    delete: {
                        status: true,
                        tipe: 'modal',
                        path: ''
                    },
                    print: {
                        status: false,
                        tipe: 'page',
                        path: ''
                    }
                }
            },

            masterTableTerkirim: [
                {
                    header: 'Cabang',
                    value: 'namaOrganisasi',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Kota',
                    value: 'kota',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'status',
                    tipe: 'integer',
                    display: true
                }
            ],
            dataTableTerkirim: [],
            masterTableDiterima: [
                {
                    header: 'Cabang',
                    value: 'namaOrganisasi',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Kota',
                    value: 'kota',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'status',
                    tipe: 'integer',
                    display: true
                }
            ],
            dataTableDiterima: [],
            dataOrganisasi : undefined,
            namaOrganisasiList : [] ,
            brachIdList: [],
            message: "",
            paginasiTerkirim: {
                startIndex: 0,
                limit: 10,
                offset: 0,
                currentPage: 1,
                totalPage:3,
                start: 0,
                end: 10,
                key: 0
            },
            loaderDetailTerkirim: false,
            keyTable:0

        }
    },    
    computed: {
        id() {
            return this.$route.params.id;
        }, 

        tableDetail() {
            const tableDetail = [
                {
                    header: this.$t('Branch'),
                    itemValue: 'nama',
                },
               {
                    header: this.$t('Kota'),
                    itemValue: 'kota',
                },
                {
                    header: 'Status',
                    itemValue: 'status'
                },
                {
                    header: '',
                    itemValue: 'actions'
                }
            ]
            return tableDetail
        }

    },
    watch: {
        selectedTab(val) {
            this.keyTable +=1
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            this.dataTableTerkirim = []
            this.dataTableDiterima = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataOrganisasi = res.data
                if (this.dataOrganisasi.organisasiCabangInternal.length > 0){
                    // this.dataTableTerkirim = _.map(this.dataOrganisasi.organisasiCabangInternal.filter(e => {return e.typePengiriman == 0}), function(o){
                    // if (o){
                    //     return {
                    //     "organisasiId": o.branch.organisasiId,
                    //     "namaOrganisasi": o.branch.namaOrganisasi,
                    //     "kota": _.map(o.branch.lokasiOrganisasi, "kota").toString(),
                    //     "status": o.confirmed
                    // }}})
                    this.dataTableTerkirim = this.dataOrganisasi.organisasiCabangInternal.filter(e => e.typePengiriman === 0 ).map(e => {
                        const data = {
                            id: e.branch.organisasiId,
                            nama: e.branch.namaOrganisasi,
                            kota: e.branch.lokasiOrganisasi.map( x => x.kota).join(', '),
                            status: e.confirmed
                        }
                        return data;
                    })
                    this.dataTableDiterima = this.dataOrganisasi.organisasiCabangInternal.filter(e => e.typePengiriman ===1).map(e => {
                        const data = {
                            id: e.branch.organisasiId,
                            nama: e.branch.namaOrganisasi,
                            kota: e.branch.lokasiOrganisasi.map( x => x.kota).join(', '),
                            status: e.confirmed
                        }
                        return data;
                    })
                    // this.dataTableDiterima = _.map(this.dataOrganisasi.organisasiCabangInternal.filter(e => {return e.typePengiriman == 1}), function(o){
                    // if (o){
                    //     return {
                    //     "organisasiId": o.branch.organisasiId,
                    //     "namaOrganisasi": o.branch.namaOrganisasi,
                    //     "kota": _.map(o.branch.lokasiOrganisasi, "kota").toString(),
                    //     "status": o.confirmed
                    // }}})
                }
            }).catch(err => {
                console.log(err)
            })
            await this.$apiPlatform.get('verificator/listOrganisasi/').then(res => {
                this.namaOrganisasiList = _.flatMap(res.data, "namaOrganisasi")
                this.brachIdList = _.flatMap(res.data, "organisasiId")
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                this.message = data.message
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
        undangBranch() {
            this.updateData({"inviteBranch":this.brachIdList[this.namaOrganisasiList.indexOf(this.formTerkirim.cariOrganisasi)]})
        },
        deleteBranch(data) {
            if (confirm('hapus '+ data.namaOrganisasi+' dari daftar cabang?')) {
                this.updateData({"deleteBranch":data.organisasiId})
            }
        },
        terimaBranch(data) {
            if (confirm('terima '+ data.namaOrganisasi+' sebagai cabang?')) {
                this.updateData({"acceptBranch":data.organisasiId})
            }
        },
        tolakBranch(data) {
            if (confirm('tolak '+ data.namaOrganisasi+' sebagai cabang?')) {
                this.updateData({"rejectBranch":data.organisasiId})
            }
        },
        btnTabTerkirim() {
            this.selectedTab = 'terkirim'
        },

        btnTabDiterima() {
            this.selectedTab = 'diterima'
        }
    }
}
</script>