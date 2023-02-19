<template>
    <div>
        <ul class="ul-zebra text-[#444444]">
            <li 
                v-for="(item, index) in npsField" :key="'npsfield'+index" 
                class="grid grid-cols-12 gap-y-5 items-center">
                <div class="col-span-12 md:col-span-4 text-warna-dua text-[14px]">{{ item.label }}</div>
                <div class="col-span-12 md:col-span-4">
                    <div class="w-1/2 mx-auto">
                        <InputNumber
                            v-model="nps[item.itemValue]"
                            :name="prefixName+item.itemValue"
                            :label="''"
                            :step="1"
                            :key="'kepusan'+index+item.itemValue+keyNumber"
                        />

                    </div>
                </div>
                <div class="col-span-12 md:col-span-4 text-right">
                    <!-- <button @click="hapus(item)" class="text-[#9E9E9E] hover:text-[#161616]">Hapus</button> -->
                </div>

            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['value','prefixName'],
    data() {
        return {
            keyNumber:0,
            npsField: [
                // {
                //     label: 'Detractors',
                //     itemValue: 'satisfactionSangatTidakPuas'
                // }, 
                // {
                //     label: 'Passives',
                //     itemValue: 'satisfactionTidakPuas'
                // },
                // {
                //     label: 'Promoters',
                //     itemValue: 'satisfactionNetral'
                // },
                {
                    label: 'NPS Score 1',
                    itemValue: 'netPromotorScore1'
                },
                {
                    label: 'NPS Score 2',
                    itemValue: 'netPromotorScore2'
                },
                {
                    label: 'NPS Score 3',
                    itemValue: 'netPromotorScore3'
                },
                {
                    label: 'NPS Score 4',
                    itemValue: 'netPromotorScore4'
                },
                {
                    label: 'NPS Score 5',
                    itemValue: 'netPromotorScore5'
                },
                {
                    label: 'NPS Score 6',
                    itemValue: 'netPromotorScore6'
                },
                {
                    label: 'NPS Score 7',
                    itemValue: 'netPromotorScore7'
                },
                {
                    label: 'NPS Score 8',
                    itemValue: 'netPromotorScore8'
                },
                {
                    label: 'NPS Score 9',
                    itemValue: 'netPromotorScore9'
                },
                {
                    label: 'NPS Score 10',
                    itemValue: 'netPromotorScore10'
                }








            ]
        }
    },
    computed: {
        nps: {
            get() {
                return this.value
            },
            set(val) {
                return val
            }
        }
    },
    methods: {
        hapus(item) {
            console.log(item)
            this.nps[item.itemValue] = 0
            this.keyNumber +=1
        }
    }
}
</script>