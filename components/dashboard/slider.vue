<template>
    <div v-if="form" class="bg-white p-5 rounded-3xl shadow-md">
        <div class="text-xl font-semibold text-[#212121] mb-[28px]">Slider Editor</div>
        <div class="grid grid-cols-12 gap-x-4 gap-y-[28px]">
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    v-model="form.judul[0]"
                    placeholder="Write Here"
                    :name="prefixName+'titleid'"
                    :label="'Indonesia Title'"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    v-model="form.judul[1]"
                    placeholder="Write here"
                    :name="prefixName+'titleen'"
                    :label="'English Title'"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputTextArea 
                    v-model="form.deskripsi[0]"
                    :max="500"
                    placeholder="Write Here"
                    :label="'Indonesia Description'"
                    :name="prefixName+'deskripsiid'"
                    />
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputTextArea 
                    v-model="form.deskripsi[1]"
                    :max="500"
                    placeholder="Write Here"
                    :label="'English Description'"
                    :name="prefixName+'deskripsiid'"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="pb-10">
                    <div class="font-medium mb-1">Image</div>
                    <div class="border-dashed border-2 border-warna-tujuh pt-[25px] pb-[25px] rounded-lg text-center">
                        <div class="text-xs text-[#BABABA] mb-2">
                            <div>16 : 9</div>
                            <div>JPG, GIF, PNG no larger than 25 MB</div>
                        </div>
                        <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] py-2 w-[195px] mx-auto text-[#45A6FF] cursor-pointer">Choose File</div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <InputText 
                    placeholder="Write Here"
                    :name="prefixName+'titleid'"
                    :label="'Alt Image'"
                />
            </div>
        </div>
        <hr class="bg-#9E9E9E h-0.25 pb-9 px-14px">
        <div class="flex justify-end">
            <button @click="save" class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold ">Save</button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'slider',
            form: undefined,

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
            this.dataTable = []
            await this.$apiBase.get('sliderloker/kcMzuavg/').then(res => {
                this.form = res.data
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiBase.put('sliderloker/kcMzuavg/', data).then(res => {
                const data = res.data         
                this.message = data.message
                alert("Data berhasil disimpan.")
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        }, 
        
        save() {
            var dataSave = {
                "judul": this.form.judul,
                "deskripsi": this.form.deskripsi
            }
            this.updateData(dataSave)
        }
    },
}
</script>