<template>
    <div class="relative bg-tujuh w-full z-0">
        <img src="/images/img-footer.png" alt="logo" class="absolute top-0 right-0 max-h-full z-0">
        <div class="px-3 md:px-28 pt-[75px] pb-10">
            <div class="grid grid-cols-12 gap-x-4 text-empat items-stretch">
                <div class="col-span-12 md:col-span-3 md:border-r border-lima p-4">
                    <div>
                        <img src="/images/logo.png" alt="logo" class="max-h-[83px] mb-6">
                        <div class="text-sm">{{ $t('Narasi Footer') }}</div>
                    </div>
                </div>
                <!-- <div class="col-span-12 md:col-span-3 md:border-r border-[#E0E0E0] p-4 relative z-10">
                    <ul class="font-semibold">
                        <li class="mb-2"><nuxt-link :to="'/aboutkhub'">{{ $t('Tentang K-Hub') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/career'">{{ $t('Karier') }}</nuxt-link></li>
                    </ul>
                </div>
                <div class="col-span-12 md:col-span-3 md:border-r border-[#E0E0E0] p-4 z-10">
                    <ul class="font-semibold">
                        <li class="mb-2"><nuxt-link :to="'/outlook'">{{ $t('Outlook') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/organization'">{{ $t('Organisasi') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/program'">{{ $t('Program') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/event'">{{ $t('Acara') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/resource'">{{ $t('Publikasi') }}</nuxt-link></li>
                        <li class="mb-2"><nuxt-link :to="'/blog'">{{ $t('Blog') }}</nuxt-link></li>
                    </ul>
                </div> -->
                <div class="col-span-12 md:col-span-9 p-4 z-10">
                    <ul class="font-semibold h-full flex items-end text-center gap-10 justify-center">
                        <li class="mb-2 hover:opacity-60"><nuxt-link :to="'/privacy'">{{ $t('Kebijakan') }}</nuxt-link></li>
                        <li class="mb-2 hover:opacity-60"><nuxt-link :to="'/faq'">{{$t('FAQ')}}</nuxt-link></li>
                        <!-- <li class="mb-2"><nuxt-link :to="'/contactus'">{{ $t('Kontak Kami') }}</nuxt-link></li> -->
                    </ul>
                </div>
            </div>
            <div class="flex items-center gap-x-6 px-4 mb-5">
                <button>
                    <img src="/icons/icon-instagram.png" alt="icon-instagram" class="h-7 w-7">
                </button>
                <button>
                    <img src="/icons/icon-youtube.png" alt="icon-youtube" class="h-7 w-7">
                </button>
            </div>
            <div class="text-xs text-warna-empat px-4">© Copyright 2022 K-HUB.  All rights reserved.</div>
        </div>
    </div>
</template>