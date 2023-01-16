<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="">Location</div>
            <button class="btn-tambah text-sm" @click="btnAddLokasi">Add Location</button>
        </div>
        <div class="text-xs text-warna-delapan mb-4">Choose Active Location</div>
        <div class="text-sm">
            <!-- <ElementsTableWithSelect 
                v-model="form.lokasi"
                :dataTable="form.lokasi"
                :title="'Lokasi'"
            >

            </ElementsTableWithSelect> -->

            <ElementsTable
                :tableDetail="tableDetail"
                v-model="newVal"
                :headClass="'hidden'"
            >
                <template v-slot:ck="{ index }">
                    <input  v-model="ckTable" class="h-4 w-4 input-radio-1 " :value="index" type="radio" :name="'radio'+index" :id="'radio'+index">
                </template>
                <template v-slot:actions="{item, index}">
                    <div class="w-full flex items-center justify-end gap-x-3">
                        <button title="Edit Location" @click="editItem(item,index)" class="button-edit w-[24px] h-[24px]"></button>
                        <button title="Delete Location" @click="deleteItem(item,index)" class="button-delete w-[24px] h-[24px]"></button>
                    </div>

                </template>
            </ElementsTable>
        </div>
        <ElementsModal
            v-model="modal.status"
            :title="'Lokasi'"
            :key="'asdf'+modal.key"
            :persistent="true"
        >
            <div class="px-4 py-5">
                <FormLokasi 
                    v-model="selectedLokasi"
                    :prefixName="prefixName"
                    :colClass="'md:col-span-12'"
                    :btnText="formMode==='post'? 'Tambah' : 'Edit'"
                >
                </FormLokasi>
            </div>
            <template v-slot:footer>
                <div class="flex items-center justify-end pb-5 px-4">
                    <button @click="simpan"  class="button-standar">{{ formMode==='post' ? 'Tambah' : 'Edit' }}</button>
                </div>
            </template>
        </ElementsModal>
    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            ckTable: '',
            formMode: 'post',
            selectedIndex: null,
            modal: {
                status: false,
                title: '',
                key: 0
            },
            selectedLokasi: {
                provinsi: '',
                kota: '',
                jalan: '',
                pinLocation: ''
            },
            newVal: [],
            tableDetail: [
                {
                    header: '',
                    itemValue: 'ck',
                    type: 'string',
                    itemClass: 'w-1/12'
                },

                {
                    header: 'Provinsi',
                    itemValue: 'provinsi',
                    type: 'string',
                    itemClass: 'w-2/12'
                },
                {
                    header: 'Kota',
                    itemValue: 'kota',
                    type: 'string',
                    itemClass: 'w-3/12'
                },
                {
                    header: 'Jalan',
                    itemValue: 'jalan',
                    type: 'string',
                    itemClass: 'w-4/12'
                },
                {
                    header: '',
                    itemValue: 'actions',
                    type: 'string',
                    itemClass: 'w-2/12'
                },

            ]
        }
    },
    
    // computed: {
    //     newVal: {
    //         get() {
    //            return this.value
    //         },
    //         set(value) {
               
    //             this.$emit('input', value)
    //         }
    //     },
    // },
    mounted() {
        this.initialize()
    },
    watch: {
        // selectedLokasi: {
        //     deep: true,
        //     handler(val) {
        //         if (this.formMode === 'post') {
        //             if (val && val.provinsi !== '') {
        //                 // this.closeModal()
        //                 this.newVal.push(val)
        //                 this.$nextTick(() => {
        //                     this.updatevalue()
        //                 })
        //             }
        //         } else {
        //             console.log('val',val)
        //             console.log('index', this.selectedIndex)
        //             this.newVal[this.selectedIndex] = val;
        //                 // this.closeModal()
        //                 this.$nextTick(() => {
        //                     this.updatevalue()
        //                 })

        //         }


        //     }
        // },
        ckTable(val) {
            if (this.newVal.length > 0) {
                this.newVal = this.newVal.map(e => {
                    e.aktif = false;
                    return e;
                })
                this.newVal[val].aktif = true
                    this.$nextTick(() => {
                        this.updatevalue()
                    })
            }

        }
    },
    methods: {
        initialize() {
            this.newVal = this.value ?  _.cloneDeep(this.value) : []
            this.modal.status = false;

        },
        resetForm() {
            this.selectedLokasi = {
                provinsi: '',
                kota: '',
                jalan: '',
                pinLocation: ''
            }
        },
        btnAddLokasi() {
            this.formMode = 'post'
            this.resetForm()
           this.modal.status = true
           this.modal.title = 'Tambahkan lokasi baru'
           this.modal.key +=1 
        },
        closeModal() {
            this.modal.status = false;
            this.modal.key +=1
        },
        editItem(item, index) {
            this.selectedIndex = index

            this.modal.status = true
            this.modal.title = 'Edit lokasi'
            this.modal.key +=1 
            this.formMode = 'put'
            this.selectedLokasi = item
        },
        deleteItem(item, index) {
            this.newVal.splice(index, 1)
            this.updatevalue()
        },
        updatevalue() {
            this.$emit('input', this.newVal)
        },
        simpan() {
            if (this.selectedLokasi.provinsi === '') {
                this.$toast.show('Provinsi masih kosong')
            } else if (this.selectedLokasi.kota === '') {
                this.$toast.show('Kota masih kosong')
            } else if (this.selectedLokasi.jalan === '') {
                this.$toast.show('Jalan masih kosong')
            } else {
                if (this.formMode === 'post') {
                    this.closeModal()
                    this.newVal.push(this.selectedLokasi)
                    this.$nextTick(() => {
                        this.updatevalue()
                    })
                } else if (this.formMode === 'put') {
                    this.closeModal()
                    this.newVal[this.selectedIndex] = this.selectedLokasi
                    this.$nextTick(()=> this.updatevalue())
                }
            }
        }


    }
}
</script>