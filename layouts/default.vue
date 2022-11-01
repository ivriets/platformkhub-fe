<template>
    <div>
        <FrontHeader />
        <div class="">
            <FrontDrawer />
            <div class="pt-16 transition-all" :style="statusDrawer ? 'padding-left:'+styleOpen : 'padding-left:'+styleClose">
                <Nuxt />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        statusDrawer() {
            return this.$store.state.drawer;
        },

        styleOpen() {
            const widthDrawer = this.$store.state.drawerOpen;
            return widthDrawer +'px'
        },

        styleClose() {
            const widthDrawer = this.$store.state.drawerClose;
            return widthDrawer +'px'
        }
    },
}
</script>