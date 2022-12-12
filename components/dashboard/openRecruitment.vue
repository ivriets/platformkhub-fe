<template>
    <div>
        <div class="flex items-center justify-between mb-4">
            <div class="w-[240px]">
                <div>
                    <div class="flex items-center relative">
                        <input type="text" name="searchtext" id="searchtext" placeholder="Search" maxlength="1000" autocomplete="chrome-off" class="focus:outline-none w-full border border-warna-tujuh rounded px-2 py-1.5 text-sm text-warna-utama placeholder-[#9e9e9e focus:border-warna-tujuh/50">
                        <div class="absolute top-0 right-0 translate-y-1/2 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#9E9E9E" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-3 py-[6px] bg-warna-empat rounded-lg text-white flex items-center cursor-pointer">
                <img src="/icons/icon-button-download.png" alt="icon-download">
                <div class="ml-1">New Loker</div>
            </div>
        </div>
        <div>
            <div class="flex items-center justify-end border border-[#A1A2B7] rounded-lg bg-white mb-5">
                <div class="px-[14px] py-[9px]">
                        <div class="flex items-center">
                            <div class="text-sm font-semibold text-[#757575]">Sort by:</div>
                            <select name="filtertotalpage" id="filtertotalpage" class="w-[120px] outline-none px-2 py-[6px] cursor-pointer">
                                <option value="desc">Latest</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-md border border-gray-100">
                <div>
                    <div class="relative overflow-x-auto">
                        <table class="text-sm w-full text-warna-font-tabel table-padding border-collapse">
                            <thead class="border-b border-[#9E9E9E]">
                                <tr>
                                    <th scope="col" class="font-normal text-left">Title</th>
                                    <th scope="col" class="font-normal text-left">Category</th>
                                    <th scope="col" class="font-normal text-left"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td scope="row" class="p-5">
                                        <div class="cursor-pointer hover:text-blue-700">
                                            <div>
                                                <div>We are looking do IT Geek, is that you?</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div class="cursor-pointer">
                                            <div>
                                                <div>IT Support</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td scope="row" class="p-5">
                                        <div>
                                            <div class="flex items-center justify-end gap-x-6">
                                                <button><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="pagination-area text-center mt-6">
                <nav aria-label="Page navigation">
                    <ul class="inline-flex items-center overflow-hidden">
                        <li class="mr-3">
                            <button disabled="disabled" class="h-8 w-9 flex items-center justify-center bg-white hover:bg-gray-100 disabled:text-gray-200 disabled:hover:bg-gray-50 border border-warna-lima rounded">
                                <i class="ri-arrow-left-s-line"></i>
                            </button>
                        </li>
                        <li class="mr-3">
                            <button disabled="disabled" class="h-8 px-3 text-sm flex items-center justify-center bg-warna-empat text-white border border-warna-lima rounded"> 1 </button>
                        </li>
                        <li class="mr-3">
                            <button class="h-8 px-3 text-sm flex items-center justify-center bg-white text-warna-empat hover:bg-warna-empat/30 border border-warna-lima rounded"> 2 </button>
                        </li>
                        <li class="mr-3">
                            <button class="h-8 px-3 text-sm flex items-center justify-center bg-white text-warna-empat hover:bg-warna-empat/30 border border-warna-lima rounded"> 3 </button>
                        </li>
                        <li class="mr-3">
                            <button disabled="disabled" class="h-8 px-3 text-sm flex items-center justify-center bg-white text-warna-empat border border-warna-lima rounded"> ... </button>
                        </li>
                        <li class="mr-3">
                            <button disabled="disabled" class="h-8 px-3 text-sm flex items-center justify-center bg-white text-warna-empat border border-warna-lima rounded"> 5 </button>
                        </li>
                        <li class="mr-3">
                            <button disabled="disabled" class="h-8 px-3 text-sm flex items-center justify-center bg-white text-warna-empat border border-warna-lima rounded"> 6 </button>
                        </li>
                        <li class="overflow-hidden">
                            <button class="text-sm h-8 w-9 flex items-center justify-center bg-white hover:bg-gray-100 disabled:text-gray-200 disabled:hover:bg-gray-50 border border-warna-lima rounded">
                                <i class="ri-arrow-right-s-line">
                                </i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
</template>