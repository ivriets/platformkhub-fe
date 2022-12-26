<template>
    <div v-if="list">
        <div class="flex items-center justify-between mb-4">
            <div class="w-[240px]">
                <div>
                    <div class="flex items-center relative">
                        <input type="text" name="searchtext" id="searchtext" placeholder="Search" maxlength="1000" autocomplete="chrome-off" class="focus:outline-none w-full border border-warna-tujuh rounded px-2 py-1.5 text-sm text-warna-utama placeholder-[#9e9e9e focus:border-warna-tujuh/50">
                        <div class="absolute top-0 right-0 translate-y-1/2 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#9E9E9E" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <a href="/career/open-recruitment/new/">
                <button class="px-3 py-[6px] bg-warna-empat rounded-lg text-white flex items-center cursor-pointer">
                    <img src="/icons/icon-button-download.png" alt="icon-download">
                    <div class="ml-1">New Loker</div>
                </button>
            </a>
        </div>
        <div>
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
            </div>
            <div class="bg-white rounded-lg shadow-md border border-gray-100">
                <div>
                    <div class="relative overflow-x-auto">
                        <table class="text-sm w-full text-warna-font-tabel table-padding border-collapse">
                            <thead class="border-b border-[#9E9E9E]">
                                <tr>
                                    <th scope="col" class="font-normal text-left">Title</th>
                                    <th scope="col" class="font-normal text-left">Category</th>
                                    <th scope="col" class="font-normal text-left"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(i, index) in list" :key="index" class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>{{i.judul}}</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>{{i.kategori}}</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button @click="deleteRecruitment(i.pkDaftarLoker)"><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            list: undefined,

        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
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
            await this.$apiBase.get('daftarloker/').then(res => {
                this.list = res.data.results
            }).catch(err => {
                console.log(err)
            })
        },

        async deleteData(id) {           
            await this.$apiBase.delete('sliderloker/'+id).then(res => {
                data = res.data
                this.message = data.message
                alert("Data berhasil disimpan.")
                this.masterPoint()
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