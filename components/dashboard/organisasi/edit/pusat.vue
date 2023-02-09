<template>
    <div class="mt-[32px]">
        <!-- <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabPusat" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'pusat' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Pusat</div>
                </div>
                <div @click="btnTabUndangan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'undangan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Undangan</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-10">
        </div> -->
        <ElementsTab 
            v-model="selectedTab"
            :listTab="listTab"
            :selectedTab="selectedTab"
            :landing="'spa'"
        />

        <!-- TAB PUSAT -->
        <div v-if="selectedTab === 'pusat' && dataHeadquarter">
            <div class="bg-white rounded-lg shadow-md p-6 border border-gray-50 mb-10">
                <div class="flex items-center gap-x-6 mb-6">
                    <div class="">
                        <img v-if="dataHeadquarter.imgLogoOrganisasi" class="w-16 h-16 rounded-full" :src="basePath+dataHeadquarter.imgLogoOrganisasi" alt="image description">
                    </div>
                    <div class="font-semibold">{{dataHeadquarter.namaOrganisasi}}</div>
                </div>
                <div class="grid grid-cols-4 gap-6">
                    <!-- <div class="col-span-2">
                        <div class="font-medium text-warna-lima mb-1">{{ $t('Location') }}</div>
                        <div v-for="(i, index) in dataHeadquarter.lokasiOrganisasi" :key="'lo'+index" class="text-warna-sembilan">{{i.jalan}}, {{i.kota}}, {{i.provinsi}}</div>
                    </div> -->
                    <!-- <div v-if="dataHeadquarter.typeOrganisasi" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Tipe</div>
                        <div v-for="(i, index) in dataHeadquarter.typeOrganisasi" :key="'to'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeOrganisasi.length">, </span>
                        </div>
                    </div> -->
                    <!-- <div v-if="dataHeadquarter.typeApproach" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Pendekatan</div>
                        <div v-for="(i, index) in dataHeadquarter.typeApproach" :key="'ta'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeApproach.length">, </span>
                        </div>
                    </div> -->
                    <!-- <div v-if="dataHeadquarter.typeIssues" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Topik</div>
                        <div v-for="(i, index) in dataHeadquarter.typeIssues" :key="'ti'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeIssues.length">, </span>
                        </div>
                    </div> -->

                    <div class="col-span-4 md:col-span-2">
                        <ElementsDisplayFieldBawah 
                            :title="$t('Location')"
                            :content="dataHeadquarter.lokasiOrganisasi.map(e=>e.jalan + ' ' + e.kota +' ' + ' ' + e.provinsi).join(', ')"
                            v-if="dataHeadquarter.lokasiOrganisasi"
                        />
                    </div>
                    <div class="col-span4 md:col-span-2">
                        <ElementsDisplayFieldBawah 
                            :title="$t('Organization Type')"
                            :content="dataHeadquarter.typeOrganisasi.map(e=>e.nama[bahasa]).join(', ')"
                            v-if="dataHeadquarter.typeOrganisasi"
                        />
                    </div>
                    <div class="col-span4 md:col-span-2">
                        <ElementsDisplayFieldBawah 
                            :title="$t('Approach')"
                            :content="dataHeadquarter.typeApproach.map(e=>e.nama[bahasa]).join(', ')"
                            v-if="dataHeadquarter.typeApproach"
                        />
                    </div>

                    <div class="col-span4 md:col-span-2">
                        <ElementsDisplayFieldBawah 
                            :title="$t('Issues')"
                            :content="dataHeadquarter.typeIssues.map(e=>e.nama[bahasa]).join(', ')"
                            v-if="dataHeadquarter.typeIssues"
                        />
                    </div>

                </div>
                <div class="flex justify-end mt-10">
                    <button @click="btnKeluarDariPusat()" class="button-standar-outline">{{ $t('Keluar dari Pusat') }}</button>
                </div>
            </div>
            
        </div>


        <!-- TAB UNDANGAN -->
        <div v-if="selectedTab === 'undangan'">
                <!-- <div class="w-[240px] mr-4">
                    <ElementsSearchBarResponsive 
                        v-model="filterUndangan.search"
                        :placeholder="'Cari Organisasi Pusat'"
                        :gaya="'icon'"
                        :name="'searchtext'"
                    />
                </div>
                <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div> -->
                <div class="w-full md:w-96 flex items-end gap-x-4 ">
                        <ElementsSearchBarButton 
                            v-model="filterUndangan.search"
                            :placeholder="$t('Search') + ' '+ $t('Pusat')"
                            :gaya="'icon'"
                            :name="'searchtext'"
                            :label="''"
                        />
                </div>

                <div class="relative overflow-x-auto text-sm mt-8">
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
                                    <button 
                                        @click="btnTerimaUndangan(item)"
                                        v-if="selectedTab==='undangan' && item.status ===1" 
                                        class="button-standar-polos bg-empat text-white">{{ $t('Terima') }}</button>
                                    <button 
                                        @click="btnTolakUndangan(item)"
                                        v-if="selectedTab==='undangan' && item.status ===1" 
                                        class="button-standar-polos bg-[#D10D0D] text-white">{{ $t('Tolak') }}</button>
                                    <button :title="$t('Delete Headquerter')" class="button-table-delete w-10 h-10" @click="deletePusat(item)"></button>
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

            
            <!-- <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableUndangan" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[250px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableUndangan" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableUndangan" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'">
                                        <div v-if="item[x.value] === 1" class="text-[#444]">Tertunda</div>
                                        <div v-if="item[x.value] === 2" class="text-approved-accepted">Bergabung</div>
                                        <div v-if="item[x.value] === 3" class="text-rejected">Menolak</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div v-if="item.status === 1" class="flex items-center gap-x-6">
                                    <div @click="btnTerimaUndangan(item)" class="w-[99px] text-center bg-warna-empat hover:bg-blue-900 text-white rounded-lg py-2 cursor-pointer">Terima</div>
                                    <div @click="btnTolakUndangan(item)" class="w-[99px] text-center bg-warna-rejected hover:bg-red-700 text-white rounded-lg py-2 cursor-pointer">Tolak</div>
                                </div>
                                <div v-else></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
        </div>

        <!-- <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'keluardaripusat'"
            :persistent="persistent"
        >
            <div class="p-6">
                <div class="text-center text-[34px] mb-12">Apakah kamu yakin keluar sebagai cabang dari organisasi ini?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnBatalKeluar" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Batal</div>
                    <div @click="btnYakinKeluar" class="w-full text-center bg-warna-rejected hover:bg-red-700 text-white rounded-lg py-3 cursor-pointer">Keluar</div>
                </div>
            </div>
        </ElementsModal> -->

        <!-- <ElementsModal 
            v-model="modalActionJoin"
            :title="modalTitleJoin"
            :width="modalWidthJoin"
            :key="keyModalJoin+'bergabung'"
            :persistent="persistentJoin"
        >
            <div v-if="calonHeadquarter" class="p-6">
                <div class="text-center text-warna-utama text-[34px] mb-6">Apakah kamu yakin bergabung sebagai cabang dari organisasi {{calonHeadquarter.namaOrganisasi}}?</div>
                <div class="text-center text-warna-dua mb-12">Dengan menjadi cabang dari suatu organisasi, Anda tidak dapat menjadi cabang dari organisasi lain.</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnBatalBergabung" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Batal</div>
                    <div @click="btnYakinBergabung" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Bergabung</div>
                </div>
            </div>
        </ElementsModal> -->
    </div>
