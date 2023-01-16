<template>
    <div>
        <div class="flex items-start mb-1">
            <div v-if="label" class="font-medium mb-1">
                {{label}}
            </div>
        </div>
        <!-- <div class="list-files">
            <div v-for="(i, index) in listFiles" :key="'listfiles'+index" class="relative">
                <img :src="i.displayImage" :alt="'gambar'+index" class="w-full" />
                <button @click="deleteSelected(index)" class="absolute top-0 right-0 rounded-full text-xl opacity-70 hover:opacity-100 "><i class="ri-close-circle-fill"></i></button>
            </div>
        </div> -->
        <!-- <div v-if="multiple && listFiles.length > 0" class="mt-2 button-more-wrapper">
            <button @click="$refs.inputfiles.click()" class="text-utama text-sm font-semibold">Tambah Foto</button>
        </div> -->
        <div   class="image-area cursor-pointer" @dragover="dragOver" @dragleave="dragLeave" @drop="drop">
            <div class="min-h-[150px] w-full border-dashed border-2 border-warna-tujuh rounded-lg pt-[9px] pb-[25px] flex items-center justify-center">
                <div class="text-center">
                    <div class="text-xs text-[#BABABA] mb-2 text-center">
                        <div>You can choose multiple images</div>
                        <div><span class="uppercase">{{ accept }}</span> {{ $t('tidak melebihi') }} {{ maxSize }} MB</div>
                    </div>
                    <input type="file" ref="inputfiles" 
                      :accept="accept ? accept  : '*' " 
                      name="inputfiles" id="inputfiles" class="hidden" 
                      @change="prosesFiles()">

                    <button @click="$refs.inputfiles.click()" title="Upload Image"  class="bg-white border border-warna-tujuh rounded-md hover:bg-gray-200 hover:shadow-md transition-all shadow shadow-[#45a6ff33] py-2 w-[145px] text-center mx-auto cursor-pointer">Pilih File</button>
                </div>
            </div>
        </div>
        <input type="file" 
            ref="inputfiles" 
            :accept="accept ? accept  : '*' " 
            multiple 
            name="inputfiles" 
            id="inputfiles" 
            class="hidden" 
            @change="prosesFiles()">

    </div>
</template>


<script>
export default {
    props:['value','label', 'maxSize', 'accept', 'multiple'],
    data() {
        return {
            imagePreview: '',
            listFiles: [],
            totalSessionImage: 0,
            countDownSession: 0
        }
    },
    mounted() {
        this.initialize()
    },
    watch: {
        listFiles() {
            this.updateValue()
        },
        // countDownSession(val) {
        //     // this.$refs.inputfiles.value = null
        //     if (val === this.listFiles.length ) this.updateValue();
        //     this.$nextTick(() => {
        //         // this.$refs.inputfiles.value = null
        //     })
        // }
        // totalSessionImage(val) {
        //     if (parseInt(val) > 0) {
        //         if (parseInt(val) === parseInt(this.countDownSession)) {
        //             this.$refs.inputfiles.value = null
        //             this.$nextTick(() => {
        //                 this.totalSessionImage = 0
        //                 this.countDownSession = 0
        //             })
        //         }
        //     }
        // }
    },
    computed: {
        baseUrl() {
            return process.env.TIPE === 'dev' ? process.env.DEV_IMAGE  :  process.env.PROD_IMAGE 
        }
    },
    methods: {
        initialize() {
            const tipeFile = typeof this.value
            if (tipeFile === 'string' && this.value !== '') {
                this.listFiles = [
                    {
                        displayImage: this.baseUrl+this.value
                    }
                ]
            }
        },
        prosesFiles() {
            const inputedFiles = [...this.$refs.inputfiles.files];
            const fileMaxSize = this.maxSize ? parseInt(this.maxSize) * 1024 * 1024 : 5 * 1024 * 1024 
            this.totalSessionImage = inputedFiles.length
            this.countDownSession = 0
            inputedFiles.forEach(e => {
                const ukuran = e.size
                const panjangNama = e.name.length
                // console.log(e.type)
                if (ukuran > fileMaxSize) {
                    this.$toast.show('Ukuran image ' +  e.name + ' lebih dari ' + this.maxSize +'mb, silahkan upload dibawah ' + this.maxSize +'mb.' )

                } else if (panjangNama > 99) {
                    this.$toast.show('nama berkas image terlalu panjang, mohon diperpendek ' )

                    
                } else {
                    const data = {
                        file: e,
                        imgGambar: URL.createObjectURL(e),
                        type: e.type,
                        name: e.name

                    }
                    this.listFiles.push(data)
                    this.countDownSession +=1
                    // this.updateValue()
                }
            })
        },
        dragOver(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragLeave(event) {
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            console.log(event.dataTransfer.files);
            this.$refs.inputfiles.files = event.dataTransfer.files
            this.prosesFiles(); 
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        deleteSelected(index) {
            this.listFiles.splice(index,1)
        },
        updateValue() {
            this.$emit('input', this.listFiles)
            // if (this.multiple) {
            //     this.$emit('input', this.listFiles)
            // } else {
            //     const newVal = this.listFiles.length > 0 ? this.listFiles[0] : ''
            //     this.$emit('input', newVal)
            // }
        }
    }
}
</script>