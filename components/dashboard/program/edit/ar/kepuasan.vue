<template>
    <div>

        <ul class="ul-zebra text-[#444444]">
            <li 
                v-for="(item, index) in kepuasanField" :key="'kepuasanfield'+index" 
                class="grid grid-cols-12 gap-y-5 items-center">
                <div class="col-span-12 md:col-span-4 text-warna-dua text-[14px]">{{ item.label }}</div>
                <div class="col-span-12 md:col-span-4">
                    <div class="w-1/2 mx-auto">
                        <InputNumber
                            v-model="kepuasan[item.itemValue]"
                            :name="prefixName+item.itemValue"
                            :label="''"
                            :step="1"
                            :key="'kepusan'+index+item.itemValue+keyNumber"
                        />

                    </div>
                </div>
                <div class="col-span-12 md:col-span-4 text-right">
                    <button @click="hapus(item)" class="text-[#9E9E9E] hover:text-[#161616]">Hapus</button>
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
            kepuasanField: [
                {
                    label: 'Sangat Tidak Puas',
                    itemValue: 'satisfactionSangatTidakPuas'
                }, 
                {
                    label: 'Tidak Puas',
                    itemValue: 'satisfactionTidakPuas'
                },
                {
                    label: 'Netral',
                    itemValue: 'satisfactionNetral'
                },
                {
                    label: 'Puas',
                    itemValue: 'satisfactionPuas'
                },
                {
                    label: 'Sangat Puas',
                    itemValue: 'satisfactionSangatPuas'
                }
            ]
        }
    },
    computed: {
        kepuasan: {
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
            this.kepuasan[item.itemValue] = 0
            this.keyNumber +=1
        }
    }
}
</script>