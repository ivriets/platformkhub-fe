<template>
    <div>
        <div class="flex items-center mb-4">
            <div class="w-[240px] mr-4">
                <ElementsSearchBarResponsive 
                    v-model="filter.search"
                    :placeholder="'Search'"
                    :gaya="'icon'"
                    :name="'searchtext'"
                />
            </div>
            <div class="flex flex-grow">
                <select name="filtertotalpage" id="filtertotalpage" class="w-[180px] outline-none border border-warna-empat rounded-md px-2 py-[6px] cursor-pointer">
                    <option value="10">10 row per page</option>
                    <option value="20">50 row per page</option>
                    <option value="50">100 row per page</option>
                </select>
            </div>
            <div class="px-3 py-[6px] bg-warna-empat rounded-lg text-white flex items-center cursor-pointer">
                <img class="h-4 w-4" src="/icons/icon-button-download.png" alt="icon-download">
                <div class="ml-1">Download</div>
            </div>
        </div>
        <div class="flex items-center justify-between border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div class="px-[14px] py-[9px] flex gap-x-3 pr-3 border-r border-[#A1A2B7]">
                <ElementsKapsul 
                    v-for="(item, index) in kapsul" :key="'kapsul' + index"
                    :label="item.label"
                    :jumlah="item.length"
                />
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
        <div class="bg-white rounded-lg shadow-md border border-gray-100">
            <ElementsTableFlat 
                :masterTable="masterTable"
                :dataTable="dataTable"
                :path="'/verifications/individu/'"
                :idValue="'accountId'"
            />
        </div>
    </div>
</template>


<script>
import listIndividu from '~/static/data/listindividu.json';

export default {
    data() {
        return {
            dataTable: [],
            filter: {
                search: '',
            },
            kapsul: [
                {
                    id: 'all',
                    label: 'All',
                    length: 16
                },
                {
                    id: 'needverification',
                    label: 'Need Verification',
                    length: 2
                },
                {
                    id: 'accepted',
                    label: 'Accepted',
                    length: 11
                },
                {
                    id: 'suspended',
                    label: 'Suspended',
                    length: 1
                },
                {
                    id: 'rejected',
                    label: 'Rejected',
                    length: 2
                },
                {
                    id: 'deleted',
                    label: 'Deleted',
                    length: 0
                }
            ],
            masterTable: [
                {
                    header: 'Name',
                    value: 'namaIndividu',
                    tipe: 'string',
                    display: true,
                    klik: true
                },
                {
                    header: 'Email',
                    value: 'email',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Email is Verified',
                    value: 'emailIsVerified',
                    tipe: 'boolean',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'statusVerification',
                    tipe: 'integer',
                    display: true
                },
                {
                    header: 'Created',
                    value: 'createdAt',
                    tipe: 'date',
                    display: true
                },
            ]
        }
    },
    watch: {

    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.masterPoint();
        },

        masterPoint() {
            this.dataTable = listIndividu.results.map(e => {
                const data = {
                    accountId: e.accountId,
                    userId: e.userId,
                    namaIndividu: e.individu.length > 0 ? e.individu[0].namaIndividu : 'N/A',
                    email: e.email,
                    emailIsVerified: e.emailIsVerified,
                    statusVerification: e.statusVerification,
                    createdAt: e.createdAt
                }
                return data
            })
        }
    }
}
</script>