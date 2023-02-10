<template>
    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 md:col-span-6">
            <InputSelect
                v-model="newVal.typeChannel"
                :name="prefixName+'channel'"
                :label="$t('Channel')"
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
            // newVal: null,
            opsiChannel: [
                // {
                //     id: 0,
                //     label: 'None'
                // },
                {
                    id: 1,
                    label: 'Zoom'
                },
                {
                    id: 2,
                    label: 'Google Meet'
                }
            ]
        }
    },
    computed: {
        newVal: {
            get() {
                var baru = this.value
                baru.typeChannel = this.value && this.value.typeChannel && this.value.typeChannel.id ? this.value.typeChannel.id : baru.typeChannel
                return baru
            },
            set(value) {
                this.$emit('input',value)
            }
        }
    },
    mounted() {
        // this.initialize()
    },
    methods: {
        initialize() {
            if (this.value && this.value !== null) {
                this.newVal = this.value
                this.newVal.typeChannel = this.value && this.value.typeChannel && this.value.typeChannel.id ? this.value.typeChannel.id : this.value

            }
        }
    }
}
</script>