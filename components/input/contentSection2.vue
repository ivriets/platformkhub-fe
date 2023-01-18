<template>
    <div>
        <div v-for="(item, index) in newVal.list" :key="'list'+index" class="mb-10">
            <div v-if="item.typeDeskripsi === 1">
                <div class="mb-7">
                    <InputFileUpload 
                        :label="'Image'"
                        v-model="newVal.list[index].imgDeskripsi"
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
                            v-model="newVal.list[index].paragraf[0]"
                            :name="'paragrafid'+index"
                        />
                    </div>
                    <div>
                        <div class="font-medium mb-1">{{$t('Deskripsi')}} (Indonesia)</div>
                        <InputTextEditor 
                            v-model="newVal.list[index].paragraf[1]"
                            :name="'paragrafen'+index"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button @click="deleteSection(item, index)" class="flex items-center p-2 border border-warna-empat rounded">
                    <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                    <span class="text-sm text-warna-empat ml-2">Delete Section</span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 lg:col-span-6">
                <button @click="addSection(1)" type="button" class="text-center w-full bg-white border border-warna-tujuh hover:bg-gray-200 transition-all text-warna-empat rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ Image</button>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <button @click="addSection(2)" type="button" class="text-center w-full bg-white border border-warna-tujuh text-warna-empat hover:bg-gray-200 transition-all rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto cursor-pointer">+ Text</button>
            </div>
        </div>
        {{ newVal }}
    </div>
</template>
<!-- deskripsi: {
    list: [],
    deleted: [],
    updated: [],
    new: []
}, -->
<script>
export default {
    props: ['value'],
    data() {
        return {

        }
    },
    computed: {
        newVal: {
            get() {
                this.value.list = _.orderBy(this.value.list, 'sorter')
                return this.value
            },
            // set(value) {
            //     // value.new = value.list.map(e => e.tipe==='baru')
            //     console.log('kadieu')
            //     const baru = {
            //         list: [],
            //         new: [],
            //         deleted: [],
            //         updated: []
            //     }
            //     this.$emit('input',baru)
            // }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            
        },
        deleteSection(item, index) {
            if (item.id) this.newVal.deleted.push(item.id);
            this.newVal.list.splice(index,1)
        },
        addSection(typeDeskripsi) {
            const vA = {
                typeDeskripsi: typeDeskripsi,
                imgDeskripsi: '',
                caption: ['',''],
                paragraf: ['',''],
                sorter: 0,
                tipe: 'new'
            }

            this.newVal.list.push(vA)
        },


    }
}
</script>