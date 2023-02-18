<template>
    <div >
        <section>
           <div 
            class=" w-full  pt-40 pb-28 md:pb-40" 
            style="background:url('/images/shome.png') no-repeat;background-size:cover;">
                <div class="text-white text-center mb-6 md:mb-[93px] px-4">
                    <p class="text-xl md:text-4xlplus mb-3 font-bold">Kiprah CSO dalam PCVE;</p> 
                    <h1 class="text-2xl md:text-[72px] leading-tight font-semibold">Mapping Organisasi dan<br>Kolaborasi PCVE</h1>
                </div>    
            </div>
        </section>
        <div class="fixed top-0 left-0 right-0 w-full bg-white z-20 shadow">
            <div class="container mx-auto py-4 flex items-center justify-between">
                <NuxtLink to="/">
                    <nuxt-img src="/images/logo.png" height="45" />
                </NuxtLink>
                <div>
                    <Nuxt-link to="/login" class="button-standar">LOGIN</Nuxt-link>
                </div>
            </div>
        </div>
        <section class="py-10">
            <ElementsPagesHomeSectionProgram />
        </section>
        <hr class="container mx-auto border-gray-300 mt-10 md:mb-20 mb-10">
        <section >
            <ElementsPagesHomeSectionBlog />
        </section>
        <hr class="container mx-auto border-gray-300 mt-10 md:mb-20 mb-10">
        <section >
            <ElementsPagesHomeSectionPublikasi />
        </section>
    </div>
</template>

<script>
    export default {
        
    }
</script>

