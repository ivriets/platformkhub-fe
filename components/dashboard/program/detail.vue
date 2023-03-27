<template>
     <div class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Programs'"
                :linkParent="'/moderations/program'"
                :child="childBreadcrumb"
            />
        </div>
        <div  class="bg-white shadow-md rounded-xl py-8 px-6 mb-10 min-w-min">
            <div v-if="dataDetail" class="flex items-start justify-between mb-6">
                <div>
                    <div class="font-medium mb-4">{{ dataDetail.judulActivity[selectedFlag] }}</div>
                    <ElementsDisplayStatusSubmissionOval :submission="dataDetail.submission" />
                </div>
                <!-- BENDERA -->
                <ElementsDisplayFlag 
                    v-model="selectedFlag"
                />
            </div>
            <div v-if="dataDetail" class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-4">
                    <ElementsDisplayImageDetail 
                        :image="basePath+dataDetail.imgThumbnail"
                        :label="$t('Thumbnail')"
                    />
                    <ElementsDisplayImageDetail 
                        :image="basePath+dataDetail.imgMainImage"
                        :label="$t('Main Image')"
                    />
                    
                    <div class="grid grid-cols-12 gap-5">
                        <div class="col-span-12 lg:col-span-6">
                            <ElementsDisplayFieldBawah 
                                :title="$t('Officer')"
                                :content="dataDetail.officer.map(e => e.namaIndividu).join(', ')"
                            />
                        </div>

                        <div class="col-span-12 lg:col-span-6">
                            <ElementsDisplayFieldBawah 
                                :title="$t('Partner')"
                                :content="dataDetail.partnerActivityEksternal.map(e => e.namaPartner[selectedFlag]).join(', ')"
                            />
                        </div>
                    </div>

                    <ElementsDisplayFieldBawah 
                        :title="$t('Audience Type')"
                        :content="dataDetail.typeAudience.map(e => e.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Approach')"
                        :content="dataDetail.typeApproach.map(e => e.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Issues')"
                        :content="dataDetail.typeIssues.map(e => e.nama[selectedFlag]).join(', ')"
                    />

                    <ElementsDisplayFieldBawah 
                        :title="$t('Tag')"
                        :content="dataDetail.tag.map(e => e.pilihanTagId.nama[selectedFlag]).join(', ')"
                    />

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
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt', 'updatedAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
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
                                        {{ dataDetail[item1.value].nama[selectedFlag] }}
                                    </div>
                                    <div v-else-if="['tanggalMulai', 'tanggalSelesai'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
                                    </div>
                                    
                                    <div v-else-if="['lokasi'].includes(item1.value) && dataDetail[item1.value].length > 0" class="">
                                        <div v-for="(i, index2) in dataDetail[item1.value]" :key="'lokasi' + index2">
                                            {{i.jalan}}, {{i.kota}}, {{i.provinsi}}
                                        </div>
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh mb-5">
                    <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">About</div>
                        <div class="text-warna-sembilan bg-warna-body text-sm font-normal rounded">
                            <ElementsDisplayDeskripsi 
                                :list="dataDetail.deskripsi"
                                :selectedFlag="selectedFlag"
                                v-if="dataDetail.deskripsi"
                            />
                        </div>
                    </div>
                        
                    <hr class="border-warna-tujuh mb-5">
                    <div class="">
                        <div class="text-warna-sembilan font-semibold mb-4">{{ $t('Gallery') }}</div>
                        <ElementsDisplayGallery 
                            :gallery="dataDetail.galleries"
                        />
                    </div>
                    
                    <hr class="border-warna-tujuh mb-5">

                    <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Beneficiaries</div>

                            <div v-if="dataDetail.activityResult.length > 0" class="grid grid-cols-12 gap-5">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="text-xs text-warna-delapan font-semibold mb-[16px]">Beneficiaries by Gender</div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Male</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].beneficiariesMen}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Female</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].beneficiariesWomen}}</div>
                                    </div>
                                </div>

                                <div class="col-span-12 lg:col-span-6">
                                    <div class="text-xs text-warna-delapan font-semibold mb-[16px]">Beneficiaries by Disability</div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Male</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].beneficiariesMenDifable}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Female</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].beneficiariesWomenDifable}}</div>
                                    </div>
                                </div>
                            </div>

                    </div>
                    
                     <hr class="border-warna-tujuh mb-5">

                     <div class="mb-5">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Retention</div>

                            <div v-if="dataDetail.activityResult.length > 0" class="grid grid-cols-12 gap-5">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="text-xs text-warna-delapan font-semibold mb-[16px]">Program Retention</div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Male</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].retentionSaatProgramMen}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Female</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].retentionSaatProgramWomen}}</div>
                                    </div>
                                </div>

                                <div class="col-span-12 lg:col-span-6">
                                    <div class="text-xs text-warna-delapan font-semibold mb-[16px]">Post-Program Retention</div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Male</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].retentionPascaProgramMen}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Female</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].retentionPascaProgramWomen}}</div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                    <hr class="border-warna-tujuh mb-5">

                     <div  v-if="dataDetail.activityResult && dataDetail.activityResult.length > 0" class="mb-8">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Satisfaction</div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-40 text-warna-delapan">Totally Satisfied</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].satisfactionSangatPuas}}</div>
                            </div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-40 text-warna-delapan">Satisfied</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].satisfactionPuas}}</div>
                            </div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-40 text-warna-delapan">Neutral</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].satisfactionNetral}}</div>
                            </div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-40 text-warna-delapan">Not Satisfied</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].satisfactionTidakPuas}}</div>
                            </div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-40 text-warna-delapan">Totally Unsatisfied</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].satisfactionSangatTidakPuas}}</div>
                            </div>
                    </div>

                    <hr class="border-warna-tujuh mb-5">

                    <div v-if="dataDetail.activityResult.length > 0" class="mb-8">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Customer</div>
                            <div class="mb-3 flex items-center font-semibold text-sm">
                                <div class="w-64 text-warna-delapan">Customer Acquisition Score</div>
                                <div class="text-warna-sembilan">{{dataDetail.activityResult[0].customerAcquisitionScore}}</div>
                            </div>
                    </div>
                    
                     <hr class="border-warna-tujuh mb-5">

                    <div v-if="dataDetail.activityResult.length > 0" class="mb-8">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Net Promotor Score</div>

                            <div class="grid grid-cols-12 gap-5 text-sm font-semibold">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 1</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore1}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 2</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore2}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 3</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore3}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 4</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore4}}</div>
                                    </div>
                                    <div class="text-sm font-semibold mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 5</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore5}}</div>
                                    </div>
                                </div>

                                <div class="col-span-12 lg:col-span-6">
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 6</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore6}}</div>
                                    </div>
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 7</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore7}}</div>
                                    </div>
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 8</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore8}}</div>
                                    </div>
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 9</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore9}}</div>
                                    </div>
                                    <div class="mb-3 flex items-center">
                                        <div class="w-24 text-warna-delapan">Score 10</div>
                                        <div class="text-warna-sembilan">{{dataDetail.activityResult[0].netPromotorScore10}}</div>
                                    </div>
                                </div>
                            </div>

                    </div>
                    
                     <hr class="border-warna-tujuh mb-5">

                     <div class="mb-8">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">Journey</div>
                        <div v-if="dataDetail.journey.length === 0">-</div>
                        <div v-else>
                            <DashboardProgramJourney 
                                v-if="dataDetail.journey.length > 0"
                                :journey="dataDetail.journey"
                                :selectedFlag="selectedFlag"
                            />
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <div class="flex gap-x-6  font-semibold">
                    <button 
                        @click="btnEdit" 
                        class="button-standar-outline">{{ $t('Edit') }}</button>
                    <button v-if="[1, 3, 4].includes(dataDetail.submission)" class="button-revision" @click="needRevision">Need Revision</button>
                    <button v-if="[1, 3].includes(dataDetail.submission)" class="button-approve" @click="approving">Approve</button>
                    <!-- <div class="relative">
                        <select id="btnneedrevision" name="buttonneedrevision" v-model="buttonSubmission"
                            class="cursor-pointer appearance-none w-[180px] focus:outline-none border border-warna-tujuh rounded-lg px-4 py-2 text-white" :class="color">
                                <option v-for="(i, index) in opsiButton" :key="'opsi'+index" :value="i.id">
                                    {{i.label}}
                                </option>
                        </select>
                        <div class="absolute top-0 right-0 h-full items-center flex px-2">                
                            <img src="/icons/icon-arrow-down-white.png" alt="arrow-down" class="w-4 h-4">
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <ElementsModal 
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+'revisiblog'"
            :persistent="true"
        >
            <div class="p-5">
                <InputTextArea 
                    v-model="form.catatanModerasi"
                    :max="500"
                    :name="'catatanmoderasi'"
                />
            </div>
            <template v-slot:footer >
                <div class="border-t px-3 py-4 ">
                    <button @click="btnRevisi" class="button-standar w-full">{{ $t('Save') }}</button>
                </div>
            </template>
        </ElementsModal>

    </div>
