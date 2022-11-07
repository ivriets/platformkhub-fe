<template>
    <div>
        <div class="grid grid-cols-10 gap-10">
            <div class="col-span-4">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-verified.png" alt="icon-verified">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">199</div>
                            <div class="text-warna-dua">Account Verified</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-rejected.png" alt="icon-rejected">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">199</div>
                            <div class="text-warna-dua">Total Rejected Organization</div>
                        </div>
                    </div>
                </div>

                <div class="bg-warna-empat rounded-3xl shadow-md border border-gray-100 py-6 px-8 cursor-pointer">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[48px] w-[48px]" src="/icons/individu/icon-download.png" alt="icon-download">
                        </div>
                        <div class="text-center">
                            <div class="text-white text-xl">Download All Verified &<br> Unverified Email</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-need.png" alt="icon-need">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">199</div>
                            <div class="text-warna-dua">Need Verification</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
                    <div class="flex items-center justify-around">
                        <div class="flex items-center justify-center">
                            <img class="h-[102px] w-[102px]" src="/icons/individu/icon-suspended.png" alt="icon-suspended">
                        </div>
                        <div class="text-center">
                            <div class="text-[45px] text-warna-utama">199</div>
                            <div class="text-warna-dua">Total Suspended Organization</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <div class="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                    <div class="">
                        <div class="text-center grid grid-cols-1 gap-y-10">
                            <div>
                                <div class="text-warna-dua mb-2">Total Organization</div>
                                <div class="text-[26px] text-warna-utama font-semibold">1520</div>
                            </div>
                            <div>
                                <div class="text-warna-dua mb-2">New Organization</div>
                                <div class="text-[26px] text-warna-empat font-semibold">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>