<template>
    <div class="container mx-auto">
        <div class="p-6">
            <ElementsTab 
                :listTab="listTab"
                :selectedTab="selectedTab"
            />
            <DashboardIndividuOverview />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'overview',
            listTab: [
                {
                    id: 'overview',
                    label: 'Overview',
                    url: '/verifications/individu/overview'
                },
                {
                    id: 'userlist',
                    label: 'User List',
                    url: '/verifications/individu/user-list'
                }
            ]
        }
    },
}
</script>