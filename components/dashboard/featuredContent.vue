<template>
    <div>
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabProgram" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'program' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Program')}}</div>
                </div>
                <div @click="btnTabEvent" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'event' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Acara')}}</div>
                </div>
                <div @click="btnTabResource" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'resource' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Publikasi')}}</div>
                </div>
                <div @click="btnTabBlog" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'blog' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Blog')}}</div>
                </div>
                <div @click="btnTabOutlook" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'outlook' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Outlook')}}</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-6">
        </div>

        <div v-if="selectedTab === 'program'">
            <div class="mb-5">
                <div class="flex items-center justify-between">
                    <div @click="btnEmptyProgram" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                        <div class="text-warna-empat font-medium">Empty Program List</div>
                    </div>
                    <div v-if="!toggleEditProgram" @click="btnToggleEditProgram" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-edit.png" alt="icon-edit">
                        <div class="text-warna-empat font-medium">Edit Program List</div>
                    </div>
                    <div v-else class="flex items-center gap-x-6">
                        <div class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div class="text-warna-empat font-medium">Add Program List</div>
                        </div>
                        <div @click="btnCancelEditProgram" class="flex items-center gap-x-1 py-2 px-3 border border-rejected rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-cancel.png" alt="icon-cancel">
                            <div class="text-rejected font-medium">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <ElementsCard 
                    :dataCard="featuredProgram"
                    :tipeKonten="'Program'"
                    :toggleEdit="toggleEditProgram"
                />
            </div>
        </div>

        <div v-if="selectedTab === 'event'">
            <div class="mb-5">
                <div class="flex items-center justify-between">
                    <div @click="btnEmptyEvent" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                        <div class="text-warna-empat font-medium">Empty Event List</div>
                    </div>
                    <div v-if="!toggleEditEvent" @click="btnToggleEditEvent" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-edit.png" alt="icon-edit">
                        <div class="text-warna-empat font-medium">Edit Event List</div>
                    </div>
                    <div v-else class="flex items-center gap-x-6">
                        <div class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div class="text-warna-empat font-medium">Add Event List</div>
                        </div>
                        <div @click="btnCancelEditEvent" class="flex items-center gap-x-1 py-2 px-3 border border-rejected rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-cancel.png" alt="icon-cancel">
                            <div class="text-rejected font-medium">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <ElementsCard 
                    :dataCard="featuredEvent"
                    :tipeKonten="'Event'"
                    :toggleEdit="toggleEditEvent"
                />
            </div>
        </div>

        <div v-if="selectedTab === 'resource'">
            <div class="mb-5">
                <div class="flex items-center justify-between">
                    <div @click="btnEmptyResource" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                        <div class="text-warna-empat font-medium">Empty Resource List</div>
                    </div>
                    <div v-if="!toggleEditResource" @click="btnToggleEditResource" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-edit.png" alt="icon-edit">
                        <div class="text-warna-empat font-medium">Edit Resource List</div>
                    </div>
                    <div v-else class="flex items-center gap-x-6">
                        <div class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div class="text-warna-empat font-medium">Add Resource List</div>
                        </div>
                        <div @click="btnCancelEditResource" class="flex items-center gap-x-1 py-2 px-3 border border-rejected rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-cancel.png" alt="icon-cancel">
                            <div class="text-rejected font-medium">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <ElementsCard 
                    :dataCard="featuredResource"
                    :tipeKonten="'Resource'"
                    :toggleEdit="toggleEditResource"
                />
            </div>
        </div>

        <div v-if="selectedTab === 'blog'">
            <div class="mb-5">
                <div class="flex items-center justify-between">
                    <div @click="btnEmptyBlog" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                        <div class="text-warna-empat font-medium">Empty Blog List</div>
                    </div>
                    <div v-if="!toggleEditBlog" @click="btnToggleEditBlog" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                        <img class="w-4 h-4" src="/icons/icon-edit.png" alt="icon-edit">
                        <div class="text-warna-empat font-medium">Edit Blog List</div>
                    </div>
                    <div v-else class="flex items-center gap-x-6">
                        <div class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div class="text-warna-empat font-medium">Add Blog List</div>
                        </div>
                        <div @click="btnCancelEditBlog" class="flex items-center gap-x-1 py-2 px-3 border border-rejected rounded-lg cursor-pointer">
                            <img class="w-4 h-4" src="/icons/icon-cancel.png" alt="icon-cancel">
                            <div class="text-rejected font-medium">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <ElementsCard 
                    :dataCard="featuredBlog"
                    :tipeKonten="'Blog'"
                    :toggleEdit="toggleEditBlog"
                />
            </div>
        </div>

        <div v-if="selectedTab === 'outlook'">
            outlook
        </div>

        <ElementsModal 
            v-model="modalEmptyProgram"
            :title="modalTitleEmptyProgram"
            :width="modalWidthEmptyProgram"
            :key="keyModalEmptyProgram+'prog'"
            :persistent="persistentEmptyProgram"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">Are you sure want to remove all Featured Program?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnConfirmEmptyProgram" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Remove</div>
                    <div @click="btnCancelEmptyProgram" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Cancel</div>                    
                </div>
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalEmptyEvent"
            :title="modalTitleEmptyEvent"
            :width="modalWidthEmptyEvent"
            :key="keyModalEmptyEvent+'event'"
            :persistent="persistentEmptyEvent"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">Are you sure want to remove all Featured Event?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnConfirmEmptyEvent" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Remove</div>
                    <div @click="btnCancelEmptyEvent" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Cancel</div>                    
                </div>
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalEmptyResource"
            :title="modalTitleEmptyResource"
            :width="modalWidthEmptyResource"
            :key="keyModalEmptyResource+'resource'"
            :persistent="persistentEmptyResource"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">Are you sure want to remove all Featured Resource?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnConfirmEmptyResource" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Remove</div>
                    <div @click="btnCancelEmptyResource" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Cancel</div>                    
                </div>
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalEmptyBlog"
            :title="modalTitleEmptyBlog"
            :width="modalWidthEmptyBlog"
            :key="keyModalEmptyBlog+'blog'"
            :persistent="persistentEmptyBlog"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">Are you sure want to remove all Featured Blog?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnConfirmEmptyBlog" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Remove</div>
                    <div @click="btnCancelEmptyBlog" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Cancel</div>                    
                </div>
            </div>
        </ElementsModal>
    </div>
