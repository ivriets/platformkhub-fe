<template>
    <div class="container mx-auto">
        <div class="px-6">
            <DashboardOrganisasiDetail />
        </div>
    </div>
</template>


<script>
export default {
    middleware: ['general'],
    data() {
        return {

        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.masterPoint();
        },

        masterPoint() {
            
        }
    }
}
</script>