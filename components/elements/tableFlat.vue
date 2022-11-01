<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="text-sm w-full text-warna-font-tabel">
                <thead class="border-b border-[#9E9E9E]">
                    <tr>
                        <th v-for="(i, index) in masterTable" :key="'th'+index" scope="col" class="font-normal text-left p-5">{{i.header}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="hover:bg-gray-50">
                        <td v-for="(x, index2) in masterTable" :key="index+'dt'+index2" scope="row" class="p-5">
                            <div v-if="x.value === 'emailIsVerified'">
                                <img v-if="item[x.value] === true" class="h-[24px] w-[24px]" src="/icons/icon-status-acc.png" alt="icon-verified">
                                <img v-if="item[x.value] === false" class="h-[24px] w-[24px]" src="/icons/icon-status-need.png" alt="icon-need">
                            </div>
                            <div v-if="x.value === 'status'">
                                <div v-if="item[x.value] === 'Accepted'" :class="item[x.value] === 'Accepted' ? 'text-warna-lima' : '' ">{{ item[x.value] }}</div>
                                <div v-if="item[x.value] === 'Need Verification'" :class="item[x.value] === 'Need Verification' ? 'text-[#E4BA08]' : '' ">{{ item[x.value] }}</div>
                                <div v-if="item[x.value] === 'Rejected'" :class="item[x.value] === 'Rejected' ? 'text-warna-enam' : '' ">{{ item[x.value] }}</div>
                                <div v-if="item[x.value] === 'Suspended'" :class="item[x.value] === 'Suspended' ? 'text-[#C25D00]' : '' ">{{ item[x.value] }}</div>
                            </div>
                            <div v-if="!['emailIsVerified', 'status'].includes(x.value)" class="">{{ item[x.value] }}</div>
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