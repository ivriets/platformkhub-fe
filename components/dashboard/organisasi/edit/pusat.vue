<template>
    <div class="mt-[32px]">
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabPusat" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'pusat' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Pusat</div>
                </div>
                <div @click="btnTabUndangan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'undangan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Undangan</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-10">
        </div>


        <!-- TAB PUSAT -->
        <div v-if="selectedTab === 'pusat' && dataHeadquarter">
            <div class="bg-white rounded-lg shadow-md p-6 border border-gray-50 mb-10">
                <div class="flex items-center gap-x-6 mb-6">
                    <div class="">
                        <img class="w-16 h-16 rounded-full" :src="basePath+dataHeadquarter.imgLogoOrganisasi" alt="image description">
                    </div>
                    <div class="font-semibold">{{dataHeadquarter.namaOrganisasi}}</div>
                </div>
                <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-2">
                        <div class="font-medium text-warna-lima mb-1">Lokasi</div>
                        <div v-for="(i, index) in dataHeadquarter.lokasiOrganisasi" :key="'lo'+index" class="text-warna-sembilan">{{i.jalan}}, {{i.kota}}, {{i.provinsi}}</div>
                    </div>
                    <div v-if="dataHeadquarter.typeOrganisasi" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Tipe</div>
                        <div v-for="(i, index) in dataHeadquarter.typeOrganisasi" :key="'to'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeOrganisasi.length">, </span>
                        </div>
                    </div>
                    <div v-if="dataHeadquarter.typeApproach" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Pendekatan</div>
                        <div v-for="(i, index) in dataHeadquarter.typeApproach" :key="'ta'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeApproach.length">, </span>
                        </div>
                    </div>
                    <div v-if="dataHeadquarter.typeIssues" class="col-span-2 text-sm">
                        <div class="font-medium text-warna-lima mb-1">Topik</div>
                        <div v-for="(i, index) in dataHeadquarter.typeIssues" :key="'ti'+index" class="text-warna-sembilan inline-block mr-1">
                            <span>{{i.nama[0]}}</span><span v-if="index+1 < dataHeadquarter.typeIssues.length">, </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-10">
                    <div @click="btnKeluarDariPusat()" class="w-[165px] border border-warna-empat text-warna-empat text-center font-medium rounded-lg p-4 cursor-pointer hover:bg-blue-50 ">Keluar dari Pusat</div>
                </div>
            </div>
            
        </div>


        <!-- TAB UNDANGAN -->
        <div v-if="selectedTab === 'undangan'">
            <div class="flex mb-4">
                <div class="w-[240px] mr-4">
                    <ElementsSearchBarResponsive 
                        v-model="filterUndangan.search"
                        :placeholder="'Cari Organisasi Pusat'"
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
            </div>
        </div>

        <ElementsModal 
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
        </ElementsModal>

        <ElementsModal 
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
        </ElementsModal>
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
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            this.dataHeadquarter = []
            this.dataTableUndangan = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataHeadquarter = _.map(res.data.headquarter.filter(e => e.confirmed == 2), "headquarter")[0]
                this.dataTableUndangan =  _.map(res.data.headquarter.filter(e => e.typePengiriman == 0), function(o){
                if (o){
                    return {
                    "organisasiId": o.headquarter.organisasiId,
                    "namaOrganisasi": o.headquarter.namaOrganisasi,
                    "kota": _.map(o.headquarter.lokasiOrganisasi, "kota").toString(),
                    "status": o.confirmed
                }}})
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
 
        btnTerimaUndangan(data) {
            if(!this.dataHeadquarter){
                this.calonHeadquarter = data
                this.modalActionJoin = true
                this.keyModalJoin += 1
            } else {
                alert("organisasi hanya dapat memiliki 1 Pusat")
            }
        },
        btnTolakUndangan(data) {
            if (confirm('tolak undangan '+ data.namaOrganisasi+' ?')) {
                this.updateData({"rejectHeadquarter":data.organisasiId})
            }
        },
        btnYakinBergabung () {
            this.modalActionJoin = false
            this.keyModalJoin += 1
            this.updateData({"acceptHeadquarter":this.calonHeadquarter.organisasiId})
        },
        
        btnYakinKeluar() {
            this.modalAction = false
            this.keyModal += 1
            this.updateData({"leaveHeadquarter":this.dataHeadquarter.organisasiId})
        },
        btnTabPusat() {
            this.selectedTab = 'pusat'
        },

        btnTabUndangan() {
            this.selectedTab = 'undangan'
        },
        btnKeluarDariPusat() {
            this.modalAction = true
            this.keyModal += 1
        },

        btnBatalKeluar() {
            this.modalAction = false
            this.keyModal += 1
        },

        btnBatalBergabung() {
            this.modalActionJoin = false
            this.keyModalJoin += 1
        }
    },
}
</script>