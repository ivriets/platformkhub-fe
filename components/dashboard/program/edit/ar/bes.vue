<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="text-[16px] font-semibold ">Baseline-Endline Survey</div>
            <button class="btn-tambah text-sm" @click="addVariable">{{ $t('Add') }} {{ $t('Variable') }}</button>
        </div>
        <div class="">
            <div v-for="(item, index) in besItems" :key="'dataperubahan'+index" class="border rounded-md p-5 mb-5">
                <div  class="flex items-center justify-between mb-3">
                    <div class="font-semibold">Variable Pengukuran</div>
                    <button class="btn-tambah text-sm" @click="addData(item)">{{ $t('Add') }} Data</button>
                </div>
                <div class="w-full">
                    <div class="w-full md:w-5/12">
                        <!-- <InputAutocomplete 
                            v-model="searchKategori"
                            :label="''"
                            :opsi="opsiPerubahan"
                            :itemValue="'id'"
                            :itemLabel="'kategori'"
                            :multilang="true"
                            :name="'kategorires'"
                            :placeholder="'Contoh: Empati'"

                        >
                        </InputAutocomplete> -->
                        <InputText 
                            v-model="kategori"
                            :label="''"
                            :placeholder="'Contoh: Empati'"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-12 mt-5 gap-5 px-2">
                    <div class="col-span-6">
                        <InputText 
                            v-model="nama"
                            :label="''"
                            :name="'asdfda'"
                            :placeholder="'Tulis di sini'"
                        />
                    </div>
                    <div class="col-span-6">
                        <div class="mb-5">
                            <InputNumber2 
                                v-model="pretest"
                                :suffix="'%'"
                                :label="''"
                                :max="100"
                            />
                        </div>
                        <div class="mb-5">
                            <InputNumber2 
                                v-model="posttest"
                                :suffix="'%'"
                                :label="''"
                                :max="100"
                            />
                        </div>
                    </div>
                </div>
                <!-- {{item}} -->
                <!-- <InputText 
                    v-model="item"
                /> -->
            </div>
            {{ searchKategori }}
            <pre>{{ besItems }}</pre>
            <pre> {{ newVal }} </pre>
            <!-- <pre> {{ newVal }} </pre>
           <pre> {{value}} </pre> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            searchKategori: '',
            nama: '',
            pretest: 0,
            posttest: 0,
            kategori: '',
            besItems: [],
            opsiPerubahan: [],
            formInput: {
                variablePerubahan: [{
                    kategori: '',
                    nama: ''
                }],
                pretest: 0,
                posttest: 0

            },
            subFormInput: {

            },
            
            // besItem: {
            //     variablePerubahan:{
            //         typeVariablePerubahan: null,
            //         kategori: ['',''],
            //         nama: ['','']
            //     },
            //     pretest: 0,
            //     posttest: 0
            //   }
            
        }
    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 :1
        },
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                return value
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getOpsi()
        },
        async getOpsi() {

            await this.$apiPlatform.get('daftarList/variable_perubahan/').then(res => {
                const unik = _.uniqBy(res.data.results, 'kategori['+this.bahasa+']') 
                this.opsiPerubahan = _.orderBy(unik, 'kategori['+this.bahasa+']')
                this.$nextTick(() => {
                    this.initPut()
                })
            }).catch(err => {
                console.log(err)
            })
        },
        addVariable() {
            this.besItems.push(this.formInput)
        },
        addData(item) {

        },
        initPut() {

        }
    }
}
</script>

{
    "pkBaselineEndlineSurveyId": "bbDuFDUW",
    "variablePerubahan": {
      "id": 111,
      "kategori": [
        "Empati",
        "Empati"
      ],

    },
    "nama": [
        "Orang",
        "Orang"
    ].
    "pretest": 1000,
    "posttest": 2000
  },