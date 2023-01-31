<template>
    <div>
        <div class="grid grid-cols-12 gap-6">
            <div 
                v-for="(item, index) in dataCard" :key="'fp'+index" 
                class="col-span-12 lg:col-span-3 flex flex-col bg-white border border-tujuh rounded-xl p-3">
                    <div class="mb-3 relative">
                        <div class="image-thumbnail-wrapper relative  rounded-lg overflow-hidden">
                            <img class="w-full" :class="tipeKonten === 'Event' ? 'h-[220px]' : 'h-[135px]'" :src="basePath+item.imgThumbnail" alt="thumbnail">
                            <div 
                                class="bg-approved text-white text-xs absolute bottom-0 right-0 px-3 py-0.5 rounded-tl-full " 
                                v-if="tipeKonten==='Program'">{{ $t('program-'+item.progress) }}</div>
                        </div>

                        <div v-if="toggleEdit" @click="btnDeleteSatuan(index)" class="absolute top-0 right-0 bg-white rounded-full p-3 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                            <img class="w-5 h-5" src="/icons/icon-delete-black.png" alt="icon-delete">
                        </div>
                    </div>
                    <div class="flex mb-2">
                        <div class="text-[9px] bg-empat px-2 py-1 rounded-full text-white" v-if="tipeKonten==='Event'">
                            {{ $t('event-'+item.progress) }}
                        </div>
                        <div 
                            class="text-xs px-[12px] py-[2px] bg-[#F0F1FF] border-[#A1A2B7] border rounded-[37px]"
                            v-if="tipeKonten==='Resources' && item.resourcesFiles && item.resourcesFiles.typeResources">
                            {{ tipeFile(item.resourcesFiles) }}
                        </div>
                    </div>

                    <div v-if="['Program', 'Event'].includes(tipeKonten)" class="text-xs text-warna-dua mb-2">
                        {{$dayjs(item.tanggalMulai).format("DD MMM YYYY")}} - {{$dayjs(item.tanggalSelesai).format("DD MMM YYYY")}}
                    </div>
                    <!-- <div v-if="['Resources'].includes(tipeKonten)" class="text-xs bg-[#F0F1Ff] border border-[#A1A2B7] text-center w-1/2 py-[2px] rounded-[37px] text-warna-empat mb-2">
                        {{ item.kategoriArtikel[0].nama[bahasa] }}
                    </div> -->
                    <div class="text-utama font-semibold mb-4 line-clamp-3 w-full flex-grow">
                        <span v-if="['Program', 'Event'].includes(tipeKonten)">{{ item.judulActivity[bahasa] }}</span>
                        <span v-if="['Resources', 'Blog'].includes(tipeKonten)">{{ item.judulArtikel[bahasa] }}</span>
                    </div>
                    <div class="text-xs flex items-center gap-x-2">
                        <div class="text-warna-dua" :class="['Program', 'Event'].includes(tipeKonten) ? 'truncate w-[80px]' : '' ">
                            {{$t('Oleh')}}  {{ item.myOrganisasi.namaOrganisasi }}
                        </div>
                        <img v-if="['Program', 'Event'].includes(tipeKonten)" class="w-[6px] h-[6px]" src="/icons/icon-dot.png" alt="icon-dot">
                        <div v-if="['Program', 'Event'].includes(tipeKonten)" class="text-warna-empat">{{ item.statusActivity.nama[bahasa] }}</div>
                    </div>
                    <div v-if="['Resources', 'Blog'].includes(tipeKonten)" class="text-xs flex items-center gap-x-2 mt-3">
                        <div class="text-warna-dua">{{ $t('Published') }}</div>
                        <div class="text-warna-empat">
                            <div>{{$dayjs(item.tanggalMulai).format("DD MMMM YYYY")}}</div>
                            <div>{{$dayjs(item.tanggalMulai).format("HH.mm")}} WIB</div>
                        </div>
                    </div>
            </div>
        </div>
        <ElementsModal 
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+tipeKonten"
            :persistent="true"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">
                    <p>Are you sure want to remove on</p> <p>Featured {{tipeKonten}}?</p>
                </div>
                <div class="flex items-center gap-x-6">
                    <button @click="btnConfirmDelete" class="button-standar w-1/2">{{ $t('Remove') }}</button>
                    <button @click="btnCancelDeleteSatuan" class="button-standar-outline w-1/2">{{ $t('Cancel') }}</button>                    
                </div>
            </div>
        </ElementsModal>
    </div>
</template>


<script>
export default {
    props: ['value', 'tipeKonten', 'toggleEdit', 'selectedTab'],
    data() {
        return {
            // KEPERLUAN MODAL GABUNG KE PUSAT //
            modalDeleteFeaturedProgram: false,
            modalTitleFeaturedProgram: '',
            modalWidthFeaturedProgram: '',
            keyModalFeaturedProgram: 0,
            persistentFeaturedProgram: true,
            // ========== //
            modal: {
                status: false,
                title: '',
                key: 0
            },
            selectedIndex: null
        }
    },
    computed: {
        dataCard: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input',value)
            }
        },
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
    methods: {
        tipeFile(item) {
            return item.typeResources.nama[this.bahasa]
        },

        btnDeleteSatuan(index) {
            this.selectedIndex = index
            this.modal.status = true
            this.modal.key += 1
        },

        btnCancelDeleteSatuan() {
            this.modal.status = false
            this.modal.key += 1
        },

        btnConfirmDelete() {
            this.btnCancelDeleteSatuan()
            this.dataCard.splice(this.selectedIndex, 1)
            $nuxt.$emit('updateFeatured', this.selectedTab)

        }
    },
}
</script>