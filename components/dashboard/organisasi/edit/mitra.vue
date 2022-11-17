<template>
    <div>
        <div class="flex justify-between mb-[36px]">
            <div>
                <div class="text-warna-dua mb-2">Cari Mitra</div>
                <div class="flex">
                    <div class="w-[240px] mr-4">
                        <ElementsSearchBarResponsive 
                            v-model="filter.search"
                            :placeholder="'Search'"
                            :gaya="'icon'"
                            :name="'searchtext'"
                        />
                    </div>
                    <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                </div>
            </div>
            <div @click="btnTambahPartner" class="font-medium cursor-pointer underline text-warna-empat">+ Tambah Mitra</div>
        </div>
        <div>
            <ElementsTableStriped 
                :masterTable="masterTable"
                :dataTable="dataTable"
                :title="'Mitra'"
                v-model="tableMitra"
                :actions="actions"
            >
                <template v-slot:edit >
                    <div class="p-6">
                        <div class="mb-5">
                            <InputText 
                                v-model="tableMitra.namaOrganisasi"
                                placeholder="Tulis disini"
                                :name="prefixName+'editnamaorganisasi'"
                                :label="'Nama Partner'"
                            />
                        </div>
                        <div class="mb-5">
                            <div class="font-medium mb-1">Logo/Simbol/Foto</div>
                            <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                                <div class="text-xs text-[#BABABA] mb-2">
                                    <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                                </div>
                                <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
                        </div>
                    </div>
                </template>
            </ElementsTableStriped>
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
                    <InputText 
                        v-model="form.namaOrganisasi"
                        placeholder="Tulis disini"
                        :name="prefixName+'tambahnamaorganisasi'"
                        :label="'Nama Partner'"
                    />
                </div>
                <div class="mb-5">
                    <div class="font-medium mb-1">Logo/Simbol/Foto</div>
                    <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <div class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Tambah</div>
                </div>
            </div>
        </ElementsModal>
        <!-- <pre>{{tableMitra}}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            tableMitra: null,
            prefixName: 'partner',

            // KEPERLUAN MODAL TAMBAH PARTNER //
            modalAction: false,
            modalTitle: 'Tambah Mitra',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //

            form: {
                namaOrganisasi: '',
                logoOrganisasi: ''
            },
            actions: {
                status: true,
                button: {
                    edit: {
                        status: true,
                        tipe: 'modal',
                        path: ''
                    },
                    // path: this.fullUrl+'/edit'
                    delete: {
                        status: true,
                        tipe: 'modal',
                        path: ''
                    },
                    print: {
                        status: false,
                        tipe: 'page',
                        path: ''
                    }
                }
            },
            filter: {
                search: ''
            },
            masterTable: [
                {
                    header: 'Partner',
                    value: 'namaOrganisasi',
                    foto: 'image',
                    tipe: 'string',
                    display: true
                }
            ],
            dataTable: [
                {
                    id: '1',
                    namaOrganisasi: 'Peace Generation Indonesia',
                    image: '/images/profile.png'
                },
                {
                    id: '2',
                    namaOrganisasi: 'Wahid Foundation',
                    image: '/images/profile.png'
                },
                {
                    id: '3',
                    namaOrganisasi: 'Infia Consulting',
                    image: '/images/profile.png'
                },
                {
                    id: '4',
                    namaOrganisasi: 'Asosiasi Guru Pendidikan Agama Islam Indonesia',
                    image: '/images/profile.png'
                },
                {
                    id: '5',
                    namaOrganisasi: 'PUSAD Paramadina',
                    image: '/images/profile.png'
                },
                {
                    id: '6',
                    namaOrganisasi: 'Indonesia Social Justice Network',
                    image: '/images/profile.png'
                },
                {
                    id: '7',
                    namaOrganisasi: 'Kulavarga',
                    image: '/images/profile.png'
                },
                {
                    id: '8',
                    namaOrganisasi: 'Pusat Studi Budaya dan Perubahan Sosial',
                    image: '/images/profile.png'
                }
            ],
        }
    },
    methods: {
        btnTambahPartner() {
            this.modalAction = true
            this.keyModal += 1
        }
    },
}
</script>