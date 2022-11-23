<template>
    <div>
        <div class="flex items-center justify-between">
            <div @click="actionBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
            <div class="flex gap-x-6  font-semibold">
                <div @click="actionEdit" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Edit</div>
                <div class="relative">
                    <select id="footeraction" name="footeraction" v-model="value"
                        class="cursor-pointer appearance-none w-[180px] focus:outline-none border border-warna-tujuh rounded-lg px-4 py-2 text-white" :class="warna">
                            <option v-for="(i, index) in opsi" :key="'opsi'+index" :value="i.id">
                                {{i.label}}
                            </option>
                    </select>
                    <div class="absolute top-0 right-0 h-full items-center flex px-2">                
                        <img src="/icons/icon-arrow-down-white.png" alt="arrow-down" class="w-4 h-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['actionEdit', 'actionBack', 'value', 'opsi', 'warna'],
    data() {
        return {
            
        }
    },
}
</script>