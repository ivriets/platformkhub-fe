<template>
    <div class="text-[14px] mb-5">
        <h3 :class="classLabel ? classLabel : 'text-warna-delapan'" class="mb-1 font-semibold">{{ title }}</h3>
        <div :class="classContent ? classContent : 'text-sembilan font-semibold' "  >
            <slot>
                {{content}}
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'content', 'classContent', 'classLabel'],
    data() {
        return {

        }
    }
}
</script>