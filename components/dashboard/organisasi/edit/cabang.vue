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
                            />
                        </div>
                        <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Undang</div>
                    </div>
                </div>
            </div>
            <div>
                <ElementsTableStriped 
                    :masterTable="masterTableTerkirim"
                    :dataTable="dataTableTerkirim"
                    :actions="actions"
                    :title="'Cabang'"
                />
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
export default {
    data() {
        return {
            selectedTab: 'terkirim',
            dataCabangTerkirim: [], //headquarter yang mengundang/menginvite branch
            dataCabangDiterima: [], //branch yang request join ke headquarter
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
            dataTableTerkirim: [
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 2 // 1.Tertunda 2.Bergabung 3.Menolak
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
                    status: 3
                },
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 2
                },
                {
                    organisasiId: 22556633,
                    namaOrganisasi: 'Pecinta Alam',
                    kota: 'Cirebon',
                    status: 1
                },
            ],
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
            dataTableDiterima: [
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 2 // 1.Tertunda 2.Bergabung 3.Menolak
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
                    status: 3
                },
                {
                    organisasiId: 49582336,
                    namaOrganisasi: 'Peace Generation Indonesia',
                    kota: 'Bandung',
                    status: 2
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
    methods: {
        btnTabTerkirim() {
            this.selectedTab = 'terkirim'
        },

        btnTabDiterima() {
            this.selectedTab = 'diterima'
        }
    },
}
</script>