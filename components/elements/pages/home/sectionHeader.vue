<template>
    <div>
        <div class="bg-no-repeat bg-cover bg-center pt-40 pb-28 md:pb-40" :style="'background-image: url('+backgroundImage+');'">
            <div class="text-white text-center mb-6 md:mb-[93px] px-4">
                <p class="text-xl md:text-4xlplus mb-3 font-bold">{{ topTitle[bahasa] }}</p>
                <h1 class="text-2xl md:text-[72px] leading-tight font-semibold" v-html="title[bahasa]"></h1>
            </div>
            <div class="flex justify-center">
                <button class="border border-white rounded-lg text-white hover:bg-[#222659] px-4 py-2 md:py-3 font-semibold flex items-center gap-x-1 transition-all duration-300">
                    <span class="px-10 text-xs md:text-base">{{ $t('Selengkapnya') }}</span>
                    <img class="w-4 h-4" src="/icons/icon-arrow-right.png" alt="icon-selengkapnya">
                </button>
            </div>
        </div>
        <div class="px-4 md:px-6">
            <div class="bg-white max-w-[800px] mx-auto rounded-lg py-3 md:py-6 px-6 md:px-6 -mt-12 md:-mt-28 shadow-md">
                <div>
                    <div class="text-base md:text-2xlplus mb-1 md:mb-4 font-semibold text-warna-empat text-center">{{$t('Cari')}}</div>
                    <div class="mb-3 md:mb-6">
                        <InputText 
                            v-model="filter.search"
                            :placeholder="$t('Saya ingin tahu tentang')"
                            :name="prefixName+'filtersearch'"
                        />
                    </div>
                    <div class="grid grid-cols-6 gap-1 md:gap-x-8 mb-3 md:mb-6">
                        <div class="col-span-6 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.organisasi"
                                :name="prefixName+'filterorg'"
                                :placeholder="$t('Semua Organisasi')"
                                :opsi="opsiTipeOrganisasiV2"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipeorganisasi'"
                            />
                        </div>
                        <div class="col-span-3 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.pendekatan"
                                :name="prefixName+'filterpend'"
                                :placeholder="$t('Semua Pendekatan')"
                                :opsi="opsiTipePendekatan"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipependekatan'"
                            />
                        </div>
                        <div class="col-span-3 md:col-span-2">
                            <InputAutoCompleteMulti 
                                v-model="filter.topik"
                                :name="prefixName+'filtertopik'"
                                :placeholder="$t('Semua Topik')"
                                :opsi="opsiTipeTopik"
                                :itemValue="'id'"
                                :itemLabel="'label'"
                                :key="prefixName+'keytipetopik'"
                            />
                        </div>
                    </div>
                    <div>
                        <button @click="goToSearchResult" class="btn-standar-icon w-full">
                            <img src="/icons/icon-search.png" alt="" height="16" width="16">
                            {{$t('Cari')}}
                        </button>
                    </div>
                    <!-- <pre>{{filter}}</pre> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                prefixName: 'searchhome',
                filter: {
                    search: '',
                    organisasi: [],
                    pendekatan: [],
                    topik: []
                },
                title: ['Mapping Organisasi dan<br>Kolaborasi PCVE','Mapping Organisasi dan<br>Kolaborasi PCVE'],
                topTitle: ['Kiprah CSO dalam PCVE;','Kiprah CSO dalam PCVE;'],
                bottomTitle: '',
                backgroundImage: '/images/shome-1.png'
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
            opsiTipeOrganisasi() {
                return this.$store.state.opsi.tipeOrganisasi
            },
            opsiTipeOrganisasiV2() {
                return this.$store.state.opsi.tipeOrganisasiV2
            },
            opsiTipePendekatan() {
                return this.$store.state.opsi.tipeApproach
            },
            opsiTipeTopik() {
                return this.$store.state.opsi.tipeIssue
            }
        },
        methods: {
            goToSearchResult() {
            const clearSearch = encodeURIComponent(this.filter.search)

            this.$router.push('/search?s='+clearSearch+
                '&tipeOrganisasi='+this.filter.organisasi.toString()+
                '&tipePendekatan='+this.filter.pendekatan.toString()+
                '&tipeTopik='+this.filter.topik.toString()+
                '&sortbytitleitem=desc')
            },

        }

    }
</script>

