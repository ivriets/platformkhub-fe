<template>
    <div v-if="loaderDetail" class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumbBaru 
                :parent="'Resources'"
                :linkParent="'/moderations/resource'"
                :child="childBreadcrumb"
            />
        </div>
        <div  class="bg-white shadow-md rounded-xl py-8 px-6 mb-10 min-w-min">
            <div v-if="dataDetail" class="flex items-start justify-between mb-6">
                <div class="w-3/5">
                    <div class="font-medium mb-4 ">{{ dataDetail.judulArtikel[selectedFlag] }}</div>
                    <ElementsDisplayStatusSubmissionOval :submission="dataDetail.submission" />
                </div>
                <ElementsDisplayFlag 
                    v-model="selectedFlag"
                />
            </div>
            <div v-if="dataDetail" class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-4">
                    <ElementsDisplayImageDetail 
                        :image="basePath+dataDetail.imgThumbnail"
                        :label="$t('Thumbnail')"
                    />
                    <!-- <ElementsDisplayImageDetail 
                        :image="basePath+dataDetail.imgMainImage"
                        :label="$t('Main Image')"
                    /> -->

                    <div class="mb-6">
                        <ViewerFileResource v-if="dataDetail.resourcesFiles"  :source="dataDetail.resourcesFiles" />
                    </div>

                    <div class="grid grid-cols-12 gap-5">
                        <div class="col-span-12 lg:col-span-6 text-sm font-semibold">

                            <ElementsDisplayFieldBawah 
                                :title="$t('File')"
                                :content="dataDetail.resourcesFiles.typeResources.nama[selectedFlag]"
                            />

                        </div>
                        <div class="col-span-12 lg:col-span-6 text-sm font-semibold">
                            <ElementsDisplayFieldBawah 
                                :title="$t('Audience Type')"
                                :content="dataDetail.typeAudience.map(e => e.nama[selectedFlag]).join(', ')"
                            />
                        </div>
                    </div>
                    <ElementsDisplayFieldBawah 
                        :title="$t('Resource Category')"
                        :content="dataDetail.kategoriArtikel.map(e => e.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Approach')"
                        :content="dataDetail.typeApproach.map(e => e.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Issue')"
                        :content="dataDetail.typeIssues.map(e => e.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Tag')"
                        :content="dataDetail.resourcesTag.map(e => e.pilihanTagId.nama[selectedFlag]).join(', ')"
                    />
                    <ElementsDisplayFieldBawah 
                        :title="$t('Moderation Notes')"
                        :content="dataDetail.catatanModerasi"
                    />
                </div>
                <div class="col-span-12 lg:col-span-8">
                    <ElementsFotoNama 
                        :logo="basePath+dataDetail.myOrganisasi.imgLogoOrganisasi"
                        :label="dataDetail.myOrganisasi.namaOrganisasi"
                    />

                    <hr class="border-warna-tujuh my-5">

                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'datalabel' + index1" v-show="item1.posisi==='kiri'" class="grid grid-cols-12 mb-4 break-words gap-1">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['createdAt'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div v-for="(item1, index1) in dataLabel" :key="'dL' + index1" v-show="item1.posisi==='kanan'" class="grid grid-cols-12 mb-4 break-words">
                                <div class="col-span-12 md:col-span-4 lg:col-span-4 text-sm text-warna-delapan font-semibold">{{ $t(item1.label) }}</div>
                                <div class="col-span-12 md:col-span-8 lg:col-span-8 text-sm text-warna-sembilan font-semibold">
                                    <div v-if="['typeVisibility'].includes(item1.value)" class="">
                                        <!-- {{selectedFlag === 'indonesia' ? dataDetail[item1.value].nama[0] : dataDetail[item1.value].nama[1]}} -->
                                        <!-- <span v-if="item1.id === 1">Twitter</span> -->
                                    </div>
                                    <div v-else-if="['datePublish'].includes(item1.value)" class="">
                                        {{ $dayjs(dataDetail[item1.value]).format('DD MMM YYYY HH:mm') }}
                                    </div>
                                    <div v-else>
                                        {{ dataDetail[item1.value] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh mb-5">

                    <div class="mb-6">
                        <div class="text-warna-sembilan font-semibold mb-[16px]">{{ $t('Content') }}</div>
                        <div class="bg-warna-body rounded-lg text-sm text-warna-sembilan font-normal">
                            <ElementsDisplayDeskripsi 
                                :list="dataDetail.deskripsi"
                                :selectedFlag="selectedFlag"
                            />
                        </div>
                    </div>

                    <!-- <div class="">
                        <div class="text-warna-sembilan font-semibold mb-4">Gallery</div>
                        <div class="grid grid-cols-12 gap-4 bg-warna-body rounded-lg p-3">
                            <div v-for="(item, index) in dataDetail.resourcesGalleries" :key="'resourcegallery' + index" class="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                                <div 
                                    class="bg-no-repeat bg-center bg-contain rounded-[5px] bg-white" 
                                    style="height: 119px;" 
                                    :style="'background-image: url('+basePath+item.imgGambar+');'"
                                >
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div v-if="dataDetail" class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <button @click="btnBack" class="button-standar-outline">{{ $t('Back') }}</button>
                <div class="flex gap-x-6  font-semibold">
                    <button @click="btnEdit" class="button-standar-outline">{{ $t('Edit') }}</button>
                    <button @click="btnNeedRevisionResource" v-if="[1, 3, 4].includes(dataDetail.submission)" class="button-revision">Need Revision</button>
                    <button @click="btnApprove" v-if="[1, 3].includes(dataDetail.submission)" class="button-approve">Approve</button>
                    <!-- <div class="relative">
                        <select id="btnneedrevision" name="buttonneedrevision" v-model="buttonSubmission"
                            class="cursor-pointer appearance-none w-[180px] focus:outline-none border border-warna-tujuh rounded-lg px-4 py-2 text-white" :class="color">
                                <option v-for="(i, index) in opsiButton" :key="'opsi'+index" :value="i.id">
                                    {{i.label}}
                                </option>
                        </select>
                        <div class="absolute top-0 right-0 h-full items-center flex px-2">                
                            <img src="/icons/icon-arrow-down-white.png" alt="arrow-down" class="w-4 h-4">
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'revisiblog'"
            :persistent="persistent"
        >
            <div class="p-5">
                <InputTextArea 
                    v-model="form.catatanModerasi"
                    :max="500"
                    :name="'catatanmoderasi'"
                />
            </div>
            <template v-slot:footer >
                <div class="border-t px-3 py-4 ">
                    <button @click="btnRevisi" class="button-standar w-full">{{ $t('Save') }}</button>
                </div>
            </template>
        </ElementsModal>

        <!-- <pre>{{dataDetail}}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            loaderDetail: false,
            flagDrop: false,
            selectedFlag: 0,
            dataDetail: {
                resourcesFiles: {
                    typeResources: {
                        id: '',
                        nama: ['','']
                    }
                }
            },
            default: {
                resourcesFiles: {
                    typeResources: {
                        id: '',
                        nama: ['-','-']
                    }
                }
            },
            buttonSubmission: null,
            color: '',
            form: {
                catatanModerasi: ''
            },
            opsiButton: [
                {
                    id: 1,
                    label: 'Under Review'
                },
                {
                    id: 2,
                    label: 'Draft'
                },
                {
                    id: 3,
                    label: 'Need Revision'
                },
                {
                    id: 4,
                    label: 'Approved'
                }
            ],
            dataLabel: [
                {
                    label: 'Blog ID',
                    value: 'resourceId',
                    posisi: 'kiri'
                },
                {
                    label: 'Created',
                    value: 'createdAt',
                    posisi: 'kiri'
                },
                {
                    label: 'Moderator',
                    value: 'moderator',
                    posisi: 'kiri'
                },
                // {
                //     label: 'Visibility',
                //     value: 'typeVisibility',
                //     posisi: 'kanan'
                // },
                {
                    label: 'Date Publish',
                    value: 'datePublish',
                    posisi: 'kanan'
                }
            ],
            // KEPERLUAN MODAL NEED REVISION //
            modalAction: false,
            modalTitle: 'Konfirmasi Revisi',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //
            displayFile: {
                path: ''
            }
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        title() {
            return this.$t('Publikasi')
        },
        id() {
            return this.$route.params.id;
        },
        basePath() {
            return process.env.BASE_URL
        },
        childBreadcrumb() {
            return [
                {
                    label: 'Detail',
                    link: ''
                }
            ]
        }

    },
    watch: {
        buttonSubmission() {
            if (this.buttonSubmission === 1) {
                this.color = 'bg-warna-under-review'
            } else if (this.buttonSubmission === 2) {
                this.color = 'bg-warna-draft'
            } else if (this.buttonSubmission === 3) {
                this.color = 'bg-warna-need-revision'
            } else {
                this.color = 'bg-warna-approved-accepted'
            }
        }
    },
    mounted() {
        this.initialize()
    },
    head() {
        return{
            title: this.title
        }
    },
    methods: {
        initialize() {
            this.$store.commit('setPageTitle', this.title)
            this.masterPoint()
        },

        async masterPoint() {
            this.loaderDetail = false

            await this.$apiPlatform.get('moderator/resources/'+this.id+'/').then(res => {
                // console.log(res.data)
                const data = res.data
                this.dataDetail = data
                this.dataDetail.resourcesFiles = this.dataDetail.resourcesFiles === null ? _.cloneDeep(this.default.resourcesFiles) : this.dataDetail.resourcesFiles
                this.buttonSubmission = data.submission
                this.form.catatanModerasi = this.dataDetail.catatanModerasi

                console.log(this.dataDetail)
                this.$nextTick(() => {
                    this.loaderDetail = true
                })
            }).catch(err => {
                console.log(err)
            })
        },

        async btnApprove() {

            const data = {
                resourceId: this.id,
                submission: 4
            }

            await this.$apiPlatform.post('moderator/resources/', data).then(res => {
                this.$toast.show(this.dataDetail.judulArtikel[this.bahasa] + ' Approved ')
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },

        async btnRevisi() {

            const data = {
                resourceId: this.id,
                submission: 3,
                catatanModerasi: this.form.catatanModerasi
            }

            await this.$apiPlatform.post('moderator/resources/', data).then(res => {
                this.$toast.show(this.dataDetail.judulArtikel[this.bahasa] + ' Updated ')

                this.modalAction = false
                this.keyModal +=1
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        },

        btnBack() {
            this.$router.push('/moderations/resource')
        },

        btnEdit() {
            this.$router.push('/moderations/resource/'+this.id+'/edit')
        },



        btnNeedRevisionResource() {
            this.modalAction = true
            this.modalTitle = this.form.catatanModerasi ==='' || this.form.catatanModerasi === null ? this.$t('Revision Note') : this.$t('Change Note')
            this.keyModal += 1
        },

        btnModalBatal() {
            this.modalAction = false
            this.keyModal += 1
        },




    }
}
</script>