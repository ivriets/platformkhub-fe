<template>
    <div class="pt-12 md:pt-20">

        <div class="h-40 md:h-72 bg-[#f0f1ff] mb-10 md:mb-20">
            <div class="container mx-auto">
                <div class="absolute w-4/5 md:w-1/2 px-5 mt-16 md:mt-28 md:leading-tight">
                    <div class="text-3xl md:text-5xl text-warna-empat font-lato">
                        {{$t('Kebijakan')}}
                    </div>
                </div>
            </div>
            <div
                class="ml-auto h-full w-4/5 md:w-1/2 bg-no-repeat bg-origin-border bg-cover bg-start md:bg-center"                  
                style="background-image: linear-gradient(90deg, rgba(240, 241, 255, 1), rgba(240, 241, 255, 1),rgba(240, 241, 255, 0.85), rgba(240, 241, 255, 0.5), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0)), url(/images/img-privacy-header.png); height: 100%px;">
            </div>
        </div>


        <div class="container mx-auto px-5 mb-32">
            <ElementsCardPrivacy
                :dataCard="listPrivacy"
            />
        </div>
    </div>

</template>


<script>
export default {
    layout: 'blank',
    data() {
        return {
            listPrivacy:[
                {
                    title: [
                        'KEBIJAKAN PENGGUNA',
                        'TERMS OF USE'
                    ],
                    content: [
                        'Semua Organisasi Nirlaba, Lembaga pemerintah, Bisnis Swasta, Sukarelawan atau Pengunjung Situs (secara kolektif disebut sebagai "Pengguna Resmi," dan masing-masing secara individu adalah "Pengguna Resmi"), secara eksklusif di bawah persyaratan layanan dan penggunaan berikut ("Persyaratan"). Dengan menggunakan Layanan, Pengguna Resmi menyatakan bahwa dia telah membaca dan memahami Ketentuan dan setuju untuk terikat olehnya. Kami berhak untuk menghentikan akun Pengguna Resmi atau penggunaan layanan kapan saja, dengan alasan apa pun, termasuk tanpa batasan, jika kami mengetahui bahwa Pengguna Resmi telah melanggar ketentuan ini. Istilah dalam huruf besar yang digunakan, tapi tidak didefinisikan, digunakan seperti yang didefinisikan dalam Kebijakan Privasi atau Perjanjian Platform.',
                        "All Non-Profit Organizations, Government Agencies, Private Businesses, Volunteers or Site Visitors (collectively, “Authorized Users,” and each individually an “Authorized User”), exclusively under these terms of service and use (“Terms” ). By using the Service, the Authorized User acknowledges that he has read and understands the Terms and agrees to be bound by them. We reserve the right to terminate an Authorized User's account or use of the service at any time, for any reason, including without limitation, if we become aware that an Authorized User has violated these terms. Capitalized terms used, but not defined, are used as defined in the Privacy Policy or the Platform Agreement."
                    ],
                },
                {
                    title: [
                        'TANGGUNG JAWAB ANDA',
                        'YOUR RESPONSIBILITIES'
                    ],
                    content: [
                        'Pengguna Resmi setuju untuk tidak mereproduksi, menjual, menjual kembali, atau mengeksploitasi untuk tujuan komersial atau non-komersial, bagian apa pun dari Layanan atau Situs. Tanpa izin tertulis dari kami, Pengguna Resmi tidak boleh: (a) mengizinkan, mengaktifkan, atau mendukung transmisi iklan komersial atau permintaan massal yang tidak diminta melalui email, (b) mengakses Layanan menggunakan sarana bervolume tinggi atau otomatis, ( c) menempatkan jendela pop-up di atas halamannya, atau memengaruhi tampilan halamannya atau (d) mengakses Situs atau Layanan dengan cara apa pun yang melanggar Kebijakan Privasi kami. Semua informasi yang diberikan Pengguna Resmi kepada kami harus benar, akurat, dan terkini.Pengguna Resmi setuju untuk tidak menggunakan Layanan untuk: (a) melanggar hukum lokal, negara bagian, nasional atau internasional, (b) menyamar sebagai orang atau entitas mana pun, atau salah menggambarkan afiliasi Pengguna Resmi dengan seseorang atau entitas, (c) menguntit, melecehkan atau menyakiti orang lain, (d) mempromosikan atau mengagungkan kebencian, kekerasan, atau intoleransi rasial, (e) mengumpulkan atau menyimpan data pribadi tentang Pengguna Resmi lainnya atau (f) tidak mematuhi persyaratan, prosedur, kebijakan, atau peraturan jaringan yang terhubung ke Situs atau Layanan, atau mengganggu atau mengacaukan Layanan, Situs atau server atau jaringan yang terhubung ke Layanan atau Situs.',
                        "Authorized Users agree not to reproduce, sell, resell or exploit for commercial or non-commercial purposes any part of the Service or the Site. Without our written permission, Authorized Users may not: (a) permit, enable, or support the transmission of commercial advertisements or unsolicited bulk solicitations via e-mail, (b) access the Service using high-volume or automated means, (c) place pop windows -up on its page, or affect the appearance of its page or (d) access the Site or Services in any way that violates our Privacy Policy. All information that Authorized Users provide to us must be true, accurate and up to date. Authorized Users agree not to use the Service to: (a) violate local, state, national or international laws, (b) impersonate any person or entity, or misrepresent Authorized User's affiliation with a person or entity, (c) stalk, harass or hurt others, (d) promote or glorify hate, violence, or racial intolerance, (e) collect or store personal data about other Authorized Users or (f) disobey the requirements, procedures, policies, or regulations of networks connected to the Site or Services, or disrupt or disrupt the Services, the Site or the servers or networks connected to the Services or the Site."
                    ],
                },
                {
                    title: [
                        'PRIVASI',
                        'PRIVACY'
                    ],
                    content: [
                        'Pengguna Resmi akan diminta untuk memberikan data pribadi tertentu kepada kami, seperti yang dijelaskan dalam Kebijakan Privasi ("Data Pribadi"). Semua penggunaan Data Pribadi Pengguna Resmi akan diperlakukan sesuai dengan Kebijakan Privasi kami. Dengan menggunakan Situs dan Layanan, Pengguna Resmi menerima syarat dan ketentuan Kebijakan Privasi kami. Jika Pengguna Resmi keberatan karena informasinya digunakan seperti yang dijelaskan dalam Kebijakan Privasi, satu-satunya jalan bagi Pengguna Resmi adalah menghentikan penggunaan Situs dan Layanan.',
                        "Authorized Users will be asked to provide us with certain personal data, as described in the Privacy Policy ('Personal Data'). All uses of Authorized User Personal Data will be treated in accordance with our Privacy Policy. By using the Site and Services, Authorized Users accept the terms and conditions of our Privacy Policy. If Authorized Users object to their information being used as described in the Privacy Policy, the Authorized User's only recourse is to stop using the Site and Services."
                    ],
                },
                {
                    title: [
                        'KEAMANAN DATA DAN PEMANTAUAN',
                        'DATA SECURITY AND MONITORING'
                    ],
                    content: [
                        'Data diberikan oleh Pengguna Resmi dan dapat mencakup, namun tidak terbatas pada, deskripsi , informasi kontak organisasi, dan berita. Karenanya, kami memiliki kendali editorial atas data tersebut untuk kebutuhan kesesuaian data dengan Pengguna Resmi yang lain. Setiap data, layanan, penawaran, atau informasi lain yang diberikan oleh Pengguna Resmi adalah milik Pengguna Resmi masing-masing. Kami tidak mendukung, kami juga tidak bertanggung jawab untuk menyelidiki atau memastikan keakuratan data tersebut, dan kami memegang haknya untuk mengubah, memperbarui, menetapkan sebagai tidak aktif, atau menghapus data apa pun kapan saja. Kami memiliki hak, tetapi bukan kewajiban, untuk memantau dan meninjau data dan akun Pengguna Resmi untuk menentukan kepatuhan terhadap Syarat, undang-undang, atau peraturan ini.',
                        "Data is provided by Authorized Users and may include, but is not limited to, descriptions, organizational contact information and news. Therefore, we have editorial control over the data for data compliance needs with other Authorized Users. Any data, services, offers or other information provided by Authorized Users is the property of their respective Authorized Users. We do not endorse, nor are we responsible for investigating or ensuring the accuracy of such data, and we reserve the right to change, update, set as inactive, or delete any data at any time. We have the right, but not the obligation, to monitor and review Authorized Users' data and accounts to determine compliance with these Terms, laws or regulations."
                    ],
                }
            ]
        }
    },
    
}
</script>