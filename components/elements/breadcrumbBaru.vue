<template>
    <div>
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                    <div class="flex items-center">
                        <!-- naha beut make a -->
                        <NuxtLink :to="linkParent" class="text-sm font-medium text-warna-delapan hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{ $t(parent) }}</NuxtLink>
                    </div>
                </li>
                <li v-for="(item, index) in child" :key="'child'+index" aria-current="page">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span v-if="item.link === ''" class="ml-1 text-sm font-medium text-warna-delapan md:ml-2 dark:text-gray-400">{{ $t(item.label) }}</span>
                        <span v-else>
                            <NuxtLink :to="item.link ? item.link : ''" class="ml-1 text-sm font-medium text-warna-delapan md:ml-2 dark:text-gray-400" :class="item.link ? 'hover:text-gray-900' : ''">{{ $t(item.label) }}</NuxtLink>
                        </span>    
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>


<script>
export default {
    props: ['parent', 'linkParent', 'child'],
    data() {
        return {
            
        }
    },
}
</script>