<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="text-lg font-semibold">Baseline-Endline Survey</div>
            <button class="btn-tambah text-sm" @click="addVariable">{{ $t('Add') }} {{ $t('Variable') }}</button>
        </div>
        <div>
            <div v-for="(item, index) in besItems" :key="'dataperubahan'+index" class="border rounded-md p-3">
                <div  class="flex items-center justify-between mb-3">
                    <div class="font-semibold">Variable Pengukuran</div>
                    <button class="btn-tambah text-sm" @click="addData(item)">{{ $t('Add') }} Data</button>
                </div>
                <div class="w-full">
                    <div class="w-full md:w-5/12">
                        <InputAutocomplete 
                            v-model="searchKategori"
                            :label="''"
                            :opsi="opsiPerubahan"
                            :itemValue="'kategori'"
                            :itemLabel="'kategori'"
                            :multilang="true"
                            :name="'kategorires'"
                            :placeholder="'Contoh: Empati'"
                            :output="'obj'"

                        >
                            <template v-slot:kategori="{item}">
                                {{item.kategori[bahasa]}} - {{item.nama[bahasa]}}
                            </template>
                        </InputAutocomplete>
                    </div>
                </div>

                <div class="grid grid-cols-12 mt-5 gap-5">
                    <div class="col-span-6">
                        <InputText 
                            v-model="nama"
                            :label="''"
                            :name="'asdfda'"
                            :placeholder="'Tulis di sini'"
                        />
                    </div>
                    <div class="col-span-6">
                        <InputNumber2 
                            v-model="pretest"
                            :suffix="'%'"
                            :label="''"
                        />
                    </div>
                </div>
                <!-- {{item}} -->
                <!-- <InputText 
                    v-model="item"
                /> -->
            </div>
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
                this.opsiPerubahan = res.data.results
            }).catch(err => {
                console.log(err)
            })
        },
        addVariable() {
            this.besItems.push(this.formInput)
        },
        addData(item) {

        }
    }
}
</script>