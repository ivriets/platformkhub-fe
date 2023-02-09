<template>
    <div>
        <InputAutocompleteMulti 
            v-model="newVal"
            :name="name"
            :label="label"
            :opsi="opsi"
            :itemValue="'id'"
            :itemLabel="'nama'"
            :multilang="true"
            :required="required"
            :key="'keysingle'+kategori+keyMaster"
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

