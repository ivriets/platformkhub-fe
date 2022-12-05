<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="w-full rounded-xl table-padding border-collapse">
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="tr-striped-even">
                        <td class="p-5">
                            <input 
                                type="radio" 
                                :id="item.pkLokasiActivityId+'selectLoc'" 
                                v-model="valRadio"
                                class="w-4 h-4 text-warna-empat bg-gray-100 border-gray-300 focus:ring-warna-empat focus:ring-0 "
                            >
                        </td>
                        <td class="p-5">
                            <div class="text-sm">{{ item.provinsi }}</div>
                        </td>
                        <td class="p-5">
                            <div class="text-sm">{{ item.kota }}</div>
                        </td>
                        <td class="p-5">
                            <div class="text-sm">{{ item.jalan }}</div>
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
            },
            valRadio: '',
        }
    },
    watch: {
        valRadio(val) {
            this.$emit('input',val)
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.modalAction = false
            if (this.value !== '') {
                this.valRadio = this.value
            }
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