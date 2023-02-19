<template>
    <div class="font-open-important">
        <div class="text-[20px] mb-8 text-utama">{{ $t('Penerimaan Manfaat') }}</div>
        <DashboardProgramEditArPenerimaManfaat 
            v-model="newVal"
            :prefixName="prefixName"
            :key="'arpm'+keyMaster"
        />

        <div class="text-[20px] my-8 text-utama">{{ $t('Dampak') }}</div>
        <!-- <DashboardProgramEditArBes 
            v-model="newVal.baselineEndlineSurvey"
            :prefixName="prefixName"
            :key="'bes'+keyMaster"
        /> -->

        <DashboardProgramEditArSkorPengukuran 
            v-model="newVal"
            :prefixName="prefixName"
            :key="'skor'+keyMaster"
        />
        <hr class="border-tujuh my-5">
        <div class="text-lg font-semibold mb-8">{{ $t('Kepuasan') }}</div>

        <DashboardProgramEditArKepuasan 
            v-model="newVal"
            :prefixName="prefixName"
            :key="'kepuasan'+keyMaster"
        />
        <hr class="border-tujuh my-8">
        <div class="text-xl mt-8 mb-3 text-utama">Customer Acquisition Score (CAC)</div>
        <div class="text-xs mb-5 text-gray-400">{{ $t('CAC = Total Biaya program/total penerima manfaat') }}</div>
        
        
        <div class="flex items-center mb-8">
            <div class="w-56 ">
                <InputNumber2 
                    v-model="newVal.customerAcquisitionScore"
                    :label="''"
                    :name="'cac'+prefixName"
                    :prefix="'IDR'"
                    :key="'cac'+keyMaster"
                />
            </div>
            <div class="text-dua ml-3">/{{ $t('Penerima Manfaat') }}</div>
        </div>
        <hr class="border-tujuh my-8">
        <div class="text-lg font-semibold mb-8">Net Promotor Score (NPS)</div>
            <DashboardProgramEditArNps 
                v-model="newVal"
                :prefixName="prefixName"
                :key="'nps'+keyMaster"
            />
<!-- <pre>{{newVal}} </pre> -->

    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {
            item: 1,
            keyMaster: 0,
            newVal: {
                beneficiariesMen: 0,
                beneficiariesWomen: 0,
                beneficiariesMenDifable: 0,
                beneficiariesWomenDifable: 0,
                retentionSaatProgramMen: 0,
                retentionSaatProgramWomen: 0,
                retentionPascaProgramMen: 0,
                retentionPascaProgramWomen: 0,
                satisfactionSangatTidakPuas: 0,
                satisfactionTidakPuas: 0,
                satisfactionNetral: 0,
                satisfactionPuas: 0,
                satisfactionSangatPuas: 0,
                customerAcquisitionScore: 0,
                netPromotorScore1: 0,
                netPromotorScore2: 0,
                netPromotorScore3: 0,
                netPromotorScore4: 0,
                netPromotorScore5: 0,
                netPromotorScore6: 0,
                netPromotorScore7: 0,
                netPromotorScore8: 0,
                netPromotorScore9: 0,
                netPromotorScore10: 0
            }
        }
    },
    // computed: {
    //     newVal: {
    //         get() {
    //             // const baru = this.value && this.value.length > 0 ? this.value[0] : this.defaultValue
    //             return this.value
    //         },
    //         set(value) {
    //             this.$emit('input',value)
    //         }
    //     }
    // }
    watch: {
        newVal: {
            handler(val) {
                console.log(val)
                this.$emit('input',val)
            },
            deep:true
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            console.log(this.value)
            if (_.isArray(this.value) == false && this.value !==null) {
                this.newVal = this.value
                this.$nextTick(() => {
                    this.keyMaster+=1
                })
            }
        }
    }
}
</script>