<template>
    <div>
        <div v-if="form" class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
            <div v-for="(i, index) in form" :key="index" class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form[index].linkSosialMedia"
                        :name="listSosialMedia[index]"
                        :label="$t(listSosialMedia[index]+' link')"
                    />
                </div>
            </div>
        </div>

<!-- <pre>{{ form }}</pre> -->
    </div>
</template>


<script>
export default {
    props: ['value'],
    data() {
        return {
            prefixName: 'mediasosial',
            form: [],
            listSosialMedia: ["Twitter","Instagram","Youtube","LinkedIn","Facebook"],
            orgDetail: null
            
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
    watch: {
        value(val) {
            // console.log(val)
            if (val === true) {
                this.save();
                setTimeout(() => {
                    this.$emit('input', false)
                },500)
            }
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
                // this.form = res.data.sosialMedia.sort((a, b)=> a.kategoriSosialMedia-b.kategoriSosialMedia);
                this.orgDetail = res.data
                const newForm = this.listSosialMedia.map((e,index) => {
                    const dariApi = res.data.sosialMedia.filter( x=> x.kategoriSosialMedia === (index + 1))
                    const hasil = dariApi.length > 0 ? dariApi[0] : '' 
                    const data = {
                        // pkSosialMediaId: hasil.pkSosialMediaId ? hasil.pkSosialMediaId : '',
                        kategoriSosialMedia: index + 1,
                        linkSosialMedia: hasil.linkSosialMedia ? hasil.linkSosialMedia : '',
                        organisasiId: this.id
                    }
                    if (hasil) {
                        data.pkSosialMediaId = hasil.pkSosialMediaId
                    }
                    return data;
                })
                this.form = _.orderBy(newForm, 'kategoriSosialMedia')

            }).catch(err => {
                console.log(err)
            })
        },

        
        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                this.$toast.show(this.$t('Social Media') + ' ' + this.$t('updateSukses'))
                this.initialize()
            }).catch(err => {
                this.$toast.show(err)

                console.log(err)
            })
        },
        save (){
            this.updateData({"sosialMedia":this.form})
            // const newSosMed = this.form.filter(e=> e.linkSosialMedia !== '');
            // console.log(newSosMed)
            // this.orgDetail.sosialMedia = newSosMed
            // this.updateData()

        }
    }
}
</script>