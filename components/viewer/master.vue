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
            <div v-else-if="fileType==='audio'" class="bg-black flex items-center justify-center h-96">
                <audio controls autoplay>
                    <source :src="url" >
                    Your browser does not support the audio element.
                </audio>

            </div>
            <div v-else class="p-5 h-[150px]">
                <div class="text-sm text-utama bg-gray-30">
                    {{modal.title}}
                </div>
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
                av: ['mp4'],
                audio: ['mp3', 'm4a'] 
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
                } else if (this.ekstensi.audio.includes(ext)) {
                    this.fileType='audio'
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