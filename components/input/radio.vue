<template>
    <div>
        <div v-if="label" class="font-medium mb-3">
            {{label}} <span class="text-[#DF4B61] font-semibold" v-if="required && required === true">*</span>
        </div>
        <div :class="orientasi==='horizontal'? 'flex items-center' : ''">
            <div v-for="(i, index) in newOpsi" :key="'jk'+name+index" class="flex items-center mr-5 mb-2">
                <label
                    class="text-sm  flex items-center"
                    :class="disabled?' text-gray-400 ' : 'cursor-pointer text-sembilan'"
                >
                <input 
                    type="radio" 
                    :id="name+i.id" 
                    v-model="valRadio"
                    :value="i.id"  
                    class="w-4 h-4 text--empat bg-gray-100 border-gray-300 focus:ring-empat focus:ring-0 "
                    :disabled="disabled?disabled:false"
                >
                    <span class="ml-2">{{ i.label[bahasa] }}</span>
                </label>
                <!-- <label :for="'cc'+name+i.id" class="ml-2 text-sm text-warna-sembilan " :class="disabled?'' : 'cursor-pointer'" >{{ i.label[bahasa] }}</label> -->
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['label', 'opsiRadio', 'value', 'name', 'orientasi', 'disabled', 'required', 'order'],
    data() {
        return {
            valRadio: '',
        }
    },
    watch: {
        valRadio(val) {
            this.$emit('input',val)
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        newOpsi() {
            return this.order ? _.orderBy(this.opsiRadio, this.order) : _.orderBy(this.opsiRadio, 'label['+this.bahasa+']')
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            if (this.value !== '') {
                this.valRadio = this.value
            }
        }
    },
}
</script>