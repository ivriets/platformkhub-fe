<template>
    <div>
        <div v-for="(item, index) in newVal.list" :key="'list'+index" class="mb-10 transition-all" :class="'content-section-'+index">
            <div v-if="item.typeDeskripsi === 1">
                <div class="mb-7">
                    <InputImageUploadSingle 
                        :label="'Image'"
                        v-model="newVal.list[index].imgDeskripsi"
                        :accept="'.png, .jpg, .jpeg'"
                        :maxSize="5"
                        :key="'imageasd'+keyImage+index"
                    />
                </div>
            </div>
            <div v-else-if="item.typeDeskripsi === 2">
                <div class="mb-7">
                    <div class="mb-7">
                        <div class="font-medium mb-1">{{$t('Deskripsi')}} (Indonesia)</div>
                        <InputTextEditor 
                            v-model="newVal.list[index].paragraf[0]"
                            :name="'paragrafid'+index"
                            :max="2500"
                            :counter="true"
                            :key="'kyefadf0'+index+keyText"
                        />
                    </div>
                    <div>
                        
                        <div class="font-medium mb-1">{{$t('Deskripsi')}} (English)</div>
                        <InputTextEditor 
                            v-model="newVal.list[index].paragraf[1]"
                            :name="'paragrafen'+index"
                            :max="2500"
                            :counter="true"
                            :key="'kyefadf1'+index+keyText"

                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button title="Delete Section" @click="deleteSection(item, index)" class="flex items-center p-2 border border-empat rounded bg-white transition-all hover:bg-gray-200">
                    <img class="w-4 h-4" src="/icons/icon-delete-black.png" alt="icon-delete">
                    <span class="text-sm text-warna-empat ml-2">{{ $t('Delete Section') }}</span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 lg:col-span-6">
                <button title="+Image" @click="addSection(1)" type="button" class="text-center w-full bg-white border border-tujuh hover:bg-gray-200 transition-all text-empat rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto ">+ {{ $t('Image') }}</button>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <button title="+Text" @click="addSection(2)" type="button" class="text-center w-full bg-white border border-tujuh text-empat hover:bg-gray-200 transition-all rounded-md shadow shadow-[#45a6ff33] py-2 mx-auto ">+ {{ $t('Text') }}</button>            
            </div>
        </div>
      <!-- <pre>  {{ newVal }} </pre> -->
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
            loader: false,
            keyImage: 0,
            keyText: 0,
            newVal: {
                list: [],
                new: [],
                deleted: [],
                updated: [],

            },
            firstRun: true,
                debounceTimeout: null,

        }
    },

    mounted() {
        this.initialize()
    },
    watch: {
        'newVal.list' : {
            handler(val) {
                // if(this.firstRun === false) this.detailChanges();
                this.updateValue()
            },
            deep: true
        }
    },
    methods: {
        initialize() {
            this.firstRun = true
            this.loader = false
            this.newVal = this.value
            

            //init sorter
            const newList = _.orderBy(this.value.list, 'sorter')
            this.newVal.list = newList.map((e,index) => {
                e.sorter = index
                return e;
            })
            this.newVal.new = _.orderBy(this.value.new, 'sorter')

            this.$nextTick(() => {
            this.keyImage+=1
            this.keyText+=1
            this.firstRun = false

                this.loader = true
            })
        },

        deleteSection(item, index) {
            // console.log(item)
            if (item.typeDeskripsi === 1) {
                if (item.imgDeskripsiId && item.imgDeskripsiId !== '') this.newVal.deleted.push(item.imgDeskripsiId)
                // this.$toast.show('Image Deleted')
            } else if (item.typeDeskripsi === 2) {
                if (item.txtDeskripsiId && item.txtDeskripsiId !=='') this.newVal.deleted.push(item.txtDeskripsiId)
                // this.$toast.show('Text Deleted')

            }
            this.newVal.deleted = _.uniq(this.newVal.deleted)
            this.newVal.list.splice(index,1)
            this.$nextTick(() => {
                this.keyImage+=1
                this.keyText+=1
            })
        }, 
        addSection(typeDeskripsi) {

            const vA = {
                typeDeskripsi: typeDeskripsi,
                imgDeskripsi: '',
                caption: ['khub','khub'],
                paragraf: ['',''],
                sorter: this.newVal.list.length + 1,
                tipe: 'new'
            }

            this.newVal.list.push(vA)
            const index = this.newVal.list.length - 1 
            setTimeout(() => {
                // this.$gsap.to('.content-section-1', { duration: 2})
                    this.$scrollTo('.content-section-' + index, 250, {easing: 'ease-in-out', offset: -80})
            },200)
        },
        updateValue() {
            this.keyImage+=1
            this.$emit('input', this.newVal)
        },
        detailChanges() {
            // this.newVal.list = this.newVal.list.map((e,index) => {
            //     e.sorter = index 
            //     return e    
            // })

            // const newDesk = this.newVal.list.filter(e => e.tipe === 'new');
            // const updatedDesk = this.newVal.list.filter(e => !e.tipe && e.txtDeskripsi === 1 )
            // const updateImg = this.newVal.list.filter(e => e.imgDeskripsi && e.imgDeskripsi.file !== null)

            // this.newVal.new = newDesk
            // this.newVal.updated = updatedDesk
        }


    }
}
</script>