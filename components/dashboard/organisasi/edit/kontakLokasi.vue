<template>
    <div>
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.noTelepon"
                        placeholder="Tulis disini"
                        :name="prefixName+'notelepon'"
                        :label="'Nomor Telepon'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.email"
                        placeholder="Tulis disini"
                        :name="prefixName+'email'"
                        :label="'Email'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputSelect 
                        v-model="form.lokasiOrganisasi[0].provinsi"
                        :name="prefixName+'provinsi'"
                        :label="'Provinsi'"
                        :opsi="opsiProvinsi"
                        :placeholder="'Pilih'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputText 
                        v-model="form.lokasiOrganisasi[0].kota"
                        placeholder="Tulis disini"
                        :name="prefixName+'kota'"
                        :label="'Kota'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="">
                    <InputText 
                        v-model="form.lokasiOrganisasi[0].jalan"
                        placeholder="Tulis disini"
                        :name="prefixName+'jalan'"
                        :label="'Alamat'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                Pin Location
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'kontaklokasi',
            form: {
                noTelepon: '',
                email: '',
                lokasiOrganisasi: [
                    {
                        provinsi: '',
                        kota: '',
                        jalan: '',
                        pinLocation: ''
                    }
                ],
            },
            opsiProvinsi: [
                {
                    id: 'Jawa Barat',
                    label: 'Jawa Barat'
                },
                {
                    id: 'Jawa Tengah',
                    label: 'Jawa Tengah'
                },
                {
                    id: 'Jawa Timur',
                    label: 'Jawa Timur'
                },
                {
                    id: 'DKI Jakarta',
                    label: 'DKI Jakarta'
                },
                {
                    id: 'Sumatera Utara',
                    label: 'Sumatera Utara'
                },
                {
                    id: 'Bali',
                    label: 'Bali'
                },
                {
                    id: 'Sumatera Selatan',
                    label: 'Sumatera Selatan'
                }
            ]
        }
    },
}
</script>