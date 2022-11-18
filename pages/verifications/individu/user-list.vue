<template>
    <div class="container mx-auto">
        <div class="px-6 py-11">
            <ElementsTab 
                :listTab="listTab"
                :selectedTab="selectedTab"
            />
            <DashboardIndividuList />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedTab: 'userlist',
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