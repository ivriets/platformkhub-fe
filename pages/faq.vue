<template>
    <div class="pt-12 md:pt-20">
        <div class="h-40 md:h-72 bg-[#f0f1ff] mb-10 md:mb-20">
            <div class="container mx-auto">
                <div class="absolute w-4/5 md:w-1/2 px-5 mt-16 md:mt-28">
                    <div class="text-3xl md:text-5xl uppercase text-warna-empat font-lato">
                        {{$t('FAQ')}}
                    </div>
                </div>
            </div>
            <div
                class="ml-auto h-full w-4/5 md:w-1/2 bg-no-repeat bg-origin-border bg-cover bg-start md:bg-center"                  
                style="background-image: linear-gradient(90deg, rgba(240, 241, 255, 1), rgba(240, 241, 255, 1),rgba(240, 241, 255, 0.85), rgba(240, 241, 255, 0.5), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0), rgba(240, 241, 255, 0)), url(/images/img-faq-header.png); height-100%">
            </div>
         </div>

        <div class="container mx-auto px-5 md:px-80 mb-32">
            
            <ElementsPanel
                :listPanel="listFaq"
            />

        </div>
    </div>
</template>


<script>
export default {
    layout: 'blank',
    head() {
        return {
            title: 'Faq'
        }
    },
    data() {
        return {
            listFaq:[
                {
                    title: [
                        'Apa itu K-Hub?',
                        'What is K-Hub'
                    ],
                    content: [
                        'K-Hub atau Knowledge Hub adalah sebuah layanan digital yang membantu organisasi Anda untuk memiliki pengelolaan data yang lebih rapi dan teratur. Melalui K-Hub, Anda dapat mengelola acara, mengelola data organisasi, membuat laporan, dan mempublikasikan produk pengetahuan (knowledge product) organisasi. Platform ini juga menghubungkan banyak organisasi masyarakat sipil di bidang PCVE untuk dapat berkolaborasi dalam pencegahan ekstremisme kekerasan di Indonesia.',
                        'K-Hub or Knowledge Hub is a digital service that helps your organization to have neater and more organized data management. Through K-Hub, you can manage events, manage organizational data, create reports, and publish organizational knowledge products. This platform also connects many civil society organizations in the PCVE field to be able to collaborate in preventing violent extremism in Indonesia.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Kapan K-Hub berdiri?',
                        'When was K-Hub founded?'
                    ],
                        
                    content: [
                        'Setelah melalui proses pengembangan yang panjang, platform K-Hub diluncurkan secara resmi pada 15 Juni 2021. Sebelum itu, media sosial K-Hub lebih dulu mengudara pada 22 Februari 2021.',
                        'After going through a long development process, the K-Hub platform was officially launched on June 15, 2021. Prior to that, K-Hub is social media first went live on February 22, 2021.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apa yang melatarbelakangi hadirnya K-Hub?',
                        'What is the background to the creation of K-Hub?'
                    ],
                        
                    content: [
                        'Diperkirakan ada ratusan inisiatif PCVE di Indonesia. Sayangnya, inisiatif ini belum terpetakan dengan baik dan dampaknya sulit dilacak. Selain ketiadaan sumber tunggal untuk memahami isu PCVE di Indonesia, beberapa organisasi PCVE juga belum mempunyai manajemen data yang baik sehingga pengambilan keputusan berbasis data sulit dilakukan. K-Hub berdiri untuk menjawab kendala-kendala ini dengan menawarkan layanan pusat data PCVE, layanan manajemen data untuk setiap organisasi mitra, dan kesempatan pendanaan program PCVE di Indonesia.',
                        'It is estimated that there are hundreds of PCVE initiatives in Indonesia. Unfortunately, these initiatives are not well mapped and their impact is hard to track. In addition to the absence of a single source for understanding PCVE issues in Indonesia, several PCVE organizations also do not have good data management, making it difficult to make data-based decisions. K-Hub stands to address these constraints by offering PCVE data center services, data management services for each partner organization, and PCVE program funding opportunities in Indonesia.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apa saja fungsi dan fitur yang K-Hub miliki?',
                        'What functions and features does K-Hub have?'
                    ],
                        
                    content: [
                        'Melalui K-Hub, Anda bisa: 1. Mengelola acara 2. Mengelola data organisasi 3. Membuat laporan secara real-time 4. Memvisualisasikan data secara otomatis 5. Mencari data dengan fitur pencarian mendalam K-Hub 6. Mengakses data di pusat data K-Hub 7. Mendapatkan informasi pendanaan, hingga 8. Mempublikasikan produk pengetahuan (knowledge product) organisasi K-Hub juga menyediakan berbagai fitur pengelolaan data unggulan lain. Informasi lengkapnya dapat diakses melalui http://khub.id/about.',
                        'Through K-Hub, you can: 1. Manage events 2. Manage organizational data 3. Generate reports in real-time 4. Visualize data automatically 5. Search for data with the K-Hub deep search feature 6. Access data in the K-Hub data center 7. Get funding information, up to 8. Publish organizational knowledge productsK-HUB also provides various other excellent data management features. Complete information can be accessed via http://khub.id/about.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah layanan K-Hub berbayar?',
                        'Is K-Hub a paid service?'
                    ],
                        
                    content: [
                        'Tidak, layanan K-Hub tidak berbayar. Gratis',
                        'No, K-Hub services are Free. Free'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Siapa saja yang dapat bergabung sebagai anggota K-Hub?',
                        'Who can join as a K-Hub member?'
                    ],
                        
                    content: [
                        'Semua organisasi masyarakat sipil terkait pencegahan dan penanggulangan ekstremisme kekerasan (PCVE) dapat bergabung dengan K-Hub kapan saja.',
                        'All civil society organizations related to the prevention and response of violent extremism (PCVE) can join K-Hub at any time.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah organisasi mitra K-Hub mendapatkan bantuan finansial?',
                        'Do K-Hub partner organizations get financial assistance?'
                    ],
                        
                    content: [
                        'Organisasi mitra K-Hub tidak mendapatkan bantuan finansial. Namun, K-Hub akan memberikan informasi pendanaan program kepada organisasi mitra sesuai dengan misi kami jika tersedia.',
                        'K-Hub partner organizations do not receive financial assistance. However, K-HUB will provide program funding information to partner organizations in accordance with our mission if available.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Bagaimana sistem keamanan di K-Hub?',
                        'How is the security system at K-Hub?'
                    ],
                        
                    content: [
                        'Secara sederhana, K-Hub menggunakan penyedia layanan pihak ketiga sebagai pemberi jaminan keamanan. Lebih lanjut, kami telah membangun sebuah arsitektur sistem keamanan yang kompleks sehingga sulit untuk diretas. Kami juga memiliki Service Level Agreement (SLA) untuk memastikan semua pihak mematuhi standar keamanan yang berlaku. Tak hanya itu, perbaikan jaringan juga audit dilakukan secara berkala dan menyeluruh.',
                        'In simple terms, K-Hub uses third-party service providers as security guarantees. Furthermore, we have built a complex security system architecture that makes it difficult to hack. We also have a Service Level Agreement (SLA) to ensure that all parties comply with applicable security standards. Not only that, network repairs as well as audits are carried out periodically and thoroughly.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah masing-masing organisasi harus mengalokasikan satu orang sumber dayanya untuk menggunakan K-Hub?',
                        'Does each organization have to allocate one resource person to use K-Hub?'
                    ],
                        
                    content: [
                        'Kami memberikan kewenangan bagi organisasi untuk mengelola sumber dayanya sesuai dengan kemampuan organisasi. Namun, pihak K-Hub akan meminta satu orang PIC (Person in Charge) yang menjadi narahubung dalam mengelola K-Hub dan menjadi penanggung jawab terhadap dasbor organisasi masing-masing.',
                        'We provide authority for organizations to manage their resources according to organizational capabilities. However, K-Hub will ask for one PIC (Person in Charge) who is the contact person in managing K-HUB and is responsible for the dashboard of each organization.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apa itu outlook?',
                        'What is outlook?'
                    ],
                        
                    content: [
                        'Outlook adalah publikasi caturwulanan dan tahunan K-Hub yang membahas topik-topik aktual terkait PCVE. Tidak hanya menyajikan data kredibel terkait lanskap ekstremisme kekerasan di Indonesia, outlook juga memberikan rekomendasi khas untuk para pegiat PCVE di Tanah Air. Outlook disajikan dalam bentuk webpage interaktif yang dapat diakses melalui https://khub.id/outlook dan .pdf yang dapat diunduh oleh verified user K-Hub.',
                        'Outlook is K-Hub is quarterly and annual publication covering current PCVE-related topics. Not only does it provide credible data regarding the landscape of violent extremism in Indonesia, Outlook also provides specific recommendations for PCVE activists in the country. Outlook is presented in the form of an interactive webpage which can be accessed via https://khub.id/outlook and .pdf which can be downloaded by verified K-HUB users.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Bagaimana mekanisme pengunggahan produk pengetahuan di K-Hub?',
                        'What is the mechanism for uploading knowledge products on K-Hub?'
                    ],
                        
                    content: [
                        'Organisasi mitra dapat mengunggah produk pengetahuan secara independen sesuai standar penulisan yang K-Hub terapkan, serta kebutuhan organisasi. K-Hub akan menyosialisasikan mekanisme ini kepada organisasi mitra saat bergabung.',
                        'Partner organizations can upload knowledge products independently according to the writing standards that K-Hub applies, as well as the needs of the organization. K-Hub will socialize this mechanism to partner organizations when they join.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah semua produk pengetahuan yang diunggah organisasi dapat diakses oleh publik?',
                        'Are all knowledge products uploaded by the organization accessible to the public?'
                    ],
                        
                    content: [
                        'Arsitektur keamanan K-Hub didesain melalui level of access di mana tidak semua user dapat mengakses data-data organisasi. Data yang tersimpan memiliki enkripsi dan level akses khusus berdasarkan kredensialnya. Organisasi memiliki kewenangan secara penuh terhadap pengaturan level akses setiap data yang diunggahnya. Organisasi dapat mengatur visibilitas data mereka secara mandiri baik itu untuk publik atau verified user.',
                        'The K-Hub security architecture is designed through a level of access where not all users can access organizational data. Stored data has special encryption and access levels based on their credentials. The organization has full authority over setting the access level for each uploaded data. Organizations can independently set the visibility of their data to either the public or verified users.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah K-Hub dapat membantu organisasi dalam melakukan pengeditan?',
                        'Can K-Hub help organizations make edits?'
                    ],
                        
                    content: [
                        'Ya. K-Hub dapat membantu organisasi dalam mengedit profil, hingga konten organisasi. Meski demikian, kewenangan untuk menyetujui usulan perbaikan ada di tangan organisasi. Setiap usulan perbaikan dari K-Hub akan muncul di notifikasi organisasi terkait sehingga memudahkan proses persetujuan usulan.',
                        'Yes. K-Hub can assist organizations in editing profiles, to organizational content. However, the authority to approve proposed improvements rests with the organization. Each improvement proposal from K-Hub will appear in the notification of the relevant organization, making it easier for the proposal approval process.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Siapa saja pihak yang dapat mengakses produk pengetahuan pada K-Hub?',
                        'Who are the parties that can access knowledge products on K-Hub?'
                    ],
                        
                    content: [
                        'Pihak yang dapat mengakses produk pengetahuan pada K-Hub, antara lain: 1. Organisasi mitra, yakni organisasi di bidang PCVE yang telah memiliki akun terverifikasi di K-Hub. Tipe akun ini dapat membuat produk pengetahuan secara mandiri, serta menjelajah data dengan jauh lebih luas. Pada prinsipnya, seluruh fitur yang dimiliki K-Hub dapat dinikmati oleh akun organisasi terverifikasi. 2. Verified User, yakni pengunjung platform yang telah memiliki akun terverifikasi di K-Hub, namun tidak dapat membuat produk pengetahuan secara mandiri. Namun, tipe akun ini tetap bisa menikmati produk pengetahuan serta menjelajah data lebih luas, dapat memberikan like, menuliskan komentar, membuat bookmark, dan mengisi user profile. Tipe ini juga dapat mengakses data dengan visibilitas khusus verified user. 3. Publik, yakni pengunjung platform yang tidak melakukan login. Publik memiliki akses terbatas ke produk-produk pengetahuan K-Hub.',
                        'Parties who can access knowledge products on K-Hub include: 1. Partner organizations, namely organizations in the PCVE field that already have a verified account at K-Hub. This account type can create knowledge products independently, as well as explore a much wider range of data. In principle, all the features of K-Hub can be enjoyed by verified organizational accounts. 2. Verified Users, namely platform visitors who already have a verified account at K-Hub, but cannot make knowledge products independently. However, this type of account can still enjoy knowledge products and explore data more broadly, can give likes, write comments, create bookmarks, and fill out user profiles. This type can also access data with special visibility of verified users. 3. Public, namely platform visitors who do not log in. The public has limited access to K-Hub knowledge products.'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Apakah ada lowongan pekerjaan untuk K-Hub?',
                        'Is there any job vacancies for K-Hub?'
                    ],
                        
                    content: [
                        'Segala informasi terkait lowongan pekerjaan akan kami publikasikan secara berkala pada laman https://k-hub.id/career dan Instagram kami @khub.id',
                        'We will publish all information related to job vacancies regularly on the https://k-hub.id/career page and our Instagram @khub.id'
                    ],
                    expanded: false
                },
                {
                    title: [
                        'Saya organisasi, saya ingin bergabung dengan layanan K-Hub, bagaimana caranya?',
                        'I am an organization, I want to join the K-Hub services, how do i do that?'
                    ],
                        
                    content: [
                        'Apabila Anda mewakili satu organisasi yang bergerak di bidang perdamaian dan ingin bergabung dengan K-Hub, daftarkan organisasi Anda pada laman ini: https://k-hub.id/register-organization. Kami akan meninjau organisasi Anda dan apabila disetujui, Anda dapat langsung menggunakan layanan K-Hub.',
                        'If you represent an organization working in the field of peace and want to join K-Hub, register your organization on this page: https://k-hub.id/register-organization. We will review your organization and if approved, you can immediately use K-Hub services.'
                    ],
                    expanded: false
                },
            ]
        }
    },

}
</script>