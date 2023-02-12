<template>
    <div>

        <div class="flex items-center justify-between mb-4">
            <div class="w-[240px]">
                <ElementsSearchBarButton 
                    v-model="filter.search"
                    :placeholder="$t('Search')"
                    
                />
            </div>

            <NuxtLink to="/career/open-recruitment/entry/" class="button-standar flex gap-3 items-center">
                    <img src="/icons/icon-button-download.png" alt="icon-download">
                    <div class="ml-1">New Loker</div>
            </NuxtLink>
        </div>

        <div class="flex items-center justify-end border border-[#A1A2B7] rounded-lg bg-white mb-5">
            <div class="px-[14px] py-[9px]">
                <div class="flex items-center">
                    <div class="text-sm font-semibold text-[#757575]">Sort by:</div>
                    <select name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                        <option value="desc">Latest</option>
                        <option value="asc">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="table-area mt-10 mb-20 text-sm bg-white rounded-lg shadow-lg overflow-hidden">
            <ElementsTable 
                v-model="list"
                :tableDetail="tableDetail"
            >
                <template v-slot:judul="{item}">
                    {{ item.judul[bahasa] }}
                </template>
                <template v-slot:kategori="{item}">
                    {{ item.kategori.map(e => e[bahasa]).join(', ') }}
                </template>


                <template v-slot:actions="{ item }">
                        <button @click="editItem(item)" class="button-table-edit w-10 h-10"></button>
                        <button @click="deleteItem(item)" class="button-table-delete w-10 h-10"></button>
                </template>
            </ElementsTable>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            filter: {
                search: ''
            }
        }
    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        },
        tableDetail() {
            const list = [
                {
                    header: this.$t('Title'),
                    itemValue: 'judul'
                },
                {
                    header: this.$t('Category'),
                    itemValue: 'kategori'
                },
                {
                    header: '',
                    itemValue: 'actions',
                    itemClass: 'w-full flex items-center justify-end'
                }
            ]
            return list;
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiBase.get('daftarloker/?limit=10&offset=0').then(res => {
                this.list = res.data.results.map(e => {
                    e.kategori = e.kategori.map(x => x.kategori.nama)
                    return e;
                })
            }).catch(err => {
                console.log(err)
            })
        },
        deleteItem(item) {
            this.$modal.show({
                type: 'warning',
                title: 'Delete Loker',
                body: 'Apakah anda yakin akan menghapus loker',
                primary: {
                    label: 'OK',
                    theme: 'red',
                    action: () => this.deleteData(item.pkDaftarLoker)
                }
            })
        },
        editItem(item) {
            this.$router.push('/career/open-recruitment/entry?id='+item.pkDaftarLoker)
        },
        async deleteData(id) {           
            await this.$apiBase.delete('daftarloker/'+id).then(res => {
                // this.message = data.message
                // alert("Data berhasil disimpan.")
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        }, 
        
        deleteRecruitment(id) {
            this.deleteData(id)
        }
    },


}
</script>