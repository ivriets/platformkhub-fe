<template>
    <div>
        <div class="bg-white rounded-xl shadow-md p-6 mb-9 w-full">
            <div class="mb-10">
                <InputText 
                    v-model="form.title"
                    placeholder="Write here"
                    :name="prefixName+'title'"
                    :label="'Title'"
                />
            </div>
            <div class="mb-10">Introduction</div>
            <div class="">
                <div class="font-medium mb-1">Document</div>
                <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                    <div class="text-xs text-[#BABABA] mb-2">
                        <div>PDF maximum 25MB.</div>
                    </div>
                    <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] text-[#45A6FF] py-2 w-[145px] mx-auto cursor-pointer">Select File</div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div></div>
                <!-- <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div> -->
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'tutorial',
            form: {
                title: ''
            }
        }
    },
}
</script>