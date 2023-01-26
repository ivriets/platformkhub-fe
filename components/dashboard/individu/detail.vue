<template>
    <div class="py-[80px]">
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <!-- <ElementsDisplayStatusSubmissionOval :submission="dataDetail.statusVerification" /> -->
            <div class="flex items-center justify-between mb-6">
                <ElementsDisplayStatusVerifikasiOval 
                    :status="dataDetail.statusVerification.id"
                />
                <!-- BENDERA -->
                <ElementsDisplayFlag 
                    v-model="selectedFlag"
                />
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
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt', 'updatedAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }} WIB
                                    </div>
                                    <div v-else-if="['emailIsVerified', 'accountIsVerified'].includes(item1.value)">
                                        {{ dataDetail[item1.value] === true ? 'Yes' : 'No' }}
                                    </div>
                                    <div v-else-if="['namaIndividu', 'userId'].includes(item1.value)">
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
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
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
            <div class="text-xl font-bold text-warna-utama">{{ $t('About Me') }}</div>
            <hr class="border-warna-tujuh my-5">
            <div class="text-sm text-warna-delapan display-deskripsi" v-html="dataDetail.individu[0].tentangSaya"></div>
        </div>
        <!-- <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div v-if="dataDetail.statusVerification.id === 1" class="flex gap-x-6  font-semibold">
                    <div @click="btnRejectIndividu" class="px-8 py-2 bg-warna-rejected rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</div>
                    <div @click="btnAccept" class="px-8 py-2 bg-warna-approved-accepted rounded-lg text-white cursor-pointer hover:bg-green-700">Accept</div>
                </div>
            </div>
        </div> -->
        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between ">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <div class="flex items-center gap-5">
                    <button 
                        @click="actionButton(5)"
                        v-if="[3,4].includes(dataDetail.statusVerification.id)" 
                        class="button-standar-polos bg-[#9E9E9E] text-white">Delete</button>
                    <button 
                        @click="actionButton(4)"
                        v-if="[3,4].includes(dataDetail.statusVerification.id)" 
                        class="button-standar-polos bg-[#1976D2] text-white">Suspend</button>
                    <button 
                        @click="actionButton(2)"
                        v-if="[1].includes(dataDetail.statusVerification.id)" 
                        class="button-standar-polos bg-[#D10D0D] text-white">Reject</button>
                    <button 
                        @click="actionButton(3)"
                        v-if="[4,1].includes(dataDetail.statusVerification.id)" 
                        class="button-standar-polos bg-[#129555] text-white">Accept</button>
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
                <!-- <div class="grid grid-cols-12 gap-x-5 gap-y-3 mb-4">
                    <div class="col-span-12 md:col-span-3">
                        <div class="text-sm text-warna-delapan font-semibold">User ID</div>
                    </div>
                    <div class="col-span-12 md:col-span-9">
                        <div class="text-sm text-warna-sembilan font-semibold">{{dataDetail.individu[0].userId}}</div>
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
                            :name="'alasanreject'"
                        />
                    </div>
                </div> -->
                    <div class="mb-8">
                        <InputTextArea 
                            v-model="form.alasanRejectOrSuspend"
                            :max="500"
                            :name="'alasanreject'"
                        />
                    </div>

                <div class="flex items-center justify-end">
                    <button @click="btnModalBatal" class="button-standar-polos bg-white text-444">Batal</button>
                    <button @click="btnReject" class="button-standar">OK</button>
                </div>
            </div>
        </ElementsModal>
        <!-- <pre>{{dataDetail}}</pre> -->
    </div>
</template>

<script>
// import detailIndividu from '~/static/data/detailindividu.json';

export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 0,
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
            selectedVerificationId: null
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
            this.selectedVerificationId =null
            this.masterPoint()
        },

        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('verificator/accounts/'+this.id+'/').then(res => {
                
                const data = res.data.results
                console.log(data)
                this.dataDetail = data
                // this.dataMyOrganisasi = data.individu[0].myOrganizations.map(e => {
                //     const data = {
                //         id: e.pkJoinedOrganizationId,
                //         organisasiId: e.organisasiId,
                //         namaOrganisasi: e.namaOrganisasi
                //     }
                //     return data
                // })
                this.loaderDetail = true
                // this.$nextTick(() => {
                //     this.loaderDetail = true
                // })

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
        actionButton(verifikasiId) {
            this.selectedVerificationId = verifikasiId
        // <div v-if="status === 1" :class="status === 1 ? 'text-need-verification' : '' ">Need Verification</div>
        // <div v-else-if="status === 2" :class="status === 2 ? 'text-rejected' : '' ">Rejected</div>
        // <div v-else-if="status === 3" :class="status === 3 ? 'text-approved-accepted' : '' ">Accepted</div>
        // <div v-else-if="status === 4" :class="status === 4 ? 'text-suspended' : '' ">Suspended</div>

            if ([2,4].includes(verifikasiId)) {
                this.applyRejectOrSuspend(); 
            } else {
                this.$modal.show({
                    type: 'warning',
                    title: this.$t('Status Verifications Notification'),
                    body: this.$t('notif-verifikasi-'+verifikasiId),
                    primary: {
                        label: 'OK',
                        theme: 'green',
                        action: () => this.applyActions(verifikasiId),
                    },
                    secondary: {
                        label: this.$t('Cancel'),
                        theme: 'white',
                        action: () => {}
                    }
                })
            }
        },
        async applyActions(verifikasiId) {
            const data = {
                accountId: this.id,
                statusVerification: verifikasiId
            }

            await this.$apiPlatform.post('verificator/user/', data).then(res => {
                // console.log('Accept Verification User')
                this.$toast.show('Individu ' + this.$t('updateSukses'))
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        applyRejectOrSuspend() {
            this.form.alasanRejectOrSuspend = ''
            this.modalTitle = this.$t('Reject or Suspend reason')
            this.modalAction = true
            this.keyModal += 1
        },
        async btnReject() {

            const data = {
                accountId: this.id,
                statusVerification: this.selectedVerificationId,
                alasanRejectOrSuspend: this.form.alasanRejectOrSuspend
            }

            await this.$apiPlatform.post('verificator/user/', data).then(res => {
                console.log('Reject Verification User')
                this.$toast.show('Individu ' + this.$t('updateSukses'))
                this.modalAction = false
                this.keyModal += 1

                this.initialize()
                // this.btnBack()
            }).catch(err => {
                console.log(err)
            })
        },
        // async btnAccept() {

        //     const data = {
        //         accountId: this.id,
        //         statusVerification: 3
        //     }

        //     await this.$apiPlatform.post('verificator/user/', data).then(res => {
        //         console.log('Accept Verification User')
        //         this.btnBack()
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },


    },
}
</script>