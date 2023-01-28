<template>
    <div>
            <div class="filter-area flex justify-between">
                <div class="w-full md:w-96 flex items-end gap-x-4 ">
                    <ElementsSearchBarButton 
                        v-model="filter.search"
                        :placeholder="$t('Nama Mitra')"
                        :gaya="'icon'"
                        :name="'searchtext'"
                        :label="$t('Cari Mitra')"
                    />
                </div>
                <button @click="tambahMitra" class="btn-tambah">{{ $t('Tambah Mitra') }}</button>
            </div>


            <div class="table-area text-sm">
                <ElementsTable
                    v-model="listingPage"
                    :tableDetail="tableDetail"
                >
                    <template v-slot:namaOrganisasi="{ item }">
                        <div class="w-full flex items-center gap-5">
                            <img :src="basePath+item.image" height="100" width="100" class="w-10 h-10 rounded-full overflow-hidden object-cover" />
                            <div class="fda"> {{item.namaOrganisasi}}</div>
                        </div>
                       
                    </template>
                    <template v-slot:actions="{ item }" >
                        <div class="w-full flex items-center justify-end gap-5">
                            <button @click="editItem(item)" class="button-table-edit w-10 h-10"></button>
                            <button @click="deleteItem(item)" class="button-table-delete w-10 h-10"></button>
                        </div>

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

        <ElementsModal
            v-model="modal.status"
            :title="modal.title"
            :persistent="true"
            :key="'dfaf'+modal.key"
            >
                    <div class="p-6">
                        <div class="mb-5">
                            <InputText 
                                v-model="form.namaOrganisasi"
                                :name="'nama'"
                                :label="'Nama Partner'"
                            />
                        </div>
                        <div class="mb-5">
                           
                            <div class="">
                                <InputImageUploadSingle 
                                    :label="'Logo/Simbol/Foto'"
                                    v-model="form.imgLogoPartner"
                                    :accept="'.png, .jpg, .jpeg'"
                                    :useCrop="true"
                                    :cropRatio="1"
                                    :previewClass="'w-1/2'"
                                    :useCircle="true"
                                    :maxSize="1"
                                />
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button @click="simpan" class="button-standar">{{ $t(btnText) }}</button>
                        </div>
                    </div>
            </ElementsModal>


    </div>
</template>
<script>
export default {
    data() {
        return {
            formMode: 'post',
            listing: [],
            listingPage: [],
            form: {
                namaOrganisasi: '',
                imgLogoPartner: {
                    displayImage: '',
                    file: null
                }
            },
            modal: {
                status: false,
                key: 0,
                title: ''
            },
            paginasi: {
                startIndex: 0,
                limit: 12,
                offset: 0,
                currentPage: 1,
                totalPage:3,
                start: 0,
                end: 12,
                key: 0
            },
            loaderDetail: false,
            filter: {
                search: ''
            }

        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        },
        btnText() {
            return this.formMode === 'post' ? 'Tambah' : 'Sunting'
        },

        tableDetail() {
            const tableDetail = [
                {
                    header: this.$t('Partner'),
                    itemValue: 'namaOrganisasi',
                },

                {
                    header: '',
                    itemValue: 'actions',
                    itemClass: 'text-right'
                }
            ]
            return tableDetail
        }

    },
    watch: {
        'paginasi.currentPage'(val) {
            this.runPaginasi()
        },
        'filter.search'(val) {
            // console.log(val)
            this.paginasi.currentPage = 1
            this.runPaginasi()
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loaderDetail = false
            this.paginasi.currentPage = 1
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.listing = _.map(res.data.partnerOrganisasiEksternal, function(o){
                    return {
                            id: o.pkPartnerEksternalId,
                            namaOrganisasi: o.namaPartner,
                            imgLogoPartner: {
                                displayImage: o.imgLogoPartner,
                                file: null
                            },
                            image:  o.imgLogoPartner,
                    }
                })
                this.$nextTick(() => {
                    this.runPaginasi()
                })
            }).catch(err => {
                console.log(err)
            })
        },
        runPaginasi() {
            const listing = this.listing.filter(e => e.namaOrganisasi.toLowerCase().includes(this.filter.search.toLowerCase()))
            // const listing = this.listing
            this.paginasi.totalPage = Math.ceil(listing.length / this.paginasi.limit)

            this.paginasi.start = (this.paginasi.currentPage - 1) * this.paginasi.limit
            this.paginasi.end = this.paginasi.start + this.paginasi.limit
            this.paginasi.startIndex = this.paginasi.start

            this.listingPage = listing.slice(this.paginasi.start, this.paginasi.end)
            this.$nextTick(() => {
                    this.loaderDetail = true
                    this.paginasi.key +=1
            })

        },
        tambahMitra() {
            this.formMode = 'post'
            this.form = {
                namaOrganisasi: '',
                imgLogoPartner: {
                    displayImage: '',
                    file: null
                }
            }
            
            this.modal.title = this.$t('Tambah Mitra')
            this.modal.status = true
            this.modal.key+=1
        },
        editItem(item) {
            this.formMode = 'put'
            this.form = item
            
            this.modal.title = this.$t('Sunting Mitra')
            this.modal.status = true
            this.modal.key+=1
        },

        simpan() {
            if (this.form.namaOrganisasi === '') {
                this.$toast.show('Nama masih kosong')
            } else {
                if (this.formMode === 'post') {
                    this.simpanPost()
                } else {
                    this.simpanPut()
                }
            }
        },
        async simpanPost() {
            const simpan = {
                partner:this.form.namaOrganisasi
            }
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', simpan).then(res => {
                console.log(res.data)
                const resId = res.data.data.pkPartnerEksternalId
                if (this.form.imgLogoPartner.file !== null) {
                     this.uploadImage(resId, this.form.imgLogoPartner)
                } else {
                    this.modal.status=false;
                    this.modal.key +=1
                    this.initialize()
                }
            }).catch(err => {
                console.log(err)
            })
        },

        async simpanPut() {
            // this.updateData({"update_partner":{"id":data.id, "namaOrganisasi":data.namaOrganisasi}})

            const simpan = {
                // partner:this.form.namaOrganisasi
                update_partner: {
                    id: this.form.id,
                    namaOrganisasi: this.form.namaOrganisasi
                }
            }
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', simpan).then(res => {
                // const resId = res.data.data.pkPartnerEksternalId
                if (this.form.imgLogoPartner.file !== null) {
                     this.uploadImage(this.form.id, this.form.imgLogoPartner)
                } else {
                    this.modal.status=false;
                    this.modal.key +=1
                    this.initialize()
                }
            }).catch(err => {
                console.log(err)
            })

        },


        async uploadImage (id, file){
            // if (image instanceof Blob){
                var dataImage = new FormData();
                dataImage.append('imgLogoPartner', file.file, file.name);
                await this.$apiBase.put('organizations/partnerorganisasieksternal/'+id+'/', dataImage).then(res => {
                    // console.clear()
                    this.modal.status=false;
                    this.modal.key +=1
                    this.initialize()
                }).catch(err => {
                    // console.clear()
                })
            // }
        },
        deleteItem(item) {
            this.$modal.show({
                type: 'warning',
                title: this.$t("Deletion Notification"),
                body: this.$t('konfirmasiDeletePartner'),
                primary: {
                    label: 'OK',
                    theme: 'red',
                    action: () => this.realDeleteItem(item)
                }
            })
        },
        async realDeleteItem(item) {
            await this.$apiBase.delete('organizations/partnerorganisasieksternal/'+item.id+'/').then(res => {

                this.initialize()

            })
        }

    }
}
</script>