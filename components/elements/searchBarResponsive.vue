<template>
    <div class="flex items-center relative">
        <input 
            v-model="defVal"
            type="text" 
            :placeholder="placeholder"
            v-on:keyup.enter="performSearch"
            v-on:keyup.esc="clearSearch"
            class="focus:outline-none w-full border border-utama rounded px-2 py-1.5 text-sm placeholder-gray-300 focus:border-utama/50"
        />
        <button v-if="gaya==='button'" @click="performSearch" class="ml-2 rounded px-3 py-2 bg-utama text-white text-sm" >Search</button>
        <button v-if="gaya==='icon'"  @click="performSearch" class="absolute top-0 right-0 translate-y-1/2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#9E9E9E" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></svg>
        </button>
    </div>
</template>

<script>
export default {
    props: ['value','placeholder','gaya'],
    data() {
        return {
            defVal: ''
        }
    },
    watch: {
        defVal(val) {
            this.updateValue(val)
        }
    },
    methods: {
        performSearch() {
            this.updateValue(this.defVal)
        },
        clearSearch() {
            this.defVal = '';
            this.updateValue('')
        },
        updateValue(val) {
            this.$emit('input', val)
        },
        // keyup(event) {
        //     // console.log('key',event)
        //     if (event.key==='ArrowDown') {
        //         const data = {
        //             key: event.key,
        //             value: ''
        //         }

        //         this.$emit('keyup',data)
        //     }
        // },
    }
}
</script>