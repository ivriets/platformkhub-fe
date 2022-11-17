<template>
    <div>
        <div class="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-9">
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.facebook"
                        placeholder="Tulis disini"
                        :name="prefixName+'facebook'"
                        :label="'Tautan Facebook'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.instagram"
                        placeholder="Tulis disini"
                        :name="prefixName+'instagram'"
                        :label="'Tautan Instagram'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.twitter"
                        placeholder="Tulis disini"
                        :name="prefixName+'twitter'"
                        :label="'Tautan Twitter'"
                    />
                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="mb-2">
                    <InputText 
                        v-model="form.youtube"
                        placeholder="Tulis disini"
                        :name="prefixName+'youtube'"
                        :label="'Tautan Youtube'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            prefixName: 'mediasosial',
            form: {
                facebook: '',
                instagram: '',
                twitter: '',
                youtube: ''
            }
        }
    },
}
</script>