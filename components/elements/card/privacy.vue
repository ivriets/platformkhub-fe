<template>
    <div class="">



        <div v-for="(item, index) in dataCard" :key="'privacy' + index" class="grid grid-cols-12 gap-x-8 mb-14">
            <div class="col-span-12 md:col-span-5 mb-4">
                <div class="uppercase text-xl md:tex-3xl md:text-2xlplus text-warna-empat font-bold font-lato">
                    {{item.title[bahasa]}}
                </div>
            </div>

            <div class="col-span-12 md:col-span-7 text-sm text-warna-enam">
                {{item.content[bahasa]}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dataCard'],
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        }
    },
}
</script>