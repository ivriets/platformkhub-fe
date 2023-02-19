<template>
    <div>
        <div class="text-[16px]  mb-5 text--utama">{{ $t('Skor Pengukuran') }}</div>

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 md:col-span-6 gap-y-5">
                <div class="mb-3 font-semibold text-[16px]">Pretest</div>
                <div class="grid grid-cols-12 items-center mb-5">
                    <div class="col-span-6 ">{{ $t('Laki-Laki') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.retentionSaatProgramMen"
                            :name="prefixName+'retentionSaatProgramMen'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-12 items-center">
                    <div class="col-span-6 ">{{ $t('Perempuan') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.retentionSaatProgramWomen"
                            :name="prefixName+'retentionSaatProgramWomen'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 gap-y-5">
                <div class="mb-3 font-semibold">Posttest</div>

                <div class="grid grid-cols-12 items-center mb-5">
                    <div class="col-span-6 ">{{ $t('Laki-Laki') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.retentionPascaProgramMen"
                            :name="prefixName+'retentionPascaProgramMen'"
                            :label="''"
                            :step="1"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-12  items-center">
                    <div class="col-span-6 ">{{ $t('Perempuan') }}</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.retentionPascaProgramWomen"
                            :name="prefixName+'retentionPascaProgramWomen'"
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