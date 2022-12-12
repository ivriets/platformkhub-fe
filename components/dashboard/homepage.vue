<template>
    <div>
        <div class="bg-white rounded-xl shadow-md p-5 mb-9 w-full">
            <div>
                <div class="text-xl font-medium mb-[28px]">Hero</div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">Indonesia</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.judulIndonesia"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'judul'"
                                    :label="'Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.subJudulAtas"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'subjudulatas'"
                                    :label="'Sub Judul Atas'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.subJudulBawah"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'subjudulbawah'"
                                    :label="'Sub Judul Bawah'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">English</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.judulEnglish"
                                    placeholder="Write here"
                                    :name="prefixName+'title'"
                                    :label="'Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.topSubtitle"
                                    placeholder="Write here"
                                    :name="prefixName+'topsubtitle'"
                                    :label="'Top Sub Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.bottomSubtitle"
                                    placeholder="Write here"
                                    :name="prefixName+'bottomsubtitle'"
                                    :label="'Bottom Subtitle'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="font-medium mb-1">Background</div>
                            <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                                <div class="text-xs text-[#BABABA] mb-2">
                                    <div>16 : 9</div>
                                    <div>PDF maximum 25MB.</div>
                                </div>
                                <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] text-[#45A6FF] py-2 w-[145px] mx-auto cursor-pointer">Choose File</div>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.altBackground"
                                    placeholder="Write here"
                                    :name="prefixName+'altbackground'"
                                    :label="'Alt Background'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.textButtonEn"
                                    placeholder="Write here"
                                    :name="prefixName+'textbuttonen'"
                                    :label="'Button Text (Eng)'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.textButtonId"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'textbuttonid'"
                                    :label="'Tombol Text (Bahasa)'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.actionLink"
                                    placeholder="Write here"
                                    :name="prefixName+'actionlink'"
                                    :label="'Call to Action Link'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="border-warna-tujuh my-10">

            <div>
                <div class="text-xl font-medium mb-[28px]">Invitation</div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">Indonesia</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invJudulId"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'invjudulid'"
                                    :label="'Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invSubJudulId"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'invsubjudulid'"
                                    :label="'Sub Judul'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invButtonTextId"
                                    placeholder="Tulis disini"
                                    :name="prefixName+'invbuttontextid'"
                                    :label="'Tombol Teks (Bahasa)'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-[28px]">
                    <div class="text-xl text-warna-dua mb-4">English</div>
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invJudulEn"
                                    placeholder="Write here"
                                    :name="prefixName+'invjudulen'"
                                    :label="'Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invSubJudulEn"
                                    placeholder="Write here"
                                    :name="prefixName+'invsubjudulen'"
                                    :label="'Sub Title'"
                                />
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invButtonTextEn"
                                    placeholder="Write here"
                                    :name="prefixName+'invbuttontexten'"
                                    :label="'Button Text (Eng)'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-12 gap-x-6 gap-y-[28px]">
                        <div class="col-span-12 md:col-span-6">
                            <div class="font-medium mb-1">Background</div>
                            <div class="border-dashed border-2 border-warna-tujuh pt-[9px] pb-[25px] rounded-lg text-center">
                                <div class="text-xs text-[#BABABA] mb-2">
                                    <div>16 : 9</div>
                                    <div>PDF maximum 25MB.</div>
                                </div>
                                <div class="bg-white border border-warna-tujuh rounded-md shadow shadow-[#45a6ff33] text-[#45A6FF] py-2 w-[145px] mx-auto cursor-pointer">Choose File</div>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <div class="">
                                <InputText 
                                    v-model="form.invAltBackground"
                                    placeholder="Write here"
                                    :name="prefixName+'invaltbackground'"
                                    :label="'Alt Background'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white shadow-md rounded-xl py-4 px-6">
            <div class="flex items-center justify-between">
                <div></div>
                <!-- <div @click="btnBack" class="px-8 py-2 bg-white rounded-lg text-warna-empat border border-warna-empat cursor-pointer hover:bg-gray-100 font-semibold">Back</div> -->
                <div class="px-8 py-2 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Save</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'homepage',
            form: {
                judulIndonesia: '',
                subJudulAtas: '',
                subJudulBawah: '',
                judulEnglish: '',
                topSubtitle: '',
                bottomSubtitle: '',
                altBackground: '',
                textButtonId: '',
                textButtonEn: '',
                actionLink: '',
                invJudulId: '',
                invJudulEn: '',
                invSubJudulId: '',
                invSubJudulEn: '',
                invButtonTextId: '',
                invButtonTextEn: '',
                invAltBackground: ''
            },
        }
    },
}
</script>