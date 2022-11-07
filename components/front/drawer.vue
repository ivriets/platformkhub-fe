<template>
    <div class=" bg-[#212121] h-screen transition-all fixed overflow-y-auto left-0 top-0 pt-16 text-white" :style="statusDrawer ? 'width:'+styleOpen : 'width:'+styleClose">
        <!-- button -->
        <div class="flex flex-col justify-between h-full">
            <div class="py-2">
                <div v-for="(item, index) in listDrawer" :key="'drawer' + index">
                    <nuxt-link :to="item.path" :title="item.label">
                        <div v-if="item.children.length === 0 && statusDrawer" class="px-4 cursor-pointer hover:bg-white/20">
                            <div class="flex items-center py-[10px]">
                                <img class="h-[24px] w-[24px]" :src="item.icon" alt="icon-menu">
                                <div class="ml-3">{{$t(item.label)}}</div>
                            </div>
                        </div>
                    </nuxt-link>
                    <div v-if="item.children.length > 0 && statusDrawer" class="">
                        <!-- <client-only> -->
                            <ElementsCollaps :icon="item.icon" :title="$t(item.label)" :classTambahan="'px-4 cursor-pointer hover:bg-white/20'" :isDrawer="statusDrawer">
                                <div v-for="(item2, index2) in item.children" :key="'childrendrawer' + index2" >
                                    <nuxt-link class="" :to="item2.path" :title="item2.label">
                                        <div class="pl-14 pr-4 cursor-pointer hover:bg-white/20">
                                            <div class="py-2">{{$t(item2.label)}}</div>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </ElementsCollaps>
                        <!-- </client-only> -->
                    </div>
                </div>
            </div>
            <div class="py-2">
                <div v-if="statusDrawer" class="flex items-center justify-center px-4 py-[10px] cursor-pointer hover:bg-white/20">
                    <img class="h-[24px] w-[24px]" src="/icons/icon-logout.png" alt="icon-logout">
                    <div class="ml-3">Logout</div>
                </div>
                <!-- <div @click="btnToggle" class="flex items-center justify-center px-4 py-[10px] cursor-pointer hover:bg-white/20">
                    <img class="h-[24px] w-[24px]" src="/icons/icon-toggle.png" alt="icon-toggle">
                    <div v-if="statusDrawer" class="ml-3">Toolbar Toggle</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listDrawer: [
                {
                    icon: '/icons/icon-dashboard.png',
                    label: 'Dasbor',
                    path: '/',
                    children: []
                },
                {
                    icon: '/icons/icon-verification.png',
                    label: 'List Verifikasi',
                    path: '',
                    children: [
                        {
                            label: 'Individu',
                            path: '/verifications/individu'
                        },
                        {
                            label: 'Organisasi',
                            path: '/verifications/organisasi'
                        }
                    ]
                },
                {
                    icon: '/icons/icon-moderation.png',
                    label: 'List Moderasi',
                    path: '',
                    children: [
                        {
                            label: 'Program',
                            path: '/moderations/program'
                        },
                        {
                            label: 'Acara',
                            path: '/moderations/event'
                        },
                        {
                            label: 'Produk',
                            path: '/moderations/resource'
                        },
                        {
                            label: 'Blog',
                            path: '/moderations/blog'
                        }
                    ]
                },
                {
                    icon: '/icons/icon-career.png',
                    label: 'Karir',
                    path: '',
                    children: [
                        {
                            label: 'Slider',
                            path: ''
                        },
                        {
                            label: 'Open Recruitment',
                            path: ''
                        }
                    ]
                },
                {
                    icon: '/icons/icon-headline.png',
                    label: 'Headline',
                    path: '/headline',
                    children: []
                },
                {
                    icon: '/icons/icon-featured-content.png',
                    label: 'Featured Content',
                    path: '/featured-content',
                    children: []
                },
                {
                    icon: '/icons/icon-log.png',
                    label: 'Activity Log',
                    path: '/activity-log',
                    children: []
                },
            ]
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
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            console.log(this.statusDrawer)
            // this.$store.commit('setDrawer', false)
        },

        // btnToggle() {
        //     const toggle = !this.statusDrawer
        //     this.$store.commit('setDrawer', toggle);
        // }
    },
}
</script>