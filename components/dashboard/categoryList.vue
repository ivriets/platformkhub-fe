<template>
    <div>
        <ElementsTab 
            v-model="selectedTab"
            :selectedTab="selectedTab"
            :listTab="listTab"
            :landing="'spa'"
        />
        <div class="main-area">
            <DashboardCategoryListSub 
                :selectedTab="selectedTab"
                :key="'tab'+keyTab"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedTab: 'topic',
                keyTab: 0,
                listTab: [
                    {
                        id: 'topic',
                        label: 'Issues'
                    },
                    {
                        id: 'approach',
                        label: 'Approach'
                    }
                ]


            }
        },
        computed: {
            listTab1() {
                return [
                    {
                        id: 'topic',
                        label: this.$t('Issues')
                    },
                    {
                        id: 'approach',
                        label: this.$t('Approach')
                    }
                ]
            }
        },
        watch: {
            selectedTab() {
                this.keyTab+=1
            }
        }
    }
</script>

