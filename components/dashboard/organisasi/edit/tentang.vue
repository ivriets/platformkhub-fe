<template>
    <div>
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9 mb-5 md:mb-10">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.namaOrganisasi"
                        placeholder="Tulis disini"
                        :name="prefixName+'namaorganisasi'"
                        :label="'Nama Organisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.websiteOrganisasi"
                        placeholder="Tulis disini"
                        :name="prefixName+'weborganisasi'"
                        :label="'Web/URL Organisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeOrganisasi"
                        :name="prefixName+'tipeorganisasi'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Organisasi'"
                        :opsi="typeOrganisasi"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeorganisasi'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeAudience"
                        :name="prefixName+'tipeaudience'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Audience'"
                        :opsi="typeAudience"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeaudience'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeApproach"
                        :name="prefixName+'tipeapproach'"
                        :placeholder="'Tulis disini'"
                        :label="'Tipe Approach'"
                        :opsi="typeApproach"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'tipeapproach'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputAutocompleteMulti 
                        v-model="form.typeIssues"
                        :name="prefixName+'topik'"
                        :placeholder="'Tulis disini'"
                        :label="'Topik'"
                        :opsi="typeIssues"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'topik'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputSelect 
                        v-model="form.hierarki"
                        :name="prefixName+'hierarki'"
                        :label="'Hierarki'"
                        :opsi="opsiHierarki"
                        :placeholder="'Pilih'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="font-medium mb-2">Tema Warna Latar Belakang</div>
                <div class="flex items-center gap-x-3">
                    <!-- #222222 -->
                    <div @click="btnWarnaSatu" class="bg-white border rounded-full" :class="form.tampilan === '#222222' ? 'border-latar-satu' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-satu rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #176988 -->
                    <div @click="btnWarnaDua" class="bg-white border rounded-full" :class="form.tampilan === '#176988' ? 'border-latar-dua' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-dua rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #1E784B -->
                    <div @click="btnWarnaTiga" class="bg-white border rounded-full" :class="form.tampilan === '#1E784B' ? 'border-latar-tiga' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-tiga rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #753A00 -->
                    <div @click="btnWarnaEmpat" class="bg-white border rounded-full" :class="form.tampilan === '#753A00' ? 'border-latar-empat' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-empat rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #DB4339 -->
                    <div @click="btnWarnaLima" class="bg-white border rounded-full" :class="form.tampilan === '#DB4339' ? 'border-latar-lima' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-lima rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #BC185D -->
                    <div @click="btnWarnaEnam" class="bg-white border rounded-full" :class="form.tampilan === '#BC185D' ? 'border-latar-enam' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-enam rounded-full cursor-pointer"></div>
                    </div>
                    <!-- #4B4B9D -->
                    <div @click="btnWarnaTujuh" class="bg-white border rounded-full" :class="form.tampilan === '#4B4B9D' ? 'border-latar-tujuh' : 'border-white'">
                        <div class="w-5 h-5 m-1 bg-latar-tujuh rounded-full cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr class="border-warna-tujuh my-10">
        <div class="">
            <div class="text-xl font-semibold mb-10">Tentang Organisasi</div>
            <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputSelect 
                            v-model="form.lokasiOrganisasi[0].provinsi"
                            :name="prefixName+'provinsi'"
                            :label="'Provinsi'"
                            :opsi="opsiProvinsi"
                            :placeholder="'Pilih'"
                        />
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-model="form.lokasiOrganisasi[0].kota"
                            placeholder="Tulis disini"
                            :name="prefixName+'kota'"
                            :label="'Kota'"
                        />
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <div class="flex items-start mb-1">
                            <div class="font-medium">Photo/Picture</div>
                            <div class="text-[#DF4B61] ml-1">*</div>
                        </div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <div class="flex items-start mb-1">
                            <div class="font-medium">Foto/Gambar</div>
                            <div class="text-[#DF4B61] ml-1">*</div>
                        </div>
                        <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                            <div class="text-xs text-[#BABABA] mb-2">
                                <div>288x288 px (square)<br>JPG, GIF or PNG maksimum 1MB.</div>
                            </div>
                            <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-model="form.highlight[1]"
                            placeholder="Write here"
                            :name="prefixName+'highlighten'"
                            :label="'Highlight (English)'"
                        />
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-model="form.highlight[0]"
                            placeholder="Tulis disini"
                            :name="prefixName+'highlightid'"
                            :label="'Sorotan (Indonesia)'"
                        />
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="">
                        <InputTextArea 
                            v-model="form.deskripsi[1]"
                            :max="500"
                            placeholder="Write here"
                            :label="'Organization Description (English)'"
                            :name="prefixName+'deskripsien'"
                        />
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="">
                        <InputTextArea 
                            v-model="form.deskripsi[0]"
                            :max="500"
                            placeholder="Tulis disini"
                            :label="'Deskripsi Organisasi (Indonesia)'"
                            :name="prefixName+'deskripsiid'"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- <pre>{{form}}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'tentang',
            form: {
                namaOrganisasi: '',
                websiteOrganisasi: '',
                hierarki: '',
                typeOrganisasi: [],
                typeAudience: [],
                typeApproach: [],
                typeIssues: [],
                tampilan: '',
                lokasiOrganisasi: [
                    {
                        provinsi: '',
                        kota: '',
                        jalan: '',
                        pinLocation: ''
                    }
                ],
                highlight:['',''],
                deskripsi:['','']
            },
            opsiProvinsi: [
                {
                    id: 'Jawa Barat',
                    label: 'Jawa Barat'
                },
                {
                    id: 'Jawa Tengah',
                    label: 'Jawa Tengah'
                },
                {
                    id: 'Jawa Timur',
                    label: 'Jawa Timur'
                },
                {
                    id: 'DKI Jakarta',
                    label: 'DKI Jakarta'
                },
                {
                    id: 'Sumatera Utara',
                    label: 'Sumatera Utara'
                },
                {
                    id: 'Bali',
                    label: 'Bali'
                },
                {
                    id: 'Sumatera Selatan',
                    label: 'Sumatera Selatan'
                }
            ],
        }
    },
    computed: {
        typeOrganisasi() {
            return this.$store.state.opsi.typeOrganisasi
        },

        typeAudience() {
            return this.$store.state.opsi.typeAudience
        },

        typeApproach() {
            return this.$store.state.opsi.typeApproach
        },

        typeIssues() {
            return this.$store.state.opsi.typeIssues
        },

        opsiHierarki() {
            return this.$store.state.opsi.hierarki
        },
    },
    methods: {
        btnWarnaSatu() {
            this.form.tampilan = '#222222'
        },

        btnWarnaDua() {
            this.form.tampilan = '#176988'
        },

        btnWarnaTiga() {
            this.form.tampilan = '#1E784B'
        },

        btnWarnaEmpat() {
            this.form.tampilan = '#753A00'
        },

        btnWarnaLima() {
            this.form.tampilan = '#DB4339'
        },

        btnWarnaEnam() {
            this.form.tampilan = '#BC185D'
        },

        btnWarnaTujuh() {
            this.form.tampilan = '#4B4B9D'
        }
    },
}
</script>