<template>
    <div class="h-screen transition-all fixed overflow-y-auto overflow-x-hidden left-0 top-0 pt-16 text-white w-[270px] " :class="statusDrawer ? '' : '-translate-x-[80%]'" >
        <!-- :style="statusDrawer ? 'width:'+styleOpen : 'width:'+styleClose" -->
        <!-- button -->
        <div class="bg-[#212121] h-[calc(100vh-64px)] z-10 w-[256px] overflow-y-auto drawer-none-scrolling">
            <div class="flex flex-col justify-between h-full">
                <div class="py-2 mr-6 pl-4">
                    <div v-for="(item, index) in listDrawer" :key="'drawer' + index" class="block">
                        <nuxt-link :to="item.path" :title="item.label">
                            <div v-if="item.children.length === 0" class="cursor-pointer hover:bg-white/20">
                                <div class="flex items-center py-[10px]">
                                    <img class="h-[24px] w-[24px]" :src="item.icon" alt="icon-menu">
                                    <div class="ml-3">{{$t(item.label)}}</div>
                                </div>
                            </div>
                        </nuxt-link>
                        <div v-if="item.children.length > 0" class="">
                            <!-- <client-only> -->
                                <ElementsCollaps :icon="item.icon" :title="$t(item.label)" :classTambahan="'cursor-pointer hover:bg-white/20'" :isDrawer="statusDrawer">
                                    <div v-for="(item2, index2) in item.children" :key="'childrendrawer' + index2" class="">
                                        <nuxt-link :to="item2.path" :title="item2.label">
                                            <div class="cursor-pointer hover:bg-white/20">
                                                <div class="py-2 pl-[36px]">{{$t(item2.label)}}</div>
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
                        <div class="ml-3" @click="btnLogout">Logout</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute top-0 right-0 mt-[100px] z-20 h-[24px] w-[24px] mr-[3px]" :style="statusDrawer ? 'margin-left:'+styleOpen : 'margin-left:'+styleClose">
            <button class="">
                <img @click="btnToggle" class="flex items-center justify-end h-[24px] w-[25px] cursor-pointer transition-all" alt="" src="/icons/icon-toggle-open.png" :class="statusDrawer ? 'rotate-180 origin-center' : ''">
                <!--  :src="statusDrawer ? '/icons/icon-toggle-close.png' : '/icons/icon-toggle-open.png'" -->
            </button>
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
                            label: 'Publikasi',
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
                            path: '/career/slider'
                        },
                        {
                            label: 'Open Recruitment',
                            path: '/career/open-recruitment'
                        }
                    ]
                },
                {
                    icon: '/icons/icon-homepage.png',
                    label: 'Homepage',
                    path: '/homepage',
                    children: []
                },
                {
                    icon: '/icons/icon-featured-content.png',
                    label: 'Featured Content',
                    path: '/featured-content',
                    children: []
                },
                {
                    icon: '/icons/icon-outlook.png',
                    label: 'Outlook',
                    path: '/outlook',
                    children: []
                },
                {
                    icon: '/icons/icon-log.png',
                    label: 'Activity Log',
                    path: '/activity-log',
                    children: []
                },
                {
                    icon: '/icons/icon-category-list.png',
                    label: 'Category List',
                    path: '/category-list',
                    children: []
                },
                {
                    icon: '/icons/icon-tutorial.png',
                    label: 'Tutorial',
                    path: '/tutorial',
                    children: []
                }
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
            // console.log(this.statusDrawer)
            // this.$store.commit('setDrawer', false)
        },

        btnToggle() {
            const toggle = !this.statusDrawer
            this.$store.commit('setDrawer', toggle);
        },

        btnLogout() {
            this.$router.push('/login')
        },
    },
}
</script>