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
        <div   class="image-area " @dragover="disabled? {} :dragOver" @dragleave="disabled?{}:dragLeave" @drop="disabled ? {}: drop">
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

                    <button :disabled="disabled ? disabled : false" @click="$refs.inputfiles.click()" title="Upload Image"  class="button-upload">{{ $t('Pilih File') }}</button>
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

      <ElementsModal
          v-model="modal.status"
          :title="modal.title"
          :key="'keymodal'+modal.key"
          :persistent="true"
      >
      <div class="p-5" v-if="dataCrop">


          <div class="relative " >
              <cropper
              v-if="dataCrop"
                  class="w-full h-full cropper"
                  :src="dataCrop.imgGambar"
                  image-class="cropper__image"
                  ref="imagecropper"
                  :stencil-props="stencilProps"

                  image-restriction="stencil"
                  :auto-zoom="true"
                  @change="imageChange"
                  :stencil-component="useCircle && useCircle === true ? 'circle-stencil' : 'rectangle-stencil' "
              ></cropper>
                  <button  v-if="displayReset" title="Reset" @click="resetImage()" class="absolute bottom-0 left-0 bg-gray-500/80 hover:bg-gray-500 border border-white/80 text-white px-3 py-2 text-sm rounded mb-1 ml-1" >Reset</button>
          </div>
          <div class="mt-5 mb-5 flex justify-end items-center">
              <!-- <button @click="batal" class="btn-text">{{ $t('Cancel') }}</button> -->
              <button @click="simpan" class="btn-save ml-1">{{ $t('Save') }}</button>
          </div>


      </div>
      </ElementsModal>




    </div>
</template>


<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';


export default {
    props:['value','label', 'maxSize', 'accept', 'multiple', 'maxFiles', 'useCrop', 'cropRatio', 'disabled'],
    data() {
        return {
            imagePreview: '',
            useCircle: false,
            listFiles: [],
            listCrop: [],
            totalSessionImage: 0,
            countDownSession: 0,
            dataCrop: null,
            modal: {
                status: false,
                title: 'Gambar',
                key: 0
            },
          displayReset: false,
          stencilProps: {
                      previewClass: 'preview',
                      movable: false,
                      scalable: false,
                      aspectRatio: 4/3,
                      handlersClasses: {
                          default: 'cropper-handler',
                          eastNorth: 'cropper-handler--east-north',
                          westNorth: 'cropper-handler--west-north',
                          eastSouth: 'cropper-handler--east-south',
                          westSouth: 'cropper-handler--west-south',
                      },
                      handlersWrappersClasses: {
                          default: 'cropper-handler-wrapper',
                          eastNorth: 'cropper-handler-wrapper--east-north',
                          westNorth: 'cropper-handler-wrapper--west-north',
                          eastSouth: 'cropper-handler-wrapper--east-south',
                          westSouth: 'cropper-handler-wrapper--west-south',
                      },
                  }


        }
    },
    mounted() {
        this.initialize()
    },
    watch: {
        listFiles() {
            this.updateValue()
        },
        

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
            if (this.maxFiles && this.maxFiles > 0) {
                inputedFiles.splice(parseInt(this.maxFiles))
            }
            inputedFiles.forEach((e, index) => {
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
                    if (this.useCrop && this.useCrop > 0) {
                        this.listCrop.push(data)
                    } else {
                        this.listFiles.push(data)

                    }
                    // this.countDownSession +=1
                    // this.updateValue()
                    if (index === inputedFiles.length - 1) {
                         if (this.useCrop && this.useCrop > 0) this.applyCrop()
                    } else {
                    }
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
        applyCrop() {
            if (this.listCrop.length > 0) {
                this.dataCrop = this.listCrop[0]
                this.modal.status = true
                this.modal.key +=1
            }


        },
        imageChange() {

        },
        simpan() {
            var dataImage = {
                displayImage: '',
                status: '',
                name: '',
                type: '',
                file: null
            }
            const { canvas } = this.$refs.imagecropper.getResult();
            dataImage.displayImage = canvas.toDataURL();
            dataImage.status = 'belumUpload'
            dataImage.name = this.dataCrop.name
            dataImage.type = this.dataCrop.type
            canvas.toBlob(async blob => {
                // await this.$apiBase.post('upload/media', formData).then(res => {
                //     this.saveToCollection(res.data.result)
                // })
                dataImage.file = blob
                }, this.dataCrop.type);
            // this.closeModal()
            this.$nextTick(() => {
                 this.$emit('input', [dataImage])
                 this.listCrop.splice(0,1);
                 this.applyCrop()
                 if (this.listCrop.length === 0) this.closeModal()
                // this.updateValue()
            })
        },
      closeModal() {
          this.modal.status = false
          this.modal.key +=1
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


<style lang="scss">
.cropper-stencil {
&__preview {
  &:after,
  &:before {
    content: "";
    opacity: 0;
    transition: opacity 0.25s;
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }

  &:after {
    border-left: solid 1px white;
    border-right: solid 1px white;
    width: 33%;
    height: 100%;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
  }

  &:before {
    border-top: solid 1px white;
    border-bottom: solid 1px white;
    height: 33%;
    width: 100%;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
  }
}

&--dragging {
  .cropper-stencil__preview {
    &:after,
    &:before {
      opacity: 0.7;
    }
  }
}
}

.cropper-line {
border-color: rgba(#444444, 0.8);
}

.cropper-handler-wrapper {
width: 24px;
height: 24px;
&--west-north {
  transform: translate(0, 0);
}
&--east-south {
  transform: translate(-100%, -100%);
}
&--west-south {
  transform: translate(0, -100%);
}
&--east-north {
  transform: translate(-100%, 0);
}
}

.cropper-handler {
display: block;
position: relative;
flex-shrink: 0;
transition: opacity 0.5s;
border: none;
background: white;
height: 4px;
width: 4px;
opacity: 0;
top: auto;
left: auto;

&--west-north,
&--east-south,
&--west-south,
&--east-north {
  display: block;
  height: 16px;
  width: 16px;
  background: none;
  opacity: 0.7;
}

&--west-north {
  border-left: solid 2px white;
  border-top: solid 2px white;
}

&--east-south {
  border-right: solid 2px white;
  border-bottom: solid 2px white;
}

&--west-south {
  border-left: solid 2px white;
  border-bottom: solid 2px white;
}

&--east-north {
  border-right: solid 2px white;
  border-top: solid 2px white;
}

&--hover {
  opacity: 1;
}
}
.preview {
border: dashed 1px rgba(255,255,255, 0.25);
}

</style>