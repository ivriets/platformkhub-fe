<template>
    <div>
        <InputSelect 
            v-model="newVal"
            :name="name"
            :label="label"
            :required="required"
            :opsi="opsi"
            :itemValue="'id'"
            :itemLabel="'nama'"
            :multilang="true"
            :key="'key'+kategori+keyMaster"

        />
    </div>
</template>

<script>
    export default {
        props: ['value', 'label','required', 'name', 'disabled', 'placeholder', 'multilang', 'addNew', 'kategori'],
        data() {
            return {
                opsi:[],
                keyMaster:0
            }
        },
        computed: {
            newVal: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input',value)
                }
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.getKategori()
            },
            async getKategori() {
                await this.$apiPlatform.get('daftarList/kategori/?kategori1='+this.kategori).then(res => {
                    this.opsi = _.orderBy(res.data,'sorter')
                    this.$nextTick(() => {
                        this.keyMaster+=1
                    })
                })
            }
        }
        
    }
</script>

