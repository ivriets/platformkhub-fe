<template>
    <div>
        <div class="text-empat font-lato font-semibold mb-1">{{ $t('Unggah Materi') }}</div>
        <div>
            <InputBerkasUpload 
                v-model="newVal.binFile"
                :maxSize="10"
                :accept="'.pdf'"
                :disabled="false"
            />
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
    computed: {
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input',value)
            }
        },
    }
}
</script>