<template>
    <div  tabindex="1" style="" >
        <transition name="fadefast">
        <div  
            v-if="statModal"   
            aria-hidden="true" 
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-30 w-full md:inset-0 h-modal md:h-full flex  justify-center bg-gray-800/[.7] "
        >
            <div v-click-outside="persistentAction" :class="width ? width : 'w-full md:w-1/2' " class="fixed p-4 z-20    md:h-auto " >
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow ">
                    <div class="text-center p-4 rounded-t border-b ">
                        <h3 class="text-lg text-center font-semibold text-warna-empat w-10/12 mx-auto break-words ">
                            {{title}}
                        </h3>
                        <div class="absolute top-0 right-0 mr-2 mt-3 items-center">
                            <button @click="tutupModal"  type="button" class=" text-warna-empat bg-transparent hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8Z"/></svg>
                            </button>
                        </div>
    
                    </div>
                    <div class="max-h-[calc(100vh-100px)] overflow-y-auto relative">
                    <slot />
                    </div>
                    <!-- Modal footer -->
                        <slot name="footer" />
                </div>
            </div>
        </div>
        </transition>
    </div>
    </template>
    
    <script>
    export default {
        props:['value','title', 'persistent', 'width'],
        data() {
            return {
                statModal: false
            }
        },

        created() {
            window.addEventListener("keydown", e => {
                if (e.code === 'Escape') {
                    this.persistentAction()
                } else if (e.code ==='Enter') {
                    this.$emit('keyup',e)
                }
            });
        },
        mounted() {
            this.initialize();
        },

    
        methods: {
            initialize() {
                this.statModal = this.value
            },
            tutupModal() {
                this.statModal = false
                this.$emit('input', false)
            },
            doNothing() {
    
            },
            persistentAction() {
                if (this.persistent && this.persistent === true) {
    
                } else {
                    this.tutupModal()
                }
            },
            handleKey(event) {
                console.log(event)
            },
    
        }
    }
    </script>