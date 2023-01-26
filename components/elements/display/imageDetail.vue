<template>
    <div class="w-full bg-white shadow-md border border-gray-50 rounded-xl overflow-hidden mb-10">
        <div class="rounded-b-md overflow-hidden ">
            <img :src="image" width="500" height="500" alt="main-image" class="object-contain w-full h-full ">
        </div>
        <div class="mt-4 mb-4 text-center text-warna-sembilan font-semibold">{{ $t('Thumbnail') }}</div>
    </div>
</template>
<script>
export default {
    props: ['image','label']
}
</script>