</template>


<script>
import featuredContent from '~/static/data/featuredcontent.json';

export default {
    data() {
        return {
            selectedTab: 'program',
            featuredProgram: [],
            featuredEvent: [],
            featuredResource: [],
            featuredBlog: [],
            toggleEditProgram: false,
            toggleEditEvent: false,
            toggleEditResource: false,
            toggleEditBlog: false,

            // KEPERLUAN MODAL EMPTY PROGRAM //
            modalEmptyProgram: false,
            modalTitleEmptyProgram: '',
            modalWidthEmptyProgram: '',
            keyModalEmptyProgram: 0,
            persistentEmptyProgram: true,
            // ========== //

            // KEPERLUAN MODAL EMPTY EVENT //
            modalEmptyEvent: false,
            modalTitleEmptyEvent: '',
            modalWidthEmptyEvent: '',
            keyModalEmptyEvent: 0,
            persistentEmptyEvent: true,
            // ========== //

            // KEPERLUAN MODAL EMPTY RESOURCE //
            modalEmptyResource: false,
            modalTitleEmptyResource: '',
            modalWidthEmptyResource: '',
            keyModalEmptyResource: 0,
            persistentEmptyResource: true,
            // ========== //

            // KEPERLUAN MODAL EMPTY BLOG //
            modalEmptyBlog: false,
            modalTitleEmptyBlog: '',
            modalWidthEmptyBlog: '',
            keyModalEmptyBlog: 0,
            persistentEmptyBlog: true,
            // ========== //
        }
    },
    computed: {
        basePath() {
            return process.env.BASE_URL
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        masterPoint() {
            this.featuredProgram = featuredContent.featuredProgram
            this.featuredEvent = featuredContent.featuredEvent
            this.featuredResource = featuredContent.featuredResource
            this.featuredBlog = featuredContent.featuredBlog
        },

        btnTabProgram() {
            this.selectedTab = 'program'
        },

        btnTabEvent() {
            this.selectedTab = 'event'
        },

        btnTabResource() {
            this.selectedTab = 'resource'
        },

        btnTabBlog() {
            this.selectedTab = 'blog'
        },

        btnTabOutlook() {
            this.selectedTab = 'outlook'
        },

        btnToggleEditProgram() {
            this.toggleEditProgram = true
        },

        btnCancelEditProgram() {
            this.toggleEditProgram = false
        },

        btnToggleEditEvent() {
            this.toggleEditEvent = true
        },

        btnCancelEditEvent() {
            this.toggleEditEvent = false
        },

        btnToggleEditResource() {
            this.toggleEditResource = true
        },

        btnCancelEditResource() {
            this.toggleEditResource = false
        },

        btnToggleEditBlog() {
            this.toggleEditBlog = true
        },

        btnCancelEditBlog() {
            this.toggleEditBlog = false
        },


        // EMPTY PROGRAM //
        btnEmptyProgram() {
            this.modalEmptyProgram = true
            this.keyModalEmptyProgram += 1
        },

        btnConfirmEmptyProgram() {
            console.log('hapus semua')
            this.modalEmptyProgram = false
            this.keyModalEmptyProgram += 1
        },

        btnCancelEmptyProgram() {
            this.modalEmptyProgram = false
            this.keyModalEmptyProgram += 1
        },
        //


        // EMPTY EVENT //
        btnEmptyEvent() {
            this.modalEmptyEvent = true
            this.keyModalEmptyEvent += 1
        },

        btnConfirmEmptyEvent() {
            console.log('hapus semua')
            this.modalEmptyEvent = false
            this.keyModalEmptyEvent += 1
        },

        btnCancelEmptyEvent() {
            this.modalEmptyEvent = false
            this.keyModalEmptyEvent += 1
        },
        //


        // EMPTY RESOURCE //
        btnEmptyResource() {
            this.modalEmptyResource = true
            this.keyModalEmptyResource += 1
        },

        btnConfirmEmptyResource() {
            console.log('hapus semua')
            this.modalEmptyResource = false
            this.keyModalEmptyResource += 1
        },

        btnCancelEmptyResource() {
            this.modalEmptyResource = false
            this.keyModalEmptyResource += 1
        },
        //


        // EMPTY BLOG //
        btnEmptyBlog() {
            this.modalEmptyBlog = true
            this.keyModalEmptyBlog += 1
        },

        btnConfirmEmptyBlog() {
            console.log('hapus semua')
            this.modalEmptyBlog = false
            this.keyModalEmptyBlog += 1
        },

        btnCancelEmptyBlog() {
            this.modalEmptyBlog = false
            this.keyModalEmptyBlog += 1
        },
        //

    },
}
</script>