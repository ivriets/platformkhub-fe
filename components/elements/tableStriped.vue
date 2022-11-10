<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="w-full rounded-xl">
                <thead class="">
                    <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                        <th class="font-normal py-5 px-5 w-[200px]">No.</th>
                        <th v-for="(i, index) in masterTable" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped">
                        <td class="font-normal p-5">{{ index+1 }}.</td>
                        <td v-for="(x, index2) in masterTable" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                            <div class="flex items-center gap-2">
                                <img :src="item[x.foto]" alt="img" class="rounded-full w-6 h-6 bg-green-200">
                                <div class="">{{ item[x.value] }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dataTable', 'masterTable'],
    data() {
        return {
            
        }
    },
}
</script>