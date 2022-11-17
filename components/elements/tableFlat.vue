<template>
    <div>
        <div class="relative overflow-x-auto">
            <table class="text-sm w-full text-warna-font-tabel">
                <thead class="border-b border-[#9E9E9E]">
                    <tr>
                        <th v-for="(i, index) in masterTable" :key="'th'+index" scope="col" class="font-normal text-left p-5">{{$t(i.header)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataTable" :key="'dt'+index" class="hover:bg-gray-50">
                        <td v-for="(x, index2) in masterTable" :key="index+'dt'+index2" scope="row" class="p-5">
                            <div @click="x.klik && x.klik === true ? goto(item) : doNothing()" class="cursor-pointer" :class="x.klik && x.klik === true ? 'hover:text-blue-700' : ''">
                                <div v-if="x.multiBahasa && x.multiBahasa === true">{{ item[x.value][bahasa] }}</div>
                                <div v-else >
                                    <div v-if="x.value === 'emailIsVerified'">
                                        <img v-if="item[x.value] === true" class="h-[24px] w-[24px]" src="/icons/icon-status-acc.png" alt="icon-verified">
                                        <img v-if="item[x.value] === false" class="h-[24px] w-[24px]" src="/icons/icon-status-need.png" alt="icon-need">
                                    </div>
                                    <div v-else-if="x.value === 'statusVerification'">
                                        <div v-if="item[x.value] === 1" :class="item[x.value] === 1 ? 'text-need-verification' : '' ">Need Verification</div>
                                        <div v-if="item[x.value] === 2" :class="item[x.value] === 2 ? 'text-rejected' : '' ">Rejected</div>
                                        <div v-if="item[x.value] === 3" :class="item[x.value] === 3 ? 'text-approved-accepted' : '' ">Accepted</div>
                                        <div v-if="item[x.value] === 4" :class="item[x.value] === 4 ? 'text-suspended' : '' ">Suspended</div>
                                    </div>
                                    <div v-else-if="x.value === 'submission'">
                                        <div v-if="item[x.value] === 4" :class="item[x.value] === 4 ? 'text-approved-accepted' : '' ">Approved</div>
                                        <div v-if="item[x.value] === 3" :class="item[x.value] === 3 ? 'text-need-revision' : '' ">Need Revision</div>
                                        <div v-if="item[x.value] === 2" :class="item[x.value] === 2 ? 'text-draft' : '' ">Draft</div>
                                        <div v-if="item[x.value] === 1" :class="item[x.value] === 1 ? 'text-under-review' : '' ">Under Review</div>
                                    </div>
                                    <div v-else-if="x.value === 'createdAt'">{{ $dayjs(item[x.value]).format('DD MMM YYYY HH:mm') }}</div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
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
    props: ['dataTable', 'masterTable', 'path', 'idValue'],
    data() {
        return {
            
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        }
    },
    methods: {
        goto(item) {
            this.$router.push(this.path+item[this.idValue])
        },

        doNothing() {

        }
    },
}
</script>