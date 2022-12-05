<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="w-full rounded-xl table-padding border-collapse">
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="tr-striped-even">
                        <td class="p-5">
                            <div v-if="untuk === 'milestoneorganisasi'" class="mb-5 font-semibold">{{ $dayjs(item.tahun).format("DD MMMM YYYY") }}</div>
                            <div v-if="untuk === 'faseprogram'" class="mb-5 font-semibold" :class="item.isDone === true ? 'text-approved-accepted' : 'text-warna-dua'">{{ item.isDone === true ? 'Completed' : 'Incompleted' }}</div>
                            <div v-if="untuk === 'journeyprogram'" class="flex gap-6">
                                <div class="bg-no-repeat bg-center bg-cover rounded-full shadow" style="height: 36px; width: 36px; background-color: rgb(248, 248, 248);" :style="'background-image: url('+basePath+item.imgThumbnailJourney+');'"></div>
                                <div>
                                    <div class="mb-5">
                                        <div class="text-xs text-warna-lima mb-2">{{ untuk === 'faseprogram' ? 'Title (English)' : 'English' }}</div>
                                        <div v-if="untuk === 'journeyprogram'" class="font-semibold mb-1">{{ item.judulJourney[1] }}</div>
                                        <div :class="untuk === 'milestoneorganisasi' ? 'font-semibold': 'text-sm text-warna-dua'">{{ item.deskripsi[1] }}</div>
                                    </div>
                                    <div class="mb-5">
                                        <div class="text-xs text-warna-lima mb-2">{{ untuk === 'faseprogram' ? 'Title (Bahasa Indonesia)' : 'Indonesia' }}</div>
                                        <div v-if="untuk === 'journeyprogram'" class="font-semibold mb-1">{{ item.judulJourney[0] }}</div>
                                        <div :class="untuk === 'milestoneorganisasi' ? 'font-semibold': 'text-sm text-warna-dua'">{{ item.deskripsi[0] }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="mb-5">
                                    <div class="text-xs text-warna-lima mb-2">{{ untuk === 'faseprogram' ? 'Title (English)' : 'English' }}</div>
                                    <div :class="untuk === 'milestoneorganisasi' ? 'font-semibold': 'text-sm text-warna-dua'">{{ item.deskripsi[1] }}</div>
                                </div>
                                <div class="mb-5">
                                    <div class="text-xs text-warna-lima mb-2">{{ untuk === 'faseprogram' ? 'Title (Bahasa Indonesia)' : 'Indonesia' }}</div>
                                    <div :class="untuk === 'milestoneorganisasi' ? 'font-semibold': 'text-sm text-warna-dua'">{{ item.deskripsi[0] }}</div>
                                </div>
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
    props: ['dataTable', 'title', 'value', 'untuk'],
    // untuk : milestoneorganisasi, faseprogram, journeyprogram
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
    computed: {
        basePath() {
            return process.env.BASE_URL
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