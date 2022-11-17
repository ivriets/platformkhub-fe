<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="w-full rounded-xl">
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="tr-striped-even">
                        <td class="p-5">
                            <div class="mb-5 font-semibold">{{ $dayjs(item.tahun).format("DD MMMM YYYY") }}</div>
                            <div class="mb-5">
                                <div class="text-xs text-warna-lima mb-1">English</div>
                                <div class="font-semibold">{{ item.deskripsi[1] }}</div>
                            </div>
                            <div class="mb-5">
                                <div class="text-xs text-warna-lima mb-1">Indonesia</div>
                                <div class="font-semibold">{{ item.deskripsi[0] }}</div>
                            </div>
                        </td>
                        <td class="p-5 align-top">
                            <div class="flex items-center justify-end gap-x-6">
                                <button @click="editItem(item)" v-if="actions.button.edit.status" ><img class="" src="/icons/icon-edit.png" :alt="'icon-edit'"></button>
                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
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
    props: ['dataTable', 'title', 'value'],
    data() {
        return {
            modalAction: false,
            modalTitle: '',
            modalWidth: '',
            persistent: true,
            keyModal: 0,
            selectedModal: '',
            actions: {
                status: true,
                button: {
                    edit: {
                        status: true,
                        tipe: 'modal'
                    },
                    delete: {
                        status: true,
                        tipe: 'modal'
                    },
                    print: {
                        status: false,
                        tipe: 'page'
                    }
                }
            }
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
            console.log(item)
            this.modalAction = true
            this.modalTitle = 'Edit ' + this.title
            this.selectedModal = 'edit'
            this.$emit('input', item)
            this.keyModal += 1
        }
    },
}
</script>