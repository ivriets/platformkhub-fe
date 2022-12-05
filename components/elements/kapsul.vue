<template>
    <div>
        <button 
            class="text-sm font-semibold border border-warna-tujuh text-warna-empat rounded-2xl px-3 py-[6px] hover:bg-gray-50 cursor-pointer"
            
        >
        {{label}} ({{jumlah}})
        </button>
        <!-- :class="currentKapsul ? 'bg-blue-100 border-warma-empat' : ''" -->
    </div>
</template>

<script>
export default {
    props: ['value', 'label', 'jumlah', 'endpoint'],
    data() {
        return {
            
        }
    },
}
</script>