<template>
    <div v-if="form">
        <div class="bg-white rounded-xl shadow-md p-5 mb-9 w-full">
            <div>
                <div class="text-xl font-medium mb-[28px]">Hero</div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">Indonesia</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroTitle[0]"
                                    :name="prefixName+'judul'"
                                    :label="'Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroSubtitleTop[0]"
                                    :name="prefixName+'subjudulatas'"
                                    :label="'Sub Judul Atas'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroSubtitleBottom[0]"
                                    :name="prefixName+'subjudulbawah'"
                                    :label="'Sub Judul Bawah'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">English</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroTitle[1]"
                                    :name="prefixName+'judul'"
                                    :label="'Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroSubtitleTop[1]"
                                    :name="prefixName+'subtitletop'"
                                    :label="'Sub Title Top'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroSubtitleBottom[1]"
                                    :name="prefixName+'subtitlebottom'"
                                    :label="'Sub Title Bottom'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <InputImageUploadSingle 
                                :label="'Background'"
                                v-model="heroBackground"
                                :accept="'.png, .jpg, .jpeg,'"
                                :maxSize="10"
                                :useCrop="true"
                                :cropRatio="16/9"
                            />
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroAltBackground"
                                    :name="prefixName+'altbackground'"
                                    :label="'Alt Background'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroButtonText[1]"
                                    :name="prefixName+'textbuttonen'"
                                    :label="'Button Text (Eng)'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroButtonText[0]"
                                    :name="prefixName+'textbuttonid'"
                                    :label="'Tombol Text (Bahasa)'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.heroActionLink"
                                    :prefix="webUrl"
                                    :name="prefixName+'actionlink'"
                                    :label="'Call to Action Link'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="border-warna-tujuh my-10">

            <div>
                <div class="text-xl font-medium mb-[28px]">Invitation</div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">Indonesia</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationTitle[0]"
                                    :name="prefixName+'invjudulid'"
                                    :label="'Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationSubtitleBottom[0]"
                                    :name="prefixName+'invsubjudulid'"
                                    :label="'Sub Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationButtonText[0]"
                                    :name="prefixName+'invbuttontextid'"
                                    :label="'Tombol Teks (Bahasa)'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">English</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationTitle"
                                    :name="prefixName+'invjudulen'"
                                    :label="'Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationSubtitleBottom"
                                    :name="prefixName+'invsubjudulen'"
                                    :label="'Sub Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationButtonText"
                                    :name="prefixName+'invbuttontexten'"
                                    :label="'Button Text (Eng)'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <!-- <InputImageCrop 
                                :label="'Background'"
                                v-model="invitationBackground"
                                :accept="'.png, .jpg, .jpeg'"
                                :maxSize="5"
                            /> -->
                            <InputImageUploadSingle 
                                :label="'Background'"
                                v-model="invitationBackground"
                                :accept="'.png, .jpg, .jpeg,'"
                                :maxSize="5"
                                :useCrop="true"
                                :cropRatio="3/2"
                            />

                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invitationAltBackground"
                                    placeholder="Write here"
                                    :name="prefixName+'invaltbackground'"
                                    :label="'Alt Background'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div></div>
                <!-- <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div> -->
                <button @click="putData(form)" class="button-standar">{{ $t('Save') }}</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'homepage',
            form: undefined,
            heroBackground: "",
            invitationBackground: "",
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        },
        webUrl() {
            return process.env.WEB_URL
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
            await this.$apiBase.get('homepages/').then(res => {
                this.heroBackground= {
                    displayImage: res.data.heroBackground,
                    file: null
                }
                this.invitationBackground= {
                    displayImage: res.data.invitationBackground,
                    file: null
                }
                this.form =  res.data
            }).catch(err => {
                console.log(err)
            })
        },
        
        async uploadImage(image, untuk, name) {
            if (image instanceof Blob){
                var data = new FormData();
                data.append(untuk, image, name);
                await this.$apiBase.put('homepages/', data).then(res => {
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        save() {
            this.putData(this.form) 
        },
        async putData(data) {
            await this.$apiBase.put('homepages/', data).then(res => {
                
                if (this.heroBackground.file !== null) {
                    this.uploadImage(this.heroBackground.file, "heroBackground", this.heroBackground.name)
                }
                if (this.invitationBackground.file !== null) {
                    this.uploadImage(this.invitationBackground.file, "invitationBackground", this.invitationBackground.name)
                }
                this.$nextTick(() => {
                    this.$toast.show('Homepage ' + this.$t('updateSukses'))
                    this.initialize()
                })

            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>