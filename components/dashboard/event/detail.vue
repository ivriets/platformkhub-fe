<template>
     <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Events'"
                :linkParent="'/moderations/event'"
                :child="childBreadcrumb"
            />
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10 min-w-min">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <div class="font-medium mb-4">{{ selectedFlag === 'indonesia' ? dataDetail.judulActivity[0] : dataDetail.judulActivity[1] }}</div>
                    <div v-if="dataDetail.submission === 1" class="py-2 w-[150px] text-center bg-warna-under-review rounded-3xl text-white ">Under Review</div>
                    <div v-if="dataDetail.submission === 3" class="py-2 w-[150px] text-center bg-warna-need-revision rounded-3xl text-white ">Need Revision</div>
                    <div v-if="dataDetail.submission === 4" class="py-2 w-[150px] text-center bg-warna-approved-accepted rounded-3xl text-white ">Approved</div>
                    <div v-if="dataDetail.submission === 2" class="py-2 w-[150px] text-center bg-warna-draft rounded-3xl text-white ">Draft</div>
                </div>
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
                    <div class="w-full bg-white shadow-md border border-gray-50 rounded-xl ">
                        <img src="/images/logo.png" alt="main-image">
                        <div class="mt-4 mb-4 text-center text-warna-sembilan">Thumbnail</div>
                    </div>
                    <div class="mt-10 w-full bg-white shadow-md border border-gray-50 rounded-xl ">
                        <img src="/images/logo.png" alt="main-image">
                        <div class="mt-4 mb-4 text-center text-warna-sembilan">Main Image</div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">Audience Type</div>
                    <div class="text-sm text-warna-sembilan font-semibold">
                        <div v-if="dataDetail.typeAudience.length == 0">-</div>
                        <div v-else>
                            <div v-for="(item, index) in dataDetail.typeAudience" :key="'tipeaudience' + index" class="text-warna-sembilan inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.typeAudience.length">, </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">Approach</div>
                    <div class="text-sm text-warna-sembilan font-semibold">
                        <div v-if="dataDetail.typeApproach.length == 0">-</div>
                        <div v-else>
                            <div v-for="(item, index) in dataDetail.typeApproach" :key="'tipeaudience' + index" class="text-warna-sembilan inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.typeApproach.length">, </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">Issues</div>
                    <div class="text-sm text-warna-sembilan font-semibold">
                        <div v-if="dataDetail.typeIssues.length == 0">-</div>
                        <div v-else>
                            <div v-for="(item, index) in dataDetail.typeIssues" :key="'tipeaudience' + index" class="text-warna-sembilan inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.nama[0] : item.nama[1] }}</span><span v-if="index+1 < dataDetail.typeIssues.length">, </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">Tag</div>
                    <div class="text-sm text-warna-sembilan font-semibold">
                        <div v-if="dataDetail.tag.length == 0">-</div>
                        <div v-else>
                            <div v-for="(item, index) in dataDetail.tag" :key="'tag' + index" class="text-warna-sembilan inline-block mr-1">
                                <span>{{ selectedFlag === 'indonesia' ? item.pilihanTagId.nama[0] : item.pilihanTagId.nama[1] }}</span><span v-if="index+1 < dataDetail.tag.length">, </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">Moderation Note</div>
                    <div class="text-sm text-warna-sembilan font-semibold">
                        <div class="mb-4">{{ dataDetail.catatanModerasi }}</div>
                    </div>

                </div>
                <div v-if="dataDetail" class="col-span-12 lg:col-span-8">
                    <ElementsFotoNama 
                        :logo="basePath+dataDetail.myOrganisasi.imgLogoOrganisasi"
                        :label="dataDetail.myOrganisasi.namaOrganisasi"
                    />
                    <hr class="border-warna-tujuh my-5">
                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'datalabel' + index1" v-show="item1.posisi==='kiri'" class="grid grid-cols-12 mb-4 break-words gap-1">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt', 'updatedAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY hh:mm A') }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'dL' + index1" v-show="item1.posisi==='kanan'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ item1.label }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['statusActivity'].includes(item1.value)" class="">
                                        {{selectedFlag === 'indonesia' ? dataDetail[item1.value].nama[0] : dataDetail[item1.value].nama[1]}}
                                    </div>
                                    <div v-else-if="['typeVisibility'].includes(item1.value)" class="">
                                        {{selectedFlag === 'indonesia' ? dataDetail[item1.value].nama[0] : dataDetail[item1.value].nama[1]}}
                                    </div>
                                    
                                    <div v-else-if="['start', 'end'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY hh:mm A') }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">About</div>
                        <div class="col-span-12 md:col-span-10 lg:col-span-10 p-3 bg-warna-body text-sm text-warna-sembilan font-normal">
                            <!-- <div class="">{{ selectedFlag === 'indonesia' ? dataDetail.deskripsiPanjang[0] : dataDetail.deskripsiPanjang[1] }}</div> -->
                        </div>
                    </div>
                        
                    <hr class="border-warna-tujuh mb-5">
                    
                     <div class="mb-5">

                        <div class="text-warna-sembilan font-semibold mb-[16px]">Gallery</div>
                        <div class="flex items-center lg:gap-4 gap-2">
                            <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                                <img class="h-16" src="/images/logo.png" alt="main-image">
                            </div>
                            <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                                <img class="h-16" src="/images/logo.png" alt="main-image">
                            </div>
                            <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                                <img class="h-16" src="/images/logo.png" alt="main-image">
                            </div>
                            <div class="bg-white shadow-md border border-gray-50 rounded-xl">
                                <img class="h-16" src="/images/logo.png" alt="main-image">
                            </div>
                        </div>

                    </div>
                    
                    <hr class="border-warna-tujuh mb-5">

                    <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Participant</div>

                            

                    </div>
                    
                     <hr class="border-warna-tujuh mb-5">

                </div>
            </div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="flex gap-x-6  font-semibold">
                    <div @click="btnEdit" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Edit</div>
                    <div v-if="[1, 3, 4].includes(dataDetail.submission)" class="px-8 py-2 bg-warna-need-revision rounded-lg text-white border border-need-revision cursor-pointer hover:bg-orange-700 font-semibold">Need Revision</div>
                    <div v-if="[1, 3].includes(dataDetail.submission)" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white border border-approved-accepted cursor-pointer hover:bg-green-700 font-semibold">Approve</div>
                </div>
            </div>
        </div>
        <!-- <pre>{{buttonSubmission}}</pre> -->
    </div>
