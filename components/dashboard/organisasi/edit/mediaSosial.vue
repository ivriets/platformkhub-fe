<template>
    <div>
        <div v-if="form" class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
            <div v-for="(i, index) in form" :key="index" class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="i.linkSosialMedia"
                        placeholder="Tulis disini"
                        :name="prefixName+listSosialMedia[i.kategoriSosialMedia-1]"
                        :label="'Tautan '+listSosialMedia[i.kategoriSosialMedia-1]"
                    />
                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6 mt-10">
            <div class="flex items-center justify-end">
                <div @click="save" class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'mediasosial',
            form: undefined,
            listSosialMedia: ["Twitter","Instagram","Youtube","LinkedIn","Facebook"]
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
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.form = res.data.sosialMedia.sort((a, b)=> a.kategoriSosialMedia-b.kategoriSosialMedia)
            }).catch(err => {
                console.log(err)
            })
        },

        
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                this.message = data.message
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },
        save (){
            this.updateData({"sosialMedia":this.form})
        }
    }
}
</script>