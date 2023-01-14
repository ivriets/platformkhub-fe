<template>
    <div v-if="form" class="py-[48px]">
        <div class="mb-6">
            <ElementsBreadcrumb 
                :parent="'Program'"
                :linkParent="'/moderations/programrogram'"
                :child="childBreadcrumb"
            />
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-9">
                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[0]"
                            placeholder="Tulis disini"
                            :name="prefixName+'titleid'"
                            :label="'Title (Bahasa Indonesia)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[0].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div class="mb-6">
                        <InputText 
                            v-model="form.judulActivity[1]"
                            placeholder="Write here"
                            :name="prefixName+'titleen'"
                            :label="'Title (English)'"
                            :max="maxTitle"
                            :counter="true"
                        />
                        <!-- <div class="text-xs text-warna-dua mt-1">{{form.judulActivity[1].length}}/{{maxTitle}}</div> -->
                    </div>

                    <div>
                        <InputImageUploadSingle 
                            :label="$t('gambarUtama')"
                            v-model="imgMainImage"
                            :accept="'.png, .jpg, .jpeg'"
                            :maxSize="1"
                            :useCrop="true"
                            :cropRatio="4/3"
                            v-if="imageLoader"
                            :key="'imgmainimage'+imageKey"
                        />
                    </div>
                    <hr class="border-warna-tujuh my-10">

                    <div>
                        <div class="text-xl text-warna-utama mb-[28px]">Content</div>                       
                        <InputContentSection 
                            v-if="form.deskripsi"
                            v-model="form.deskripsi"
                            :list="form.deskripsi"
                        />
                    </div>

                    <hr class="border-warna-tujuh my-10">
                    
                    <div class="mb-10">
                        <div class="text-xl text-warna-utama mb-[28px]">Date & Location</div>
                        <div class="grid grid-cols-12 gap-4">
                            <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalMulai"
                                    :value="form.tanggalMulai"
                                    :label="'Start Date'"
                                    :name="prefixName+'tanggalmulai'"
                                    :key="'tglmulai'+keyTanggal"
                                />
                            </div>
                             <div  class="col-span-12 lg:col-span-6">
                                <InputDate
                                    v-model="form.tanggalSelesai"
                                    :value="form.tanggalSelesai"
                                    :label="'End Date'"
                                    :name="prefixName+'tanggalselesai'"
                                    :key="'tglselesai'+keyTanggal"
                                    :disabledBefore="disBefore"
                                    :disabledDate="disDate"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <DashboardProgramEditParent 
                            v-model="form.lokasi"
                        />
                        <!-- <div class="flex items-center justify-between mb-3">
                            <div class="">Location</div>
                            <button class="btn-tambah text-sm" @click="btnAddLokasi">Add Location</button>
                        </div>
                        <div class="text-xs text-warna-delapan mb-4">Choose Active Location</div>
                        <div>
                            <ElementsTableWithSelect 
                                v-model="form.lokasi"
                                :dataTable="form.lokasi"
                                :title="'Lokasi'"
                            >

                            </ElementsTableWithSelect>
                        </div> -->
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="mb-10">
                        <div class="text-xl mb-1">Gallery</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>You can choose multiple images.</div>
                                <div>JPG, GIF, PNG no larger than 1 MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                        </div>
                    </div>


                    <div class="flex items-center lg:gap-4 gap-2">
                        <div v-for="(item, index) in daftarGalleri" :key="'galleri'+index" class="relative bg-white shadow-md border border-gray-50 rounded-xl">
                            <img class="h-16" :src="basePath+item.imgGambar" alt="main-image">
                            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer flex items-center mr-2 mt-2 hover:bg-gray-100">
                                <img class="w-[10px] h-[10px]" src="/icons/icon-close.png" alt="icon-delete">
                            </div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-xl">Testimony</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                             <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                            <div @click="btnAddTestimony" class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Testimony</div>
                            </div>
                        </div>
                        <div class="text-xs text-warna-delapan mb-4">Choose Testimony</div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    
                    <div class="">
                        <div class="flex items-center justify-between mb-4">
                            <div class=" text-xl mb-1">Milestone</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div @click="btnAddMilestone" class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Milestone</div>
                            </div>
                        </div>
                        <div class="">
                            <ElementsTableWithoutHeader 
                                v-model="form.fase"
                                :dataTable="form.fase"
                                :title="'Milestone'"
                                :untuk="'faseprogram'"
                            >
                            </ElementsTableWithoutHeader>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-xl">Report</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div @click="btnAddReport" class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Report</div>
                            </div>
                        </div>
                        <div class="">
                            tabel
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="mb-10">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-xl text-warna-utama">Journey</div>
                            <div @click="btnAddJourney" class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add Journey</div>
                            </div>
                        </div>
                        <div class="">
                            <ElementsTableWithoutHeader 
                                v-model="form.journey"
                                :dataTable="form.journey"
                                :title="'Journey'"
                                :untuk="'journeyprogram'"
                            >
                            </ElementsTableWithoutHeader>
                        </div>
                    </div>

                    <div class="text-xl mb-8 text-warna-utama">Impact</div>

                    <div class="mb-10">
                        <div class="flex items-center mb-3">
                            <div class="flex flex-grow font-semibold mb-1">Baseline-Endline Survey</div>
                            <div class="flex items-center gap-x-1 py-2 px-3 cursor-pointer">
                                <img class="w-4 h-4" src="/icons/icon-plus.png" alt="icon-add">
                                <div class="text-sm text-warna-empat font-medium cursor-pointer underline">Add</div>
                            </div>
                        </div>

                        <div class="flex flex-grow font-semibold mb-1">Variable Pengukuran</div>                        

                    </div>


                    <div v-if="activityResult" class="">
                        <div class="flex flex-grow font-semibold mb-1 text-warna-utama">Retention</div>
                            <div class="grid grid-cols-12 gap-5">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="my-6 text-warna-utama font-semibold">During the Program</div>
                                    <div class="max-w-[250px]">
                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="activityResult.retentionSaatProgramMen"
                                                :value="activityResult.retentionSaatProgramMen"
                                                :name="prefixName+'retentionsaatprogrammen'"
                                                :label="'Men'"
                                                :step=0.1
                                            />
                                        </div>

                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="activityResult.retentionSaatProgramWomen"
                                                :name="prefixName+'retentionsaatprogramwomen'"
                                                :label="'Women'"
                                                :step=1
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-span-12 lg:col-span-6">
                                    <div class="my-6 text-warna-utama font-semibold">Post-Program</div>
                                    <div class="max-w-[250px]">
                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="activityResult.retentionPascaProgramMen"
                                                :name="prefixName+'retentionpascaprogrammen'"
                                                :label="'Men'"
                                                :step=1
                                            />
                                        </div>

                                        <div class="mb-5">
                                            <InputNumber
                                                v-model="activityResult.retentionPascaProgramMen"
                                                :name="prefixName+'retentionpasceprogramwomen'"
                                                :label="'Women'"
                                                :step=1
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="font-semibold mb-1 text-warna-utama">Satisfaction</div>
                    </div>



                    <hr class="border-warna-tujuh my-10">

                    <div class="">
                        <div class="font-semibold mb-1 text-warna-utama">Customer Acquisition Score (CAC)</div>
                    </div>

                </div>



                <div class="col-span-12 lg:col-span-3">
                    <div class="bg-[#FAFAFA] p-5 rounded-lg mb-[28px]">
                        <div class="mb-6">
                            <div class="flex items-center text-sm">
                                <div class="text-warna-sembilan">Status:</div>
                                <div class="text-approved-accepted ml-1">Approved</div>
                            </div>
                            <div class="flex items-center text-sm text-warna-sembilan">
                                <div class="">Bookmark by: </div>
                                <div class="ml-1">{{totalBookmark}}</div>
                            </div>
                        </div>
                        <div class="bg-warna-empat text-white rounded-lg py-4 text-center mx-0 cursor-pointer hover:bg-blue-900">Submit</div>
                    </div>

                    <div class="">
                        <div class="font-medium">Thumbnail</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>jpg or png no larger than 25MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Pilih File</div>
                        </div>
                    </div>

                    <hr class="border-warna-tujuh my-[28px]">

                    

                    <div v-if="listIndividu && form.officer" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.officer"
                            :name="prefixName+'officer'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Officer')"
                            :opsi="listIndividu"
                            :value="form.officer"
                            :itemValue="'userId'"
                            :itemLabel="'label'"
                            :key="prefixName+'officer'"
                        />
                    </div>
                    <div v-if="listOrganisasi && form.partner" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.partner"
                            :name="prefixName+'partner'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Partner')"
                            :opsi="listOrganisasi"
                            :value="form.partner"
                            :itemValue="'organisasiId'"
                            :itemLabel="'label'"
                            :key="prefixName+'partner'"
                        />
                    </div>
                    <div v-if="typeAudience && form.typeAudience" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeAudience"
                            :name="prefixName+'tipeaudience'"
                            :placeholder="'Tulis disini'"
                            :label="'Tipe Audience'"
                            :opsi="typeAudience"
                            :value="form.typeAudience"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tipeaudience'"
                        />
                    </div>
                    <div v-if="typeApproach && form.typeApproach" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeApproach"
                            :name="prefixName+'tipeapproach'"
                            :placeholder="'Tulis disini'"
                            :label="'Tipe Approach'"
                            :opsi="typeApproach"
                            :value="form.typeApproach"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tipeapproach'"
                        />
                    </div>
                    <div v-if="typeIssues && form.typeIssues" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.typeIssues"
                            :name="prefixName+'topik'"
                            :placeholder="'Tulis disini'"
                            :label="'Topik'"
                            :opsi="typeIssues"
                            :value="form.typeIssues"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'topik'"
                        />
                    </div>

                    <div v-if="listTag && form.tag" class="mb-6">
                        <InputAutocompleteMulti 
                            v-model="form.tag"
                            :name="prefixName+'tag'"
                            :placeholder="'Tulis disini'"
                            :label="$t('Tag')"
                            :opsi="listTag"
                            :itemValue="'id'"
                            :itemLabel="'label'"
                            :key="prefixName+'tag'"
                        />
                    </div>

                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>

        <!-- POP UP TESTIMONI-->
        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'tambahTestimony'"
            :persistent="persistent"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="font-medium mb-1">Foto Profil</div>
                    <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>200 x 200px</div>
                            <div>JPG or PNG no larger than 1 MB.</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                    </div>
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.namatestimony"
                        placeholder="Tulis disini"
                        :name="prefixName+'namatestimony'"
                        :label="'Nama'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="form.tambahTestimony"
                        placeholder="Tulis testimony"
                        :name="prefixName+'tambahTestimony'"
                        :label="'Testimony'"
                    />
                </div>

                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Tambah</div>
                </div>
            </div>
        </ElementsModal>

        <!-- POP UP LOKASI-->
        <ElementsModal 
            v-model="modalActionLokasi"
            :title="modalTitleLokasi"
            :width="modalWidthLokasi"
            :key="keyModalLokasi+'tambahLokasi'"
            :persistent="persistentLokasi"
        >
            <div class="p-6">
                <div class="mb-5">
                    <InputSelect 
                        v-model="form.provinsi"
                        :name="prefixName+'provinsi'"
                        :label="'Provinsi'"
                        :opsi="opsiProvinsi"
                        :placeholder="'Pilih provinsi'"
                    />
                </div>
                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Tambah</div>
                </div>
            </div>
        </ElementsModal>

        <!-- POP UP MILESTONE-->
        <ElementsModal 
            v-model="modalActionMilestone"
            :title="modalTitleMilestone"
            :width="modalWidthMilestone"
            :key="keyModalMilestone+'milestone'"
            :persistent="persistentMilestone"
        >
            <div class="p-6">
                <div class="mb-5">
                    <InputSelect 
                        v-model="formEntry.statusMilestone"
                        :name="prefixName+'status'"
                        :label="'Status'"
                        :opsi="opsiStatusMilestone"
                        :placeholder="'Pilih status'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.milestone.judul[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'judulid'"
                        :label="'Judul(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.milestone.judul[1]"
                        placeholder="Write here"
                        :name="prefixName+'judulen'"
                        :label="'Title(English)'"
                    />
                </div>
                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Tambah</div>
                </div>
            </div>
        </ElementsModal>

        <!-- POP UP REPORT-->
        <ElementsModal 
            v-model="modalActionReport"
            :title="modalTitleReport"
            :width="modalWidthReport"
            :key="keyModalReport+'report'"
            :persistent="persistentReport"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>pdf no larger than 25MB.</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto cursor-pointer">Choose File</div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Tambah</div>
                </div>
            </div>
        </ElementsModal>

        <!-- POP UP JOURNEY-->
        <ElementsModal 
            v-model="modalActionJourney"
            :title="modalTitleJourney"
            :width="modalWidthJourney"
            :key="keyModalJourney+'journey'"
            :persistent="persistentJourney"
        >
            <div class="p-6">
                <div class="mb-5">
                    <div class="">
                        <div class="font-medium">Image</div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>jpg or png no larger than 25MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Pilih File</div>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.journey.judul[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'judulid'"
                        :label="'Judul(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.journey.judul[1]"
                        placeholder="Write here"
                        :name="prefixName+'judulen'"
                        :label="'Title(English)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.journey.deskripsi[0]"
                        placeholder="Tulis disini"
                        :name="prefixName+'desid'"
                        :label="'Deskripsi(Bahasa)'"
                    />
                </div>
                <div class="mb-5">
                    <InputText 
                        v-model="formEntry.journey.deskripsi[1]"
                        placeholder="Write here"
                        :name="prefixName+'desen'"
                        :label="'Description(English)'"
                    />
                </div>
                <div class="flex justify-end">
                    <div class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Tambah</div>
                </div>
            </div>
        </ElementsModal>
        <pre>{{ form }}</pre>
    </div>
</template>


<script>
export default {
    data() {
        return {
            keyMaster: 0,
            keyTanggal: 0,
            disBefore: false,
            disDate: '',

            // MODAL TESTIMONI
            modalAction: false,
            modalTitle: 'Testimoni',
            modalWidth: '',
            keyModal:0,
            persistent: true,
            // kenapa gak dibuat object aja

            // MODAL LOKASI
            modalActionLokasi: false,
            modalTitleLokasi: 'Lokasi',
            modalWidthLokasi: '',
            keyModalLokasi:0,
            persistentLokasi: true,
            //

            // MODAL MILESTONE
            modalActionMilestone: false,
            modalTitleMilestone: 'Milestone',
            modalWidthMilestone: '',
            keyModalMilestone:0,
            persistentMilestone: true,
            //

            // MODAL REPORT
            modalActionReport: false,
            modalTitleReport: 'Report',
            modalWidthReport: '',
            keyModalReport:0,
            persistentReport: true,
            //

            // MODAL JOURNEY
            modalActionJourney: false,
            modalTitleJourney: 'Report',
            modalWidthJourney: '',
            keyModalJourney:0,
            persistentJourney: true,
            //

            formEntry: {
                milestone: {
                    status: 0,
                    judul: ['', '']
                },
                journey: {
                    judul: ['', ''],
                    deskripsi: ['', ''],
                    image: ''
                }
            },
            imgMainImage: {
                file: null,
                image: ''
            },
            imageLoader: false,
            imageKey: 0,

            opsiProvinsi: [],
            opsiKota: [],
            opsiStatusMilestone: [
                {
                    id: 1,
                    label: ['Selesai', 'Completed']
                },
                {
                    id: 2,
                    label: ['Belum Selesai', 'Incompleted']
                }
            ],


            prefixName: 'program',
            maxTitle: 80,
            tableLokasiProgram: null,
            activityResult: undefined,
            dataTable: [
                {
                    pkLokasiActivityId: "LyFYfUVW",
                    provinsi: "DKI Jakarta",
                    kota: "Jakarta Pusat",
                    jalan: "jalan sudirman no 80",
                    pinLocation: "VW25+RP",
                    systemRowId: "sFlsjzvO"
                },
                {
                    pkLokasiActivityId: "LyFYfUVW",
                    provinsi: "Jawa Barat",
                    kota: "Bandung",
                    jalan: "Jalan Oto Iskandar Dinata no 15",
                    pinLocation: "VW25+RP",
                    systemRowId: "sFlsjzvO"
                }
            ],
            childBreadcrumb: [],
            form: {
                judulActivity: ['',''],
                // deskripsiPanjang: ['',''],
                deskripsi:undefined,
                tanggalMulai: '',
                tanggalSelesai: '',
                officer:undefined,
                partner:undefined,
                typeAudience: undefined,
                typeApproach: undefined,
                typeIssues: undefined,
                tag: undefined,
                tambahTestimony:[],
                namaTestimony:[],
                retentionSaatProgramMen:'',
            },
            opsiTag: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            officer: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            partner: [
                {
                    id: 1,
                    label: ['Pembelajaran', 'Pembelajaran']
                },
                {
                    id: 2,
                    label: ['Kekerasan', 'Kekerasan']
                }
            ],
            tableMilestone: null,
            tableJourney: null,
            daftarGalleri: [],
            totalBookmark: 0,
            listIndividu: undefined,
            listOrganisasi: undefined,
            listTag: undefined, 
        }
    },
    computed: {
        typeAudience() {
            return this.$store.state.opsi.typeAudience
        },

        typeApproach() {
            return this.$store.state.opsi.typeApproach
        },

        typeIssues() {
            return this.$store.state.opsi.typeIssues
        },

        lang() {
            return this.$i18n.locale
        },

        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },

        title() {
            return this.$t('Blog')
        },

        id() {
            return this.$route.params.id;
        },

        basePath() {
            return process.env.BASE_URL
        }
    },
    watch: {
        'form.tanggalMulai'(val) {
            if (val !== '') {
                this.disBefore = true
                this.disDate = val
                this.keyTanggal +=1
            } else {
                this.disBefore = false
                this.disDate = ''
                this.keyTanggal +=1
            }
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.imageLoader = false;

            this.masterPoint()
            this.setBreadcrumb()
        },

        async masterPoint() {
            await this.$apiBase.get('provinsi/').then(res => {
                const data = res.data
                this.opsiProvinsi = _.map(data, function(o){
                    return {'id':o.provinsi, 'label':[o.provinsi, o.provinsi]}
                })

            }).catch(err => {
                console.log(err)
            })


            await this.$apiPlatform.get('verificator/listIndividu/').then(res => {
                this.listIndividu = res.data
            }).catch(err => {
                console.log(err)
            })


            await this.$apiPlatform.get('verificator/listOrganisasi/').then(res => {
                this.listOrganisasi = res.data
            }).catch(err => {
                console.log(err)
            })


            await this.$apiPlatform.get('daftarList/tag/').then(res => {
                this.listTag = _.flatMap(res.data.results, function(o){
                    return {"id":o.id, 'label':o.nama}
                })
            }).catch(err => {
                console.log(err)
            })


            await this.$apiPlatform.get('moderator/programs/'+this.id+'/').then(res => {
                var data = res.data
                
                console.log(data)
                this.form = {
                    judulActivity: data.judulActivity,
                    deskripsi: data.deskripsi,
                    tanggalMulai: data.tanggalMulai,
                    tanggalSelesai: data.tanggalSelesai,
                    officer: data.officer,
                    partner: _.map(data.partnerActivityInternal, function(o){return o.partner}),
                    typeAudience: _.flatMap(data.typeAudience, "id"),
                    typeApproach: _.flatMap(data.typeApproach, "id"),
                    typeIssues: _.flatMap(data.typeIssues, "id"),
                    tag: _.flatMap(_.map(data.tag, function(o){return o.pilihanTagId}), "id"),
                    lokasi:data.lokasi,
                    tambahTestimony:[],
                    namaTestimony:[],
                    retentionSaatProgramMen:'',
                    fase: data.fase,
                    journey : data.journey
                }
                this.imgMainImage.image = data.imgMainImage;
                this.daftarGalleri = data.galleries
                this.activityResult = data.activityResult[0]
                this.totalBookmark = data.totalBookmark
                if (!data.deskripsi || data.deskripsi.length == 0){
                    this.form.deskripsi = []
                    this.form.deskripsi.push({"typeDeskripsi": 2,"imgDeskripsi": "","caption": ["-","-"],"paragraf": data.deskripsiPanjang, "sorter": 0})
                }
                this.$nextTick(() => {
                    this.imageLoader = true;
                    this.imageKey +=1
                    this.keyTanggal +=1
                })
            })

        },

        setBreadcrumb() {
            this.childBreadcrumb = [
                {
                    label: 'Detail',
                    link: '/moderations/program/'+this.id
                },
                {
                    label: 'Editor',
                    link: ''
                }
            ]
        },

        btnBack() {
            this.$router.push('/moderations/program/'+this.id)
        },

        btnAddTestimony() {
            this.modalAction = true
            this.keyModal += 1
        },

        btnAddLokasi() {
            this.modalActionLokasi = true
            this.keyModalLokasi += 1
        },

        btnAddMilestone() {
            this.modalActionMilestone = true
            this.keyModalMilestone += 1
        },

        btnAddReport() {
            this.modalActionReport = true
            this.keyModalReport += 1
        },

        btnAddJourney() {
            this.modalActionJourney = true
            this.keyModalJourney += 1
        },
    }
}
</script>