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
                        <div class="flex justify-end">
                            <div class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
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
                            <div class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
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
            dataTable: [
                {
                    id: '1',
                    tanggal: '2020-05-01 03:59:51.968Z',
                    deskripsi: [
                        'Deskripsi milestone bahasa indonesia tahun 2020',
                        'Description of Indonesian milestones in 2020'
                    ]
                },
                {
                    id: '2',
                    tanggal: '2021-08-19 03:59:51.968Z',
                    deskripsi: [
                        'Deskripsi milestone bahasa indonesia tahun 2021',
                        'Description of Indonesian milestones in 2021'
                    ]
                },
                {
                    id: '3',
                    tanggal: '2022-02-12 03:59:51.968Z',
                    deskripsi: [
                        'Deskripsi milestone bahasa indonesia tahun 2022',
                        'Description of Indonesian milestones in 2022'
                    ]
                },
                {
                    id: '4',
                    tanggal: '2022-10-08 03:59:51.968Z',
                    deskripsi: [
                        'Deskripsi milestone bahasa indonesia tahun 2022',
                        'Description of Indonesian milestones in 2022'
                    ]
                }
            ]
        }
    },
    methods: {
        btnTambahPencapaian() {
            this.modalAction = true
            this.keyModal += 1
        }
    },
}
</script>