<template>
    <div>
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-10 font-semibold">Berdasarkan Gender</div>
                <div class="grid grid-cols-12 ">
                    <div class="col-span-6">Laki-Laki</div>
                    <div class="col-span-6">
                        <InputNumber
                            v-model="newVal.retentionSaatProgramMen"
                            :name="prefixName+'retentionsaatprogrammen'"
                            :label="'Men'"
                            :step=0.1
                        />
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-10 font-semibold">Berdasarkan Gender Difabel</div>
            </div>
        </div>
        <pre>{{ newVal }}</pre>
    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {

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