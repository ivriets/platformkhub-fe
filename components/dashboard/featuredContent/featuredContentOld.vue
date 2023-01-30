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
                        <div @click="btnAddProgram" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
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
                        <div @click="btnAddEvent" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
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
                        <div @click="btnAddResource" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
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
                        <div @click="btnAddBlog" class="flex items-center gap-x-1 py-2 px-3 border border-warna-empat rounded-lg cursor-pointer">
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


        <!-- MODAL ADD -->
        <ElementsModal 
            v-model="modalAddProgram"
            :title="modalTitleAddProgram"
            :width="modalWidthAddProgram"
            :key="keyModalAddProgram+'program'"
            :persistent="persistentAddProgram"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="mb-5">
                        <div class="font-semibold text-warna-utama mb-1">Search Title</div>
                        <div class="w-full">
                            <ElementsSearchBar 
                                v-model="filter.searchProgram"
                                placeholder="Write here"
                                :name="'searchtext'"
                            />
                        </div>
                    </div>
                    <div v-if="featuredProgram" class="border border-[#C2C2C2] rounded-lg bg-white p-3 mb-5">
                        <div class="text-xl text-warna-utama text-center font-bold mb-3">Latest</div>
                        <div v-for="(item, index) in featuredProgram" :key="'addblog' + index">
                            <div class="flex justify-between text-sm ">
                                <div class="flex-auto text-warna-utama line-clamp-2">{{item.judulActivity[bahasa]}}</div>
                                <button  @click="pilihProgram(item)" class="flex-none text-warna-empat font-semibold">+ Add</button>
                            </div>
                            <hr class="border-warna-tujuh my-3">
                        </div>
                    </div>
                    <div v-if="addedProgram.length > 0" class="">
                        <div class="text-warna-utama font-semibold mb-5">Added Content</div>
                        <div v-for="(item, index) in addedProgram" :key="'added'+index" class="flex mb-4">
                            <div class="text-sm mr-1">{{item.judulActivity[bahasa]}}</div>
                            <button @click="removeAddedProgram(item)"><img src="/icons/ic-cancel-dark.png" alt="cancel"></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm text-warna-delapan">You can add {{addedProgram.length}} Content</div>
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-10 cursor-pointer">Add</div>               
                </div>
                <!-- <pre>{{addedBlog}}</pre> -->
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalAddEvent"
            :title="modalTitleAddEvent"
            :width="modalWidthAddEvent"
            :key="keyModalAddEvent+'event'"
            :persistent="persistentAddEvent"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="mb-5">
                        <div class="font-semibold text-warna-utama mb-1">Search Title</div>
                        <div class="w-full">
                            <ElementsSearchBar 
                                v-model="filter.searchEvent"
                                placeholder="Write here"
                                :name="'searchtext'"
                            />
                        </div>
                    </div>
                    <div v-if="featuredEvent" class="border border-[#C2C2C2] rounded-lg bg-white p-3 mb-5">
                        <div class="text-xl text-warna-utama text-center font-bold mb-3">Latest</div>
                        <div v-for="(item, index) in featuredEvent" :key="'addblog' + index">
                            <div class="flex justify-between text-sm ">
                                <div class="flex-auto text-warna-utama line-clamp-2">{{item.judulActivity[bahasa]}}</div>
                                <button  @click="pilihEvent(item)" class="flex-none text-warna-empat font-semibold">+ Add</button>
                            </div>
                            <hr class="border-warna-tujuh my-3">
                        </div>
                    </div>
                    <div v-if="addedEvent.length > 0" class="">
                        <div class="text-warna-utama font-semibold mb-5">Added Content</div>
                        <div v-for="(item, index) in addedEvent" :key="'added'+index" class="flex mb-4">
                            <div class="text-sm mr-1">{{item.judulActivity[bahasa]}}</div>
                            <button @click="removeAddedEvent(item)"><img src="/icons/ic-cancel-dark.png" alt="cancel"></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm text-warna-delapan">You can add {{addedEvent.length}} Content</div>
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-10 cursor-pointer">Add</div>               
                </div>
                <!-- <pre>{{addedBlog}}</pre> -->
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalAddResource"
            :title="modalTitleAddResource"
            :width="modalWidthAddResource"
            :key="keyModalAddResource+'resource'"
            :persistent="persistentAddResource"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="mb-5">
                        <div class="font-semibold text-warna-utama mb-1">Search Title</div>
                        <div class="w-full">
                            <ElementsSearchBar 
                                v-model="filter.searchResource"
                                placeholder="Write here"
                                :name="'searchtext'"
                            />
                        </div>
                    </div>
                    <div v-if="featuredResource" class="border border-[#C2C2C2] rounded-lg bg-white p-3 mb-5">
                        <div class="text-xl text-warna-utama text-center font-bold mb-3">Latest</div>
                        <div v-for="(item, index) in featuredResource" :key="'addblog' + index">
                            <div class="flex justify-between text-sm ">
                                <div class="flex-auto text-warna-utama line-clamp-2">{{item.judulArtikel[bahasa]}}</div>
                                <button  @click="pilihResource(item)" class="flex-none text-warna-empat font-semibold">+ Add</button>
                            </div>
                            <hr class="border-warna-tujuh my-3">
                        </div>
                    </div>
                    <div v-if="addedResource.length > 0" class="">
                        <div class="text-warna-utama font-semibold mb-5">Added Content</div>
                        <div v-for="(item, index) in addedResource" :key="'added'+index" class="flex mb-4">
                            <div class="text-sm mr-1">{{item.judulArtikel[bahasa]}}</div>
                            <button @click="removeAddedResource(item)"><img src="/icons/ic-cancel-dark.png" alt="cancel"></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm text-warna-delapan">You can add {{addedResource.length}} Content</div>
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-10 cursor-pointer">Add</div>               
                </div>
                <!-- <pre>{{addedBlog}}</pre> -->
            </div>
        </ElementsModal>

        <ElementsModal 
            v-model="modalAddBlog"
            :title="modalTitleAddBlog"
            :width="modalWidthAddBlog"
            :key="keyModalAddBlog+'blog'"
            :persistent="persistentAddBlog"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="mb-5">
                        <div class="font-semibold text-warna-utama mb-1">Search Title</div>
                        <div class="w-full">
                            <ElementsSearchBar 
                                v-model="filter.searchBlog"
                                placeholder="Write here"
                                :name="'searchtext'"
                            />
                        </div>
                    </div>
                    <div v-if="featuredBlog" class="border border-[#C2C2C2] rounded-lg bg-white p-3 mb-5">
                        <div class="text-xl text-warna-utama text-center font-bold mb-3">Latest</div>
                        <div v-for="(item, index) in featuredBlog" :key="'addblog' + index">
                            <div class="flex justify-between text-sm ">
                                <div class="flex-auto text-warna-utama line-clamp-2">{{item.judulArtikel[bahasa]}}</div>
                                <button  @click="pilihBlog(item)" class="flex-none text-warna-empat font-semibold">+ Add</button>
                            </div>
                            <hr class="border-warna-tujuh my-3">
                        </div>
                    </div>
                    <div v-if="addedBlog.length > 0" class="">
                        <div class="text-warna-utama font-semibold mb-5">Added Content</div>
                        <div v-for="(item, index) in addedBlog" :key="'added'+index" class="flex mb-4">
                            <div class="text-sm mr-1">{{item.judulArtikel[bahasa]}}</div>
                            <button @click="removeAddedBlog(item)"><img src="/icons/ic-cancel-dark.png" alt="cancel"></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm text-warna-delapan">You can add {{addedBlog.length}} Content</div>
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-10 cursor-pointer">Add</div>               
                </div>
                <!-- <pre>{{addedBlog}}</pre> -->
            </div>
        </ElementsModal>

    </div>
