<template>
    <div>
        <div class="">
            <div class="flex items-center justify-between mb-3">
                <div class="text-xl">Testimony</div>
                <button class="btn-tambah text-sm" @click="addTestimony">{{ $t('Add Testimony') }}</button>
            </div>
            <div class="text-xs text-warna-delapan mb-4">{{ $t('Choose Testimony') }}</div>
            <div class="">
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="newVal.list"
                :headClass="'hidden'"
            >
                <template v-slot:ck="{ index }">
                    <input  v-model="ckTable" class="h-4 w-4 input-radio-1 " :value="index" type="radio" :name="'radio'+index" :id="'radio'+index">
                </template>
                <template v-slot:avatar="{item}">
                    <div v-if="item.imgTestimoni && item.imgTestimoni.displayImage" v-html="displayImage(item)"></div>
                </template>
                <template v-slot:actions="{item, index}">
                    <div class="w-full flex items-center justify-end gap-x-3">
                        <button title="Edit Location" @click="editItem(item,index)" class="button-edit w-[24px] h-[24px]"></button>
                        <button title="Delete Location" @click="deleteItem(item,index)" class="button-delete w-[24px] h-[24px]"></button>
                    </div>

                </template>
            </ElementsTable>
            </div>
        </div>
        <!-- POP UP TESTIMONI-->
        <ElementsModal 
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+'tambahTestimony'"
            :persistent="true"
        >
            <div class="p-6">
                <div class="mb-5">
                    <InputImageUploadSingle 
                        :label="$t('Foto Profil')"
                        v-model="newImage"
                        :accept="'.png, .jpg, .jpeg'"
                        :maxSize="1"
                        :key="'asdf'+keyImage"
                        :useCrop="true"
                        :cropRatio="1"
                        :previewClass="'w-1/2'"
                        :useCircle="true"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.nama"
                        :name="prefixName+'namatestimony'"
                        :label="$t('Nama')"
                        :max="255"
                        :counter="true"
                    />
                </div>
                <div class="mb-5">
                    <InputTextArea 
                        v-model="form.deskripsi"
                        :name="prefixName+'deskripsitestimoni'"
                        :label="$t('Testimoni')"
                        :max="1000"
                        :counter="true"
                    />
                </div>
                <div class="flex justify-end">
                    <button @click="simpan" class="button-standar">{{ formMode==='post' ? $t('Tambah') : $t('Edit') }}</button>
                </div>

            </div>
        </ElementsModal>
    </div>
</template>
<script>
export default {
    props:['value', 'prefixName'],
    data() {
        return {
            keyImage: 0,
            ckTable: '',
            btnText: '',
            formMode: 'post',
            selectedIndex: null,
            newImage: {
                file: null,
                displayImage: ''
            },

            form: {
                nama: '',
                deskripsi: '',
                imgTestimoni: '',
                tipe: ''
            },
            modal: {
                status: false,
                title: 'Testimoni',
                key: 0,
            },
            tableDetail: [
                {
                    header: '',
                    itemValue: 'ck',
                    type: 'string',
                    itemClass: 'w-1/12'
                },
                {
                    header: '',
                    itemValue: 'avatar',
                    type: 'string',
                    itemClass: 'w-2/12'
                },
                {
                    header: '',
                    itemValue: 'nama',
                    type: 'string',
                    itemClass: 'w-3/12',
                },
                {
                    header: '',
                    itemValue: 'deskripsi',
                    type: 'string',
                    itemClass: 'w-3/12'
                },
                {
                    header: '',
                    itemValue: 'actions',
                    type: 'string',
                    itemClass: 'w-3/12'
                },

            ]


        }
    },
    computed: {
        newVal: {
            get() {
                var baru = this.value
                baru.list = this.value.list.map(e => {
                    if (_.isString(e.imgTestimoni)) {
                        e.imgTestimoni = {
                            file: null,
                            displayImage: e.imgTestimoni
                        }
                    } 

                    return e;
                })
                return baru
            },
            set(value) {
                return value
            }
        },
        basePath() {
            return process.env.BASE_URL
        }
    },
    methods: {
        addTestimony() {
            this.formMode = 'post'
            this.form.nama = ''
            this.form.deskripsi = ''
            this.form.imgTestimoni = ''
            this.form.tipe = 'new'
            this.newImage = {
                file: null,
                displayImage: ''
            }
            this.modal.status = true
            this.$nextTick(() => {
                this.modal.key +=1
            })  
        },
        simpan() {
            if (this.form.nama === '') {
                this.$toast.show('Nama masih kosong')
            } else if (this.form.deskripsi === '') {
                this.$toast.show('Testimoni masih kosong')
            } else {
                // this.form.imgTestimoni = this.newImage
                this.form.imgTestimoni = this.newImage 
                if (this.formMode == 'post') {
                    this.newVal.list.push(this.form);
                    // this.newVal.new.push(this.form)

                } else {

                    this.newVal.list[this.selectedIndex] = this.form

                }

                this.modal.status = false
                this.modal.key +=1
            }



        },
        editItem(item,index) {
            this.formMode = 'put'
            this.selectedIndex = index;
            this.form = item
            this.form.tipe = this.form.pkTestimoniNonUserId ? 'update' : 'new'
            this.newImage = this.form.imgTestimoni
            this.modal.status = true
            this.$nextTick(() => {
                this.modal.key +=1
                this.keyImage+=1
            })  
        },
        deleteItem(item,index) {
            if(item.pkTestimoniNonUserId) this.newVal.deleted.push(item.pkTestimoniNonUserId)
            this.newVal.list.splice(index, 1)
        },
        displayImage(item) {
            if (item.imgTestimoni == '') {
                return '<div class="w-10 h-10 bg-gray-400 rounded-full"></div>'

            } else {
                const source = item.imgTestimoni.displayImage.substring(0,1) === '/' ? this.basePath + item.imgTestimoni.displayImage : item.imgTestimoni.displayImage;
                return '<img class="w-10 h-10 rounded-full object-cover" src="'+ source +'" >'
                // return item.imgTestimoni
            } 
        }
    }
}
</script>