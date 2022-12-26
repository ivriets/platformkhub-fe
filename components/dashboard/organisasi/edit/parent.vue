<template>
    <div v-if="dataOrganisasi" class="py-[40px]">
        <div class="mb-9">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li>
                        <div class="flex items-center">
                            <a :href="'/verifications/organisasi/'+dataOrganisasi.accountId" class="text-sm font-medium text-warna-delapan hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Detail Organisasi</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span class="ml-1 text-sm font-medium text-warna-delapan md:ml-2 dark:text-gray-400">{{$t('Editor')}}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div v-if="dataOrganisasi" class="w-[240px]">
                <div v-if="dataOrganisasi.hierarchy.id !== 1">
                    <InputDropdown 
                        v-model="kategorisasi"
                        :name="'kategorisasi'"
                        :opsi="kategorisasiProfileOrganisasiCabang"
                    />
                </div>
                <div v-if="dataOrganisasi.hierarchy.id !== 2">
                    <InputDropdown 
                        v-model="kategorisasi"
                        :name="'kategorisasi'"
                        :opsi="kategorisasiProfileOrganisasiPusat"
                    />
                </div>
            </div>
            <hr v-if="!['cabang', 'anggota', 'pusat'].includes(kategorisasi)" class="border-warna-tujuh my-10">
            <div v-if="kategorisasi === 'tentang'">
                <DashboardOrganisasiEditTentang />
            </div>
            <div v-else-if="kategorisasi === 'cabang'">
                <DashboardOrganisasiEditCabang />
            </div>
            <div v-else-if="kategorisasi === 'pusat'">
                <DashboardOrganisasiEditPusat />
            </div>
            <div v-else-if="kategorisasi === 'anggota'">
                <DashboardOrganisasiEditAnggota />
            </div>
            <div v-else-if="kategorisasi === 'mitra'">
                <DashboardOrganisasiEditMitra />
            </div>
            <div v-else-if="kategorisasi === 'pencapaian'">
                <DashboardOrganisasiEditPencapaian />
            </div>
            <div v-else-if="kategorisasi === 'kontaklokasi'">
                <DashboardOrganisasiEditKontakLokasi />
            </div>
            <div v-else-if="kategorisasi === 'mediasosial'">
                <DashboardOrganisasiEditMediaSosial />
            </div>
        </div>
        <!-- <pre>{{dataOrganisasi}}</pre> -->
    </div>
</template>


<script>

export default {
    data() {
        return {
            kategorisasi: 'tentang',
            dataOrganisasi: null
        }
    },
    computed: {
        kategorisasiProfileOrganisasiPusat() {
            return this.$store.state.opsi.kategorisasiProfileOrganisasiPusat
        },
        kategorisasiProfileOrganisasiCabang() {
            return this.$store.state.opsi.kategorisasiProfileOrganisasiCabang
        },
        id() {
            return this.$route.params.id;
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
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataOrganisasi = res.data
            }).catch(err => {
                console.log(err)
            })
        },
    },
}
</script>