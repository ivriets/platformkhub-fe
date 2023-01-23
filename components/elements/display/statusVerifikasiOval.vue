<template>
    <div>
        <div v-if="status === 1" class="px-6 py-2 bg-warna-need-verification rounded-3xl text-white ">Need Verification</div>
        <div v-else-if="status === 2" class="px-6 py-2 bg-warna-rejected rounded-3xl text-white ">Rejected</div>
        <div v-else-if="status === 3" class="px-6 py-2 bg-warna-approved-accepted rounded-3xl text-white ">Accepted</div>
        <div v-else-if="status === 4" class="px-6 py-2 bg-warna-suspended rounded-3xl text-white ">Suspended</div>
    </div>
</template>
<script>
export default {
    props: ['status']
}
</script>