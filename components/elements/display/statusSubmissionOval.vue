<template>
    <div>
        <div v-if="submission === 1" class="py-2 w-[150px] text-center bg-warna-under-review rounded-3xl text-white ">Under Review</div>
        <div v-else-if="submission === 3" class="py-2 w-[150px] text-center bg-warna-need-revision rounded-3xl text-white ">Need Revision</div>
        <div v-else-if="submission === 4" class="py-2 w-[150px] text-center bg-warna-approved-accepted rounded-3xl text-white ">Approved</div>
        <div v-else-if="submission === 2" class="py-2 w-[150px] text-center bg-warna-draft rounded-3xl text-white ">Draft</div>
    </div>
</template>
<script>
export default {
    props: ['submission']
}
</script>