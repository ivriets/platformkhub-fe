<template>
     <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Events'"
                :linkParent="'/moderations/event'"
                :child="childBreadcrumb"
            />
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10 min-w-min">
            <div class="flex items-start justify-between mb-6">
                    <div class="font-medium mb-4">{{ dataDetail.judulActivity[selectedFlag] }}</div>
                    <ElementsDisplayStatusSubmissionOval :submission="dataDetail.submission" />
                <!-- BENDERA -->
                <ElementsDisplayFlag 
                    v-model="selectedFlag"
                />
            </div>
            <div v-if="dataDetail" class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-4">
                    <div class="w-full bg-white shadow-md border border-gray-50 rounded-xl ">
                        <img :src="basePath+dataDetail.imgThumbnail" alt="main-image">
                        <div class="mt-4 mb-4 text-center text-warna-sembilan font-semibold">{{ $t('Thumbnail') }}</div>
                    </div>
                    <div class="mt-10 w-full bg-white shadow-md border border-gray-50 rounded-xl mb-10">
                        <img :src="basePath+dataDetail.imgMainImage" alt="main-image">
                        <div class="mt-4 mb-4 text-center text-warna-sembilan font-semibold">{{ $t('Main Image') }}</div>
                    </div>

                    <div class="text-sm text-warna-sembilan font-semibold mb-5">
                            <div class="text-warna-delapan font-semibold">{{ $t('Audience Type') }}</div>
                            <div  v-if="dataDetail.typeAudience" class="text-warna-sembilan">
                                {{ dataDetail.typeAudience.map(e => e.nama[selectedFlag]).join(', ') }}
                            </div>
                    </div>

                    <div class="text-sm font-semibold mb-5">
                        <div class="text-warna-delapan">{{ $t('Approach') }}</div>
                        <div class="text-warna-sembilan" v-if="dataDetail.typeApproach">
                            {{ dataDetail.typeApproach.map(e => e.nama[selectedFlag]).join(', ') }}
                        </div>
                    </div>

                    <div class="text-sm font-semibold mb-5">
                        <div class="text-warna-delapan">{{ $t('Issue') }}</div>
                        <div class="text-warna-sembilan" v-if="dataDetail.typeIssues">
                            {{ dataDetail.typeIssues.map(e => e.nama[selectedFlag]).join(', ') }}
                        </div>
                    </div>

                    <div class="text-sm font-semibold mb-5">
                        <div class="text-warna-delapan">Tag</div>
                        <div class="text-warna-sembilan" v-if="dataDetail.tag">
                            {{ dataDetail.tag.map(e => e.pilihanTagId.nama[selectedFlag]).join(', ') }}
                        </div>
                    </div>

                    <div class="mt-5 text-sm text-warna-delapan font-semibold">{{ $t('Moderation Notes') }}</div>
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
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
                                    </div>
                                    <div v-else-if="item1.value==='url'">
                                        <span v-if="dataDetail.activityOrganizing && dataDetail.activityOrganizing[0].urlRegistrasiEksternal">{{dataDetail.activityOrganizing[0].urlRegistrasiEksternal}}</span>
                                    </div>
                                    <div v-else-if="item1.value==='registration'">
                                        <span v-if="dataDetail.registrationStartDate">
                                            {{ $dayjs(dataDetail.registrationStartDate).format('DD MMM YYYY') }}
                                        </span> - 
                                        <span v-if="dataDetail.registrationEndDate">
                                            {{ $dayjs(dataDetail.registrationEndDate).format('DD MMM YYYY') }} 
                                        </span>
                                    </div>
                                    <div v-else-if="item1.value==='participant'">
                                        <span v-if="dataDetail.activityOrganizing && dataDetail.activityOrganizing[0].participantSeat">{{dataDetail.activityOrganizing[0].participantSeat}}</span>

                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'dL' + index1" v-show="item1.posisi==='kanan'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['statusActivity'].includes(item1.value)" class="">
                                        {{dataDetail[item1.value].nama[0]}}
                                    </div>
                                    <!-- <div v-else-if="['typeVisibility'].includes(item1.value)" class="">
                                        {{selectedFlag === 'indonesia' ? dataDetail[item1.value].nama[0] : dataDetail[item1.value].nama[1]}}
                                    </div> -->
                                    
                                    <div v-else-if="['tanggalMulai', 'tanggalSelesai'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
                                    </div>

                                    <div v-else-if="item1.value==='lokasi'" class="font-semibold">
                                        <div class="mb-3" v-if="dataDetail.lokasi && dataDetail.lokasi.length > 0">
                                            <div  class="text-warna-delapan">{{ $t('Lokasi Offline') }}</div>
                                            <div class="text-warna-sembilan" >
                                                <div v-for="(i, index2) in dataDetail[item1.value]" :key="'lokasi' + index2">
                                                    {{i.jalan}}, {{i.kota}}, {{i.provinsi}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3" v-if="dataDetail.lokasiOnline && dataDetail.lokasiOnline.length > 0">
                                            <div  class="text-warna-delapan">{{ $t('Lokasi Online') }}</div>
                                            <div class="text-warna-sembilan" >
                                                <div v-for="(i, index2) in dataDetail[item1.value]" :key="'lokasi' + index2">
                                                    <!-- {{i.jalan}}, {{i.kota}}, {{i.provinsi}} -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-else>
                                        {{ dataDetail[item1.value]}}
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

                        <div class="text-warna-sembilan font-semibold mb-[16px]">{{ $t('Gallery') }}</div>
                        <ElementsDisplayGallery 
                            :gallery="dataDetail.galleries"
                        />

                    </div>
                    
                    <hr class="border-warna-tujuh mb-5">

                    <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">{{ $t('Participant') }}</div>
                        <NuxtLink :to="'/moderations/event/participant/'+id" class="button-outline text-md px-3 font-semibold py-2">{{ $t('View More') }}</NuxtLink>
                            

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
                    <div  @click="btnRevisi" v-if="[1, 3, 4].includes(dataDetail.submission)" class="px-8 py-2 bg-warna-need-revision rounded-lg text-white border border-need-revision cursor-pointer hover:bg-orange-700 font-semibold">Need Revision</div>
                    <div  @click="btnApprove" v-if="[1, 3].includes(dataDetail.submission)" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white border border-approved-accepted cursor-pointer hover:bg-green-700 font-semibold">Approve</div>
                </div>
            </div>
        </div>
        <pre>{{dataDetail}}</pre>
    </div>
</template>


<script>
import detailEvent from '~/static/data/detailevent.json';

export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 0,
            dataDetail: null,
            color: '',
            namaModerator: '',
            // childBreadcrumb: [],
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
                    label: 'URL',
                    value: 'url',
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
                // {
                //     label: 'Visibility',
                //     value: 'typeVisibility',
                //     posisi: 'kanan'
                // },
                {
                    label: 'Start',
                    value: 'tanggalMulai',
                    posisi: 'kanan'
                },
                {
                    label: 'End',
                    value: 'tanggalSelesai',
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
        },
        childBreadcrumb() {
            return [
                {
                    label: 'Detail',
                    link: ''
                }
            ]
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
            // this.setBreadcrumb()
        },

        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('moderator/events/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.buttonSubmission = data.submission
                // if (data.moderator) this.getNamaModerator(data.moderator)
                this.$nextTick(() => {
                    this.loaderDetail = true
                })
            }).catch(err => {
                console.log(err)
            })
        },
        async getNamaModerator(id) {
            await this.$apiPlatform.get('/verificator/organisasi/' + id + '/').then(res => {
                console.log(res.data)
            })
        },

        async btnApprove() {
            var data = {
                "submission": 4,
                "eventId": this.id
            }
            await this.$apiPlatform.post('moderator/events/', data).then(res => {                
                this.$nextTick(() => {
                    this.initialize()
                })
            }).catch(err => {
                console.log(err)
            })
        },
        async btnRevisi() {
            var data = {
                "submission": 3,
                "eventId": this.id,
                "catatanModerasi": "content memerlukan revisi"
            }
            await this.$apiPlatform.post('moderator/events/', data).then(res => {
                this.$nextTick(() => {
                    this.initialize()
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

        //  setBreadcrumb() {
        //     this.childBreadcrumb = [
        //         {
        //             label: 'Detail',
        //             link: ''
        //         }
        //     ]
        // }

    },
}
</script>