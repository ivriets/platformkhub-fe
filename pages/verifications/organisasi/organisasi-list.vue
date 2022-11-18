<template>
    <div class="container mx-auto">
        <div class="px-6 py-11">
            <ElementsTab 
                :listTab="listTab"
                :selectedTab="selectedTab"
            />
            <DashboardOrganisasiList />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'organisasilist',
            listTab: [
                {
                    id: 'overview',
                    label: 'Overview',
                    url: '/verifications/organisasi/overview'
                },
                {
                    id: 'organisasilist',
                    label: 'Organization List',
                    url: '/verifications/organisasi/organisasi-list'
                }
            ]
        }
    },
}
</script>