</template>


<script>
import detailEvent from '~/static/data/detailevent.json';

export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 'indonesia',
            dataDetail: null,
            color: '',
            childBreadcrumb: [],
            buttonSubmission: null,
            opsiButton: [
                {
                    id: 1,
                    label: 'Under Review'
                },
                {
                    id: 2,
                    label: 'Draft'
                },
                {
                    id: 3,
                    label: 'Need Revision'
                },
                {
                    id: 4,
                    label: 'Approved'
                }
            ],
            dataLabel: [
                {
                    label: 'Event ID',
                    value: 'eventId',
                    posisi: 'kiri'
                },
                {
                    label: 'Created At',
                    value: 'createdAt',
                    posisi: 'kiri'
                },
                {
                    label: 'Updated At',
                    value: 'updatedAt',
                    posisi: 'kiri'
                },
                {
                    label: 'Moderator',
                    value: 'moderator',
                    posisi: 'kiri'
                },
                {
                    label: 'Participant',
                    value: 'participant',
                    posisi: 'kiri'
                },
                {
                    label: 'Registration',
                    value: 'registration',
                    posisi: 'kiri'
                },
                {
                    label: 'Activity',
                    value: 'statusActivity',
                    posisi: 'kanan'
                },
                {
                    label: 'Visibility',
                    value: 'typeVisibility',
                    posisi: 'kanan'
                },
                {
                    label: 'Start',
                    value: 'start',
                    posisi: 'kanan'
                },
                {
                    label: 'End',
                    value: 'end',
                    posisi: 'kanan'
                },
                {
                    label: 'Location',
                    value: 'lokasi',
                    posisi: 'kanan'
                },
            ],
            dataDetail: null,
            gallery: [],
            milestone: []
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
            return this.$t('Acara')
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
        },
        buttonSubmission() {
            if (this.buttonSubmission === 1) {
                this.color = 'bg-warna-under-review'
            } else if (this.buttonSubmission === 2) {
                this.color = 'bg-warna-draft'
            } else if (this.buttonSubmission === 3) {
                this.color = 'bg-warna-need-revision'
            } else {
                this.color = 'bg-warna-approved-accepted'
            }
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
            this.setBreadcrumb()
        },

        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('moderator/events/'+this.id+'/').then(res => {
                // console.log(res.data)
                const data = res.data

                this.dataDetail = data
                this.buttonSubmission = data.submission

                this.$nextTick(() => {
                    this.loaderDetail = true
                })
            }).catch(err => {
                console.log(err)
            })
        },


        btnBack() {
            this.$router.push('/moderations/event')
        },

        btnEdit() {
            this.$router.push('/moderations/event/'+this.id+'/edit')
        },

        toggleDrop() {
            this.flagDrop = !this.flagDrop
        },

        closeDrop() {
            this.flagDrop = false
        },

        pilihIndonesia() {
            this.selectedFlag = 'indonesia'
            this.closeDrop()
        },

        pilihInggris() {
            this.selectedFlag = 'inggris'
            this.closeDrop()
        },

         setBreadcrumb() {
            this.childBreadcrumb = [
                {
                    label: 'Detail',
                    link: ''
                }
            ]
        }

    },
}
</script>