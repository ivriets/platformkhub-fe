<template>
    <button @click="$emit('click')"  class="button-gede">
        <div class="flex items-center justify-around">
            <div class="flex items-center justify-center">
                <img class="h-[102px] w-[102px]" :src="icon"  alt="icon-verified">
            </div>
            <div class="text-center">
                <div class="text-[45px] text-warna-utama">{{ content }}</div>
                <div class="text-warna-dua" v-html="label"></div>
            </div>
        </div>
    </button>
</template>
<script>
export default {
    props:['label', 'content', 'icon']
}
</script>