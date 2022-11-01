<template>
    <div>
        <div :class="classTambahan">
            <div class="collaps-header" @click="statusCollaps=!statusCollaps">
                <div class="flex items-center justify-between py-[10px]" :title="title">
                    <div v-if="isDrawer" class="flex items-center">
                        <img class="h-[24px] w-[24px]" :src="icon" alt="icon-menu">
                        <div class="text-base ml-3">{{title}}</div>
                    </div>
                    <div v-if="isDrawer">
                        <i v-if="statusCollaps" class="ri-arrow-up-s-line"></i>
                        <i v-else class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="statusCollaps && isDrawer" class="collaps-body">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>


<script>
export default {
    props: ['icon', 'title', 'classTambahan', 'isDrawer'],
    data() {
        return {
            statusCollaps: false,
        }
    },
}
</script>