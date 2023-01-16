<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="text-lg">Report</div>
            <button class="btn-tambah text-sm" @click="addReport">Add Report</button>
        </div>
        <div class="table-area">
            <ElementsTable
                :tableDetail="tableDetail"
                v-model="newVal"
                :headClass="'hidden'"
                :customClass="'table-vertical-top'"
                :key="'keyreporttable'+keyTable"
            >
                <template v-slot:name="{item,index}">
                    <div class="text-sm text-[#212121]">#{{index + 1}}</div>
                    <button class="text-[#212121] hover:text-[#212121] hover:underline " @click="viewFile(item.binFile, item)">{{displayNamaFile(item)}}</button>
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
            v-model="modal.status"
            :title="modal.title"
            :key="modal.key+'report'"
            :persistent="true"
        >
        <div v-if="modal.type==='form'" class="p-5">
            <div class="">
                <InputBerkasUpload 
                    v-model="fileTemp"
                    :accept="'application/pdf'"
                    :maxSize="5"
                    :label="'Report file'"
                    :multiple="false"
                />
            </div>
            <div class="flex justify-end mt-5 mb-5">
                <button @click="simpan" class="button-standar" >{{ btnText }}</button>
            </div>
        </div>
        <div v-else-if="modal.type==='viewer'">
            <ViewerPdf 
                :path="selectedPdf"
                v-if="selectedPdf"
            />
        </div>


        </ElementsModal>
    </div>
</template>
<script>
export default {
    props: ['value'],
    data() {
        return {
            selectedPdf: null,
            fileTemp: null,
            keyTable: 0,
            formMode: 'post',
            selectedIndex: null,
            form: {
                binFile: '',
                file: '',
                deskripsiFile: ['',''],
                isLimitedaccess: 1
            },
            modal: {
                status: false,
                type: 'form',
                title: 'Report',
                key: 0
            },
            tableDetail: [
                {
                    header: '',
                    itemValue: 'name',
                    type: 'string',
                },
                {
                    header: '',
                    itemValue: 'actions',
                    itemClass: 'w-3/12'
                }
            ],

        }
    },
    watch: {
        'modal.status'(val) {
            if (val === true) {
                document.body.classList.add('overflow-hidden')
            } else {
                document.body.classList.remove('overflow-hidden')
            }
        }
    },
    computed: {
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        btnText() {
            return this.formMode === 'post' ? 'Tambah' : 'Edit'
        },
        basePath() {
            return process.env.BASE_URL
        }
    },
    methods: {
        addReport() {
            this.modal.status = true;
            this.form.binFile = ''
            this.modal.type = 'form'
            this.modal.title = 'Report'
            this.form.file = ''
            this.modal.key+=1
        },
        editItem(item,index) {
            this.formMode = 'put'
            this.selectedIndex = index
            this.fileTemp = item.file ? item.file.name : item.binFile
            this.form = item
            this.modal.type = 'form'
            this.modal.title = 'Report'
            this.modal.status = true
            this.modal.key +=1
        },
        deleteItem(item, index) {
            this.newVal.splice(index,1)
            this.keyTable +=1
        },
        displayNamaFile(item) {
            if (item.file) {
                return item.file.name
            } else {
                const namaFile = item.binFile && item.binFile.length > 0 ? item.binFile : ''
                const pecah = namaFile.split('/')
                return pecah.pop()
            }
        },
        viewFile(file, namaFile) {
            this.modal.title = this.displayNamaFile(namaFile)
            const source = file.substring(0,1) === '/' ? this.basePath + file : file
            this.selectedPdf = source
            this.modal.type = 'viewer'
            this.modal.status = true
            this.modal.key+=1
        },
        simpan() {
            if (this.fileTemp == '') {
                this.$toast.show('Report file belum diisi')
            } else {
                this.form.file = this.fileTemp
                this.form.binFile = this.form.file.fileUrl
                if (this.formMode === 'post') {
                    this.newVal.push(this.form)
                } else {
                    this.newVal[this.selectedIndex] = this.form
                }
                this.$nextTick(() => {
                    this.modal.status = false;
                    this.modal.key +=1
                })

            }


        }
    }
}
</script>