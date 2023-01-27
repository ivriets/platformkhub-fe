<template>
    <div class="mt-[32px]">
        <div>
            <div class="tab-area flex items-center">
                <div @click="btnTabAnggota" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'anggota' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Anggota</div>
                </div>
                <div @click="btnTabUndangan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'undangan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Undangan</div>
                </div>
                <div @click="btnTabPermintaan" class="px-8 py-3 cursor-pointer" :class="selectedTab === 'permintaan' ? 'border-b-[3px] border-warna-tiga text-warna-utama font-bold' : 'text-warna-dua'">
                    <div>Permintaan</div>
                </div>
            </div>
            <hr class="border-[#c2c2c2] -mt-[1px] mb-10">
        </div>

        <!-- TAB ANGGOTA -->
        <div v-if="selectedTab === 'anggota' && dataTableAnggota">
            <div class="mb-4">
                <div class="text-warna-dua mb-2">Cari Anggota</div>
                <div class="flex">
                    <div class="w-[240px] mr-4">
                        <ElementsSearchBarResponsive 
                            v-model="filterAnggota.search"
                            :placeholder="'Nama Anggota'"
                            :gaya="'icon'"
                            :name="'searchtext'"
                        />
                    </div>
                    <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableAnggota" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[150px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableAnggota" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableAnggota" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div @click="(btnGantiPosisi(item))" class="text-center text-warna-empat cursor-pointer underline">Change Position</div>
                            </td>
                            <td class="font-normal p-5">
                                <div class="flex items-center justify-end gap-x-6">
                                    <button @click="deleteMember(item)"><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- TAB UNDANGAN -->
        <div v-if="selectedTab === 'undangan' && dataTableUndangan">
            <div class="flex justify-between mb-4">
                <div>
                    <div class="text-warna-dua mb-2">Cari Undangan</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="filterUndangan.search"
                                :placeholder="'Nama Pengguna'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                            />
                        </div>
                        <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                    </div>
                </div>
                <div>
                    <div class="text-warna-dua mb-2">Undang Pengguna</div>
                    <div class="flex">
                        <div class="w-[240px] mr-4">
                            <ElementsSearchBarResponsive 
                                v-model="formUndangan.cariUser"
                                :placeholder="'Nama/Email Pengguna'"
                                :gaya="'icon'"
                                :name="'searchtext'"
                                :list="namaIndividuList"
                            />
                        </div>
                        <div @click="undangMember" class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Undang</div>
                    </div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTableUndangan" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                            <th class="w-[150px]"></th>
                            <th class="w-[70px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTableUndangan" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTableUndangan" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="text-center text-warna-empat cursor-pointer underline">Resend Email</div>
                            </td>
                            <td class="font-normal p-5">
                                <div class="flex items-center justify-end gap-x-6">
                                    <button @click="deleteMember(item)"><img class="" src="/icons/icon-delete.png" :alt="'icon-delete'"></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- TAB PERMINTAAN -->
        <div v-if="selectedTab === 'permintaan' && dataTablePermintaan">
            <div class="mb-4">
                <div class="text-warna-dua mb-2">Cari Permintaan Bergabung</div>
                <div class="flex">
                    <div class="w-[240px] mr-4">
                        <ElementsSearchBarResponsive 
                            v-model="filterPermintaan.search"
                            :placeholder="'Nama Pengguna'"
                            :gaya="'icon'"
                            :name="'searchtext'"
                        />
                    </div>
                    <div class="px-8 py-1.5 bg-warna-empat rounded-lg text-white cursor-pointer hover:bg-blue-900 font-semibold">Cari</div>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <tr class="text-sm text-left text-warna-sembilan border-b border-warna-tujuh">
                            <th v-for="(i, index) in masterTablePermintaan" :key="'th'+index" scope="col" class="font-normal py-5 px-5">{{ i.header }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataTablePermintaan" :key="'dt'+index" class="text-sm text-left text-warna-sembilan tr-striped-even">
                            <td v-for="(x, index2) in masterTablePermintaan" :key="index+'dt'+index2" scope="row" class="font-normal p-5">
                                <div class="flex items-center gap-2">
                                    <div v-if="x.value === 'status'" class="text-warna-font-table">
                                        <div v-if="item[x.value] === 1" class="">Approved</div>
                                        <div v-if="item[x.value] === 2" class="">Declined</div>
                                        <div v-if="item[x.value] === 3" class="">Pending</div>
                                    </div>
                                    <div v-else>{{ item[x.value] }}</div>
                                    <div  v-if="x.value === 'actions' && item.status == 3" class="flex gap-x-6">
                                        <button @click="approveMember(item)" class="text-center text-approved-accepted cursor-pointer underline">Approve</button>
                                        <button @click="rejectMember(item)" class="text-center text-rejected cursor-pointer underline">Reject</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ElementsModal 
            v-model="modalAction"
            :title="modalTitle"
            :width="modalWidth"
            :key="keyModal+'changeposition'"
            :persistent="persistent"
        >
            <div v-if="memberEdited" class="p-6">
                <div class="mb-5">
                    <InputText 
                        v-model="memberEdited.position"
                        placeholder="Tulis posisi untuk member"
                        :name="prefixName+'gantiposisi'"
                        :label="'Position'"
                    />
                </div>
                <div class="flex justify-end">
                    <div @click="simpanPosisi" class="text-center hover:bg-blue-900 bg-warna-empat text-white rounded-lg py-3 px-4 cursor-pointer">Ganti Posisi</div>
                </div>
            </div>
        </ElementsModal>
    </div>
</template>


<script>
export default {
    data() {
        return {
            // KEPERLUAN MODAL CHANGE POSITION //
            modalAction: false,
            modalTitle: 'Change Position',
            modalWidth: '',
            keyModal: 0,
            persistent: true,
            // ========== //

            selectedTab: 'anggota',
            prefixName: 'anggota',

            filterAnggota: {
                search: ''
            },
            filterUndangan: {
                search: ''
            },
            filterPermintaan: {
                search: ''
            },


            formUndangan: {
                cariUser: ''
            },
            form: {
                gantiPosisi: ''
            },

            masterTableAnggota: [
                {
                    header: 'Anggota',
                    value: 'namaIndividu',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Position',
                    value: 'position',
                    tipe: 'string',
                    display: true
                }
            ],
            dataTableAnggota: undefined,
            masterTableUndangan: [
                {
                    header: 'Anggota',
                    value: 'namaIndividu',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'status',
                    tipe: 'integer',
                    display: true
                }
            ],
            dataTableUndangan: undefined,
            masterTablePermintaan: [
                {
                    header: 'Anggota',
                    value: 'namaIndividu',
                    tipe: 'string',
                    display: true
                },
                {
                    header: 'Status',
                    value: 'status',
                    tipe: 'integer',
                    display: true
                },
                {
                    header: 'Actions',
                    value: 'actions',
                    tipe: 'integer',
                    display: true
                }
            ],
            dataTablePermintaan: undefined,
            namaIndividuList: [],
            idIndividuList: [],
            memberEdited: undefined,
            emailIndividuList: [],
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }, 
        basePath() {
            return process.env.BASE_URL
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },
        isEmail(data) {
            var re = /\S+@\S+\.\S+/;
            return re.test(data);
        },

        async masterPoint() {
            this.dataTableAnggota = []
            this.dataTableUndangan = []
            this.dataTablePermintaan = []
            await this.$apiPlatform.get('verificator/organisasi/'+this.id+'/').then(res => {
                this.dataTableAnggota = _.map(res.data.teamMember, function(o){
                    return {
                        userId: o.individu.userId,
                        namaIndividu: o.individu.namaIndividu,
                        position: o.posisi,
                        status: 1
                    }
                })
                this.dataTableUndangan = _.map(res.data.requestedByIndividu.filter(e=>{return e.typeJoin=="inviteByOrganizations"}), function(o){
                    return {
                        userId: o.individu.userId,
                        namaIndividu: o.individu.namaIndividu,
                        status: o.statusRequest.id
                    }
                })
                this.dataTablePermintaan = _.map(res.data.requestedByIndividu.filter(e=>{return e.typeJoin=="requestedByIndividu"}), function(o){
                    return {
                        userId: o.individu.userId,
                        namaIndividu: o.individu.namaIndividu,
                        status: o.statusRequest.id
                    }
                })
            }).catch(err => {
                console.log(err)
            })
            
            await this.$apiPlatform.get('verificator/listIndividu/?limit=10&offset=0').then(res => {
                this.namaIndividuList = _.flatMap(res.data, "namaIndividu")
                this.idIndividuList = _.flatMap(res.data, "userId")
                this.emailIndividuList = _.flatMap(res.data, "email")
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiPlatform.put('verificator/organisasi/'+this.id+'/', data).then(res => {
                const data = res.data         
                this.message = data.message
                console.log(res.data)
                alert(this.message)
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        },

        simpanPosisi () {
            this.updateData({"updateMemberPosition":{"userId":this.memberEdited.userId, "posisi":this.memberEdited.position}})
            this.modalAction = false
            this.keyModal += 1
        },
        deleteMember(data) {
            if (confirm('Hapus '+ data.namaIndividu+' sebagai member?')) {
                this.updateData({"deleteMember":data.userId})
            }
        },
        undangMember(){
            if (this.isEmail(this.formUndangan.cariUser)){
                var invitation = {
                    "email": this.formUndangan.cariUser,
                    "nama": "Member",
                }
                if(this.emailIndividuList.includes(this.formUndangan.cariUser)){
                    invitation.nama = this.namaIndividuList[this.emailIndividuList.indexOf(this.formUndangan.cariUser)]
                }
                this.updateData({"joinInvitation":[invitation]})
            } else {
                if (this.namaIndividuList.includes(this.formUndangan.cariUser)){
                    var invitation = {
                        "email": this.emailIndividuList[this.namaIndividuList.indexOf(this.formUndangan.cariUser)],
                        "nama" : this.formUndangan.cariUser
                    }
                    this.updateData({"joinInvitation":[invitation]})
                } else {
                    alert("user "+ this.formUndangan.cariUser + " tidak ditemukan." )
                }
            }
        },
        approveMember(data) {
            if (confirm('Approve '+ data.namaIndividu+' sebagai member?')) {
                this.updateData({"approvedMember":data.userId})
            }
        },
        rejectMember(data){
            if (confirm('Reject '+ data.namaIndividu+' sebagai member?')) {
                this.updateData({"rejectedMember":data.userId})
            }
        },
        btnTabAnggota() {
            this.selectedTab = 'anggota'
        },

        btnTabUndangan() {
            this.selectedTab = 'undangan'
        },

        btnTabPermintaan() {
            this.selectedTab = 'permintaan'
        },

        btnGantiPosisi(data) {
            this.memberEdited = data
            this.modalAction = true
            this.keyModal += 1
        },
    },
}
</script>