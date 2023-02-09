<template>
    <div>
        <div class="grid grid-cols-12 border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div class="col-span-6 flex items-center gap-3 px-[14px] py-[9px] border-r border-[#A1A2B7]">
                <div class="w-3/12 input-overide-filter">
                    <InputSelect 
                        v-model="filter.waktu"
                        :name="'filterwaktu'"
                        :opsi="opsiFilterWaktu"
                        :placeholder="'All Time'"
                        :multilang="true"
                    />
                </div>

                <div class="w-6/12 input-overide-filter">
                    <InputAutocompleteApi 
                            v-model="cariOrganisasi.model"
                            :name="'cariMember'"
                            :label="''"
                            :placeholder="$t('All Organization')" 
                            :itemValue="'accountId'"
                            :itemLabel="'namaOrganisasi'"
                            :searchQuery="'title'"
                            :addNew="false"
                            :displayLabel="false"
                            :endPoint="cariOrganisasi.endPoint"
                            :key="cariOrganisasi.key"
                            :resultKey="'res.data.results'"
                        />
                </div>
                <div class="w-3/12 input-overide-filter">
                    <InputSelect 
                        v-model="filter.action"
                        :name="'filteraction'"
                        :opsi="opsiFilterAction"
                        :placeholder="'Action'"
                        :multilang="true"
                    />
                </div>
            </div>
            <div class="col-span-6 flex items-center justify-between px-[14px] py-[9px]">
                <button class="button-standar-field text-sm" @click="applyFilter">{{ $t('Apply') }}</button>
                <div class="flex items-center">
                    <div class="text-sm font-semibold text-[#757575]">Sort by:</div>
                    <select name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                        <option value="10">Latest</option>
                        <option value="20">Oldest</option>
                    </select>
                </div>
            </div>
        </div>



        <div class="table-area my-10 rounded-xl shadow-lg overflow-hidden text-sm">
            <ElementsTable
                v-model="list"
                :tableDetail="tableDetail"
            >
                <template v-slot:name="{ item }">
                    {{ item.myIndividu !== null ? item.myIndividu.namaIndividu : item.myOrganisasi.namaOrganisasi  }}
                </template>
                <template v-slot:accountType="{ item }">
                    {{ item.myIndividu !== null ? $t('Organization') : $t('Individu')  }}
                </template>
                <template v-slot:aksi="{ item }">
                    {{ item.request  }}
                </template>
            </ElementsTable>
        </div>

        <div  class="pagination-area text-center mt-6 mb-20">
            <ElementsPaginasiSpa 
                v-model="paginasi.currentPage"
                :totalPage="paginasi.totalPage"
                :totalVisible="paginasi.totalVisible"
                :key="'pageset'+paginasi.key"
            />
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                paginasi: {
                    currentPage: 1,
                    totalVisible: 7,
                    totalPage: 1,
                    limit:10,
                    key: 0
                },
                filter: {
                    waktu: 1,
                    organisasi: '',
                    action: ''
                },
                opsiFilterWaktu: [
                    {
                        id: 1,
                        label: ['All Time', 'All Time']
                    },

                    ],
                cariOrganisasi: {
                        endPoint: 'verificator/katalogOrganisasi/?limit=10&offset=0',
                        key: '',
                        searchLabel: 'title'
                    },
                opsiFilterAction: [
                    {
                        id: '',
                        label: ['All Action', 'All Action']
                    },
                    {
                        id: 'LOGIN',
                        label: ['LOGIN', 'LOGIN']
                    },
                    {
                        id: 'PUT',
                        label: ['PUT','PUT']
                    },
                    {
                        id: 'POST',
                        label: ['POST','POST']
                    },
                    {
                        id: 'DELETED',
                        label: ['DELETED','DELETED']
                    }


                ],
                list: []
            }
        },
        computed: {
            tableDetail() {
                const table = [
                    {
                        header: this.$t('Name'),
                        itemValue: 'name'
                    },
                    {
                        header: this.$t('Account Type'),
                        itemValue: 'accountType'
                    },
                    {
                        header: 'Action',
                        itemValue: 'aksi'
                    },
                    {
                        header: this.$t('Date'),
                        itemValue: 'createdAt',
                        type: 'date',
                        format: 'DD MMM YYYY HH:mm'
                    }
                ]
                return table
            }
        },  
        mounted() {
            this.initialize()
        },
        watch: {
            'paginasi.currentPage'() {
                this.masterPoint()
            }
        },  
        methods: {
            initialize() {
                this.masterPoint()
            },
            applyFilter() {
                this.paginasi.currentPage = 1
                this.masterPoint()
            },
            async masterPoint() {

                const offset = (this.paginasi.currentPage - 1) * this.paginasi.limit

                const filterAction = this.filter.action === '' ? '' : '&request='+ this.filter.action


                await this.$apiLog.get('/log_user/?limit=10&offset='+offset+filterAction).then(res => {
                    this.list = res.data.results
                    this.paginasi.totalPage = Math.ceil(res.data.length / this.paginasi.limit)
                    this.paginasi.key+=1
                })
            }
        }
    }
</script>

