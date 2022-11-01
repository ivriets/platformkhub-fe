<template>
    <div class="p-6">
        <div class="tab-area flex items-center">
            <div v-for="(item, index) in tab" :key="'tab' + index" class="px-8 py-3 cursor-pointer" :class="selectedTab === item.id ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'" @click="pilihTab(item.id)">
                <div>{{item.label}}</div>
            </div>
        </div>

        <hr class="border-[#c2c2c2] -mt-[1px] mb-10">

        <div v-if="selectedTab === 'overview'">
            <DashboardOrganisasiOverview />
        </div>

        <div v-if="selectedTab === 'organisasilist'">
            <DashboardOrganisasiList />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'overview',
            tab: [
                {
                    id: 'overview',
                    label: 'Overview'
                },
                {
                    id: 'organisasilist',
                    label: 'Organization List'
                }
            ],
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {

        },

        pilihTab(id) {
            this.selectedTab = id
        }
    },
}
</script>