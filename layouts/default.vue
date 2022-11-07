<template>
    <div>
        <FrontHeader />
        <div class="">
            <FrontDrawer />
            <div class="absolute top-0 left-0 mt-[100px] z-20" :style="statusDrawer ? 'margin-left:'+styleOpen : 'margin-left:'+styleClose">
                <button class="-translate-x-[50%] transition-all ">
                    <img @click="btnToggle" class="flex items-center justify-end h-[24] w-[25] cursor-pointer" :src="statusDrawer ? '/icons/icon-toggle-close.png' : '/icons/icon-toggle-open.png'" alt="">
                    <!-- <img class="flex items-center justify-end h-[24] w-[25] cursor-pointer" src="/icons/icon-toggle-open.png" alt=""> -->
                </button>
            </div>
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
    methods: {
        btnToggle() {
            const toggle = !this.statusDrawer
            this.$store.commit('setDrawer', toggle);
        }
    },
}
</script>