<template>
    <div class=" w-10/12 md:w-[250px] rounded-xl bg-white border p-3">
        <div v-if="segmen.includes('image')" class="skeleton h-[150px] w-full rounded-md mb-3"></div>
        <div v-if="segmen.includes('chip')" class="rounded-full w-24 h-[22px] skeleton mb-3"></div>
        <div v-if="segmen.includes('title')" class="for-title mb-2">
            <div class=" w-full skeleton-text mb-1"></div>
            <div class=" w-10/12 skeleton-text mb-1"></div>
            <div class=" w-1/2 skeleton-text"></div>
        </div>
        <div v-if="segmen.includes('desc')" class="for-desc mb-2">
            <div class=" w-full skeleton h-[8px] mb-1"></div>
            <div class=" w-11/12 skeleton h-[8px] mb-1"></div>
            <div class=" w-7/12 skeleton h-[8px]"></div>
        </div>

        <div v-if="segmen.includes('author')"  class="skeleton-text w-24 mt-5 "></div>
        <div v-if="segmen.includes('kategori')" class="for-desc mt-5">
            <div class=" flex items-center mb-1 gap-3">
                    <div class=" w-3/12 skeleton h-[8px]"></div>
                    <div class=" w-2/12 skeleton h-[8px]"></div>
                    <div class=" w-1/12 skeleton h-[8px]"></div>
            </div>
            <div class=" w-11/12 skeleton h-[8px] mb-1"></div>
            <div class=" w-7/12 skeleton h-[8px]"></div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props: ['segmen'],
        data() {
            return {

            }
        }
    }
</script>

