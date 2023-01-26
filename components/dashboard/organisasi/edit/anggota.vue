<template>
    <div class="mt-[32px]">

        <ElementsTab 
            v-model="selectedTab"
            :listTab="listTab"
            :selectedTab="selectedTab"
            :landing="'spa'"
        />

        <DashboardOrganisasiEditSubAnggota 
            :selectedTab="selectedTab"
            :key="'keytab'+keyTable"
        />

    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedTab: 'anggota',
            keyTable: 0,
            listTab: [
                {
                    id: 'anggota',
                    label: 'Anggota'
                },
                {
                    id: 'undangan',
                    label: 'Undangan'
                },
                {
                    id: 'permintaan',
                    label: 'Permintaan'
                }
            ],
        }
    },
    watch: {
        selectedTab(val) {
            this.keyTable +=1
        }
    }
}
</script>