</template>


<script>
import detailOrganisasi from '~/static/data/detailorganisasi.json';

export default {
    data() {
        return {
            // KEPERLUAN MODAL KELUAR DARI PUSAT //
            modalAction: false,
            modalTitle: '',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //

            // KEPERLUAN MODAL GABUNG KE PUSAT //
            modalActionJoin: false,
            modalTitleJoin: '',
            modalWidthJoin: '',
            keyModalJoin: 0,
            persistentJoin: true,
            // ========== //

            selectedTab: 'pusat',
            dataOrganisasi: null,
            dataHeadquarter: undefined,
            dataLokasi: [],
            dataTypeOrganisasi: [],
            dataTypeApproach: [],
            dataTypeIssues:[],
            filterUndangan: {
                search: ''
            },
            listTab: [
                {
                    id: 'pusat',
                    label: 'Pusat'
                },
                {
                    id: 'undangan',
                    label: 'Undangan'
                }
            ],
            listing: [],
            listingPage: [],

            masterTableUndangan: [
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
            dataTableUndangan: [],
            calonHeadquarter: undefined,
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
            loaderDetail: false

        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },

        tableDetail() {
            const tableDetail = [
                {
                    header: this.$t('Organisasi Pusat'),
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
        'filterUndangan.search'(val) {
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
            this.dataHeadquarter = []
            this.dataTableUndangan = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataHeadquarter = _.map(res.data.headquarter.filter(e => e.confirmed == 2), "headquarter")[0]
                // this.dataTableUndangan =  _.map(res.data.headquarter.filter(e => e.typePengiriman == 0), function(o){
                // if (o){
                //     return {
                //     "organisasiId": o.headquarter.organisasiId,
                //     "namaOrganisasi": o.headquarter.namaOrganisasi,
                //     "kota": _.map(o.headquarter.lokasiOrganisasi, "kota").toString(),
                //     "status": o.confirmed
                // }}})
                this.listing = res.data.headquarter.map(e => {
                    const data = {
                        organisasiId: e.headquarter.organisasiId,
                        nama: e.headquarter.namaOrganisasi,
                        kota: _.map(e.headquarter.lokasiOrganisasi, "kota").join(', '),
                        status: e.confirmed
                    }
                    return data;
                })
                // this.listingPage = this.listing
                this.$nextTick(()=> {
                    this.runPaginasi()
                })

            }).catch(err => {
                console.log(err)
            })
        },
        runPaginasi() {
            const listing = this.listing.filter(e => e.nama.toLowerCase().includes(this.filterUndangan.search.toLowerCase()))
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
        
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                // this.message = data.message
                this.$toast.show(res.data.message)
                // alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
 
        btnTerimaUndangan(data) {
            // if(!this.dataHeadquarter){
            //     this.calonHeadquarter = data
            //     this.modalActionJoin = true
            //     this.keyModalJoin += 1
            // } else {
            //     alert("organisasi hanya dapat memiliki 1 Pusat")
            // }
            if (!this.dataHeadquarter) {
                this.$modal.show({
                    type: 'info',
                    title: this.$t('Accepted Notification'),
                    body:  this.$t('konfirmasiAcceptPusat'),
                    primary: {
                        label: 'OK',
                        theme: 'red',
                        action: () => this.updateData({"acceptHeadquarter":data.organisasiId})
                    }
                })
            } else {
                this.$modal.show({
                    type: 'danger',
                    title: this.$t('Accepted Notification'),
                    body: this.$t('Organisasi hanya dapat memiliki 1 Pusat')
                })
            }

        },
        btnTolakUndangan(data) {
                this.$modal.show({
                    type: 'info',
                    title: this.$t('Reject Notification'),
                    body:  this.$t('konfirmasiTolakPusat'),
                    primary: {
                        label: 'OK',
                        theme: 'red',
                        action: () => this.updateData({"rejectHeadquarter":data.organisasiId})
                    }
                })


            // if (confirm('tolak undangan '+ data.namaOrganisasi+' ?')) {
            //     this.updateData({"rejectHeadquarter":data.organisasiId})
            // }
        },
        // btnYakinBergabung () {
        //     this.updateData({"acceptHeadquarter":this.calonHeadquarter.organisasiId})
        // },
        
        btnKeluarDariPusat() {
            // this.modalAction = false
            // this.keyModal += 1
            // this.updateData({"leaveHeadquarter":this.dataHeadquarter.organisasiId})
                this.$modal.show({
                    type: 'info',
                    title: this.$t('Keluar dari Pusat'),
                    body:  this.$t('konfirmasiKeluarPusat'),
                    primary: {
                        label: 'OK',
                        theme: 'red',
                        action: () => this.updateData({"leaveHeadquarter":this.dataHeadquarter.organisasiId})
                    }
                })

        },
        // btnTabPusat() {
        //     this.selectedTab = 'pusat'
        // },

        // btnTabUndangan() {
        //     this.selectedTab = 'undangan'
        // },
        // btnKeluarDariPusat() {
        //     this.modalAction = true
        //     this.keyModal += 1
        // },

        btnBatalKeluar() {
            this.modalAction = false
            this.keyModal += 1
        },

        btnBatalBergabung() {
            this.modalActionJoin = false
            this.keyModalJoin += 1
        },
        deletePusat() {

        }
    },
}
</script>