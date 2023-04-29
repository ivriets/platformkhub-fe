<template>
    <div>
        <div v-if="status === 1" :class="status === 1 ? 'text-need-verification' : '' ">Need Verification</div>
        <div v-else-if="status === 2" :class="status === 2 ? 'text-rejected' : '' ">Rejected</div>
        <div v-else-if="status === 3" :class="status === 3 ? 'text-approved-accepted' : '' ">Accepted</div>
        <div v-else-if="status === 4" :class="status === 4 ? 'text-suspended' : '' ">Suspended</div>
        <div v-else-if="status === 0" :class="status === 0 ? 'text-red-500' : '' ">Deleted</div>

    </div>
</template>
<script>
export default {
    props: ['status']
}
</script>