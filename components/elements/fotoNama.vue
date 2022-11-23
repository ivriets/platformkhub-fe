<template>
    <div>
        <div class="flex items-center text-warna-utama text-lg font-medium">
            <div class=" bg-white shadow-md border border-gray-50 rounded-full ">
                <img :src="logo" alt="main-image" class="w-[78px] h-[78px] rounded-full">
            </div>
            <div class="ml-3">
                {{ label }}
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['label', 'logo'],
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>