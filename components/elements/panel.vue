<template>
    <div class="">
        
        <div v-for="(item, index) in listPanel" :key="'panel' + index" class="border rounded-lg w-full px-3 py-4 mb-4">
            <div class="flex items-center panel-drop">
                <div class="grow text-base md:text-xl text-empat">
                    {{item.title[bahasa]}}
                </div>
                <button v-if="item.expanded" @click="toggle(item)" class="shrink-0">
                    <img  class="w-6 h-6" src="/icons/icon-minus.svg" alt="icon-minus">                   
                </button>
                <button v-else class="shrink-0" @click="toggle(item)" >
                    <img class="w-6 h-6" src="/icons/icon-plus.svg" alt="icon-plus">
                </button>
            </div>
                <div
                :style="item.expanded? ' will-change: height;transition:all 0.2s ease;':'height:0 !important;'"
                class="text-sm md:text-base text-empat  overflow-hidden ">
                <div ref="konten" class="mt-6" :id="'lp-'+index">
                    {{item.content[bahasa]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['listPanel'],
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        }
    },
    methods: {
        toggle(item) {
            item.expanded = !item.expanded
        },


    }
}
</script>