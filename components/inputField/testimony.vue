<template>
    <div>
        <InputTestimony 
            v-model="newVal.list"
        />
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
            }
        }
        
    }
</script>

