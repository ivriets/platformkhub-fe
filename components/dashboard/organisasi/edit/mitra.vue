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
        <div v-if="dataTable">
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
                            <InputFileUpload 
                                :label="'Logo Partner'"
                                v-model="tableMitra.image"
                                :accept="'.png, .jpg, .jpeg'"
                                :value="tableMitra.image"
                                :multiple="false"
                                :maxSize="5"
                            />
                        </div>
                        <div class="flex justify-end">
                            <div @click="editPartner(tableMitra)" class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Simpan</div>
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
                    <div @click="tambahPartner" class="px-[28px] py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Tambah</div>
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
            dataTable: undefined,
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
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },
        isEmail(data) {
            var re = /\S+@\S+\.\S+/;
            return re.test(data);
        },

        async masterPoint() {
            this.dataTable = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataTable = _.map(res.data.partnerOrganisasiEksternal, function(o){
                    return {
                            id: o.pkPartnerEksternalId,
                            namaOrganisasi: o.namaPartner,
                            image: o.imgLogoPartner
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                this.message = data.message
                console.log(res.data)
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
        
        editPartner (data){
            this.updateData({"update_partner":{"id":data.id, "namaOrganisasi":data.namaOrganisasi}})
        },
        tambahPartner (){
            this.updateData({"partner":this.form.namaOrganisasi})
            this.modalAction = false
            this.keyModal += 1
        },
        btnTambahPartner() {
            this.modalAction = true
            this.keyModal += 1
        }
    },
}
</script>