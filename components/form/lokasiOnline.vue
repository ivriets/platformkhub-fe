<template>
    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 md:col-span-6">
            <InputSelectNonBahasa 
                v-model="newVal.typeChannel"
                :name="prefixName+'channel'"
                :label="'Kanal'"
                :opsi="opsiChannel"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <InputText 
                v-model="newVal.url"
                :name="prefixName+'url'"
                :label="'Url'"
            />
        </div>

    </div>
</template>
<script>
export default {
    props: ['value', 'prefixName'],
    data() {
        return {

            opsiChannel: [
                {
                    id: 44327576,
                    label: 'Zoom'
                },
                {
                    id: 87344509,
                    label: 'Google Meet'
                }
            ]
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
    }
}
</script>