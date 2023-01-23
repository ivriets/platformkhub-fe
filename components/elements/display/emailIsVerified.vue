<template>
    <div >
        <img v-if="email === true" class="h-[24px] w-[24px]" src="/icons/icon-status-acc.png" alt="icon-verified">
        <img v-else-if="email === false" class="h-[24px] w-[24px]" src="/icons/icon-status-need.png" alt="icon-need">
    </div>
</template>
<script>
export default {
    props:['email']
}
</script>