</template>


<script>
// import featuredContent from '~/static/data/featuredcontent.json';

export default {
    data() {
        return {
            selectedTab: 'program',

            filter: {
                searchProgram: '',
                searchEvent: '',
                searchResource: '',
                searchBlog: '',
            },

            addedProgram: [],
            addedEvent: [],
            addedResource: [],
            addedBlog: [],

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


            // KEPERLUAN MODAL ADD PROGRAM //
            modalAddProgram: false,
            modalTitleAddProgram: 'Add Blog',
            modalWidthAddProgram: '',
            keyModalAddProgram: 0,
            persistentAddProgram: true,
            // ========== //

            // KEPERLUAN MODAL ADD EVENT //
            modalAddEvent: false,
            modalTitleAddEvent: 'Add Blog',
            modalWidthAddEvent: '',
            keyModalAddEvent: 1,
            persistentAddEvent: true,
            // ========== //

            // KEPERLUAN MODAL ADD RESOURCE //
            modalAddResource: false,
            modalTitleAddResource: 'Add Blog',
            modalWidthAddResource: '',
            keyModalAddResource: 1,
            persistentAddResource: true,
            // ========== //

            // KEPERLUAN MODAL ADD BLOG //
            modalAddBlog: false,
            modalTitleAddBlog: 'Add Blog',
            modalWidthAddBlog: '',
            keyModalAddBlog: 1,
            persistentAddBlog: true,
            // ========== //
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
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

        async masterPoint() {
            this.dataTable = []
            await this.$apiBase.get('featuredcontent//').then(res => {
                var featuredContent = res.data
                this.featuredProgram = featuredContent.featuredProgram
                this.featuredEvent = featuredContent.featuredEvent
                this.featuredResource = featuredContent.featuredResource
                this.featuredBlog = featuredContent.featuredBlog
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiBase.put('featuredcontent/', data).then(res => {
                const data = res.data         
                this.message = data.message
                alert("Data berhasil disimpan.")
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        }, 
        updateFeatureContent () {
            var dataUpdate = {
                featuredProgram: this.featuredProgram,
                featuredEvent: this.featuredEvent,
                featuredResource: this.featuredResource,
                featuredBlog: this.featuredBlog
            }
            this.updateData(dataUpdate)
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


        // ADD PROGRAM //
        btnAddProgram() {
            this.modalAddProgram = true
            this.keyModalAddProgram += 1
        },

        pilihProgram(item) {
            this.addedProgram.push(item)
        },

        removeAddedProgram(value){
            // console.log(value)
            const posisi = this.addedProgram.indexOf(value)
            this.addedProgram.splice(posisi, 1)
            // this.$nextTick(() => {
            //     this.updateValue();
            // })
        },

        // ADD EVENT //
        btnAddEvent() {
            this.modalAddEvent = true
            this.keyModalAddEvent += 1
        },

        pilihEvent(item) {
            this.addedEvent.push(item)
        },

        removeAddedEvent(value){
            // console.log(value)
            const posisi = this.addedEvent.indexOf(value)
            this.addedEvent.splice(posisi, 1)
            // this.$nextTick(() => {
            //     this.updateValue();
            // })
        },

        // ADD RESOURCE //
        btnAddResource() {
            this.modalAddResource = true
            this.keyModalAddResource += 1
        },

        pilihResource(item) {
            this.addedResource.push(item)
        },

        removeAddedResource(value){
            // console.log(value)
            const posisi = this.addedResource.indexOf(value)
            this.addedResource.splice(posisi, 1)
            // this.$nextTick(() => {
            //     this.updateValue();
            // })
        },

        // ADD BLOG //
        btnAddBlog() {
            this.modalAddBlog = true
            this.keyModalAddBlog += 1
        },

        pilihBlog(item) {
            this.addedBlog.push(item)
        },

        removeAddedBlog(value){
            // console.log(value)
            const posisi = this.addedBlog.indexOf(value)
            this.addedBlog.splice(posisi, 1)
            // this.$nextTick(() => {
            //     this.updateValue();
            // })
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