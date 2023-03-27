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
                    <button @click="addData(index)" class="btn-tambah text-sm" >{{ $t('Add') }} Data</button>
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
                            v-model="besItems[index].namaKategori"
                            :label="''"
                            :placeholder="'Contoh: Empati'"
                            :name="'namaKategori'+index"
                        />
                    </div>
                </div>

                <div v-for="(item2,index2) in item.field" :key="'field'+index2+index" class="grid grid-cols-12 mt-5 gap-5 px-2">
                    <div class="col-span-6">
                        <InputText 
                            v-model="besItems[index].field[index2].nama"
                            :label="''"
                            :name="'nama'+index+index2"
                        />
                    </div>
                    <div class="col-span-6">
                        <div class="mb-5">
                            <InputNumber2 
                                v-model="besItems[index].field[index2].pretest"
                                :suffix="'%'"
                                :label="''"
                                :max="100"
                                :name="''"
                            />
                        </div>
                        <div class="mb-5">
                            <InputNumber2 
                                v-model="besItems[index].field[index2].posttest"
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
            dalam:
            <pre>{{ besItems }}</pre>
            <!-- <pre> {{ newVal }} </pre>
           <pre> {{value}} </pre> -->
        </div>
        <button @click="simpan">SIMPAN</button>
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
            formInput1: {
                variablePerubahan: {
                    kategori: '',
                    nama: ''
                },
                pretest: 0,
                posttest: 0
            },

            formInput: {
                id: 0,
                namaKategori: '',
                field: [
                    {
                        // variablePerubahan: {
                        //     kategori: ['',''],
                        //     nama: ['','']
                        // },
                        nama: '',
                        pretest: 0,
                        posttest: 0
                    }
                ]

            },
            final: null,

            subFormInput: {

            },
            awal: [
                        {
                            "id": 0,
                            "namaKategori": "satu",
                            "field": [
                            {
                                "nama": "satu-1",
                                "pretest": 10,
                                "posttest": 10
                            },
                            {
                                "nama": "satu-2",
                                "pretest": 100,
                                "posttest": 10
                            }
                            ]
                        },
                        {
                            "id": 1,
                            "namaKategori": "dua",
                            "field": [
                            {
                                "nama": "dua-1",
                                "pretest": 30,
                                "posttest": 30
                            }
                            ]
                        }
                        ]
            
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
        // besItems: {
        //     get() {
        //         // const awal = 
        //         console.log('value',this.value)
        //         return this.value === undefined ? [] : this.value
        //     },
        //     set(value) {
        //     //     const hasil = _.flatMap(value, (e) => {
        //     //     const x = e.field.map(y => {
        //     //         return {
        //     //             variablePerubahanx: {
        //     //                 kategori: [e.namaKategori, e.namaKategori],
        //     //                 nama: [y.nama, y.nama],
        //     //             },
        //     //             pretest: y.pretest,
        //     //             posttest: y.posttest
        //     //         }
        //     //     })
        //     //     console.log('x',x)
        //     //     return x
        //     // })
        //         console.log('set',value)

        //         this.$emit('input',value);
        //     }
        // }
    },
    watch: {

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
            console.log('huhuy')
            const newInput = _.cloneDeep(this.formInput);
            // newInput.id = this.besItems.length
            this.besItems.push(newInput)
        },
        addData(index) {
            const newData = _.cloneDeep(this.formInput.field[0]);
            this.besItems[index].field.push(newData)
        },
        initPut() {

        },
        simpan() {
            this.final = _.flatMap(this.awal, (e) => {
                const x = e.field.map(y => {
                    return {
                        variablePerubahan: {
                            kategori: [e.namaKategori, e.namaKategori],
                            nama: [y.nama, y.nama],
                        },
                        pretest: y.pretest,
                        posttest: y.posttest
                    }
                })
                // console.log('x',x)
                return x
            })
        //     {
        //         "baselineEndlineSurvey": [
        //             {
        //                 "variablePerubahan": {
        //                     "kategori": "Empati",
        //                     "nama": "Orang-orangan"
        //                 },
        //                 "pretest": 10101010,
        //                 "posttest": 10101010
        //             },

        //         ]
        // }
        }
    }
}
</script>