</template>


<script>

export default {
    data() {
        return {
            modal: {
                status: false,
                title: '',
                key: 0,
            },

            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 0,
            // childBreadcrumb: [],
            dataDetail: null,
            color: '',
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
            form: {
                catatanModerasi: ''
            },
            dataLabel: [
                {
                    label: 'Program ID',
                    value: 'programId',
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
            gallery: [],
            milestone: [],
            report: [],
            journey: [],
            btnText: {
                approve: 'Approve',
                needRevision: ''
            }
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
            return this.$t('Program')
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

        },


        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('moderator/programs/'+this.id+'/').then(res => {
                const data = res.data

                this.dataDetail = data
                this.form.catatanModerasi = data.catatanModerasi
                // this.dataDetail.deskripsi = _.orderBy(this.dataDetail.deskripsi, 'sorter')
                this.buttonSubmission = data.submission

                this.$nextTick(() => {
                    this.loaderDetail = true
                })
            }).catch(err => {
                console.log(err)
            })
        },
        needRevision() {
            this.modal.title = this.form.catatanModerasi ==='' || this.form.catatanModerasi === null ? this.$t('Revision Note') : this.$t('Change Note')
            this.modal.status = true
            this.modal.key += 1
        },
        async btnRevisi() {

            const data = {
                programId: this.id,
                submission: 3,
                catatanModerasi: this.form.catatanModerasi
            }
            await this.$apiPlatform.post('moderator/programs/', data).then(res => {
                // console.log('Revision Moderation Blog')
                // this.$t('Moderation')
                // this.btnBack()
                this.modal.status = false
                this.modal.key +=1
                this.$toast.show(this.dataDetail.judulActivity[this.bahasa] + ' Updated ')

                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        async approving() {
            const data = {
                programId: this.id,
                submission: 4,
                catatanModerasi: ''
            }
            await this.$apiPlatform.post('moderator/programs/', data).then(res => {
                // console.log('Revision Moderation Blog')
                // this.$t('Moderation')
                // this.btnBack()
                this.$toast.show(this.dataDetail.judulActivity[this.bahasa] + ' Approved ')

                this.modal.status = false
                this.modal.key +=1
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        btnBack() {
            this.$router.push('/moderations/program')
        },

        btnEdit() {
            this.$router.push('/moderations/program/'+this.id+'/edit')
        },





    },
}
</script>