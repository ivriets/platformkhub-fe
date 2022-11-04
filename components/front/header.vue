<template>
    <div class="h-16 shadow-lg px-8 py-1 fixed top-0 left-0 right-0 z-10 bg-white">
        <div class="flex items-center">
            <div class="w-[256px] pl-5">
                <img width="100" src="/images/logo.png" alt="">
            </div>
            <div class="flex-grow">
                {{pageTitle}}
            </div>
            <div class="flex items-center">
                <div class="">icon</div>
                <div class="inline-flex flex-col ml-8">
                    <div>
                        <button @click="toggleDrop" class="flex items-center text-sm text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:shadow-solid">
                            <svg v-if="selectedFlag === 'indonesia'" class="shadow" width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)"><path d="M-5.02002 0H25.06V15.04H-5.02002V0Z" fill="white"/><rect width="20" height="8" fill="#C8102E"/></g>
                                <defs><clipPath id="clip0"><rect width="20" height="15" fill="white"/></clipPath></defs>
                            </svg>
                            <svg v-else-if="selectedFlag === 'inggris'" class="shadow" width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flagDrop: false,
            selectedFlag: 'indonesia',
        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        pageTitle() {
            return this.$store.state.pageTitle
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {

        },

        gantiBahasa(lang) {
        //    this.switchLocalePath('id')
            this.$i18n.setLocale(lang)
            // this.$refs.tbahasa.blur()
        },

        toggleDrop() {
            this.flagDrop = !this.flagDrop
        },

        closeDrop() {
            this.flagDrop = false
        },

        pilihIndonesia() {
            this.selectedFlag = 'indonesia'
            this.gantiBahasa('id')
            this.closeDrop()
        },

        pilihInggris() {
            this.selectedFlag = 'inggris'
            this.gantiBahasa('en')
            this.closeDrop()
        }
    },
}
</script>