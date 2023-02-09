<template>
    <div  class="bg-white p-5 rounded-3xl shadow-md">
        <div class="text-xl font-semibold text-[#212121] mb-[28px]">Slider Editor</div>
        <div class="grid grid-cols-12 gap-x-4 gap-y-[28px]">
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    v-model="form.judul[0]"
                    :name="prefixName+'titleId'"
                    :label="'Indonesia Title'"
                    :required="true"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    v-model="form.judul[1]"
                    :name="prefixName+'titleEn'"
                    :label="'English Title'"
                    :required="true"

                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputTextArea 
                    v-model="form.deskripsi[0]"
                    :max="500"
                    :label="'Indonesia Description'"
                    :name="prefixName+'descId'"
                    :required="true"

                    />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputTextArea 
                    v-model="form.deskripsi[1]"
                    :max="500"
                    :label="'English Description'"
                    :name="prefixName+'descEn'"
                    :required="true"

                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <!-- <div class="pb-10">
                    <div class="font-medium mb-1">Image</div>
                    <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>16 : 9</div>
                            <div>JPG, GIF, PNG no larger than 25 MB</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto text-[#45A6FF] cursor-pointer">Choose File</div>
                    </div>
                </div> -->
                <InputImageUploadSingle 
                    v-model="gambar"
                    :maxSize="5"
                    :label="$t('Image')"
                    :useCrop="true"
                    :cropRatio="16/9"
                    :key="'fdafda'+keyImage"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    placeholder="Write Here"
                    :name="prefixName+'titleid'"
                    :label="'Alt Image'"
                />
            </div>
        </div>
        <hr class="bg-#9E9E9E h-0.25 pb-9 px-14px mt-10">
        <div class="flex justify-end">
            <button @click="save" class="button-standar">{{ $t('Save') }}</button>
        </div>

    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'slider',
            form: {
                judul: ['',''],
                deskripsi: ['',''],
                image: ''

            },
            gambar: {
                file: null,
                displayImage: ''
            },
            keyImage:0

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
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiBase.get('sliderloker/kcMzuavg/').then(res => {
                this.form = res.data
                this.gambar.displayImage = res.data.gambar
                this.keyImage+=1
            }).catch(err => {
                console.log(err)
            })
        },
        errorNotif(msg) {
            this.$toast.show({
                type: 'danger',
                title: 'Error',
                message: msg,
            })
        },
        focusField(id) {
            document.getElementById(this.prefixName + id).focus()
        },
        errorField(msg, id) {
            this.errorNotif(msg);
            this.focusField(id)
        },
        save() {
            if (this.form.judul[0]==='') {
                this.errorField(this.$t('indonesiaTitleBlank'), 'titleId')
            } else if (this.form.judul[1]==='') {
                this.errorField(this.$t('indonesiaTitleBlank'), 'titleEn')
            } else if (this.form.deskripsi[0] === '') {
                this.errorField(this.$t('indonesiaDescBlank', 'descId')) 
            } else if (this.form.deskripsi[1]==='1') {
                this.errorField(this.$t('englishDescBlank', 'descEn')) 

            } else {
                this.simpan()
            }
        },  
        async simpan() {          
            const simpan = {
                judul: this.form.judul,
                deskripsi: this.form.deskripsi
            } 
            await this.$apiBase.put('sliderloker/kcMzuavg/',simpan).then(res => {
                if (this.gambar.file !== null) {
                    this.uploadImage(this.gambar.file, this.gambar.name )
                } else {
                    this.$toast.show('Slider ' + this.$t('updateSukses'))
                    this.initialize()
                }

            }).catch(err => {
                console.log(err)
            })
        }, 
        async uploadImage(image, name) {
            if (image instanceof Blob){
                var data = new FormData();
                data.append('gambar', image, name);
                await this.$apiBase.put('sliderloker/kcMzuavg/', data).then(res => {
                    // console.log(res.data)
                    this.$toast.show('Slider ' + this.$t('updateSukses'))

                }).catch(err => {
                    console.log(err)
                })
            }
        },
        

    },
}
</script>