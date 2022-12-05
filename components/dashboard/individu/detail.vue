<template>
    <div class="py-[80px]">
        <div v-if="loaderDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <div v-if="dataDetail" class="flex items-center justify-between mb-6">
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
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-4">
                    <div 
                        class="w-full bg-no-repeat bg-contain bg-center shadow-md border border-gray-50 rounded-xl p-2 h-[200px] lg:h-[320px]" 
                        :style="'background-image: url('+basePath+dataDetail.individu[0].imgFotoProfile+');'"
                    >
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-8">
                    <div class="text-xl font-bold text-warna-utama">{{ dataDetail.individu[0].namaIndividu }}</div>
                    <hr class="border-warna-tujuh my-5">
                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'datalabel' + index1" v-show="item1.posisi==='kiri'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt', 'updatedAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY hh:mm') }} WIB
                                    </div>
                                    <div v-else-if="['emailIsVerified', 'accountIsVerified'].includes(item1.value)">
                                        {{ dataDetail[item1.value] === true ? 'Yes' : 'No' }}
                                    </div>
                                    <div v-else-if="['namaIndividu'].includes(item1.value)">
                                        {{ dataDetail.individu[0][item1.value] }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                            <div v-for="(item2, index2) in dataDetail.individu[0].sosialMedia" :key="'datasosmed' + index2" class="grid grid-cols-12 mb-4 break-words gap-1">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">
                                    <span v-if="item2.kategoriSosialMedia.id === 1">Twitter</span>
                                    <span v-if="item2.kategoriSosialMedia.id === 2">Instagram</span>
                                    <span v-if="item2.kategoriSosialMedia.id === 3">Youtube</span>
                                    <span v-if="item2.kategoriSosialMedia.id === 5">Facebook</span>
                                </div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">{{ item2.linkSosialMedia ? item2.linkSosialMedia : '-' }}</div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'dL' + index1" v-show="item1.posisi==='kanan'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['telepon', 'institusi'].includes(item1.value)" class="">
                                        {{ dataDetail.individu[0][item1.value] }}
                                    </div>
                                    <div v-else-if="dataDetail.individu[0].pekerjaan !== null && ['pekerjaan'].includes(item1.value)">
                                        {{ selectedFlag === 'indonesia' ? dataDetail.individu[0].pekerjaan.nama[0] : dataDetail.individu[0].pekerjaan.nama[1] }}
                                    </div>
                                    <div v-else-if="dataDetail.individu[0].typeGender !== null && ['gender'].includes(item1.value)">
                                        {{ selectedFlag === 'indonesia' ? dataDetail.individu[0].typeGender.nama[0] : dataDetail.individu[0].typeGender.nama[1] }}
                                    </div>
                                    <div v-else-if="['myOrganizations'].includes(item1.value)">
                                        <div v-for="(item, index) in dataDetail.individu[0].myOrganizations" :key="'myorganizations' + index">
                                            <span>{{ item.organisasi.namaOrganisasi }}</span><span v-if="index+1 < dataDetail.individu[0].myOrganizations.length">, </span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl p-6 mb-10">
            <div class="text-xl font-bold text-warna-utama">About Me</div>
            <hr class="border-warna-tujuh my-5">
            <div class="text-sm text-warna-delapan" v-html="dataDetail.individu[0].tentangSaya"></div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div v-if="dataDetail.statusVerification === 1" class="flex gap-x-6  font-semibold">
                    <div @click="btnRejectIndividu" class="px-8 py-2 bg-warna-rejected rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</div>
                    <div @click="btnAccept" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white cursor-pointer hover:bg-green-700">Accept</div>
                </div>
            </div>
        </div>

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'rejectindividu'"
            :persistent="persistent"
        >
            <div v-if="dataDetail" class="p-6">
                <div class="grid grid-cols-12 gap-x-5 gap-y-3 mb-4">
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">User ID</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <div class="text-sm text-warna-sembilan font-semibold">{{dataDetail.userId}}</div>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">Nama</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <div class="text-sm text-warna-sembilan font-semibold">{{dataDetail.individu[0].namaIndividu}}</div>
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
                    <div @click="btnModalBatal" class="text-center bg-white border border-warna-empat hover:bg-blue-50 text-warna-empat rounded-lg py-1 px-4 cursor-pointer mr-4">Batal</div>
                    <div @click="btnReject" class="text-center hover:bg-red-700 bg-warna-rejected border border-rejected hover:border-red-700 text-white rounded-lg py-1 px-4 cursor-pointer">Reject</div>
                </div>
            </div>
        </ElementsModal>
        <!-- <pre>{{dataDetail}}</pre> -->
    </div>
</template>

<script>
import detailIndividu from '~/static/data/detailindividu.json';

export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 'indonesia',
            dataDetail: null,
            form: {
                alasanRejectOrSuspend: ''
            },
            dataMyOrganisasi: [],
            dataLabel: [
                {
                    label: 'User ID',
                    value: 'userId',
                    posisi: 'kiri'
                },
                {
                    label: 'Name',
                    value: 'namaIndividu',
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
                    label: 'Email Verified',
                    value: 'emailIsVerified',
                    posisi: 'kiri'
                },
                {
                    label: 'Account Verified',
                    value: 'accountIsVerified',
                    posisi: 'kiri'
                },
                {
                    label: 'Sign Up Address',
                    value: 'signupIpAddress',
                    posisi: 'kiri'
                },
                {
                    label: 'Organization',
                    value: 'myOrganizations',
                    posisi: 'kanan'
                },
                {
                    label: 'Email',
                    value: 'email',
                    posisi: 'kanan'
                },
                {
                    label: 'Phone',
                    value: 'telepon',
                    posisi: 'kanan'
                },
                {
                    label: 'Institution',
                    value: 'institusi',
                    posisi: 'kanan'
                },
                {
                    label: 'Profession',
                    value: 'pekerjaan',
                    posisi: 'kanan'
                },
                {
                    label: 'Gender',
                    value: 'gender',
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
            return this.$t('Verifikasi Individu')
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

            await this.$apiPlatform.get('verificator/user/'+this.id+'/').then(res => {
                // console.log(res.data)
                const data = res.data

                this.dataDetail = data

                this.dataMyOrganisasi = data.individu[0].myOrganizations.map(e => {
                    const data = {
                        id: e.pkJoinedOrganizationId,
                        organisasiId: e.organisasiId,
                        namaOrganisasi: e.namaOrganisasi
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

            await this.$apiPlatform.post('verificator/user/', data).then(res => {
                console.log('Accept Verification User')
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

            await this.$apiPlatform.post('verificator/user/', data).then(res => {
                console.log('Reject Verification User')
                this.btnBack()
            }).catch(err => {
                console.log(err)
            })
        },

        btnBack() {
            this.$router.push('/verifications/individu/user-list')
        },

        toggleDrop() {
            this.flagDrop = !this.flagDrop
        },

        closeDrop() {
            this.flagDrop = false
        },

        btnRejectIndividu() {
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