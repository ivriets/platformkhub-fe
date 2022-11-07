<template>
    <div class="p-6">
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
                    length: 18
                },
                {
                    id: 'draft',
                    label: 'Draft',
                    length: 2
                },
                {
                    id: 'underreview',
                    label: 'Under Review',
                    length: 12
                },
                {
                    id: 'approved',
                    label: 'Approved',
                    length: 2
                },
                {
                    id: 'needrevision',
                    label: 'Need Revision',
                    length: 2
                }
            ],
            masterTable: [
                {
                    header: 'Title',
                    value: 'title',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Organization',
                    value: 'organization',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'status',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Created At',
                    value: 'createdat',
                    tipe: 'date',
                    display: true
                },
            ],
            dataTable: [
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Draft',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Under Review',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Approved',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Need Revision',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Draft',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Under Review',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Approved',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Need Revision',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Draft',
                    createdat: '10 Sep 2022 04:08'
                },
                {
                    title: 'Self-Love: Mencintai Diri Sendiri ala Peace Academy',
                    organization: 'Admin KHUB',
                    status: 'Under Review',
                    createdat: '10 Sep 2022 04:08'
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
            // this.$router.push('/verifications/individu/_id')
        }
    }
}
</script>