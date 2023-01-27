<template>
    <div>
            <div class="filter-area flex items-center justify-between mb-8">
                <div class="w-96 flex items-end gap-x-4 ">
                        <ElementsSearchBarButton 
                            v-model="filter.search"
                            :placeholder="$t('Nama Cabang')"
                            :gaya="'icon'"
                            :name="'searchtext'"
                            :label="$t('Cari Cabang')"
                        />
                </div>
                <div class="w-96 ">
                    <div class="w-full flex items-end gap-x-4" v-if="selectedTab==='terkirim'">
                        <InputAutocompleteApi 
                            v-model="cariCabang.model"
                            :name="'cariCabang'"
                            :label="$t('Undang Cabang')"
                            :placeholder="$t('Nama Cabang')" 
                            :itemValue="'accountId'"
                            :itemLabel="'namaOrganisasi'"
                            :searchQuery="'title'"
                            :addNew="false"
                            :displayLabel="true"
                            :endPoint="cariCabang.endPoint"
                            :key="cariCabang.key"
                            :output="'obj'"
                        />
                        <button :disabled="cariCabang.model === null || cariCabang.model === '' ? true : false" 
                            @click="undangCabang" class="button-standar-field" >{{ $t('Undang') }}</button>
                    </div>
                </div>
            </div>
            <div class="table-area text-sm">
                <ElementsTable
                    v-model="listingPage"
                    :tableDetail="tableDetail"
                >
                    <template v-slot:status="{ item }">
                        <span v-if="item.status ===1" class="text-444">{{ $t('Tertunda') }}</span>
                        <span v-else-if="item.status ===2" class="text-approved-accepted">{{ $t('Bergabung') }}</span>
                        <span v-else-if="item.status ===3" class="text-rejected">{{ $t('Menolak') }}</span>
                    </template>
                    <template v-slot:actions="{ item }" >
                        <div class="w-full flex items-center justify-end gap-5">
                            <button v-if="selectedTab==='diterima' && item.status ===1" class="button-standar-polos bg-empat text-white">{{ $t('Terima') }}</button>
                            <button v-if="selectedTab==='diterima' && item.status ===1" class="button-standar-polos bg-[#D10D0D] text-white">{{ $t('Tolak') }}</button>
                            <button :title="$t('Delete Branch')" class="button-table-delete w-10 h-10" @click="deleteBranch(item)"></button>
                        </div>

                    </template>
                </ElementsTable>
            </div>
            <div  class="pagination-area text-center mt-6">
                <ElementsPaginasiSpa 
                    v-model="paginasi.currentPage"
                    :totalPage="paginasi.totalPage"
                    :totalVisible="7"
                    :loaderPage="!loaderDetail"
                    :key="'pageset'+paginasi.key"
                />
            </div>
    </div>
</template>
<script>
export default {
    props: ['selectedTab'],
    data() {
        return {

            cariCabang: {
                model: null,
                key: 0,
                endPoint: 'verificator/listOrganisasi/',
                searchQuery: 'title'
            },

            listing: [],
            listingPage: [],
            paginasi: {
                startIndex: 0,
                limit: 12,
                offset: 0,
                currentPage: 1,
                totalPage:3,
                start: 0,
                end: 12,
                key: 0
            },
            loaderDetail: false,
            filter: {
                search: ''
            }

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
                    itemValue: 'actions',
                    itemClass: 'text-right'
                }
            ]
            return tableDetail
        }

    },
    watch: {
        'paginasi.currentPage'(val) {
            this.runPaginasi()
        },
        'filter.search'(val) {
            // console.log(val)
            this.paginasi.currentPage = 1
            this.runPaginasi()
        }

    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loaderDetail = false
            this.masterPoint()
        },

        async masterPoint() {

            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                const dataOrganisasi = res.data
                if (dataOrganisasi.organisasiCabangInternal.length > 0){
                        const terkirim = dataOrganisasi.organisasiCabangInternal.filter(e => e.typePengiriman === 0 ).map(e => {
                            const data = {
                                id: e.branch.organisasiId,
                                nama: e.branch.namaOrganisasi,
                                kota: e.branch.lokasiOrganisasi.map( x => x.kota).join(', '),
                                status: e.confirmed
                            }
                            return data;
                        })
                        const diterima = dataOrganisasi.organisasiCabangInternal.filter(e => e.typePengiriman ===1).map(e => {
                            const data = {
                                id: e.branch.organisasiId,
                                nama: e.branch.namaOrganisasi,
                                kota: e.branch.lokasiOrganisasi.map( x => x.kota).join(', '),
                                status: e.confirmed
                            }
                            return data;
                        })
                        this.listing = eval(this.selectedTab)
                        this.$nextTick(() => {
                            this.runPaginasi()
                        })
                }
            }).catch(err => {
                console.log(err)
            })
        //     await this.$apiPlatform.get('verificator/listOrganisasi/').then(res => {
        //         console.log(res.data)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        },

        runPaginasi() {
            const listing = this.listing.filter(e => e.nama.toLowerCase().includes(this.filter.search.toLowerCase()))
            // const listing = this.listing
            this.paginasi.totalPage = Math.ceil(listing.length / this.paginasi.limit)

            this.paginasi.start = (this.paginasi.currentPage - 1) * this.paginasi.limit
            this.paginasi.end = this.paginasi.start + this.paginasi.limit
            this.paginasi.startIndex = this.paginasi.start

            this.listingPage = listing.slice(this.paginasi.start, this.paginasi.end)
            this.$nextTick(() => {
                    this.loaderDetail = true
                    this.paginasi.key +=1
            })

        },
        deleteBranch(item) {
        this.$modal.show({
                type: 'warning',
                title: this.$t('Delete Branch'),
                body: this.$t('hapusBranch'),
                primary: {
                    label: 'OK',
                    theme: 'red',
                action: () => this.realDeleteBranch(item),
                }
        })
        },
        realDeleteBranch() {
            this.updateData({"deleteBranch":data.organisasiId})
        },
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        searchCabang() {
            this.paginasi.currentPage = 1
            this.runPaginasi()
        },
        searchKeyUp(e) {
            if (e.key === 'Enter' || e.key==='Escape') this.runPaginasi()
        },
        undangCabang() {
            this.updateData({"inviteBranch":this.cariCabang.model.organisasiId})

        }



    }
}
</script>