<template>
  <div>
    <div class="flex items-start mb-1">
          <div v-if="label" class="font-medium mb-1">
              {{label}}
          </div>
      </div>

      <div  v-if="dataImage && dataImage.displayImage === ''"  class="image-area cursor-pointer" @dragover="dragOver" @dragleave="dragLeave" @drop="drop">
          <div class="min-h-[150px] w-full border-dashed border-2 border-warna-tujuh rounded-lg pt-[9px] pb-[25px] flex items-center justify-center">
              <div class="text-center">
                  <div class="text-xs text-[#BABABA] mb-2 text-center">
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
      <div v-if="dataImage && dataImage.displayImage !== ''"
      class="min-h-[150px] relative w-full border-dashed border-2 border-warna-tujuh rounded-lg p-3 flex items-center justify-center"
      >
        <img :class="previewClass?previewClass:'w-full'" class="h-full object-contain" :src="dataImage.displayImage" alt="" />
        <button title="Delete Image" @click="deleteImage()" class="absolute top-0 right-0 rounded-full text-xl opacity-70 hover:opacity-100 "><i class="ri-close-circle-fill"></i></button>

      </div>

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
                  :src="dataCrop.displayImage"
                  image-class="cropper__image"
                  ref="imagecropper"
                  :stencil-props="stencilProps"

                  image-restriction="stencil"
                  :auto-zoom="true"
                  @change="imageChange"
                  :stencil-component="useCircle && useCircle === true ? 'circle-stencil' : 'rectangle-stencil' "


              ></cropper>
                  <!-- <button  title="delete" @click="deleteImage()" class="absolute top-0 right-0 text-lg bg-gray-500 text-white h-5 w-5 mt-1 mr-1 rounded-full flex items-center justify-center"><i class="ri-close-fill"></i></button> -->
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
  props: ['value', 'maxSize', 'accept', 'label', 'useCrop', 'cropRatio', 'useCircle', 'previewClass'],
  components: {
      Cropper
  },
  data() {
      return {
          modal: {
              status: false,
              title: 'Gambar',
              key: 0
          },
          dataImage: {
            displayImage: null,
            file:null
          },
          defaultCoordinates: {
              left:0,
              top:0,
          },
          previewImage: '',
          displayResetCounter: 0,
          coordinates: {
            width: 670,
            height: 615,
            left: 0,
            top: 0,
          },
          croppedImage: null,
          ukuranAwal: {
            width: 0,
            height: 0,
            top:0,
            left:0
          },
          dataCrop: null,
          countDownFile: 0,
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
  computed: {
    basePath() {
      return process.env.BASE_URL
    }
  },
  watch: {
      // 'modal.status'(val) {
      //     if (val === false) {
      //         this.deleteImage()
      //     }
      // }
      
  },
  methods: {
      initialize() {
        this.stencilProps.aspectRatio = this.cropRatio && this.cropRatio !== '' ? this.cropRatio : 1;
          this.displayResetCounter = 0;
          // this.dataImage =  {
          //   displayImage: '',
          //   file:null, 
          //   status: ''
          // }

          if (this.value && (this.value.displayImage !== '' && this.value.displayImage !== undefined)) {

            const forPath = this.value.displayImage.substring(0,1) === '/' ? this.basePath : ''
            this.dataImage.displayImage = forPath + this.value.displayImage
          } else if (this.value !== '') {
            const forPath = this.value.substring(0,1) === '/' ? this.basePath : ''
            this.dataImage = {
              displayImage: forPath + this.value,
              file: null
            }
          } else {
            this.dataImage = {
              displayImage: '',
              file:null
            }
          } 


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
          this.$refs.inputfiles.files = event.dataTransfer.files
          this.prosesFiles(); 
          event.currentTarget.classList.add('bg-gray-100');
          event.currentTarget.classList.remove('bg-green-300');
      },
      openModal() {
          this.modal.status = true
          this.modal.key +=1
      },
      closeModal() {
          this.modal.status = false
          this.modal.key +=1
      },
      deleteImage() {
          this.dataImage = {
            displayImage: '',
            file: null
          }
          this.displayReset = false
          this.displayResetCounter = 0
          this.updateValue()
      },


      imageChange({coordinates, canvas}) {
          if (this.displayResetCounter === 0) {
              this.ukuranAwal = coordinates
          }
          this.displayResetCounter +=1
          this.coordinates = coordinates;
          this.displayReset = this.displayResetCounter > 1 ? true : false;
        // this.croppedImage = canvas.toDataURL();

      },
      resetImage() {
          this.$refs.imagecropper.setCoordinates(this.ukuranAwal)

      },
      batal() {
        this.deleteImage()
        this.closeModal()
        this.initialize()
      },

      simpan() {
        const { canvas } = this.$refs.imagecropper.getResult();
        this.dataImage.displayImage = canvas.toDataURL();
        this.dataImage.status = 'belumUpload'
        this.dataImage.name = this.dataCrop.name
        this.dataImage.type = this.dataCrop.type
        canvas.toBlob(async blob => {
              // await this.$apiBase.post('upload/media', formData).then(res => {
              //     this.saveToCollection(res.data.result)
              // })
              this.dataImage.file = blob
            }, this.dataCrop.type);
          this.closeModal()
          this.$nextTick(() => {
            this.updateValue()
          })

      },  
      updateValue() {
        this.$emit('input', this.dataImage)
      },
      prosesFiles() {
          // this.openModal();
          if (this.$refs.inputfiles.value === null) return false;
          const inputedFiles = this.$refs.inputfiles.files[0];
          const fileMaxSize = this.maxSize ? parseInt(this.maxSize) * 1024 * 1024 : 5 * 1024 * 1024 
          const ukuran = inputedFiles.size
          const panjangNama = inputedFiles.name.length
          if (ukuran > fileMaxSize) {
              this.$toast.show('Ukuran image ' +  inputedFiles.name + ' lebih dari ' + this.maxSize +'mb, silahkan upload dibawah ' + this.maxSize +'mb.' )
              this.$refs.inputfiles.value = null
          } else if (panjangNama > 99) {
                  this.$toast.show('nama berkas image terlalu panjang, mohon diperpendek ' )
              this.$refs.inputfiles.value = null

          } else {
              const data = {
                        file: inputedFiles,
                        displayImage: URL.createObjectURL(inputedFiles),
                        type: inputedFiles.type,
                        name: inputedFiles.name
                    }

              if (this.useCrop) {
                this.dataCrop = data
                this.openModal()
              } else {
                this.dataImage = data
                this.updateValue()
              }

              return true
          }
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
border-color: rgba(white, 0.8);
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