<template>
    <div>
        <div class="mb-10">
            <div class="flex justify-between">
                <div class="text-xl">{{ $t('Milestone') }}</div>
                <button @click="btnTambahPencapaian" class="btn-tambah">{{ $t('Add Milestone') }}</button>
            </div>
        </div>
        <div>

            <ElementsTable
                :tableDetail="tableDetail"
                v-model="dataTable"
                :headClass="'hidden'"
                :customClass="'table-vertical-top'"
                :key="'keytable'+keyTable"

            >
                <template v-slot:deskripsi="{item}">
                    <div class="text-md font-semibold mb-4 text-[#129555]">
                        {{ $dayjs(item.tanggal).format('DD MMMM YYYY') }}
                    </div>
                    <div class="mb-4 text-[#757575]">
                        <div class="text-sm">{{ $t('Bahasa Indonesia') }}</div>
                        <div class="text-[#616161] font-semibold" v-if="item.deskripsi && item.deskripsi[0]">
                            {{item.deskripsi[0]}}
                        </div>
                    </div>

                    <div class="mb-4 text-[#757575]">
                        <div class="text-sm">{{ $t('English') }}</div>
                        <div class="text-[#616161] font-semibold" v-if="item.deskripsi && item.deskripsi[1]">
                            {{item.deskripsi[1]}}
                        </div>
                    </div>

                </template>
                <template v-slot:actions="{item, index}">
                    <div class="w-full flex items-center justify-end gap-x-3">
                        <button title="Edit Milestone" @click="editItem(item,index)" class="button-edit w-[24px] h-[24px]"></button>
                        <button title="Delete Milestone" @click="deleteItem(item,index)" class="button-delete w-[24px] h-[24px]"></button>
                    </div>
                </template>
            </ElementsTable>

        </div>
        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'tambahpartner'"
            :persistent="persistent"
        >
            <div class="p-6">
                        <div class="mb-5">
                            <InputDate 
                                v-model="form.tanggal"
                                :label="$t('Date')"
                                :name="prefixName+'edittanggal'"
                            />
                            <small class=" text-warna-lima">{{ $t('Jika tidak mengetahui tanggal spesifik, silahkan pilih rentang tanggal terdekat') }}</small>
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="form.deskripsi[1]"
                                :name="prefixName+'editdesken'"
                                :label="'English Description'"
                                :max="195"
                                :counter="true"
                            />
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="form.deskripsi[0]"
                                placeholder="Maks 195 Karakter"
                                :name="prefixName+'editdeskid'"
                                :label="'Deskripsi (Bahasa)'"
                                :max="195"
                                :counter="true"

                            />
                        </div>
                        <div class="flex justify-end">
                            <button @click="simpan" class="button-standar">{{ $t(btnText) }}</button>
                        </div>
                    </div>
        </ElementsModal>
    <!-- <pre>{{ dataTable }}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            tablePencapaian: null,
            prefixName: 'parjalanan',
            formMode: 'post',

            // KEPERLUAN MODAL TAMBAH PARTNER //
            modalAction: false,
            // modalTitle: 'Tambah Pencapaian',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //

            form: {
                tanggal: '',
                deskripsi: ['', '']
            },
            dataTable: [],
            keyTable: 0,
        }
    },    
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
        },
        btnText() {
            return this.formMode === 'post' ? 'Tambah' : 'Sunting'
        },
        modalTitle() {
            return this.formMode === 'post' ? this.$t('Add Milestone') : this.$t('Edit Milestone')
        },
        tableDetail() {
           return [
                {
                    header: '',
                    itemValue: this.$t('deskripsi'),
                    type: 'string',
                },
                {
                    header: '',
                    itemValue: 'actions',
                    itemClass: 'w-3/12'
                }
            ]
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
            this.dataTable = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataTable =  _.map(res.data.milestoneOrganisasi.sort((a, b)=> new Date(a.tanggal)-new Date(b.tanggal)), function(o){
                if (o){
                    return {
                        id: o.pkMilestoneId,
                        tanggal: o.tanggal,
                        deskripsi: o.deskripsi,
                        sorter: o.sorter
                }}})
                // const parseSort = _.orderBy(res.data.milestoneOrganisasi, 'tanggal')
                // this.dataTable = parseSort.map((o,index) => {
                //     const data = {
                //         id: o.pkMilestoneId,
                //         tanggal: o.tanggal,
                //         deskripsi: o.deskripsi,
                //         sorter: o.sorter ? o.sorter : index
                //     }
                //     return data;
                // });
                // this.datatable = _.orderBy(this.dataTable, 'sorter')
            }).catch(err => {
                console.log(err)
            })
        },

        
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data
                this.$toast.show(data.message)
                // this.message = data.message
                // alert(this.message)
                this.modalAction = false
                this.keyModal += 1

                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },
        tambahPencapaian() {
            this.form.tanggal = new Date(this.form.tanggal)
            this.updateData({"milestoneOrganisasi":this.form})

        },
        editItem(item) {
            this.formMode = 'put'
            this.form = item
            this.modalAction = true
            this.keyModal +=1
            // data.tanggal = new Date(data.tanggal)
            // this.updateData({"updateMilestone":data})
        },

        deleteItem(item) {
            this.$modal.show({
                type: 'warning',
                title: this.$t("Deletion Notification"),
                body: this.$t('konfirmasiDeleteMilestone'),
                primary: {
                    label: 'OK',
                    theme: 'red',
                    action: () => this.updateData({"deleteMilestone":item.id})
                }
            })
        },

        simpan() {
            if (this.form.tanggal === '') {
                this.$toast.show(this.$t('tanggalBlank'))
            } else {
                if (this.formMode === 'post') {
                    this.tambahPencapaian()
                } else {
                    this.editPencapaian(this.form)
                }
            }
        },

        editPencapaian(data) {
            data.tanggal = new Date(data.tanggal)
            this.updateData({"updateMilestone":data})
        },

        // hapusPencapaian(data) {
        //     if (confirm('hapus pencapaian '+ data.tanggal+' ?')) {
        //         this.updateData({"deleteMilestone":data.id})
        //     }
        // },
        btnTambahPencapaian() {
            this.formMode = 'post'
            this.form = {
                tanggal: '',
                deskripsi: ['', '']
            }
            this.modalAction = true
            this.keyModal += 1
        }
    },
}
</script>