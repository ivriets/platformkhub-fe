<template>
    <div v-if="dataOrganisasi" class="py-[40px]">
        <div class="mb-9">
            <ElementsBreadcrumbBaru 
                :parent="'Organization Detail'"
                :linkParent="'/verifications/organisasi/'+dataOrganisasi.accountId"
                :child="childBreadcrumb"
                v-if="dataOrganisasi"

            />
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
            <hr v-if="!['cabang', 'anggota', 'pusat'].includes(kategorisasi)" class="border-tujuh my-10">
            <div v-if="kategorisasi === 'tentang'">
                <DashboardOrganisasiEditTentang 
                    v-model="saving.tentang"
                />
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
                <DashboardOrganisasiEditKontakLokasi 
                    v-model="saving.kontaklokasi"
                />
            </div>
            <div v-else-if="kategorisasi === 'mediasosial'">
                <DashboardOrganisasiEditMediaSosial 
                    v-model="saving.mediasosial"
                />
            </div>
        </div>

        <div class="bg-white shadow-md rounded-xl py-4 px-6 mt-10">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <button 
                    v-if="['tentang', 'kontaklokasi', 'mediasosial'].includes(kategorisasi)"
                    @click="simpan" class="button-standar">{{ $t('Save') }}</button>
            </div>
        </div>

    </div>
</template>


<script>

export default {
    data() {
        return {
            kategorisasi: 'tentang',
            dataOrganisasi: null,
            saving: {
                tentang: false,
                kontaklokasi: false,
                mediasosial: false,
            }
        }
    },
    computed: {
        kategorisasiProfileOrganisasiPusat() {
            return this.$store.state.opsi.kategorisasiProfileOrganisasiPusat.map(e => {
                return {
                    id: e.id,
                    label: this.$t(e.label)
                }
            })
        },
        kategorisasiProfileOrganisasiCabang() {
            return this.$store.state.opsi.kategorisasiProfileOrganisasiCabang.map(e => {
                return {
                    id: e.id,
                    label: this.$t(e.label)
                }
            })
        },
        id() {
            return this.$route.params.id;
        },

        childBreadcrumb() {
            const vA = [
                // {
                //     label: 'Detail',
                //     link: '/moderations/blog/'+this.id
                // },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
            return vA
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
        btnBack() {
            this.$router.push('/verifications/organisasi/'+this.dataOrganisasi.accountId)
        },
        simpan() {
            this.saving[this.kategorisasi] = true
        }

    },
}
</script>