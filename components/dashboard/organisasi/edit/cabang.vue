<template>
    <div class="mt-[32px]">
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabTerkirim" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'terkirim' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Terkirim</div>
                </div>
                <div @click="btnTabDiterima" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'diterima' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Dikirim</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-10">
        </div>


        <div v-if="selectedTab === 'terkirim'">
            <div class="flex justify-between mb-4">
                <div>
                    <div class="text-warna-dua mb-2">Cari Cabang</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="filterTerkirim.search"
                                :placeholder="'Nama Cabang'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                            />
                        </div>
                        <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                    </div>
                </div>
                <div>
                    <div class="text-warna-dua mb-2">Undang Cabang</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="formTerkirim.cariOrganisasi"
                                :placeholder="'Nama Cabang'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                                :list="namaOrganisasiList"
                            />
                        </div>
                        <button @click="undangBranch" class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Undang</button>
                    </div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableTerkirim" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[250px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableTerkirim" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableTerkirim" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'">
                                        <div v-if="item[x.value] === 1" class="text-[#444]">Tertunda</div>
                                        <div v-if="item[x.value] === 2" class="text-approved-accepted">Bergabung</div>
                                        <div v-if="item[x.value] === 3" class="text-rejected">Menolak</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td class="font-normal p-5">
                                <div class="flex items-center justify-end gap-x-6">
                                    <button @click="deleteBranch(item)" ><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <div v-if="selectedTab === 'diterima'">
            <div class="flex mb-4">
                <div class="w-[240px] mr-4">
                    <ElementsSearchBarResponsive 
                        v-model="filterDiterima.search"
                        :placeholder="'Cari Cabang'"
                        :gaya="'icon'"
                        :name="'searchtext'"
                    />
                </div>
                <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableDiterima" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[250px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableDiterima" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableDiterima" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
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
                                    <div @click="terimaBranch(item)" class="w-[99px] text-center bg-warna-empat hover:bg-blue-900 text-white rounded-lg py-2 cursor-pointer">Terima</div>
                                    <div @click="tolakBranch(item)" class="w-[99px] text-center bg-warna-rejected hover:bg-red-700 text-white rounded-lg py-2 cursor-pointer">Tolak</div>
                                </div>
                                <div v-else></div>
                            </td>
                            <td class="font-normal p-5">
                                <div class="flex items-center justify-end gap-x-6">
                                    <button @click="deleteBranch(item)"><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'terkirim',
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
        }
    },    
    computed: {
        id() {
            return this.$route.params.id;
        }, 
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
                    this.dataTableTerkirim = _.map(this.dataOrganisasi.organisasiCabangInternal.filter(e => {return e.typePengiriman == 0}), function(o){
                    if (o){
                        return {
                        "organisasiId": o.branch.organisasiId,
                        "namaOrganisasi": o.branch.namaOrganisasi,
                        "kota": _.map(o.branch.lokasiOrganisasi, "kota").toString(),
                        "status": o.confirmed
                    }}})
                    this.dataTableDiterima = _.map(this.dataOrganisasi.organisasiCabangInternal.filter(e => {return e.typePengiriman == 1}), function(o){
                    if (o){
                        return {
                        "organisasiId": o.branch.organisasiId,
                        "namaOrganisasi": o.branch.namaOrganisasi,
                        "kota": _.map(o.branch.lokasiOrganisasi, "kota").toString(),
                        "status": o.confirmed
                    }}})
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