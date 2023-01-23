<template>
    <div class="text-sm font-semibold mb-5">
        <div class="text-warna-delapan">{{ title }}</div>
        <div class="text-warna-sembilan" >
            <slot>
                <div v-if="content && content !== null">
                {{content}}
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'content'],
    data() {
        return {

        }
    }
}
</script>