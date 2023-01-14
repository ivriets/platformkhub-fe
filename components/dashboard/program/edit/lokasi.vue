<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <div class="">Location</div>
            <button class="btn-tambah text-sm" @click="btnAddLokasi">Add Location</button>
        </div>
        <div class="text-xs text-warna-delapan mb-4">Choose Active Location</div>
        <div>
            <!-- <ElementsTableWithSelect 
                v-model="form.lokasi"
                :dataTable="form.lokasi"
                :title="'Lokasi'"
            >

            </ElementsTableWithSelect> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ['value'],
    data() {
        return {

        }
    },
    created() {
        
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {

        },
        btnAddLokasi() {
            
        }
    }
}
</script>