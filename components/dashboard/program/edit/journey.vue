<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="text-lg">Journey</div>
            <button class="btn-tambah text-sm" @click="addJourney">Add Journey</button>
        </div>
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="newVal.list"
                :headClass="'hidden'"
                :customClass="'table-vertical-top'"
                :key="'keytable'+keyTable"
                :drag="true"
                :dragChange="'nomorUrut'"
            >
                <template v-slot:avatar="{item}">
                    <div v-html="displayImage(item)"></div>
                </template>
                <template v-slot:detail="{item}">
                    <div class="mb-3 font-bold text-[16px] text-warna-utama">{{ item.judulJourney[bahasa] }}</div>
                    <div class="text-warna-dua text-[14px]">{{ item.deskripsi[bahasa] }}</div>
                </template>
                <template v-slot:actions="{item, index}">
                    <div class="w-full flex items-center justify-end gap-x-3">
                        <button title="Edit Location" @click="editItem(item,index)" class="button-edit w-[24px] h-[24px]"></button>
                        <button title="Delete Location" @click="deleteItem(item,index)" class="button-delete w-[24px] h-[24px]"></button>
                    </div>
                </template>

            </ElementsTable>
        <!-- POP UP JOURNEY-->
        <ElementsModal 
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+'journey'"
            :persistent="true"
        >
            <div class="p-6">
                <div class="mb-5">
                    <InputImageUploadSingle 
                        :label="'Image'"
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
                        v-model="form.judulJourney[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'judulid'"
                        :label="'Judul(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.judulJourney[1]"
                        placeholder="Write here"
                        :name="prefixName+'judulen'"
                        :label="'Title(English)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.deskripsi[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'desid'"
                        :label="'Deskripsi(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.deskripsi[1]"
                        placeholder="Write here"
                        :name="prefixName+'desen'"
                        :label="'Description(English)'"
                    />
                </div>
                <div class="flex justify-end">
                    <button @click="simpan" class="button-standar">{{ btnText }}</button>
                </div>
            </div>
        </ElementsModal>


    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            formMode: false,
            selectedIndex: null,
            newImage: {
                file: null,
                displayImage: ''
            },
            keyImage: 0,
            modal: {
                status: false,
                title: 'Journey',
                key: 0
            },
            form: {
                judulJourney: ['',''],
                deskripsi: ['',''],
                nomorUrut: 0,
                imgThumbnailJourney: null,
                tipe: ''
            },
            tableDetail: [
                {
                    header: '',
                    itemValue: 'avatar',
                    itemClass: 'w-2/12',
                },
                {
                    header: '',
                    itemValue: 'detail'
                },
                {
                    header: '',
                    itemValue: 'actions',
                    itemClass: 'w-3/12'
                }
            ],
            keyTable: 0,

        }
    },
    computed: {
        newVal: {
            get() {
                const vA = this.value
                const newList = _.orderBy(vA.list, 'nomorUrut') 
                vA.list = newList.map((e,index) => {
                    e.nomorUrut = index
                    return e
                })
                return vA
            },
            set(value) {
                this.$emit('input',value)
            }
        },
        basePath() {
            return process.env.BASE_URL
        },

        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        btnText() {
            return this.formMode === 'post' ? this.$t('Add') : this.$t('Edit')
        }


    },
    methods: {
        addJourney() {
            this.formMode = 'post',
            this.form.judulJourney = ['','']
            this.form.deskripsi = ['',''],
            this.form.imgThumbnailJourney = ''
            this.newImage = {
                file: null,
                displayImage: ''
            },

            this.modal.status = true
            this.modal.key+=1
        },
        displayImage(item) {
            if ( item.imgThumbnailJourney === '') {
                return '<div class="w-10 h-10 bg-gray-400 rounded-full"></div>'

            } else {
                const source = item.imgThumbnailJourney.substring(0,1) === '/' ? this.basePath + item.imgThumbnailJourney : item.imgThumbnailJourney;
                return '<img class="w-10 h-10 rounded-full object-cover" src="'+ source +'" >'
            } 
        },
        editItem(item,index) {
            this.formMode = 'put'
            this.selectedIndex = index;
            this.form = item
            this.newImage.displayImage =this.form.imgThumbnailJourney
            this.modal.status = true
            this.$nextTick(() => {
                this.modal.key +=1
                this.keyImage+=1
            })  
        },
        deleteItem(item,index) {
            if (item.pkJourneyId && item.pkJourneyId !=='') this.newVal.deleted.push(item.pkJourneyId)
            this.newVal.list.splice(index, 1)
        },
        simpan() {
            if (this.form.judulJourney[0] === '') {
                this.$toast.show(this.$t('indonesiaTitleBlank'))
            } else if (this.form.judulJourney[1] === '') {
                this.$toast.show(this.$t('englishTitleBlank'))
            } else {
                this.form.imgThumbnailJourney = this.newImage && this.newImage.displayImage !== '' ? this.newImage.displayImage : this.form.imgThumbnailJourney
                if (this.formMode === 'post') {
                    this.form.file = this.newImage && this.newImage.status === 'belumUpload' ? this.newImage : ''
                    this.form.deskripsi[0] = this.form.deskripsi[0] === '' ? 'N/A' : this.form.deskripsi[0]
                    this.form.deskripsi[1] = this.form.deskripsi[1] === '' ? 'N/A' : this.form.deskripsi[1]
                    this.form.nomorUrut = this.newVal.list.length + 1
                    this.form.tipe = 'new'
                    this.newVal.list.push(this.form)

                } else {
                    this.form.file = this.newImage && this.newImage.status === 'belumUpload' ? this.newImage : ''
                    this.newVal.list[this.selectedIndex] = this.form
                }
                    this.modal.status = false
                    this.modal.key +=1
                    this.keyTable +=1

            }
        }


    }
}
</script>