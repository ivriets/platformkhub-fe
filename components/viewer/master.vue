<template>
    <div>
        <button @click="openModal" class="hover:text-blue-700"  title="View file"> 
            <slot>{{ label }}</slot>
        </button>

        <ElementsModal
            v-model="modal.status"
            :title="modal.title"
            :key="'modall'+modal.key"
            :width="modal.width"
        >
            <div v-if="fileType==='pdf'">
                <ViewerPdf :path="url" />
            </div>
            <div v-else-if="fileType==='av'">
                <ViewerAv 
                    :path="url"
                />
            </div>


        </ElementsModal>
    </div>
</template>
<script>
export default {
    props: ['label','url','provider'],
    data() {
        return {
            fileType : '',
            modal: {
                status: false,
                title: '',
                key: 0,
                width: 'w-3/5'
            },
            ekstensi: {
                pdf: ['pdf'],
                av: ['mp4','mp3', 'm4a'] 
            }
        }
    },
    mounted() {
        this.initialize()
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

    methods: {
        initialize() {
            if (this.label !=='') {
                this.modal.title = this.label
                const ext = this.label.split('.').pop().toLowerCase();
                if (this.ekstensi.pdf.includes(ext)) {
                    this.fileType = 'pdf'
                } else if (this.ekstensi.av.includes(ext)) {
                    this.fileType='av'
                }
            } 
        },
        openModal() {
            this.modal.status = true
            this.modal.key +=1
        }
    }
}
</script>