<template>
    <div>
        <div v-for="(item, index) in listContent" :key="'list'+index" class="mb-10">
            <div v-if="item.typeDeskripsi === 1">
                <div class="mb-7">
                    <InputFileUpload 
                        :label="'Image'"
                        v-model="listContent[index].imgDeskripsi"
                        :accept="'.png, .jpg, .jpeg'"
                        :multiple="false"
                        :maxSize="5"
                    />
                </div>
            </div>
            <div v-else-if="item.typeDeskripsi === 2">
                <div class="mb-7">
                    <div class="mb-7">
                        <div class="font-medium mb-1">{{$t('Deskripsi')}} (English)</div>
                        <InputTextEditor 
                            v-model="listContent[index].paragraf[0]"
                            :name="'paragrafid'+index"
                        />
                    </div>
                    <div>
                        <div class="font-medium mb-1">{{$t('Deskripsi')}} (Indonesia)</div>
                        <InputTextEditor 
                            v-model="listContent[index].paragraf[1]"
                            :name="'paragrafen'+index"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button @click="deleteSection(index)" class="flex items-center p-2 border border-warna-empat rounded">
                    <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                    <span class="text-sm text-warna-empat ml-2">Delete Section</span>
                </button>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 lg:col-span-6">
                <button @click="addSection(1)" type="button" class="text-center w-full bg-white border border-warna-tujuh text-warna-empat rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ Image</button>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <button @click="addSection(2)" type="button" class="text-center w-full bg-white border border-warna-tujuh text-warna-empat rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ Text</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['value', 'list'],
    data() {
        return {
            defaultData: {
                typeDeskripsi: null, //1.image 2.text
                imgDeskripsi: '',
                caption: ['',''],
                paragraf: ['',''],
                sorter: 0
            },
            listContent: [],
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
        listContent: {
            handler(val) {
                this.updateValue(val)
            },
            deep:true //
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            
            if (this.list){
                this.listContent = this.list
                
            }
        },
        addSection(typeDeskripsi) {
            const vA = {
                typeDeskripsi: typeDeskripsi,
                imgDeskripsi: '',
                caption: ['',''],
                paragraf: ['',''],
                sorter: 0
            }

            this.listContent.push(vA)
        },

        deleteSection(index) {
            this.listContent.splice(index, 1)
        },

        updateValue(val) {
            this.$emit('input', val)
        }
    },
}
</script>