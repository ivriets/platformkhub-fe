<template>
    <div class="py-[80px]">
        <div class="mb-9">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li>
                        <div class="flex items-center">
                            <a href="/verifications/organisasi/_id" class="text-sm font-medium text-warna-delapan hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Detail Organisasi</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span class="ml-1 text-sm font-medium text-warna-delapan md:ml-2 dark:text-gray-400">{{$t('Editor')}}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-[28px]">
            <div class="w-[240px]">
                <InputDropdown 
                    v-model="kategorisasi"
                    :name="'kategorisasi'"
                    :opsi="kategorisasiProfileOrganisasi"
                />
            </div>
            <hr class="border-warna-tujuh my-10">
            <div v-if="kategorisasi === 'tentang'">
                <DashboardOrganisasiEditTentang />
            </div>
            <div v-else-if="kategorisasi === 'cabang'">
                <DashboardOrganisasiEditCabang />
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            kategorisasi: 'tentang',
        }
    },
    computed: {
        kategorisasiProfileOrganisasi() {
            return this.$store.state.opsi.kategorisasiProfileOrganisasi
        },
    },
    methods: {
        btnBack() {
            this.$router.push('/verifications/organisasi/_id')
        }
    },
}
</script>