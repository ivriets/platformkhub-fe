<template>
    <div>
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 md:col-span-6 gap-y-5">
                <div class="mb-10 font-semibold">{{ $t('Berdasarkan Gender') }}</div>
                <div class="grid grid-cols-12 items-center mb-5">
                    <div class="col-span-6 ">{{ $t('Laki-Laki') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.beneficiariesMen"
                            :name="prefixName+'beneficiariesMen'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-12 items-center">
                    <div class="col-span-6 ">{{ $t('Perempuan') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.beneficiariesWomen"
                            :name="prefixName+'beneficiariesWomen'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 gap-y-5">
                <div class="mb-10 font-semibold">{{ $t('Berdasarkan Gender Difabel') }}</div>

                <div class="grid grid-cols-12 items-center mb-5">
                    <div class="col-span-6 ">{{ $t('Laki-Laki') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.beneficiariesMenDifable"
                            :name="prefixName+'beneficiariesMenDifable'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-12  items-center">
                    <div class="col-span-6 ">{{ $t('Perempuan') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.beneficiariesWomenDifable"
                            :name="prefixName+'beneficiariesWomenDifable'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
            </div>
        </div>
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