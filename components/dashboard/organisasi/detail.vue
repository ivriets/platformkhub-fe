<template>
    <div class="py-[80px]">
        <div v-if="loaderDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <div v-if="dataDetail" class="flex items-start justify-between mb-6">
                <div v-if="dataDetail.statusVerification === 1" class="px-6 py-2 bg-warna-need-verification rounded-3xl text-white ">Need Verification</div>
                <div v-if="dataDetail.statusVerification === 2" class="px-6 py-2 bg-warna-rejected rounded-3xl text-white ">Rejected</div>
                <div v-if="dataDetail.statusVerification === 3" class="px-6 py-2 bg-warna-approved-accepted rounded-3xl text-white ">Accepted</div>
                <div v-if="dataDetail.statusVerification === 4" class="px-6 py-2 bg-warna-suspended rounded-3xl text-white ">Suspended</div>
                <!-- BENDERA -->
                <div class="inline-flex flex-col">
                    <div>
                        <button @click="toggleDrop" class="flex items-center text-sm text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:shadow-solid">
                            <svg v-if="selectedFlag === 'indonesia'" class="shadow" width="40" height="30" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)"><path d="M-5.02002 0H25.06V15.04H-5.02002V0Z" fill="white"/><rect width="20" height="8" fill="#C8102E"/></g>
                                <defs><clipPath id="clip0"><rect width="20" height="15" fill="white"/></clipPath></defs>
                            </svg>
                            <svg v-else-if="selectedFlag === 'inggris'" class="shadow" width="40" height="30" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.8037 -0.205078H-4.60254V14.9981H25.8037V-0.205078Z" fill="#00008B"/>
                                <path d="M-4.60254 -0.205078L10.6006 7.39649L-4.60254 -0.205078ZM10.6006 -0.205078L-4.60254 7.39649L10.6006 -0.205078Z" fill="black"/>
                                <path d="M10.2031 8.19485L2.99989 4.59374L-4.20336 8.19485L-5 6.60157L1.00828 3.59743L-5 0.593288L-4.20336 -1L2.99989 2.60213L10.2031 -1L10.9998 0.593288L4.9915 3.59743L10.9998 6.60157L10.2031 8.19485Z" fill="white"/>
                                <path d="M-4.60254 -0.205078L10.6006 7.39649L-4.60254 -0.205078ZM10.6006 -0.205078L-4.60254 7.39649L10.6006 -0.205078Z" fill="black"/>
                                <path d="M10.3877 7.82006L2.99898 4.12569L-4.38974 7.82006L-4.81543 6.97071L1.93679 3.5946L-4.81543 0.218489L-4.38974 -0.630859L2.99898 3.0635L10.3877 -0.630859L10.8134 0.218489L4.06117 3.5946L10.8134 6.97071L10.3877 7.82006Z" fill="#FF0000"/>
                                <path d="M2.99903 -0.205078V8.66341V-0.205078ZM-4.60254 3.5957H13.1344H-4.60254Z" fill="black"/>
                                <path d="M4.1869 8.66341H1.81115V4.78358H-4.60254V2.40783H1.81115V-0.205078H4.1869V2.40783H13.1344V4.78358H4.1869V8.66341Z" fill="white"/>
                                <path d="M2.99903 -0.205078V7.93062V-0.205078ZM-4.60254 3.5957H11.1347H-4.60254Z" fill="black"/>
                                <path d="M3.71155 7.93062H2.28651V4.30822H-4.60254V2.88318H2.28651V-0.205078H3.71155V2.88318H11.1347V4.30822H3.71155V7.93062Z" fill="#FF0000"/>
                                <path d="M-4.60254 7.39649H10.6006V-0.205078H15.6683V9.93034H-4.60254V7.39649Z" fill="#00008B"/>
                                <path d="M3.00106 8.91797L3.44093 10.2852L4.78387 9.77644L3.98926 10.9724L5.22477 11.7052L3.79364 11.8299L3.99027 13.2529L3.00106 12.212L2.01184 13.2529L2.20847 11.8299L0.777344 11.7052L2.01285 10.9724L1.21823 9.77644L2.56118 10.2852L3.00106 8.91797Z" fill="white"/>
                                <path d="M18.2036 11.3809L18.4134 12.0316L19.053 11.7893L18.6749 12.3589L19.2628 12.7076L18.5817 12.7674L18.6759 13.4444L18.2046 12.9488L17.7333 13.4444L17.8276 12.7674L17.1465 12.7076L17.7343 12.3589L17.3563 11.7893L17.9958 12.0316L18.2036 11.3809Z" fill="white"/>
                                <path d="M14.4019 5.36133L14.6117 6.01202L15.2512 5.76979L14.8731 6.3394L15.461 6.68805L14.7799 6.74684L14.8742 7.42389L14.4029 6.92826L13.9316 7.42389L14.0258 6.74684L13.3447 6.68805L13.9326 6.3394L13.5545 5.76979L14.1941 6.01202L14.4019 5.36133Z" fill="white"/>
                                <path d="M18.2036 1.24414L18.4134 1.89483L19.053 1.6526L18.6749 2.22221L19.2628 2.57087L18.5817 2.63067L18.6759 3.30771L18.2046 2.81209L17.7333 3.30771L17.8276 2.63067L17.1465 2.57087L17.7343 2.22221L17.3563 1.6526L17.9958 1.89483L18.2036 1.24414Z" fill="white"/>
                                <path d="M19.7231 7.39844L19.8883 7.80385L20.3252 7.83629L19.9907 8.11907L20.0951 8.54475L19.7231 8.31367L19.3512 8.54475L19.4556 8.11907L19.1211 7.83629L19.5579 7.80385L19.7231 7.39844Z" fill="white"/>
                            </svg>
                            <div class="ml-2">
                                <img class="" src="/icons/icon-arrow-down.png" alt="icon-down">
                            </div>
                        </button>
                    </div>
                    <div v-if="flagDrop" v-click-outside="closeDrop" class="relative z-10">
                        <div class="absolute bg-white shadow-md rounded-md right-0 text-sm w-40 mt-2 border border-gray-50">
                            <div @click="pilihInggris" class="py-2 px-4 cursor-pointer hover:bg-gray-50">Bahasa Inggris</div>
                            <div @click="pilihIndonesia" class="py-2 px-4 cursor-pointer hover:bg-gray-50">Bahasa Indonesia</div>
                        </div>
                    </div>
                </div>
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
                        <div class="mb-5 text-sm text-warna-delapan font-semibold">Location</div>
                        <div class="text-sm text-warna-sembilan font-semibold">{{ dataDetail.organisasi.lokasiOrganisasi[0].jalan }}, {{ dataDetail.organisasi.lokasiOrganisasi[0].kota }}, {{ dataDetail.organisasi.lokasiOrganisasi[0].provinsi }}</div>
                    </div>
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="'Internal Branch'"
                        :jumlah="internalBranch.length"
                        :fromData="internalBranch"
                        :clickMore="'/verifications/organisasi/'+id+'/internal-branch'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="'Requested by Individu'"
                        :jumlah="requestByIndividu.length"
                        :fromData="requestByIndividu"
                        :clickMore="'/verifications/organisasi/'+id+'/request-by-individu'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="'Team Member'"
                        :jumlah="teamMember.length"
                        :fromData="teamMember"
                        :clickMore="'/verifications/organisasi/'+id+'/team-member'"
                        :maxItem="maxItem"
                    />
                    <hr class="border-warna-tujuh mt-6 mb-5">
                    <ElementsListFotoNama 
                        :title="'Partner'"
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
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
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
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['totalMember', 'websiteOrganisasi', 'missionStatement', 'hierarki'].includes(item1.value)" class="">
                                        {{ dataDetail.organisasi[item1.value] }}
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
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">Organization Type</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div v-for="(item, index) in dataDetail.organisasi.typeOrganisasi" :key="'tipeorganisasi' + index" class="mb-4 inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.organisasi.typeOrganisasi.length">, </span>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">Approach Type</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div v-for="(item, index) in dataDetail.organisasi.typeApproach" :key="'tipeapproach' + index" class="mb-4 inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.organisasi.typeApproach.length">, </span>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-2 lg:col-span-2 text-sm text-warna-delapan font-semibold">Topic</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 text-sm text-warna-sembilan font-semibold">
                            <div v-for="(item, index) in dataDetail.organisasi.typeIssues" :key="'tipeissues' + index" class="mb-4 inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.organisasi.typeIssues.length">, </span>
                            </div>
                        </div>
                    </div>
                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-5">
                        <div class="text-sm text-warna-delapan font-semibold mb-[18px]">Highlight</div>
                        <div v-if="dataDetail.organisasi.highlight !== null" class="text-sm text-warna-sembilan font-semibold">{{ selectedFlag === 'indonesia' ? dataDetail.organisasi.highlight[0] : dataDetail.organisasi.highlight[1] }}</div>
                    </div>
                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-[36px]">
                        <div class="text-sm text-warna-delapan font-semibold mb-[18px]">Description</div>
                        <div v-if="dataDetail.organisasi.deskripsi !== null" class="text-sm text-warna-sembilan font-semibold">{{ selectedFlag === 'indonesia' ? dataDetail.organisasi.deskripsi[0] : dataDetail.organisasi.deskripsi[1] }}</div>
                    </div>
                    <div>
                        <div class="text-sm text-warna-delapan font-semibold mb-[30px]">Milestone</div>
                        <!-- <div class="text-sm text-warna-sembilan font-semibold text-center">On Going.xx..</div> -->
                        <DashboardOrganisasiMilestone 
                            :dataMilestone="dataDetail.organisasi.milestoneOrganisasi"
                        />
                        <!-- <pre>{{ dataDetail }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div v-if="dataDetail.statusVerification === 1" class="flex gap-x-6 font-semibold">
                    <button @click="btnRejectOrganisasi" class="px-8 py-2 bg-warna-rejected rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</button>
                    <button @click="btnAccept" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white cursor-pointer hover:bg-green-700">Accept</button>
                </div>
                <div v-if="dataDetail.statusVerification === 3" class="font-semibold">
                    <div @click="btnEdit(dataDetail.organisasi.organisasiId)" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Edit</div>
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
            selectedFlag: 'indonesia',
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
                    value: 'hierarki',
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
                console.log(data)
                this.dataDetail = data

                this.internalBranch = data.organisasi.organisasiCabangInternal.map(e => {
                    const data = {
                        id: e.organisasiId,
                        nama: e.namaOrganisasi,
                        image: e.imgLogoOrganisasi
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

                // this.partner = data.organisasi.partnerOrganisasiEksternal.map(e => {
                //     const data = {
                //         id: e.pkPartnerEksternalId,
                //         nama: e.namaPartner,
                //         image: e.imgLogoPartner
                //     }
                //     return data
                // })

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

            await this.$apiPlatform.post('verificator/organisasi/', data).then(res => {
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

            await this.$apiPlatform.post('verificator/organisasi/', data).then(res => {
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