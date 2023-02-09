<template>
    <div>

        <div class="flex items-center justify-between mb-3">
            <div class="text-xl">{{ $t('Milestone') }}</div>
            <button class="btn-tambah text-sm" @click="addMilestone">{{ $t('Add Milestone') }}</button>
        </div>
            <div class="">

            <ElementsTable
                :tableDetail="tableDetail"
                v-model="newVal"
                :headClass="'hidden'"
                :customClass="'table-vertical-top'"
                :key="'keytable'+keyTable"
                :drag="true"
                :dragChange="'nomorUrut'"
            >
                <template v-slot:deskripsi="{item}">
                    <div class="text-md font-semibold mb-4 text-[#129555]">
                        <span v-if="item.isDone">Completed</span>
                        <span v-else>Incompleted</span>
                    </div>
                    <div class="mb-4 text-[#757575]">
                        <div class="text-sm">Title (Bahasa Indonesia)</div>
                        <div class="text-[#616161] font-semibold" v-if="item.deskripsi && item.deskripsi[0]">
                            {{item.deskripsi[0]}}
                        </div>
                    </div>

                    <div class="mb-4 text-[#757575]">
                        <div class="text-sm">Title (English)</div>
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



        <!-- POP UP MILESTONE-->
        <ElementsModal 
            v-model="modal.status"
            :title="'Milestone'"
            :key="modal.key+'milestone'"
            :persistent="true"
        >
            <div class="p-6">
                <div class="mb-5">
                    <InputSelect 
                        v-model="statusMilestone"
                        :name="prefixName+'status'"
                        :label="'Status'"
                        :opsi="opsiStatusMilestone"
                        :placeholder="'Pilih status'"
                        :multilang="true"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.deskripsi[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'judulid'"
                        :label="'Judul(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.deskripsi[1]"
                        placeholder="Write here"
                        :name="prefixName+'judulen'"
                        :label="'Title(English)'"
                    />
                </div>
                <div class="flex justify-end">
                    <button @click="simpan" class="button-standar">{{ btnText }}</button>
                </div>
            </div>
        </ElementsModal>
        <!-- <pre>{{ newVal }}</pre> -->
    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            selectedIndex: null,
            keyTable: 0,
            modal: {
                status: false,
                key: 0
            },
            // btnText: 'Tambah',
            formMode: 'post',
            statusMilestone: '',
            form: {
                deskripsi: ['',''],
                isDone: false,
                nomorUrut: 0,
            },

            opsiStatusMilestone: [
                {
                    id: 0,
                    label: ['Completed','Completed']
                },
                {
                    id:1,
                    label: ['Incompleted','Incompleted']
                }
            ]

        }
    },
    computed: {
        newVal: {
            get() {
                const vA = _.orderBy(this.value, 'nomorUrut')
                // return vA
                return vA
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        btnText() {
            return this.formMode === 'post' ? 'Tambah' : 'Edit'
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
    methods: {
        addMilestone() {
            this.form.deskripsi = ['','']
            this.statusMilestone = 1
            this.form.nomorUrut = this.newVal.length + 1;
            this.formMode = 'post'

            this.modal.status = true
            this.modal.key +=1
        },
        simpan() {
            this.form.isDone = this.statusMilestone === 0 ? true : false
            if (this.formMode === 'post') {
                this.newVal.push(this.form)
            } else {
                this.newVal[this.selectedIndex] = this.form
            }
            this.modal.status = false;
            this.modal.key +=1
            this.keyTable+=1
        },
        deleteItem(item,index) {
            this.newVal.splice(index,1)
            this.keyTable +=1
        },
        editItem(item,index) {
            this.selectedIndex = index
            this.form = item
            this.formMode = 'put'
            this.statusMilestone = this.form.isDone === true ? 0 : 1

            this.modal.status = true
            this.modal.key +=1

        }
    }
}
</script>