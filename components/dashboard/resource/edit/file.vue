<template>
    <div>
        <div class="mb-5">
            <InputRadio 
                v-model="newVal.typeResources"
                :label="$t('Resource Type')"
                :opsiRadio="opsiTypeResources"
                :name="'resourcetype'"
                :orientasi="'horizontal'"
                :key="'keyfda'+keyMaster"
                :order="'sorter'"
            />
        </div>
        <div class="mb-5">
            <InputText 
                v-model="newVal.embedLink"
                :placeholder="'Input embedded link'"
                :name="'embedlink'"
                :disabled="newVal.binFile===''  ? false : true"
                :key="'embedlink'+keyMaster"

            />
        </div>
        <div class="mb-5 text-center">Or</div>
        <div class="mb-5 text-center">
            <InputBerkasUpload 
                v-model="newVal.binFile"
                :maxSize="10"
                :accept="acceptFile"
                :disabled="newVal.embedLink === '' ? false:true "

            />
        </div>
    </div>
</template>
<script>
export default {
    props: ['value'],
    data() {
        return {
            resourceType: '',
            keyMaster: 0,

        }
    },
    computed: {
        opsiTypeResources() {
            return this.$store.state.opsi.typeResources
        },
        newVal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input',value)
            }
        },

        disRoot() {
            if (this.newVal.embedLink !== '' || this.newVal.binFile !== '') {
                return true;
            } else {
                return false;
            }
        },
        acceptFile() {
            if (this.newVal.typeResources === 3) {
                return '.pdf'
            } else if (this.newVal.typeResources === 4) {
                return 'video/*'
            } else if (this.newVal.typeResources === 5) {
                return 'audio/*'
            } else {
                return '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt'
            }
        }
    },



}
</script>