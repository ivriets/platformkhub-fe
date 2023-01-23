<template>
    <div>
        <button @click="viewFile" class="w-full">
            <slot>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold text-center">View File</div>
            </slot>
        </button>
<!-- {{source}} -->
        <ElementsModal
            v-model="modal.status"
            :title="modal.title"
            :key="'modall'+modal.key"
            :width="modal.width"
        >
            <div v-if="viewerType==='pdf'">
                <ViewerPdf :path="viewerFile" />
            </div>
            <div v-else-if="viewerType==='av'">
                <ViewerAv 
                    :path="viewerFile"
                    :provider="provider"
                />
            </div>
            <div v-else-if="viewerType==='audio'" class="bg-black flex items-center justify-center h-96">
                <audio controls autoplay>
                    <source :src="viewerFile" >
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
    props: ['source'],
    data() {
        return {
            viewerType: '',
            viewerFile: '',
            provider: '',
            modal: {
                status: false,
                title: '',
                key: 0,
                width: 'w-3/5'
            },

        }
    },
    computed: {
        newFile: {
            get() {
                return this.source
            }
        },
        basePath() {
            return process.env.BASE_URL
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
    mounted() {
        // this.initialize()
    },
    methods: {
        viewFile() {
            if (this.newFile.typeResources.id === 3) {
                //pdf
                this.provider = ''
                if (this.newFile.binFile === '/assets/file.pdf') {
                    this.viewerType = ''
                    window.open(this.newFile.embedLink, '_blank')
                } else {
                    this.viewerType = 'pdf'
                    this.viewerFile = this.basePath + this.newFile.binFile
                    this.modal.title = this.newFile.binFile.split('/').pop()
                    this.openModal()
                }

            } else if (this.source.typeResources.id === 4) {
                //video
                if (this.newFile.binFile === '/assets/file.pdf') {
                    //chek apakah ini youtube?
                        const checkyoutube = 'https://youtu.be/HEAn4FqXFY4'
                        const match = this.newFile.embedLink.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                        if (match[2] !== null || match[2] !==undefined) {
                            this.viewerType = 'av'
                            this.viewerFile =  this.newFile.embedLink
                            this.provider='youtube'
                            this.modal.title = 'Youtube'
                            this.openModal()
                        } else {
                            this.viewerType = ''
                            this.provider = ''

                            window.open(this.newFile.embedLink, '_blank')
                        }

                } else {
                    this.viewerType = 'av'
                    this.provider = ''
                    this.viewerFile = this.basePath + this.newFile.binFile
                    this.modal.title = this.newFile.binFile.split('/').pop()
                    this.openModal()
                }

            } else if (this.source.typeResources.id === 5) {
                //audio
                this.provider = ''
                if (this.newFile.binFile === '/assets/file.pdf') {
                    this.viewerType = ''
                    window.open(this.newFile.embedLink, '_blank')
                } else {
                    this.viewerType = 'audio'
                    this.viewerFile = this.basePath + this.newFile.binFile
                    this.modal.title = this.newFile.binFile.split('/').pop()
                    this.openModal()
                }


            } else if (this.source.typeResources.id === 2) {
                //other files
                if (this.newFile.binFile === '/assets/file.pdf') {
                    this.viewerType = ''
                    window.open(this.newFile.embedLink, '_blank')
                } else {
                    this.viewerType = 'other'
                    this.viewerFile = ''
                    this.modal.title = this.newFile.binFile.split('/').pop()
                    this.openModal()
                }

            } else  {
                this.viewerType = ''
                window.open(this.newFile.embedLink, '_blank')
            }

        },
        openModal() {
            this.modal.status = true
            this.modal.key+=1
        }
    }
}
</script>