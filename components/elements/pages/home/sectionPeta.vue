<template>
        <div class="pt-[80px] pb-[60px] container mx-auto">
            <div class="text-xl flex justify-center">
                <ElementsTabBaru 
                    v-model="selectedTab"
                    :listTab="listTab"
                    :selectedTab="selectedTab"
                />
            </div>
            <div class="bg-white ">   

                <DesktopPetaProgram 
                :page="'front'"
                    v-if="selectedTab === 'program'"
                />
                <DesktopPetaOrganisasi 
                :page="'front'"
                    v-if="selectedTab === 'organisasi'"
                />
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedTab: 'program',

            }
        },
        computed: {
            listTab() {
               return [
                    {
                        id:'program',
                        label: this.$t('Program')
                    },
                    {
                        id: 'organisasi',
                        label: this.$t('Organisasi')
                    }
                ]
            }
        }
        
    }
</script>

