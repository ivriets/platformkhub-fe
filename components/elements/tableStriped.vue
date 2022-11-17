<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="w-full rounded-xl">
                <thead class="">
                    <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                        <th v-if="urutan && urutan === true" class="font-normal py-5 px-5 w-[200px]">No.</th>
                        <th v-for="(i, index) in masterTable" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                        <th v-if="actions.status"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                        <td v-if="urutan && urutan === true" class="font-normal p-5">{{ index+1 }}.</td>
                        <td v-for="(x, index2) in masterTable" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                            <div class="flex items-center gap-2">
                                <img v-if="x.foto" :src="item[x.foto]" alt="img" class="rounded-full w-6 h-6 bg-green-200">
                                <div v-if="x.value === 'status'">
                                    <div v-if="item[x.value] === 1" class="text-[#444]">Tertunda</div>
                                    <div v-if="item[x.value] === 2" class="text-approved-accepted">Bergabung</div>
                                    <div v-if="item[x.value] === 3" class="text-rejected">Menolak</div>
                                </div>
                                <div v-else>{{ item[x.value] }}</div>
                            </div>
                        </td>
                        <td v-if="actions.status" class="font-normal p-5">
                            <div class="flex items-center justify-end gap-x-6">
                                <button @click="editItem(item)" v-if="actions.button.edit.status" ><img class="" src="/icons/icon-edit.png" :alt="'icon-edit'"></button>
                                <button @click="deleteItem(item)" v-if="actions.button.delete.status" ><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                <button v-if="actions.button.print.status" ><img class="" src="/icons/icon-delete.png" :alt="'icon-print'"></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'edit'"
            :persistent="persistent"
        >
            <div v-if="selectedModal === 'edit'"><slot name="edit" /></div>
        </ElementsModal>
    </div>
</template>

<script>
export default {
    props: ['dataTable', 'masterTable', 'urutan', 'title', 'value', 'actions'],
    data() {
        return {
            modalAction: false,
            modalTitle: '',
            modalWidth: '',
            persistent: true,
            keyModal: 0,
            selectedModal: '',
            // actions: {
            //     status: true,
            //     button: {
            //         edit: {
            //             status: true,
            //             tipe: 'modal'
            //         },
            //         delete: {
            //             status: true,
            //             tipe: 'modal'
            //         },
            //         print: {
            //             status: false,
            //             tipe: 'page'
            //         }
            //     }
            // }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.modalAction = false
        },

        editItem(item) {
            // console.log(item)
            if (this.actions.button.edit.tipe === 'modal') {
                this.modalAction = true
                this.modalTitle = 'Edit ' + this.title 
                this.selectedModal = 'edit'
                this.$emit('input', item)
                this.keyModal += 1
            } else if (this.actions.button.edit.tipe === 'page') {
                this.$router.push(this.actions.button.edit.path)
            }
            
        },

        deleteItem(item) {
            // console.log(item)
            // this.$toast.warning('Yakin menghapus partner ')
            this.$modal.show({
                type: 'warning',
                title: 'Delete ' + this.title,
                body: 'Yakin menghapus ' + this.title + '?',
                primary: {
                    label: 'Hapus',
                    theme: 'red',
                    action: () => {},
                },
                secondary: {
                    label: 'Batal',
                    theme: 'white',
                    action: () => {},
                },
            })
        }
    },
}
</script>