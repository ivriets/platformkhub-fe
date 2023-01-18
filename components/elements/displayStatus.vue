<template>
    <div>
        <div v-if="submission === 1" class="text-under-review ml-1">Under Review</div>
        <div v-if="submission === 2" class="text-draft ml-1">Draft</div>
        <div v-if="submission === 3" class="text-need-revision ml-1">Need Revision</div>
        <div v-if="submission === 4" class="text-approved-accepted ml-1">Approved</div>
    </div>
</template>
<script>
export default {
    props: ['submission']
}
</script>