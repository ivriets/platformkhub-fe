<template>
    <div>
        <div v-if="label" class="font-medium mb-3">
            {{label}}
        </div>
        <div :class="orientasi==='horizontal'? 'flex items-center' : ''">
            <div v-for="(i, index) in opsiRadio" :key="'jk'+name+index" class="flex items-center mr-5 mb-2">
                <input 
                    type="radio" 
                    :id="'cc'+name+i.id" 
                    v-model="valRadio"
                    :value="i.id"  
                    class="w-4 h-4 text-warna-empat bg-gray-100 border-gray-300 focus:ring-warna-empat focus:ring-0 "
                    :disabled="disabled?disabled:false"
                >
                <label :for="'cc'+name+i.id" class="ml-2 text-sm text-warna-sembilan " :class="disabled?'' : 'cursor-pointer'" >{{ i.label[bahasa] }}</label>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['label', 'opsiRadio', 'value', 'name', 'orientasi', 'disabled'],
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