<template>
    <div>
        <div class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
                <div class="w-[150px]">
                    <InputSelect 
                        v-model="filter.waktu"
                        :name="prefixName+'filterwaktu'"
                        :opsi="opsiFilterWaktu"
                        :placeholder="'All Time'"
                    />
                </div>
                <div class="w-[150px]">
                    <InputSelect 
                        v-model="filter.organisasi"
                        :name="prefixName+'filterorganisasi'"
                        :opsi="opsiFilterOrganisasi"
                        :placeholder="'All Organization'"
                    />
                </div>
                <div class="w-[150px]">
                    <InputSelect 
                        v-model="filter.action"
                        :name="prefixName+'filteraction'"
                        :opsi="opsiFilterAction"
                        :placeholder="'All Action'"
                    />
                </div>
            </div>
            <div class="px-[14px] py-[9px]">
                <div class="flex items-center">
                    <div class="text-sm font-semibold text-[#757575]">Sort by:</div>
                    <select name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                        <option value="10">Latest</option>
                        <option value="20">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl pb-9">
            <!-- <ElementsTableStriped 
                :masterTable="masterTable"
                :dataTable="dataTable"
                :urutan="false"
                :actions="action"
                :title="'Activity Log'"
            /> -->
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTable" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTable" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'createdAt'">{{ $dayjs(item[x.value]).format('DD MMM YYYY HH:mm') }}</div>
                                    <div v-else-if="x.value === 'nama'">
                                        <div v-if="item.myIndividu === null">{{item.myOrganisasi.namaOrganisasi}}</div>
                                        <div v-if="item.myOrganisasi === null">{{item.myIndividu.namaIndividu}}</div>
                                    </div>
                                    <div v-else-if="x.value === 'tipeAccount'">
                                        <div v-if="item.myIndividu === null">Organisasi</div>
                                        <div v-if="item.myOrganisasi === null">Individu</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
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
            prefixName: 'log',
            filter: {
                waktu: '',
                organisasi: '',
                action: ''
            },
            opsiFilterWaktu: [
                {
                    id: 1,
                    label: 'All Time'
                },
                {
                    id: 2,
                    label: 'All Time'
                }
            ],
            opsiFilterOrganisasi: [
                {
                    id: 1,
                    label: 'All Time'
                },
                {
                    id: 2,
                    label: 'All Time'
                }
            ],
            opsiFilterAction: [
                {
                    id: 1,
                    label: 'LOGIN'
                },
                {
                    id: 2,
                    label: 'PUT'
                }
            ],
            masterTable: [
                {
                    header: 'Name',
                    value: 'nama',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Account Type',
                    value: 'tipeAccount',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Action',
                    value: 'request',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Date',
                    value: 'createdAt',
                    tipe: 'date',
                    display: true
                }
            ],
            dataTable: [
                {
                    pkLogId: 77085816,
                    endpoint: "/a1/auth/",
                    request: "LOGIN",
                    createdAt: "2022-11-23T10:40:13.050004",
                    myOrganisasi: null,
                    myIndividu: {
                        userId: 37231942,
                        namaIndividu: "Fawwaz Ibrahim",
                        imgFotoProfile: "/assets/Individu/37231942/images/Fawwaz_Ibrahim-Fawwaz_Ibrahim_4x6.jpeg"
                    }
                },
                {
                    pkLogId: 84699673,
                    endpoint: "a1/events/<event_id>",
                    request: "PUT",
                    createdAt: "2022-11-22T16:42:53.503579",
                    myOrganisasi: {
                        organisasiId: 47963824,
                        namaOrganisasi: "Infia Consulting",
                        imgLogoOrganisasi: "/assets/image.png"
                    },
                    myIndividu: null
                },
                {
                    pkLogId: 19363988,
                    endpoint: "a1/events/<event_id>",
                    request: "PUT",
                    createdAt: "2022-11-22T16:20:50.463143",
                    myOrganisasi: {
                        organisasiId: 47963824,
                        namaOrganisasi: "Infia Consulting",
                        imgLogoOrganisasi: "/assets/image.png"
                    },
                    myIndividu: null
                }
            ]
        }
    },
}
</script>