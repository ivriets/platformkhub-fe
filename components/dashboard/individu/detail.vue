<template>
    <div class="py-[80px]">
        <div class="bg-white shadow-md rounded-xl py-8 px-6 mb-10">
            <div class="flex items-center justify-between mb-6">
                <div class="px-6 py-2 bg-warna-need-verification rounded-3xl text-white ">Need Verification</div>
                <div class="inline-flex flex-col">
                    <div>
                        <button @click="toggleDrop" class="flex items-center text-sm text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:shadow-solid">
                            <svg v-if="selectedFlag === 'indonesia'" class="shadow" width="40" height="30" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)"><path d="M-5.02002 0H25.06V15.04H-5.02002V0Z" fill="white"/><rect width="20" height="8" fill="#C8102E"/></g>
                                <defs><clipPath id="clip0"><rect width="20" height="15" fill="white"/></clipPath></defs>
                            </svg>
                            <svg v-else-if="selectedFlag === 'inggris'" class="shadow" width="40" height="30" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.8037 -0.205078H-4.60254V14.9981H25.8037V-0.205078Z" fill="#00008B"/>
                                <path d="M-4.60254 -0.205078L10.6006 7.39649L-4.60254 -0.205078ZM10.6006 -0.205078L-4.60254 7.39649L10.6006 -0.205078Z" fill="black"/>
                                <path d="M10.2031 8.19485L2.99989 4.59374L-4.20336 8.19485L-5 6.60157L1.00828 3.59743L-5 0.593288L-4.20336 -1L2.99989 2.60213L10.2031 -1L10.9998 0.593288L4.9915 3.59743L10.9998 6.60157L10.2031 8.19485Z" fill="white"/>
                                <path d="M-4.60254 -0.205078L10.6006 7.39649L-4.60254 -0.205078ZM10.6006 -0.205078L-4.60254 7.39649L10.6006 -0.205078Z" fill="black"/>
                                <path d="M10.3877 7.82006L2.99898 4.12569L-4.38974 7.82006L-4.81543 6.97071L1.93679 3.5946L-4.81543 0.218489L-4.38974 -0.630859L2.99898 3.0635L10.3877 -0.630859L10.8134 0.218489L4.06117 3.5946L10.8134 6.97071L10.3877 7.82006Z" fill="#FF0000"/>
                                <path d="M2.99903 -0.205078V8.66341V-0.205078ZM-4.60254 3.5957H13.1344H-4.60254Z" fill="black"/>
                                <path d="M4.1869 8.66341H1.81115V4.78358H-4.60254V2.40783H1.81115V-0.205078H4.1869V2.40783H13.1344V4.78358H4.1869V8.66341Z" fill="white"/>
                                <path d="M2.99903 -0.205078V7.93062V-0.205078ZM-4.60254 3.5957H11.1347H-4.60254Z" fill="black"/>
                                <path d="M3.71155 7.93062H2.28651V4.30822H-4.60254V2.88318H2.28651V-0.205078H3.71155V2.88318H11.1347V4.30822H3.71155V7.93062Z" fill="#FF0000"/>
                                <path d="M-4.60254 7.39649H10.6006V-0.205078H15.6683V9.93034H-4.60254V7.39649Z" fill="#00008B"/>
                                <path d="M3.00106 8.91797L3.44093 10.2852L4.78387 9.77644L3.98926 10.9724L5.22477 11.7052L3.79364 11.8299L3.99027 13.2529L3.00106 12.212L2.01184 13.2529L2.20847 11.8299L0.777344 11.7052L2.01285 10.9724L1.21823 9.77644L2.56118 10.2852L3.00106 8.91797Z" fill="white"/>
                                <path d="M18.2036 11.3809L18.4134 12.0316L19.053 11.7893L18.6749 12.3589L19.2628 12.7076L18.5817 12.7674L18.6759 13.4444L18.2046 12.9488L17.7333 13.4444L17.8276 12.7674L17.1465 12.7076L17.7343 12.3589L17.3563 11.7893L17.9958 12.0316L18.2036 11.3809Z" fill="white"/>
                                <path d="M14.4019 5.36133L14.6117 6.01202L15.2512 5.76979L14.8731 6.3394L15.461 6.68805L14.7799 6.74684L14.8742 7.42389L14.4029 6.92826L13.9316 7.42389L14.0258 6.74684L13.3447 6.68805L13.9326 6.3394L13.5545 5.76979L14.1941 6.01202L14.4019 5.36133Z" fill="white"/>
                                <path d="M18.2036 1.24414L18.4134 1.89483L19.053 1.6526L18.6749 2.22221L19.2628 2.57087L18.5817 2.63067L18.6759 3.30771L18.2046 2.81209L17.7333 3.30771L17.8276 2.63067L17.1465 2.57087L17.7343 2.22221L17.3563 1.6526L17.9958 1.89483L18.2036 1.24414Z" fill="white"/>
                                <path d="M19.7231 7.39844L19.8883 7.80385L20.3252 7.83629L19.9907 8.11907L20.0951 8.54475L19.7231 8.31367L19.3512 8.54475L19.4556 8.11907L19.1211 7.83629L19.5579 7.80385L19.7231 7.39844Z" fill="white"/>
                            </svg>
                            <div class="ml-2">
                                <img class="" src="/icons/icon-arrow-down.png" alt="icon-down">
                            </div>
                        </button>
                    </div>
                    <div v-if="flagDrop" v-click-outside="closeDrop" class="relative z-10">
                        <div class="absolute bg-white shadow-md rounded-md right-0 text-sm w-40 mt-2 border border-gray-50">
                            <div @click="pilihInggris" class="py-2 px-4 cursor-pointer hover:bg-gray-50">Bahasa Inggris</div>
                            <div @click="pilihIndonesia" class="py-2 px-4 cursor-pointer hover:bg-gray-50">Bahasa Indonesia</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">
                    <div class="w-full bg-gray-50 rounded-xl ">
                        <img src="/images/logo.png" alt="main-image">
                    </div>
                </div>
                <div v-if="detailIndividu" class="col-span-8">
                    <div class="text-xl font-bold text-warna-utama">{{ detailIndividu.nama }}</div>
                    <hr class="border-warna-tujuh my-5">
                    <div class="grid grid-cols-8 gap-5">
                        <div class="col-span-4">
                            <div class="">
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">User ID</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.userId }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Name</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.nama }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Created</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ $dayjs(detailIndividu.created).format('DD MMM YYYY hh:mm A') }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Updated</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ $dayjs(detailIndividu.updated).format('DD MMM YYYY hh:mm A') }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Email Verified</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.emailIsVerified === true ? 'Yes' : 'No' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Account Verified</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.accountIsVerified === true ? 'Yes' : 'No' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Phone Verified</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.phoneIsVerified === true ? 'Yes' : 'No' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Sign Up Address</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.signUpAddress ? detailIndividu.signUpAddress : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Social Media</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">
                                        <div v-for="(item, index) in detailIndividu.socialMedia" :key="index + 'sosmed'" class="mb-1">{{ item.label }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div class="">
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Organization</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.organization ? detailIndividu.organization : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Email</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.email ? detailIndividu.email : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Phone</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.phone ? detailIndividu.phone : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Institution</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.institution ? detailIndividu.institution : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Profession</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.profession ? detailIndividu.profession : '-' }}</div>
                                </div>
                                <div class="flex items-start mb-4">
                                    <div class="text-sm text-warna-delapan font-semibold w-[180px]">Gender</div>
                                    <div class="text-sm text-warna-sembilan font-semibold">{{ detailIndividu.gender ? detailIndividu.gender : '-' }}</div>
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
            <div class="text-sm text-warna-delapan">{{ detailIndividu.deskripsi }}</div>
        </div>
        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div>
                <div class="flex gap-x-6  font-semibold">
                    <div class="px-8 py-2 bg-warna-rejected rounded-lg text-white cursor-pointer hover:bg-red-700">Reject</div>
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
            flagDrop: false,
            selectedFlag: 'indonesia',
            detailIndividu: {
                userId: '51409978',
                nama: 'Muhammad Nauval El Ghifari Saputra',
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
                organization: '',
                email: 'nauvalelghifari@gmail.com',
                phone: '+6281283571474',
                institution: 'I-KHUB BNPT',
                profession: 'Researcher',
                gender: 'Male',
                deskripsi: 'Nauval is currently in his final year as an International Relations student at Padjadjaran University with a strong curiosity and interest in Islamic Politics, Contemporary Islamic Movements (Salafism/Jihadism/Qutbism), Middle East Politics, Knowledge Production, and Critical Terrorism Studies. He has internship experience as a research assistant and publishing staff in various NGOs and research institutes, such as LP3ES, MAARIF Institute, & DASPR. He aspires to be an aspiring scientist who focuses on the interactions of religion, politics, state-society relations, and power relations.'
            }
        }
    },
    mounted() {
        
    },
    methods: {
        btnBack() {
            this.$router.push('/verifications/individu')
        },

        toggleDrop() {
            this.flagDrop = !this.flagDrop
        },

        closeDrop() {
            this.flagDrop = false
        },

        pilihIndonesia() {
            this.selectedFlag = 'indonesia'
            this.closeDrop()
        },

        pilihInggris() {
            this.selectedFlag = 'inggris'
            this.closeDrop()
        }
    },
}
</script>