<template>
    <div class="mt-[32px]">
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabAnggota" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'anggota' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Anggota</div>
                </div>
                <div @click="btnTabUndangan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'undangan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Undangan</div>
                </div>
                <div @click="btnTabPermintaan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'permintaan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Permintaan</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-10">
        </div>

        <!-- TAB ANGGOTA -->
        <div v-if="selectedTab === 'anggota'">
            <div class="mb-4">
                <div class="text-warna-dua mb-2">Cari Anggota</div>
                <div class="flex">
                    <div class="w-[240px] mr-4">
                        <ElementsSearchBarResponsive 
                            v-model="filterAnggota.search"
                            :placeholder="'Nama Anggota'"
                            :gaya="'icon'"
                            :name="'searchtext'"
                        />
                    </div>
                    <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableAnggota" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[150px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableAnggota" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableAnggota" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="text-center text-warna-empat cursor-pointer underline">Change Position</div>
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


        <!-- TAB UNDANGAN -->
        <div v-if="selectedTab === 'undangan'">
            <div class="flex justify-between mb-4">
                <div>
                    <div class="text-warna-dua mb-2">Cari Undangan</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="filterUndangan.search"
                                :placeholder="'Nama Pengguna'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                            />
                        </div>
                        <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                    </div>
                </div>
                <div>
                    <div class="text-warna-dua mb-2">Undang Pengguna</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="formUndangan.cariUser"
                                :placeholder="'Nama Pengguna'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                            />
                        </div>
                        <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Undang</div>
                    </div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableUndangan" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[150px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableUndangan" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableUndangan" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="text-center text-warna-empat cursor-pointer underline">Resend Email</div>
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


        <!-- TAB PERMINTAAN -->
        <div v-if="selectedTab === 'permintaan'">
            <div class="mb-4">
                <div class="text-warna-dua mb-2">Cari Permintaan Bergabung</div>
                <div class="flex">
                    <div class="w-[240px] mr-4">
                        <ElementsSearchBarResponsive 
                            v-model="filterPermintaan.search"
                            :placeholder="'Nama Pengguna'"
                            :gaya="'icon'"
                            :name="'searchtext'"
                        />
                    </div>
                    <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableUndangan" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[170px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableUndangan" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableUndangan" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-x-6">
                                    <div class="text-center text-approved-accepted cursor-pointer underline">Approve</div>
                                    <div class="text-center text-rejected cursor-pointer underline">Reject</div>
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
            selectedTab: 'anggota',
            filterAnggota: {
                search: ''
            },
            filterUndangan: {
                search: ''
            },
            filterPermintaan: {
                search: ''
            },
            formUndangan: {
                cariUser: ''
            },
            masterTableAnggota: [
                {
                    header: 'Anggota',
                    value: 'namaIndividu',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Position',
                    value: 'position',
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
            dataTableAnggota: [
                {
                    organisasiId: 49582336,
                    namaIndividu: 'Difa Ameliora Pujayanti',
                    position: 'Corrector',
                    status: 1 // 1.Approved 2.Declined 3.Pending
                },
                {
                    organisasiId: 22556633,
                    namaIndividu: 'Mikail Aditia Rahman',
                    position: 'Corrector',
                    status: 1
                },
                {
                    organisasiId: 33322211,
                    namaIndividu: 'Hanifah Latif M',
                    position: 'Corrector',
                    status: 1
                },
                {
                    organisasiId: 49582336,
                    namaIndividu: 'I Dewa Gede Anom Wiratmaja',
                    position: 'Corrector',
                    status: 1
                },
                {
                    organisasiId: 22556633,
                    namaIndividu: 'Tio Reza Muchtar',
                    position: 'Corrector',
                    status: 1
                },
            ],
            masterTableUndangan: [
                {
                    header: 'Anggota',
                    value: 'namaIndividu',
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
                    namaIndividu: 'Difa Ameliora Pujayanti',
                    status: 3 // 1.Approved 2.Declined 3.Pending
                },
                {
                    organisasiId: 22556633,
                    namaIndividu: 'Mikail Aditia Rahman',
                    status: 3
                },
                {
                    organisasiId: 33322211,
                    namaIndividu: 'Hanifah Latif M',
                    status: 3
                },
                {
                    organisasiId: 49582336,
                    namaIndividu: 'I Dewa Gede Anom Wiratmaja',
                    status: 3
                },
                {
                    organisasiId: 22556633,
                    namaIndividu: 'Tio Reza Muchtar',
                    status: 3
                },
            ]
        }
    },
    methods: {
        btnTabAnggota() {
            this.selectedTab = 'anggota'
        },

        btnTabUndangan() {
            this.selectedTab = 'undangan'
        },

        btnTabPermintaan() {
            this.selectedTab = 'permintaan'
        }
    },
}
</script>