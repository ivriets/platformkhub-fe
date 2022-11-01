<template>
    <div>
        <button class="text-sm font-semibold border border-warna-tujuh text-warna-empat rounded-2xl px-3 py-[6px] hover:bg-gray-50">{{label}} ({{jumlah}})</button>
    </div>
</template>

<script>
export default {
    props: ['value', 'label', 'jumlah'],
    data() {
        return {
            
        }
    },
}
</script>