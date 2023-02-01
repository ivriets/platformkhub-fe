<template>
    <div>
        <div class="bg-white p-5 shadow-md">
            <div class="text-xl font-semibold text-warna-utama mb-[28px]">Recruitment Editor</div>
            <div class="grid grid-cols-12 gap-x-4 gap-y-[28px] mb-7">
                <div class="col-span-12 md:col-span-6">
                    <InputText 
                        placeholder="Write Here"
                        :name="prefixName+'titleid'"
                        :label="'Indonesia Title'"
                        v-model="form.judul[0]"
                    />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <InputText 
                        placeholder="Write here"
                        :name="prefixName+'titleen'"
                        :label="'English Title'"
                        v-model="form.judul[1]"
                    />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <InputAutocompleteMulti 
                        v-model="form.kategori"
                        :name="prefixName+'department'"
                        :placeholder="'Search or Add'"
                        :label="'Department'"
                        :opsi="opsiDepartment"
                        :itemValue="'id'"
                        :itemLabel="'label'"
                        :key="prefixName+'dept'"
                    />
                </div>
                <div class="col-span-12 md:col-span-6 w-full">
                    <InputDropdown 
                        v-model="form.status"
                        :label="'Status'"
                        :name="'status'"
                        :opsi="opsiStatusOpenRec"
                    />
                </div>
            </div>
        
            <div class="mb-7">
                <div class="font-medium mb-1">{{$t('Deskripsi')}} (Indonesia)</div>
                <InputTextEditor 
                    v-model="form.deskripsi[0]"
                    :name="prefixName+'deskripsiid'"
                />
            </div>
            <div class="mb-7">
                <div class="font-medium mb-1">{{$t('Deskripsi')}} (English)</div>
                <InputTextEditor 
                    v-model="form.deskripsi[1]"
                    :name="prefixName+'deskripsien'"
                />
            </div>
        </div>

        <hr class="border-warna-lima my-10">

        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <!-- <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div> -->
                <button class="button-standar-outline" @click="btnBack"> {{$t('Back')}} </button>
                <button disabled class="button-standar" @click="simpan"> {{$t('Save')}} </button>
            </div>
        </div>
        <!-- <pre>{{form}}</pre> -->
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'newopenrec',
            form: {
                judul: ['', ''],
                kategori: [],
                status: '',
                deskripsi: ['', '']
            },
        }
    },
    computed: {
        opsiDepartment() {
            return this.$store.state.opsi.department
        },

        opsiStatusOpenRec() {
            return this.$store.state.opsi.statusOpenRec
        },

        lang() {
            return this.$i18n.locale
        },

        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
    },
    methods: {
        btnBack() {
            this.$router.push('/career/open-recruitment/')
        },
        simpan() {
            this.realSimpan()
        },
        async realSimpan() {
            await this.$apiBase.post('daftarloker/', this.form).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    },
// {
//   "title": [
//     "indonesia",
//     "english"
//   ],
//   "department": [
//     1
//   ],
//   "status": 3,
//   "deskripsi": [
//     "<p>deskripsi Indonesia</p>",
//     "<p>deskripsi English</p>"
//   ]
// }

    
}
</script>