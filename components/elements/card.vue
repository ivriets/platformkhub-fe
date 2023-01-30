<template>
    <div>
        <div class="grid grid-cols-12 gap-6">
            <div v-for="(item, index) in dataCard" :key="'fp'+index" class="col-span-12 lg:col-span-3">
                <div class="bg-white border border-tujuh rounded-xl p-3">
                    <div class="mb-3 relative">
                        <img class="w-full rounded-lg" :class="tipeKonten === 'Event' ? 'h-[220px]' : 'h-[135px]'" :src="basePath+item.imgThumbnail" alt="thumbnail">
                        <div v-if="toggleEdit" @click="btnDeleteSatuan(item)" class="absolute top-0 right-0 bg-white rounded-full p-3 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                            <img class="w-5 h-5" src="/icons/icon-delete-black.png" alt="icon-delete">
                        </div>
                    </div>
                    
                    <div v-if="['Program', 'Event'].includes(tipeKonten)" class="text-xs text-warna-dua mb-2">
                        {{$dayjs(item.tanggalMulai).format("DD MMM YYYY")}} - {{$dayjs(item.tanggalSelesai).format("DD MMM YYYY")}}
                    </div>
                    <div v-if="['Resource'].includes(tipeKonten)" class="text-xs bg-[#F0F1Ff] border border-[#A1A2B7] text-center w-1/2 py-[2px] rounded-[37px] text-warna-empat mb-2">
                        {{ item.kategoriArtikel[0].nama[bahasa] }}
                    </div>
                    <div class="text-warna-utama font-semibold mb-4 line-clamp-3 h-[72px]">
                        <span v-if="['Program', 'Event'].includes(tipeKonten)">{{ item.judulActivity[bahasa] }}</span>
                        <span v-if="['Resource', 'Blog'].includes(tipeKonten)">{{ item.judulArtikel[bahasa] }}</span>
                    </div>
                    <div class="text-xs flex items-center gap-x-2">
                        <div class="text-warna-dua" :class="['Program', 'Event'].includes(tipeKonten) ? 'truncate w-[80px]' : '' ">{{ item.myOrganisasi.namaOrganisasi }}</div>
                        <img v-if="['Program', 'Event'].includes(tipeKonten)" class="w-[6px] h-[6px]" src="/icons/icon-dot.png" alt="icon-dot">
                        <div v-if="['Program', 'Event'].includes(tipeKonten)" class="text-warna-empat">{{ item.statusActivity.nama[bahasa] }}</div>
                    </div>
                    <div v-if="['Resource', 'Blog'].includes(tipeKonten)" class="text-xs flex items-center gap-x-2 mt-3">
                        <div class="text-warna-dua">Published</div>
                        <div class="text-warna-empat">
                            <div>{{$dayjs(item.tanggalMulai).format("DD MMMM YYYY")}}</div>
                            <div>{{$dayjs(item.tanggalMulai).format("HH.mm")}} WIB</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ElementsModal 
            v-model="modalDeleteFeaturedProgram"
            :title="modalTitleFeaturedProgram"
            :width="modalWidthFeaturedProgram"
            :key="keyModalFeaturedProgram+'prog'"
            :persistent="persistentFeaturedProgram"
        >
            <div class="p-6">
                <img class="w-[232px] mx-auto mb-5" src="/images/img-delete.png" alt="img-delete">
                <div class="text-center text-warna-utama text-[34px] mb-6">Are you sure want to remove on Featured {{tipeKonten}}?</div>
                <div class="flex items-center gap-x-6">
                    <div @click="btnConfirmDelete" class="w-full text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 cursor-pointer">Remove</div>
                    <div @click="btnCancelDeleteSatuan" class="w-full text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-3 cursor-pointer">Cancel</div>                    
                </div>
            </div>
        </ElementsModal>
    </div>
</template>


<script>
export default {
    props: ['dataCard', 'tipeKonten', 'toggleEdit'],
    data() {
        return {
            // KEPERLUAN MODAL GABUNG KE PUSAT //
            modalDeleteFeaturedProgram: false,
            modalTitleFeaturedProgram: '',
            modalWidthFeaturedProgram: '',
            keyModalFeaturedProgram: 0,
            persistentFeaturedProgram: true,
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
    methods: {
        btnDeleteSatuan(item) {
            console.log(item)
            this.modalDeleteFeaturedProgram = true
            this.keyModalFeaturedProgram += 1
        },

        btnCancelDeleteSatuan() {
            this.modalDeleteFeaturedProgram = false
            this.keyModalFeaturedProgram += 1
        },

        btnConfirmDelete() {
            console.log('kehapus')
            this.modalDeleteFeaturedProgram = false
            this.keyModalFeaturedProgram += 1
        }
    },
}
</script>