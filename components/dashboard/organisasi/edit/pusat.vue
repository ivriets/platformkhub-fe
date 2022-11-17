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
        <div v-if="selectedTab === 'pusat'">
            <div v-if="dataOrganisasi" class="bg-white rounded-lg shadow-md p-6 border border-gray-50">
                <div class="flex gap-x-6 mb-6">
                    <div>logo</div>
                    <div>nama organisasi</div>
                </div>
                <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-2">lokasi</div>
                    <div class="col-span-2">tipe</div>
                    <div class="col-span-2">pendekatan</div>
                    <div class="col-span-2">topik</div>
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
                            <th class="w-[70px]"></th>
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
                                    <div class="w-[99px] text-center bg-warna-empat hover:bg-blue-900 text-white rounded-lg py-2 cursor-pointer">Terima</div>
                                    <div class="w-[99px] text-center bg-warna-rejected hover:bg-red-700 text-white rounded-lg py-2 cursor-pointer">Tolak</div>
                                </div>
                                <div v-else></div>
                            </td>
                            <td class="font-normal p-5">
                                <div class="flex items-center justify-end gap-x-6">
                                    <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
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
import detailOrganisasi from '~/static/data/detailorganisasi.json';

export default {
    data() {
        return {
            selectedTab: 'pusat',
            dataOrganisasi: [],
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
            dataTableUndangan: [
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 1 // 1.Tertunda 2.Bergabung 3.Menolak
                },
                {
                    organisasiId: 22556633,
                    namaOrganisasi: 'Pecinta Alam',
                    kota: 'Cirebon',
                    status: 1
                },
                {
                    organisasiId: 33322211,
                    namaOrganisasi: 'Kaluvarga',
                    kota: 'Jakarta',
                    status: 1
                },
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 1
                },
                {
                    organisasiId: 22556633,
                    namaOrganisasi: 'Pecinta Alam',
                    kota: 'Cirebon',
                    status: 1
                },
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 1
                }
            ]
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        masterPoint() {
            // this.dataOrganisasi = detailOrganisasi

            // this.dataOrganisasi = detailOrganisasi.organisasi.map(e => {
            //     const data = {
            //         id: e.organisasiId,
            //         namaOrganisasi: e.namaOrganisasi,
            //         lokasi: e.lokasiOrganisasi[0].jalan
            //     }
            //     return data
            // })
        },

        btnTabPusat() {
            this.selectedTab = 'pusat'
        },

        btnTabUndangan() {
            this.selectedTab = 'undangan'
        }
    },
}
</script>