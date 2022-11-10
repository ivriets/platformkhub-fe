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
                            <span class="ml-1 text-sm font-medium text-warna-delapan md:ml-2 dark:text-gray-400">{{$t('Request By Individu')}}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="sm:w-full md:w-[420px] mb-9">
            <ElementsSearchBarResponsive 
                v-model="filter.search"
                :placeholder="'Search'"
                :gaya="'icon'"
                :name="'searchtext'"
            />
        </div>
        <div class="bg-white shadow-md rounded-xl pb-9">
            <ElementsTableStriped 
                :masterTable="masterTable"
                :dataTable="dataTable"
            />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            filter: {
                search: ''
            },
            masterTable: [
                {
                    header: 'Name',
                    value: 'namaIndividu',
                    foto: 'image',
                    tipe: 'string',
                    display: true
                }
            ],
            dataTable: [
                {
                    namaIndividu: 'Gilang Baskara',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'Yanuar Septian',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'Gilang Baskara',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'Yanuar Septian',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'Gilang Baskara',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'Yanuar Septian',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                },
                {
                    namaIndividu: 'John Doe',
                    image: '/images/profile.png'
                }
            ],
        }
    }
}
</script>