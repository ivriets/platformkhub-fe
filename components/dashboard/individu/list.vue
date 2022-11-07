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
            <div class="px-3 py-[6px] bg-warna-empat rounded-lg text-white flex items-center">
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
                :dataTable="dataTable"
                :masterTable="masterTable"
                :goto="goto"
            />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
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
                    value: 'name',
                    tipe: 'string',
                    display: true
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
                    value: 'status',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Created',
                    value: 'created',
                    tipe: 'date',
                    display: true
                },
            ],
            dataTable: [
                {
                    name: 'Tio',
                    email: 'tio@peacegen.id',
                    emailIsVerified: true,
                    status: 'Accepted',
                    created: '10 Sep 2022 04:08'
                },
                {
                    name: 'Steven',
                    email: 'steven@peacegen.id',
                    emailIsVerified: true,
                    status: 'Need Verification',
                    created: '10 Sep 2022 04:08'
                },
                {
                    name: 'Jawad',
                    email: 'jawad@peacegen.id',
                    emailIsVerified: true,
                    status: 'Rejected',
                    created: '10 Sep 2022 04:08'
                },
                {
                    name: 'Fira',
                    email: 'fira@peacegen.id',
                    emailIsVerified: false,
                    status: 'Suspended',
                    created: '10 Sep 2022 04:08'
                }
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

        },

        goto() {
            this.$router.push('/verifications/individu/_id')
        }
    }
}
</script>