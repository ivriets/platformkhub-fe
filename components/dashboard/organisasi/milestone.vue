<template>
    <div>
        <div class="milestone-area ma-pertama grid grid-cols-3 items-end">
            <div v-for="(item, index) in firstRow" :key="'firstrow'+index" class="milestone-item">
                <h3>{{ item.tahun }}</h3>
                <p>{{ item.deskripsi[bahasa] }}</p>
            </div>
        </div>
        <div 
            v-for="(item,index) in totalBaris" :key="'firstrow'+index" 
            class="milestone-area ma-kedua grid grid-cols-3 items-end">
            huhu
            <!-- <div v-for="(item, index) in firstRow" :key="'firstrow'+index" class="milestone-item">
                <h3>{{ item.tahun }}</h3>
                <p>{{ item.deskripsi[bahasa] }}</p>
            </div> -->
        </div>

<pre>{{ firstRow }}</pre>

    </div>
</template>
<script>
export default {
    // props: ['dataMilestone'],
    data() {
        return {
            totalBaris: 0,
            firstRow: [],
             dataMilestone: [
                {
                    "tahun": "2018",
                    "deskripsi": [
                    "Deskripsi Milestone",
                    "Milestone Description"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824BdAN"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Kedua",
                    "Second Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824oXFd"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Ketiga",
                    "Third Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824Qczq"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Keempat",
                    "Fourth Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824pfZr"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Kelima",
                    "Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone Fifth Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824JPsB"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Kelima",
                    "6 Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824JPsB"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Kelima",
                    "7 Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824JPsB"
                },
                {
                    "tahun": "2022",
                    "deskripsi": [
                    "Pencapaian Kelima",
                    "8 Milestone"
                    ],
                    "pkMilestoneId": "OrgMilestone47963824JPsB"
                }
            ]
        }
    },

    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },

        basePath() {
            return process.env.BASE_URL
        },
        guideBaris() {
            return {
                barisEvenKiri: _.range(5,100,4),
                barisEvenKanan: _.range(4,100,4),
                barisOddKiri: _.range(6,100,4),
                barisOddKanan: _.range(7,100,4)
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.hitungBaris();
            this.initRow()
        },
        hitungBaris() {
          if (this.dataMilestone.length < 3)  {
            this.totalBaris = 0
          } else {
            const tempBaris = this.dataMilestone.length - 3
            this.totalBaris = Math.ceil(tempBaris / 2) 
          }
        },

        initRow() {
            this.dataMilestone = this.dataMilestone.map((e,index) => {
                e.posisi = index +1;
                return e;
            });
            this.firstRow = _.cloneDeep(this.dataMilestone).slice(0,3)
        },

        classItem(index) {
            const totalItem = this.dataMilestone.length
            var finalClass = ''
            if (index < 3) {
                finalClass = 'col-span-1'
            } else if (index > 2) {
                const posisi = index + 1
                if (this.guideBaris.barisEvenKiri.includes(posisi)) {
                    finalClass = 'col-span-1 col-start-1' 
                } else if (this.guideBaris.barisEvenKanan.includes(posisi)) {
                    finalClass = 'col-span-1 col-end-4'
                }

            }   
            return finalClass
        }
    }
}
</script>