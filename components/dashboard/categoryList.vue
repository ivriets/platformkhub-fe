<template>
    <div>
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabTopic" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'topic' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Topic')}}</div>
                </div>
                <div @click="btnTabApproach" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'approach' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>{{$t('Approach')}}</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-6">
        </div>

        <div v-if="selectedTab === 'topic'">
            <div class="bg-white rounded-xl shadow-md p-5 mb-9 w-full">
                <div class="grid grid-cols-12 gap-x-4 items-center">
                    <div class="col-span-12 lg:col-span-4 font-medium">New List</div>
                    <div class="col-span-11 lg:col-span-7">
                        <InputText 
                            v-model="form.newTopic"
                            placeholder="Write here"
                            :name="prefixName+'topicList'"
                        />
                    </div>
                    <div class="col-span-1">
                        <div class="text-center py-1.5 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">
                            + Add
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[400px] mb-9">
                <ElementsSearchBarResponsive 
                    v-model="filter.searchTopic"
                    :placeholder="'Search List'"
                    :gaya="'icon'"
                    :name="'searchtext'"
                />
            </div>
            <div class="bg-white shadow-md rounded-xl pb-9">
                <ElementsTableStriped 
                    :masterTable="masterTableTopic"
                    :dataTable="dataTableTopic"
                    :urutan="true"
                    :actions="actions"
                    :title="'Topic List'"
                />
            </div>
        </div>

        <div v-if="selectedTab === 'approach'">
            <div class="bg-white rounded-xl shadow-md p-5 mb-9 w-full">
                <div class="grid grid-cols-12 gap-x-4 items-center">
                    <div class="col-span-12 lg:col-span-4 font-medium">New List</div>
                    <div class="col-span-11 lg:col-span-7">
                        <InputText 
                            v-model="form.newApproach"
                            placeholder="Write here"
                            :name="prefixName+'approachList'"
                        />
                    </div>
                    <div class="col-span-1">
                        <div class="text-center py-1.5 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">
                            + Add
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[400px] mb-9">
                <ElementsSearchBarResponsive 
                    v-model="filter.searchApproach"
                    :placeholder="'Search List'"
                    :gaya="'icon'"
                    :name="'searchtext'"
                />
            </div>
            <div class="bg-white shadow-md rounded-xl pb-9">
                <ElementsTableStriped 
                    :masterTable="masterTableApproach"
                    :dataTable="dataTableApproach"
                    :urutan="true"
                    :actions="actions"
                    :title="'Approach List'"
                />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'catlist',
            selectedTab: 'topic',
            form: {
                newTopic: '',
                newAppraoch: ''
            },
            filter: {
                searchTopic: '',
                searchApproach: ''
            },
            actions: {
                status: true,
                button: {
                    edit: {
                        status: true,
                        tipe: 'modal',
                        path: ''
                    },
                    // path: this.fullUrl+'/edit'
                    delete: {
                        status: false,
                        tipe: 'modal',
                        path: ''
                    },
                    print: {
                        status: false,
                        tipe: 'page',
                        path: ''
                    }
                }
            },
            masterTableTopic: [
                {
                    header: 'Category Topic',
                    value: 'label',
                    tipe: 'string',
                    display: true
                }
            ],
            masterTableApproach: [
                {
                    header: 'Category Approach',
                    value: 'label',
                    tipe: 'string',
                    display: true
                }
            ],
            dataTableTopic: [
                {
                    id: 1,
                    label: ['Gender', 'Gender']
                },
                {
                    id: 2,
                    label: ['Pemuda', 'Youth']
                },
                {
                    id: 3,
                    label: ['Pendidikan', 'Education']
                },
                {
                    id: 4,
                    label: ['Penguatan HAM', 'Human Rights']
                },
                {
                    id: 5,
                    label: ['Korban Terorisme', 'Victims of Terrorism']
                },
                {
                    id: 6,
                    label: ['Penelitian', 'Research']
                },
                {
                    id: 7,
                    label: ['Penilaian/Evaluasi', 'Assessment/Evaluation']
                },
                {
                    id: 8,
                    label: ['Peningkatan Kapasitas', 'Capacity Building']
                },
                {
                    id: 9,
                    label: ['Pemberdayaan Masyarakat', 'Community Empowerment']
                }
            ],
            dataTableApproach: [
                {
                    id: 1,
                    label: ['Penegakan Hukum', 'Law Enforcement']
                },
                {
                    id: 2,
                    label: ['Pelepasan', 'Disengagement']
                },
                {
                    id: 3,
                    label: ['Pencegahan', 'Prevention']
                },
                {
                    id: 4,
                    label: ['Pemerintahan', 'Governance']
                },
                {
                    id: 5,
                    label: ['Kerja Sama dan Kemitraan Internasional', 'International Coorporation and Partnerships']
                }
            ]
        }
    },
    methods: {
        btnTabTopic() {
            this.selectedTab = 'topic'
        },

        btnTabApproach() {
            this.selectedTab = 'approach'
        }
    },
}
</script>