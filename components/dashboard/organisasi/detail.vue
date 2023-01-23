<template>
    <div class="py-[80px]">
        <div v-if="loaderDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <div v-if="dataDetail" class="flex items-start justify-between mb-6">
                <ElementsDisplayStatusVerifikasiOval 
                    :status="dataDetail.statusVerification"
                />
                <!-- BENDERA -->
                <ElementsDisplayFlag 
                    v-model="selectedFlag"
                />
            </div>
            <div v-if="dataDetail" class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-4">
                    <div 
                        class="w-full bg-no-repeat bg-contain bg-center shadow-md border border-gray-50 rounded-xl p-2 h-[200px] lg:h-[320px]" 
                        :style="'background-image: url('+basePath+dataDetail.organisasi.imgLogoOrganisasi+');'"
                    >
                    </div>
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <div class="">
                        <div class="mb-5 text-sm text-warna-delapan font-semibold">{{ $t('Location') }}</div>
                        <div v-for="(lokasi, index) in dataDetail.organisasi.lokasiOrganisasi" :key="index" class="text-sm text-warna-sembilan font-semibold">{{ lokasi.jalan }}, {{ lokasi.kota }}, {{ lokasi.provinsi }}, </div>
                    </div>


                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="$t('Internal Branch')"
                        :jumlah="internalBranch.length"
                        :fromData="internalBranch"
                        :clickMore="'/verifications/organisasi/'+id+'/internal-branch'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="$t('Requested by Individu')"
                        :jumlah="requestByIndividu.length"
                        :fromData="requestByIndividu"
                        :clickMore="'/verifications/organisasi/'+id+'/request-by-individu'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="$t('Team Member')"
                        :jumlah="teamMember.length"
                        :fromData="teamMember"
                        :clickMore="'/verifications/organisasi/'+id+'/team-member'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="$t('Partner')"
                        :jumlah="partner.length"
                        :fromData="partner"
                        :clickMore="'/verifications/organisasi/'+id+'/partner'"
                        :maxItem="maxItem"
                    />
                </div>
                <div v-if="dataDetail" class="col-span-12 lg:col-span-8">
                    <div class="text-xl font-bold text-warna-utama">{{ dataDetail.organisasi.namaOrganisasi }}</div>
                    <hr class="border-warna-tujuh my-5">
                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'datalabel' + index1" v-show="item1.posisi==='kiri'" class="grid grid-cols-12 mb-4 break-words gap-1">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt', 'updatedAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }} WIB
                                    </div>
                                    <div v-else-if="['namaOrganisasi'].includes(item1.value)">
                                        {{ dataDetail.organisasi[item1.value] }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                            <div v-for="(item2, index2) in dataDetail.organisasi.sosialMedia" :key="'datasosmed' + index2" class="grid grid-cols-12 mb-4 break-words gap-1">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">
                                    <span v-if="item2.kategoriSosialMedia === 1">Twitter</span>
                                    <span v-else-if="item2.kategoriSosialMedia === 2">Instagram</span>
                                    <span v-else-if="item2.kategoriSosialMedia === 3">Youtube</span>
                                    <span v-else-if="item2.kategoriSosialMedia === 5">Facebook</span>
                                </div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">{{ item2.linkSosialMedia ? item2.linkSosialMedia : '-' }}</div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'dL' + index1" v-show="item1.posisi==='kanan'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['websiteOrganisasi', 'missionStatement'].includes(item1.value)" class="">
                                        {{ dataDetail.organisasi[item1.value] }}
                                    </div>
                                    <div v-else-if="['totalMember'].includes(item1.value)" class="">
                                        <span v-if="dataDetail.organisasi.teamMember" >{{ dataDetail.organisasi.teamMember.length }}</span>
                                    </div>
                                    <div v-else-if="['hierarchy'].includes(item1.value)" class="">
                                        <span v-if="dataDetail.organisasi[item1.value]" >{{ selectedFlag === 'indonesia' ? dataDetail.organisasi[item1.value].nama[0] : dataDetail.organisasi[item1.value].nama[1] }}</span>
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="border-warna-tujuh mb-5">
                    <div class="grid grid-cols-12 gap-y-1">
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">{{ $t('Organization Type') }}</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div class="mb-4 inline-block mr-1">{{ dataDetail.organisasi.typeOrganisasi.map(e => e.nama[selectedFlag]).join(', ') }}</div>
                        </div>
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">{{ $t('Approach') }}</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div class="mb-4 inline-block mr-1">{{ dataDetail.organisasi.typeApproach.map(e => e.nama[selectedFlag]).join(', ') }}</div>
                        </div>
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">{{ $t('Issues') }}</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div class="mb-4 inline-block mr-1">{{ dataDetail.organisasi.typeIssues.map(e => e.nama[selectedFlag]).join(', ') }}</div>
                        </div>
                    </div>
                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-5">
                        <div class="text-sm text-warna-delapan font-semibold mb-[18px]">{{ $t('Highlight') }}</div>
                        <div v-if="dataDetail.organisasi.highlight !== null" class="text-sm text-warna-sembilan font-semibold">{{ dataDetail.organisasi.highlight[selectedFlag] }}</div>
                    </div>
                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-[36px]">
                        <div class="text-sm text-warna-delapan font-semibold mb-[18px]">{{ $t('Description') }}</div>
                        <div v-if="dataDetail.organisasi.deskripsi !== null" class="text-sm text-warna-sembilan font-semibold">{{ dataDetail.organisasi.deskripsi[selectedFlag] }}</div>
                    </div>
                    <div>
                        <div class="text-sm text-warna-delapan font-semibold mb-[30px]">{{ $t('Milestone') }}</div>
                        <DashboardOrganisasiMilestone 
                        v-if="dataDetail.organisasi.milestoneOrganisasi && dataDetail.organisasi.milestoneOrganisasi.length > 0"
                            :dataMilestoneSrc="dataDetail.organisasi.milestoneOrganisasi"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <div v-if="dataDetail.statusVerification === 1" class="flex gap-x-6 font-semibold">
                    <button @click="btnRejectOrganisasi" class="px-8 py-2 bg-warna-rejected rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</button>
                    <button @click="btnAccept" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white cursor-pointer hover:bg-green-700">Accept</button>
                </div>
                <div v-if="dataDetail.statusVerification === 3" class="font-semibold">
                    <button @click="btnEdit(dataDetail.organisasi.organisasiId)" class="button-standar-outline">{{ $t('Edit') }}</button>
                </div>
            </div>
        </div>

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'rejectorganisasi'"
            :persistent="persistent"
        >
            <div v-if="dataDetail" class="p-6">
                <div class="grid grid-cols-12 gap-x-5 gap-y-3 mb-4">
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">Organisasi ID</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <div class="text-sm text-warna-sembilan font-semibold">{{dataDetail.organisasiId}}</div>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">Nama</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <div class="text-sm text-warna-sembilan font-semibold">{{dataDetail.organisasi.namaOrganisasi}}</div>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">Alasan Reject</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <InputTextArea 
                            v-model="form.alasanRejectOrSuspend"
                            :max="500"
                            placeholder="Tulis disini"
                            :name="'alasanreject'"
                        />
                    </div>
                </div>
                <div class="flex items-center justify-end">
                    <button @click="btnModalBatal" class="text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-1 px-4 cursor-pointer mr-4">Batal</button> 
                    <button @click="btnReject" class="text-center hover:bg-red-700 bg-warna-rejected border border-rejected hover:border-red-700 text-white rounded-lg py-1 px-4 cursor-pointer">Reject</button>
                </div>
            </div>
        </ElementsModal>
        <!-- <pre>{{dataDetail}}</pre> -->
    </div>
</template>

<script>

export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 0,
            internalBranch: [],
            requestByIndividu: [],
            teamMember: [],
            partner: [],
            maxItem: 7,
            dataDetail: null,
            form: {
                alasanRejectOrSuspend: ''
            },
            dataLabel: [
                {
                    label: 'Organization ID',
                    value: 'organisasiId',
                    posisi: 'kiri'
                },
                {
                    label: 'Name',
                    value: 'namaOrganisasi',
                    posisi: 'kiri'
                },
                {
                    label: 'Created',
                    value: 'createdAt',
                    posisi: 'kiri'
                },
                {
                    label: 'Updated',
                    value: 'updatedAt',
                    posisi: 'kiri'
                },
                {
                    label: 'Email',
                    value: 'email',
                    posisi: 'kiri'
                },
                {
                    label: 'Phone',
                    value: 'telepon',
                    posisi: 'kiri'
                },
                {
                    label: 'Total Member',
                    value: 'totalMember',
                    posisi: 'kanan'
                },
                {
                    label: 'Website',
                    value: 'websiteOrganisasi',
                    posisi: 'kanan'
                },
                {
                    label: 'Mission Statement',
                    value: 'missionStatement',
                    posisi: 'kanan'
                },
                {
                    label: 'Hierarchy',
                    value: 'hierarchy',
                    posisi: 'kanan'
                },
            ],
            // KEPERLUAN MODAL REJECT //
            modalAction: false,
            modalTitle: 'Alasan Reject',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
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
        title() {
            return this.$t('Verifikasi Organisasi')
        },
        id() {
            return this.$route.params.id;
        },
        basePath() {
            return process.env.BASE_URL
        }
    },
    watch: {
        lang() {
            this.initialize()
        }
    },
    mounted() {
        this.initialize()
    },
    head() {
        return{
            title: this.title
        }
    },
    methods: {
        initialize() {
            this.$store.commit('setPageTitle', this.title)
            this.masterPoint()
        },

        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('verificator/accounts/'+this.id+'/').then(res => {
                
                const data = res.data.results
                this.dataDetail = data

                this.internalBranch = data.organisasi.organisasiCabangInternal.map(e => {
                    const data = {
                        id: e.pkOrganisasiCabangInternalId,
                        nama: e.branch.namaOrganisasi,
                        image: e.branch.imgLogoOrganisasi
                    }
                    return data
                })
                this.requestByIndividu = data.organisasi.requestedByIndividu.map(e => {
                    const data = {
                        id: e.id,
                        nama: e.individu.namaIndividu,
                        image: e.individu.imgFotoProfile
                    }
                    return data
                })

                this.teamMember = data.organisasi.teamMember.map(e => {
                    const data = {
                        id: e.individu.userId,
                        nama: e.individu.namaIndividu,
                        image: e.individu.imgFotoProfile
                    }
                    return data
                })

                this.partner = data.organisasi.partnerOrganisasiEksternal.map(e => {
                    const data = {
                        id: e.pkPartnerEksternalId,
                        nama: e.namaPartner,
                        image: e.imgLogoPartner
                    }
                    return data
                })

                this.$nextTick(() => {
                    this.loaderDetail = true
                })
                
            }).catch(err => {
                console.log(err)
            })
        },

        async btnAccept() {

            const data = {
                accountId: this.id,
                statusVerification: 3
            }

            await this.$apiPlatform.post('verificator/verificationProcess/', data).then(res => {
                console.log('Accept Verification Organization')
                this.btnBack()
            }).catch(err => {
                console.log(err)
            })
        },

        async btnReject() {

            const data = {
                accountId: this.id,
                statusVerification: 2,
                alasanRejectOrSuspend: this.form.alasanRejectOrSuspend
            }

            await this.$apiPlatform.post('verificator/verificationProcess/', data).then(res => {
                console.log('Reject Verification Organization')
                this.btnBack()
            }).catch(err => {
                console.log(err)
            })
        },

        btnBack() {
            this.$router.push('/verifications/organisasi/organisasi-list')
        },

        btnEdit(orgId) {
            this.$router.push('/verifications/organisasi/'+orgId+'/edit')
        },

        toggleDrop() {
            this.flagDrop = !this.flagDrop
        },

        closeDrop() {
            this.flagDrop = false
        },

        btnRejectOrganisasi() {
            this.modalAction = true
            this.keyModal += 1
        },

        btnModalBatal() {
            this.modalAction = false
            this.keyModal += 1
        },

        pilihIndonesia() {
            this.selectedFlag = 'indonesia'
            this.closeDrop()
        },

        pilihInggris() {
            this.selectedFlag = 'inggris'
            this.closeDrop()
        }
    },
}
</script>