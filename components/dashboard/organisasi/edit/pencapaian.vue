<template>
    <div>
        <div class="mb-10">
            <div class="flex justify-between">
                <div class="text-xl">Pencapaian</div>
                <div @click="btnTambahPencapaian" class="font-medium cursor-pointer underline text-warna-empat">+ Tambah Pencapaian</div>
            </div>
        </div>
        <div>
            <ElementsTableWithoutHeader 
                v-model="tablePencapaian"
                :dataTable="dataTable"
                :title="'Pencapaian'"
                :untuk="'milestoneorganisasi'"
            >
                <template v-slot:edit >
                    <div class="p-6">
                        <div class="mb-5">
                            <InputDate 
                                v-model="tablePencapaian.tanggal"
                                :label="'Tanggal'"
                                :name="prefixName+'edittanggal'"
                                :placeholder="'Pilih'"
                            />
                            <div class="text-sm text-warna-lima mt-1">Jika tidak mengetahui tanggal spesifik, silahkan pilih rentang tanggal terdekat</div>
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="tablePencapaian.deskripsi[1]"
                                placeholder="Maks 195 Karakter"
                                :name="prefixName+'editdesken'"
                                :label="'English Description'"
                            />
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="tablePencapaian.deskripsi[0]"
                                placeholder="Maks 195 Karakter"
                                :name="prefixName+'editdeskid'"
                                :label="'Deskripsi (Bahasa)'"
                            />
                        </div>
                        <div class="flex justify-between">
                            <div @click="hapusPencapaian(tablePencapaian)" class="px-[28px] py-2 bg-red-900 rounded-lg text-white cursor-pointer hover:bg-red-600 font-semibold">Hapus</div>
                            <div @click="editPencapaian(tablePencapaian)" class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
                        </div>
                    </div>
                </template>
            </ElementsTableWithoutHeader>
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
                                :label="'Tanggal'"
                                :name="prefixName+'edittanggal'"
                                :placeholder="'Pilih'"
                            />
                            <div class="text-sm text-warna-lima mt-1">Jika tidak mengetahui tanggal spesifik, silahkan pilih rentang tanggal terdekat</div>
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="form.deskripsi[1]"
                                placeholder="Maks 195 Karakter"
                                :name="prefixName+'editdesken'"
                                :label="'English Description'"
                            />
                        </div>
                        <div class="mb-5">
                            <InputText 
                                v-model="form.deskripsi[0]"
                                placeholder="Maks 195 Karakter"
                                :name="prefixName+'editdeskid'"
                                :label="'Deskripsi (Bahasa)'"
                            />
                        </div>
                        <div class="flex justify-end">
                            <div @click="tambahPencapaian" class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
                        </div>
                    </div>
        </ElementsModal>
    </div>
</template>


<script>
export default {
    data() {
        return {
            tablePencapaian: null,
            prefixName: 'parjalanan',

            // KEPERLUAN MODAL TAMBAH PARTNER //
            modalAction: false,
            modalTitle: 'Tambah Pencapaian',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //

            form: {
                tanggal: '',
                deskripsi: ['', '']
            },
            dataTable: []
        }
    },    
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
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
                        deskripsi: o.deskripsi
                }}})
            }).catch(err => {
                console.log(err)
            })
        },

        
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data
                this.message = data.message
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
        tambahPencapaian() {
            this.form.tanggal = new Date(this.form.tanggal)
            this.updateData({"milestoneOrganisasi":this.form})
            this.modalAction = false
            this.keyModal += 1
        },
        editPencapaian(data) {
            data.tanggal = new Date(data.tanggal)
            this.updateData({"updateMilestone":data})
        },
        hapusPencapaian(data) {
            if (confirm('hapus pencapaian '+ data.tanggal+' ?')) {
                this.updateData({"deleteMilestone":data.id})
            }
        },
        btnTambahPencapaian() {
            this.modalAction = true
            this.keyModal += 1
        }
    },
}
</script>