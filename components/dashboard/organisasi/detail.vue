<template>
    <div class="py-[80px]">
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <div class="flex items-start justify-between mb-6">
                <div class="px-6 py-2 bg-warna-approved rounded-3xl text-white ">Need Verification</div>
                <div></div>
            </div>
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">
                    <div class="w-full bg-gray-50 rounded-xl ">
                        <img src="/images/logo.png" alt="main-image">
                    </div>
                </div>
                <div v-if="detailOrganisasi" class="col-span-8">
                    <div class="text-xl font-bold text-warna-utama">{{ detailOrganisasi.namaOrganisasi }}</div>
                    <hr class="border-warna-tujuh my-5">
                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div class="">
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">User ID</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.organisasiId }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Name</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.namaOrganisasi }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Created</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ $dayjs(detailOrganisasi.created).format('DD MMM YYYY hh:mm A') }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Updated</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ $dayjs(detailOrganisasi.updated).format('DD MMM YYYY hh:mm A') }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Email</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.email === true ? detailOrganisasi.email : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Phone</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.phone === true ? detailOrganisasi.phone : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Social Media</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">
                                        <div v-for="(item, index) in detailOrganisasi.socialMedia" :key="index + 'sosmed'" class="mb-1">{{ item.label }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div class="">
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Total Member</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.totalMember ? detailOrganisasi.totalMember : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Website</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailOrganisasi.website ? detailOrganisasi.website : '-' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-xl p-6 mb-10">
            <div class="text-xl font-bold text-warna-utama">About Me</div>
            <hr class="border-warna-tujuh my-5">
            <div class="text-sm text-warna-delapan">{{ detailOrganisasi.deskripsi }}</div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="flex gap-x-6  font-semibold">
                    <div class="px-8 py-2 bg-warna-declined rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</div>
                    <div class="px-8 py-2 bg-warna-approved rounded-lg text-white cursor-pointer hover:bg-green-700">Accept</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detailOrganisasi: {
                organisasiId: '91123548',
                namaOrganisasi: 'Kita Bhinneka Tunggal Ika',
                created: new Date(),
                updated: new Date(),
                emailIsVerified: true,
                accountIsVerified: false,
                phoneIsVerified: false,
                signUpAddress: '119.18.122.3',
                socialMedia: [
                    {
                        id: 'sosmed-01',
                        label: 'Facebook',
                        url: ''
                    },
                    {
                        id: 'sosmed-02',
                        label: 'Twitter',
                        url: ''
                    },
                    {
                        id: 'sosmed-03',
                        label: 'Youtube',
                        url: ''
                    },
                    {
                        id: 'sosmed-04',
                        label: 'Instagram',
                        url: ''
                    },
                ],
                email: 'kitabhinneka@gmail.com',
                phone: '+6281283571474',
                totalMember: 102,
                website: 'www.kitabhinnekatunggalika.com',
                deskripsi: 'Nauval is currently in his final year as an International Relations student at Padjadjaran University with a strong curiosity and interest in Islamic Politics, Contemporary Islamic Movements (Salafism/Jihadism/Qutbism), Middle East Politics, Knowledge Production, and Critical Terrorism Studies. He has internship experience as a research assistant and publishing staff in various NGOs and research institutes, such as LP3ES, MAARIF Institute, & DASPR. He aspires to be an aspiring scientist who focuses on the interactions of religion, politics, state-society relations, and power relations.'
            }
        }
    },
    mounted() {
        
    },
    methods: {
        btnBack() {
            this.$router.push('/verifications/organisasi')
        }
    },
}
</script>