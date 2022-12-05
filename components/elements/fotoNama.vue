<template>
    <div>
        <div class="flex items-center text-warna-utama text-lg font-medium">
            <div 
                class="bg-no-repeat bg-center bg-white border border-gray-50 rounded-full shadow cursor-pointer" 
                style="height: 78px; width: 78px; background-size: 70%;" 
                :style="'background-image: url('+logo+');'"
            >
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