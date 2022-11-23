<template>
    <div class="container mx-auto">
        <div class="px-6 py-11">
            <ElementsTab 
                :listTab="listTab"
                :selectedTab="selectedTab"
            />
            <DashboardOrganisasiOverview />
        </div>
    </div>
</template>


<script>
export default {
    middleware: ['general'],
    data() {
        return {
            selectedTab: 'overview',
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