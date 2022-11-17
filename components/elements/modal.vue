<template>
<div  tabindex="1" style="" >
    <transition name="fadefast">
    <div  
        v-if="statModal"   
        aria-hidden="true" 
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 w-full md:inset-0 h-modal md:h-full flex  justify-center bg-gray-800/[.7] "
    >
        <div v-click-outside="persistentAction" :class="width ? width : 'w-full md:w-1/2' " class="fixed p-4 translate-y-1/4 z-20    md:h-auto " >
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow ">
                <div class="flex justify-between items-start p-4 rounded-t border-b ">
                    <h3 class="text-lg font-semibold text-utama dark:text-white">
                        {{title}}
                    </h3>
                    <button @click="tutupModal"  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                <div class="max-h-[calc(100vh-100px)] overflow-y-auto">
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
    mounted() {
        this.initialize();
	window.addEventListener("keydown", e => {
		if (e.code === 'Escape') {
            this.persistentAction()
        } else if (e.code ==='Enter') {
            this.$emit('keyup',e)
        }
	});

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