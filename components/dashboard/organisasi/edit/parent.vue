<template>
    <div class="py-[40px]">
        <div class="mb-9">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li>
                        <div class="flex items-center">
                            <a :href="'/verifications/organisasi/'+id" class="text-sm font-medium text-warna-delapan hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Detail Organisasi</a>
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
                <div v-if="dataOrganisasi.organisasi[0].hierarki !== 'Headquarter'">
                    <InputDropdown 
                        v-model="kategorisasi"
                        :name="'kategorisasi'"
                        :opsi="kategorisasiProfileOrganisasiCabang"
                    />
                </div>
                <div v-if="dataOrganisasi.organisasi[0].hierarki !== 'Branch'">
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
import detailOrganisasi from '~/static/data/detailorganisasi.json';

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
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint() 
        },
        
        async masterPoint() {
            await this.$apiBase.get('provinsi/').then(res => {
                const data = res.data
                this.opsiProvinsi = _.map(data, function(o){
                    return {'id':o.provinsi, 'label':[o.provinsi, o.provinsi]}
                })

            }).catch(err => {
                console.log(err)
            })

            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                const data = res.data
                console.log(data)
                this.accountId = data.accountId
                this.organisasiId = data.organisasiId
                this.form = {
                    namaOrganisasi: data.namaOrganisasi,
                    websiteOrganisasi: data.websiteOrganisasi,
                    hierarki: data.hierarchy.id,
                    typeOrganisasi: _.flatMap(data.typeOrganisasi, "id"),
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tampilan: data.tampilan,
                    imgLogoOrganisasi: data.imgLogoOrganisasi,
                    imgMainImage: data.imgMainImage,
                    binInstitutionProfile: data.binInstitutionProfile,
                    lokasiOrganisasi: data.lokasiOrganisasi,
                    highlight:[data.highlight[0], data.highlight[1]],
                    deskripsi:[data.deskripsi[0], data.deskripsi[1]]
                }
                
            }).catch(err => {
                console.log(err)
            })
            this.loaderDetail = false
        },
    }
}
</script>