<template>
    <div class="my-[48px]  " >
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Events'"
                :linkParent="'/moderations/event'"
                :child="childBreadcrumb"
            />
        </div>
        <div v-if="loaderDetail" class="main-area px-5 py-10 text-sm rounded-md overflow-hidden shadow bg-white">
            <div class="flex justify-end my-5">
                <button v-if="participant.length > 0" :disabled="btnText==='Download Data' ? false : true" @click="downloadExcel" class="button-standar flex items-center gap-2">
                    <img src="/icons/icon-button-download.png" />
                    {{ $t(btnText) }}
                </button>
                <ElementsExcel 
                    :jsonData="participantExcel"
                    :fileName="finalName"
                    v-if="startExcel"
                />
            </div>
            <div class="text-444">
                <ElementsTable 
                        v-model="participantPage"
                        :tableDetail="tableDetail"
                        :headClass="'hidden'"
                        :startIndex="paginasi.startIndex"

                    >
                    <template v-slot:gender="{ item }">
                        {{item.gender.nama[bahasa]}}
                    </template>
                    <template v-slot:disabled="{ item }">
                        <span v-if="item.disabled.id===0">Able-Bodied</span>
                        <span v-else-if="item.disabled.id===1">Disabled</span>
                        <span v-else></span>
                    </template>
                </ElementsTable>
            </div>
            <div  class="pagination-area text-center mt-6">
                <ElementsPaginasiSpa 
                    v-model="paginasi.currentPage"
                    :totalPage="paginasi.totalPage"
                    :totalVisible="7"
                    :loaderPage="!loaderDetail"
                    :key="'pageset'+paginasi.key"
                />
            </div>

            <div v-if="participant.length ===0" class="bg-gray-200 p-5">Tidak Ada data</div>
        </div>




    </div>
</template>
<script>
export default {
    data() {
        return {
            btnText: 'Download Data',
            startExcel: false,
            loaderDetail: false,
            finalName: 'Participant',
            participantExcel: [],
            dataDetail: null,
            participant: [],
            participantPage: [],
            paginasi: {
                startIndex: 0,
                limit: 12,
                offset: 0,
                currentPage: 1,
                totalPage:50,
                start: 0,
                end: 12
            },
            tableDetail: [
                {
                    header: 'No',
                    itemValue: 'index',
                    type: 'index',
                    itemClass: 'w-10'
                },
                {
                    header: 'ID',
                    itemValue: 'regId',
                },
                {
                    header: 'Nama',
                    itemValue: 'nama'
                },
                {
                    header: 'Email',
                    itemValue: 'email'
                },
                {
                    header: 'Phone',
                    itemValue: 'phone'
                },
                {
                    header: 'Gender',
                    itemValue: 'gender'
                },
                {
                    header: 'Disabled',
                    itemValue: 'disabled'
                }
            ]
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },

        childBreadcrumb() {
            return [
                {
                    label: 'Detail',
                    link: '/moderations/event/' + this.$route.params.id
                },
                {
                    label: 'Participant',
                    link: ''
                }
            ]
        }

    },
    watch: {
        'paginasi.currentPage'(val) {
            this.runPaginasi()
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loaderDetail = false;
            this.startExcel = false;
            this.masterPoint()
        },
        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('moderator/events/'+this.id+'/').then(res => {
                const data = res.data
                this.dataDetail = data;

                const dataActivity = data.activityOrganizing ? data.activityOrganizing : null;

                if (dataActivity) {
                    const listing = dataActivity.map(e => {
                        const external = e.activityParticipantEksternal.map(x => {
                            const datax = {
                                regId: x.nomorTiket ? x.nomorTiket : 'N/A',
                                nama: x.nama ? x.nama : 'N/A',
                                email: x.email ? x.email : 'N/A',
                                phone: x.telepon ? x.telepon : 'N/A',
                                gender: x.typeGender ? x.typeGender : {id:3, nama: ['N/A', 'N/A']},
                                disabled: x.typeDifable ? x.typeDifable : {id:3, nama: ['N/A', 'N/A']}
                            }
                            return datax;
                        });
                        const internal = e.activityParticipantInternal.map(x => {
                            const datax = {
                                regId: x.nomorTiket ? x.nomorTiket : '',
                                nama: x.userId.namaIndividu ? x.userId.namaIndividu : '',
                                email: x.userId.email ? x.userId.email : '',
                                phone: x.userId.telepon ? x.userId.email: '',
                                gender: x.userId.typeGender ? x.userId.typeGender : {id:3, nama: ['', '']},
                                disabled: x.userId.typeDifable ? x.userId.typeDifable : {id:3, nama: ['', '']}
                            }
                            return datax;
                        })

                        return external.concat(internal);
                    })
                    const gabung = _.flatten(listing)
                    this.participant = _.orderBy(gabung, 'regId');



                }

                this.$nextTick(() => {
                    this.runPaginasi()
                    this.loaderDetail = true
                })
            }).catch(err => {
                console.log(err)
            })
        },
        runPaginasi() {

            // this.paginasi.totalPage = this.participant.length
            // this.paginasi.startIndex = (this.paginasi.currentPage - 1 ) * this.paginasi.limit
            // const end =  this.paginasi.limit * this.paginasi.currentPage
            // this.participantPage = this.participant.slice(this.paginasi.offset, end)
            this.paginasi.totalPage = Math.ceil(this.participant.length / this.paginasi.limit)
            this.paginasi.start = (this.paginasi.currentPage - 1) * this.paginasi.limit
            this.paginasi.end = this.paginasi.start + this.paginasi.limit
            this.paginasi.startIndex = this.paginasi.start

            this.participantPage = this.participant.slice(this.paginasi.start, this.paginasi.end)

        },
        downloadExcel() {
            this.btnText = 'Downloading'
            this.participantExcel = this.participant.map(e => {
                var dis = ''
                if (e.disabled.id === 0) {
                    dis = 'Able-Bodied'
                } else if (e.disabled.id === 1) {
                    dis = 'Disabled'
                } else {
                    dis = ''
                }
                const data = {
                    'Reg ID': e.regId,
                    [this.$t('Name')]: e.nama,
                    [this.$t('Email')]: e.email,
                    [this.$t('Phone')]: e.phone,
                    [this.$t('Gender')]: e.gender.nama[this.bahasa],
                    'Disabled': dis
                }
                return data;
            });
            this.finalName = this.$t('Participant') + ' - ' + this.dataDetail.judulActivity[this.bahasa] + ' - ' + this.$i18n.locale
            setTimeout(() => {
                this.startExcel = true;
                setTimeout(() => {
                    this.startExcel = false
                    this.btnText = 'Download Data'
                }, 1500)
            }, 1500)
        }
    }
}
</script>