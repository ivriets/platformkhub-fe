<template>
    <div class="py-[40px]">

        <div class="mb-9">
            <ElementsBreadcrumbBaru 
                :parent="'Organization Detail'"
                :linkParent="'/verifications/organisasi/'+id"
                :child="childBreadcrumb"

            />
        </div>

        <div class="sm:w-full md:w-[420px] mb-9">
            <ElementsSearchBarButton 
                v-model="filter.search"
                :placeholder="$t('Search')"
                :gaya="'icon'"
                :name="'searchtext'"
            />
        </div>

        <div class="bg-white shadow-md rounded-xl overflow-hidden pb-9 text-sembilan">
            <ElementsTable 
                :tableDetail="tableDetail"
                v-model="listingPage"
                :startIndex="paginasi.startIndex"
            >
                <template v-slot:nama="{ item }" >
                    <div class="w-full flex items-center gap-4">
                        <NuxtImg
                            :src="basePath+item.image"
                            width="100"
                            height="100"
                            fit="cover"
                            class="rounded-full h-[36px] w-[36px]"
                        />
                        <div>{{item.nama}}</div>
                    </div>
                </template>
            </ElementsTable>
        </div>
            <div  class="pagination-area text-center mt-6">
                <ElementsPaginasiSpa 
                    v-model="paginasi.currentPage"
                    :totalPage="paginasi.totalPage"
                    :totalVisible="7"
                    :loaderPage="!loaderDetail"
                    :key="'pageset'+paginasi.key"
                />
            </div>

    </div>
</template>
<script>
export default {
    props: ['fieldOrganisasi', 'breadcrumbLabel',],
    data() {
        return {
            dataDetail: null,
            loaderDetail: false,
            listing: [],
            listingPage: [],

            requestByIndividu: [],

            filter: {
                search: '',

            },

            paginasi: {
                startIndex: 0,
                limit: 10,
                offset: 0,
                currentPage: 1,
                totalPage:3,
                start: 0,
                end: 10,
                key: 0
            },

            // fieldOrganisasi: 'requestedByIndividu'
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        childBreadcrumb() {
            const vA = [
                // {
                //     label: 'Detail',
                //     link: '/moderations/blog/'+this.id
                // },
                {
                    label: this.breadcrumbLabel,
                    link: ''
                }
            ]
            return vA
        },
        basePath() {
            return process.env.BASE_URL
        },

        tableDetail() {
            const list = [
                {
                    header: 'No',
                    itemValue: 'index',
                    type: 'index',
                    itemClass: 'w-15'
                    
                },
                {
                    header: this.$t('Name'),
                    itemValue: 'nama',
                },

            ]
            return list;
        }


    },
    watch: {
        'paginasi.currentPage'(val) {
            this.runPaginasi()
        },
        'filter.search'(val) {
            // console.log(val)
            this.paginasi.currentPage = 1
            this.runPaginasi()
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.loaderDetail = false
            this.masterPoint()
        },
        async masterPoint() {
            await this.$apiPlatform.get('verificator/accounts/'+this.id+'/').then(res => {
                const data = res.data.results
                this.dataDetail = data

                const internalBranch = data.organisasi.organisasiCabangInternal.map(e => {
                    const data = {
                        id: e.pkOrganisasiCabangInternalId,
                        nama: e.branch.namaOrganisasi,
                        image: e.branch.imgLogoOrganisasi
                    }
                    return data
                })
                const requestedByIndividu = data.organisasi.requestedByIndividu.map(e => {
                    const data = {
                        id: e.id,
                        nama: e.individu.namaIndividu,
                        image: e.individu.imgFotoProfile
                    }
                    return data
                })

                const teamMember = data.organisasi.teamMember.map(e => {
                    const data = {
                        id: e.individu.userId,
                        nama: e.individu.namaIndividu,
                        image: e.individu.imgFotoProfile
                    }
                    return data
                })

                const partner = data.organisasi.partnerOrganisasiEksternal.map(e => {
                    const data = {
                        id: e.pkPartnerEksternalId,
                        nama: e.namaPartner,
                        image: e.imgLogoPartner
                    }
                    return data
                })
                this.listing = eval(this.fieldOrganisasi)
                this.$nextTick(() => {
                    if (this.listing) this.runPaginasi()
                    
                })
            })
        },

        runPaginasi() {
            const listing = this.listing.filter(e => e.nama.toLowerCase().includes(this.filter.search.toLowerCase()))
            // const listing = this.listing
            this.paginasi.totalPage = Math.ceil(listing.length / this.paginasi.limit)

            this.paginasi.start = (this.paginasi.currentPage - 1) * this.paginasi.limit
            this.paginasi.end = this.paginasi.start + this.paginasi.limit
            this.paginasi.startIndex = this.paginasi.start

            this.listingPage = listing.slice(this.paginasi.start, this.paginasi.end)
            this.$nextTick(() => {
                    this.loaderDetail = true
                    this.paginasi.key +=1
            })

        },

    }
}
</script>