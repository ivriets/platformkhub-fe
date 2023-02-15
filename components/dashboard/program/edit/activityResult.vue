<template>
    <div>
        <div class="text-xl mb-8 text-warna-utama">{{ $t('Penerimaan Manfaat') }}</div>
        {{ newVal }}
        <DashboardProgramEditArPenerimaManfaat 
            v-model="newVal"
            :prefixName="prefixName"
        />
        <hr class="border-warna-tujuh my-10">

        <div class="text-xl my-8 text-warna-utama">{{ $t('Dampak') }}</div>
        <!-- <DashboardProgramEditArBes 
            v-model="newVal.baselineEndlineSurvey"
            :prefixName="prefixName"
        /> -->
        <hr class="border-warna-tujuh my-10">
        <div class="text-xl mt-8 mb-3 text-warna-utama">Skor Pengukuran</div>
        <DashboardProgramEditArSkorPengukuran 
            v-model="newVal"
            :prefixName="prefixName"
        />
        <hr class="border-warna-tujuh my-10">
        <div class="text-lg font-semibold mb-8">Kepuasan</div>

        <DashboardProgramEditArKepuasan 
            v-model="newVal"
            :prefixName="prefixName"
        />
        <hr class="border-warna-tujuh my-10">
        <div class="text-xl mt-8 mb-3 text-warna-utama">Customer Acquisition Score (CAC)</div>
        <div class="text-xs mb-5 text-gray-400">CAC = Total Biaya program/total penerima manfaat</div>
        <div class="flex items-center mb-8">
            <div class="w-56 ">
                <InputNumber2 
                    v-model="newVal.customerAcquisitionScore"
                    :label="''"
                    :name="'cac'+prefixName"
                    :prefix="'IDR'"
                />
            </div>
            <div class="warna-dua ml-3">/ Penerima Manfaat</div>
        </div>
        <hr class="border-warna-tujuh my-10">
        <div class="text-lg font-semibold mb-8">Net Promotor Score (NPS)</div>
            <DashboardProgramEditArNps 
                v-model="newVal"
                :prefixName="prefixName"
            />
<!-- <pre>{{newVal}} </pre> -->

    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            item: 1
        }
    },
    computed: {
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                return value
            }
        }
    }
}
</script>