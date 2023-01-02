<template>
    <div>
        <div class="relative">
            <pre>{{lokasi}}</pre>
            <!-- <select 
                :id="name" 
                :name="name" 
                v-model="valueSelect" 
                :disabled="disabled && disabled === true ? true : false" 
                class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50">
                    <option selected disabled value="" v-if="placeholder">{{placeholder}}</option>
                    <option
                        v-for="(i, index) in opsi" :key="name+'opsi'+index" 
                        :value="i[itemValue] ? i[itemValue] : i.id"
                    >
                    {{i[itemLabel] ? i[itemLabel][bahasa]: i.label[bahasa]}}
                    </option>
            </select>
            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">                
                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
            </div> -->
            <!-- <div v-for="(lokasi, index) in form.lokasiOrganisasi" :key="index" class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9 mb-10">
                <div class="col-span-12 md:col-span-6">
                    <div class="">
                        <div class="font-medium mb-1">
                            Provinsi
                        </div>
                        <select 
                            :id="nameProvinsi" 
                            :name="nameProvinsi" 
                            v-model="valueSelectProvinsi" 
                            :disabled="disabled && disabled === true ? true : false" 
                            class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50">
                                <option selected disabled value="" v-if="placeholderProvinsi">{{placeholderProvinsi}}</option>
                                <option
                                    v-for="(i, index) in opsiProvinsi" :key="name+'opsi'+index" 
                                    :value="i.provinsi"
                                >
                                {{i.provinsi}}
                                </option>
                        </select>
                        
                        <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">                
                            <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div v-if="opsiKota.length > 0">
                        
                        <div class="font-medium mb-1">
                            Kota
                        </div>
                        <select 
                            :id="nameKotaKab" 
                            :name="nameKotaKab" 
                            v-model="valueSelectKotaKab" 
                            :disabled="disabled && disabled === true ? true : false" 
                            class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50">
                                <option selected disabled value="" v-if="placeholderKotakab">{{placeholderKotaKab}}</option>
                                <option
                                    v-for="(i, index) in opsiKotaKab" :key="name+'opsi'+index" 
                                    :value="i.kotakab"
                                >
                                {{i.kotakab}}
                                </option>
                        </select>
                        <div class="font-medium mb-1"> Kota </div>
                        <div class="relative">
                            <select 
                                v-model="valueSelectKota" 
                                class="cursor-pointer appearance-none w-full focus:outline-none border border-warna-tujuh rounded-lg px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                            >
                                <option selected disabled value="">{{lokasi.kota}}</option>
                                <option
                                    v-for="(i, index2) in opsiKota[index]" :key="index2" 
                                    :value="i.id"
                                >
                                {{i.label[bahasa]}}
                                </option>
                            </select>
                            <div class="absolute top-0 right-0 h-[34px] items-center flex px-2 text-gray-500">                
                                <img src="/icons/icon-arrow-down-grey.png" alt="arrow-down" class="w-4 h-4">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="pinLokasi" class="col-span-12 md:col-span-6">
                    <div class="">
                        <InputText 
                            v-model="lokasi.jalan"
                            placeholder="Tulis disini"
                            :name="prefixName+'jalan'"
                            :label="'Jalan'"
                        />
                    </div>
                </div>
                <div v-if="pinLokasi" class="col-span-12 md:col-span-6">
                    <div class="font-medium mb-1">
                        Pin Location
                    </div>
                    <div>
                        <InputPinLocation
                            v-model="lokasi.pinLocation"
                        />
                    </div>
                </div>
            </div>  -->
        </div>
    </div>
</template>
<script>
export default {
    props: ['lokasi', 'disabled', 'opsiProvinsi', 'typeForm'],
    data() {
        return {
            valueSelectProvinsi: '',
            opsiProvinsi: [],
            valueSelectKotaKab: '',
            valueProvinsi: "",
            placeholderKotaKab: '',
            opsiKotaKab: [],
            pinLokasi: false
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        }
    },
    watch: {
        valueSelect(val) {
            this.$emit('input',val)
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            console.log(this.lokasi)
            console.log(this.opsiProvinsi)
            console.log(this.typeForm)
            // this.valueSelect = this.value
            // this.masterPoint()
        },
        async masterPoint() {
            await this.$apiBase.get('kotakab?provinsi='+ this.provinsi).then(res => {
                const data = res.data
                this.opsi = _.map(data, function(o){
                    return {'id':o.kotakab, 'label':[o.kotakab, o.kotakab]}
                })
            })
        },
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    }
    
}
</script>