<template>
    <div>
            <div class="filter-area flex items-center justify-between mb-8">
                <div class="w-96 flex items-end gap-x-4 ">
                        <ElementsSearchBarButton 
                            v-model="filter.search"
                             :placeholder="$t('Nama Pengguna')" 
                            :gaya="'icon'"
                            :name="'searchtext'"
                            :label="$t('Cari Undangan')"
                        />
                </div>
                <div class="w-96 ">
                    <div class="w-full flex items-end gap-x-4" v-if="selectedTab==='undangan'">
                        <InputAutocompleteApi 
                            v-model="cariAnggota.model"
                            :name="'cariMember'"
                            :label="$t('Cari Anggota')"
                            :placeholder="$t('Nama Pengguna')" 
                            :itemValue="'accountId'"
                            :itemLabel="'namaIndividu'"
                            :searchQuery="'title'"
                            :addNew="false"
                            :displayLabel="true"
                            :endPoint="cariAnggota.endPoint"
                            :key="cariAnggota.key"
                            :output="'obj'"
                        />
                        <button :disabled="cariAnggota.model === null || cariAnggota.model === '' ? true : false" 
                            @click="undangMember" class="button-standar-field" >{{ $t('Undang') }}</button>
                    </div>
                </div>
            </div>
            <div class="table-area text-sm">
                <ElementsTable
                    v-model="listingPage"
                    :tableDetail="tableDetail"
                >
                    <template v-slot:status="{ item }">
                        <div v-if="item.status === 1" class="">Approved</div>
                        <div v-else-if="item.status === 2" class="">Declined</div>
                        <div v-else-if="item.status === 3" class="">Pending</div>

                    </template>
                    <template v-slot:actions="{ item }" >
                        <div class="w-full flex items-center justify-end gap-5">
                            <button v-if="selectedTab==='anggota'" class="text-empat border-b border-empat hover:opacity-60" @click="changePosition(item)">{{ $t('Change Position') }}</button>
                            <button v-if="selectedTab==='undangan' && item.status===3" class="text-empat border-b border-empat hover:opacity-60" @click="resendEmail(item)">{{ $t('Resend email') }}</button>
                            <button v-if="selectedTab==='permintaan' && item.status===3" class="text-[#129555] border-b border-empat hover:opacity-60" @click="approveMember(item)">{{ $t('Approve') }}</button>
                            <button v-if="selectedTab==='permintaan' && item.status===3" class="text-[#D10D0D] border-b border-empat hover:opacity-60" @click="rejectMember(item)">{{ $t('Reject') }}</button>

                            <button v-if="['undangan','anggota'].includes(selectedTab)" :title="$t('Delete Member')" class="button-table-delete w-10 h-10" @click="deleteMember(item)"></button>

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

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'changeposition'"
            :persistent="persistent"
        >
            <div v-if="memberEdited" class="p-6">
                <div class="mb-5">
                    <InputText 
                        v-model="memberEdited.position"
                        placeholder="Tulis posisi untuk member"
                        :name="'gantiposisi'"
                        :label="'Position'"
                    />
                </div>
                <div class="flex justify-end">
                    <div @click="simpanPosisi" class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">{{ $t('Change Position') }}</div>
                </div>
            </div>
        </ElementsModal>








    </div>
</template>
<script>
export default {
    props: ['selectedTab'],
    data() {
        return {

            cariAnggota: {
                model: null,
                key: 0,
                endPoint: 'verificator/listIndividu/',
                searchQuery: 'title'
            },


            modalAction: false,
            modalTitle: 'Change Position',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            memberEdited: null,



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
            const tableCol = [
                {
                    header: this.$t('Anggota'),
                    itemValue: 'nama',
                },
                {
                    header: this.$t('Position'),
                    itemValue: 'position',
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
            var tableDetail = []

            if (this.selectedTab === 'anggota') {
                tableDetail = [tableCol[0],tableCol[1],tableCol[3]]
            } else if (this.selectedTab === 'undangan') {
                tableDetail = [tableCol[0],tableCol[2],tableCol[3]]
            } else if (this.selectedTab === 'permintaan') {
                tableDetail = [tableCol[0], tableCol[2], tableCol[3]]
            }


            return tableDetail
        }

    },
    watch: {
        'paginasi.currentPage'(val) {
            this.runPaginasi()
        },
        'filter.search'(val) {
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
                const anggota = _.map(res.data.teamMember, function(o){
                    return {
                        userId: o.individu.userId,
                        nama: o.individu.namaIndividu,
                        position: o.posisi,
                    }
                })

                const undangan = _.map(res.data.requestedByIndividu.filter(e=>{return e.typeJoin=="inviteByOrganizations"}), function(o){
                    return {
                        userId: o.individu.userId,
                        nama: o.individu.namaIndividu,
                        status: o.statusRequest.id
                    }
                })
                const permintaan = _.map(res.data.requestedByIndividu.filter(e=>{return e.typeJoin=="requestedByIndividu"}), function(o){
                    return {
                        userId: o.individu.userId,
                        nama: o.individu.namaIndividu,
                        status: o.statusRequest.id
                    }
                })

                this.listing = eval(this.selectedTab)
                this.$nextTick(() => {
                    this.runPaginasi()
                })


            }).catch(err => {
                console.log(err)
            })
            // await this.$apiPlatform.get('verificator/listIndividu/?limit=10&offset=0').then(res => {
            //     console.log(res.data)
            //     // this.namaIndividuList = _.flatMap(res.data, "namaIndividu")
            //     // this.idIndividuList = _.flatMap(res.data, "userId")
            //     // this.emailIndividuList = _.flatMap(res.data, "email")
            // }).catch(err => {
            //     console.log(err)
            // })
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
        // deleteBranch(item) {
        // this.$modal.show({
        //         type: 'warning',
        //         title: this.$t('Delete Branch'),
        //         body: this.$t('hapusBranch'),
        //         primary: {
        //             label: 'OK',
        //             theme: 'red',
        //         action: () => this.realDeleteBranch(item),
        //         }
        // })
        // },
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
        changePosition(data) {
            this.memberEdited = data
            this.modalAction = true
            this.keyModal += 1
        },
        simpanPosisi () {
            this.updateData({"updateMemberPosition":{"userId":this.memberEdited.userId, "posisi":this.memberEdited.position}})
            this.modalAction = false
            this.keyModal += 1
            this.initialize()
        },
        deleteMember(data) {
                this.$modal.show({
                    type: 'warning',
                    title: this.$t('Delete Notification'),
                    body: this.$t('Member') + ' ' +this.$t('deleteNotificationText'),
                    primary: {
                        label: 'OK',
                        theme: 'green',
                        action: () => this.realDeleteMember(data),
                    },
                    secondary: {
                        label: this.$t('Cancel'),
                        theme: 'white',
                        action: () => {}
                    }
                })
        },
        realDeleteMember(data) {
            this.updateData({"deleteMember":data.userId})
        },
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        async resendEmail(item) {
            
        },
        approveMember(data) {
            this.updateData({"approvedMember":data.userId})
        },
        rejectMember(data) {
            this.updateData({"rejectedMember":data.userId})
        },
        undangMember() {
        const item = this.cariAnggota.model
        var invitation = {
            email: item.email,
            nama: item.namaIndividu,
        }

        this.updateData({"joinInvitation":[invitation]})
        }








    }
}
</script>