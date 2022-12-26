<template>
    <div class="milestone-graph">
        <div 
            v-for="rowItem in baris" :key="'baris'+rowItem"
            class="milestone-area flex items-strech" :class="rowClass(rowItem)">
                <div 
                    v-for="(item, index) in dataMilestone" :key="'briw'+index"
                    class=" milestone-item w-1/3 flex items-end"
                    :class="itemClass(index + 1, rowItem)"
                    v-show="[
                        guideBaris.barisKiri[rowItem - 1], 
                        guideBaris.barisTengah[rowItem - 1], 
                        guideBaris.barisKanan[rowItem - 1]
                        ].includes(item.posisi)"
                >
                    <div 
                    
                    class=" text-center w-full mi-inside" :class="item && item.tahun!=='-' ? '' : 'mi-null' ">
                        <h3>{{ item.tahun }}</h3>
                        <p>{{ item.deskripsi[bahasa] }}</p>
                    </div>
                </div>
        </div>
        <div 
           class="milestone-area ma-akhir flex items-strech" :class="rowClass(baris + 1)">
                <div 
                    v-for="(item,index) in lastRow" :key="'keylast'+index"
                  class=" milestone-item  w-1/3 flex items-end"
                  :class="itemClassAkhir(index + 1, (baris + 1), item) "
                  >
                    <div class=" text-center w-full mi-inside" :class="item && item.tahun!=='' ? '' : 'mi-null' ">
                        <h3 >{{ item.tahun }}</h3>
                        <p >{{ item.deskripsi[bahasa] }}</p>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['dataMilestone'],
    data() {
        return {
            firstRow: [],
            secondRow: [],
            baris: 0,
            lastRow: [],
            guideBaris: {
                barisKiri: [],
                barisTengah: [],
                barisKanan: []
            },

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
        // guideBaris() {
        //     return {
        //         barisKiri: _.range(1,100,3),
        //         barisTengah: _.range(2,100,3),
        //         barisKanan: _.range(3,100,3),
        //     }
        // }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {


                this.initRow()
        },
        initRow() {
            this.dataMilestone = this.dataMilestone.map((e,index) => {
                e.posisi = index + 1
                return e;
            });
            const totalItem = this.dataMilestone.length;

            // this.firstRow = _.cloneDeep(this.dataMilestone).slice(0,3);
            // this.secondRow = _.cloneDeep(this.dataMilestone).slice(3);
            // if (totalItem <=3) {
            //     this.baris = 1
            // } else if (totalItem > 3) {
            //     this.baris = Math.ceil(totalItem / 3) - 1
            // }
            this.baris = Math.ceil(totalItem / 3) - 1
            this.guideBaris = {
                barisKiri: _.range(1,totalItem,3),
                barisTengah: _.range(2,totalItem,3),
                barisKanan: _.range(3,totalItem,3),
            }
            const barisAkhir = totalItem - (this.baris * 3)
            const lastRow = _.takeRight(_.cloneDeep(this.dataMilestone), barisAkhir);

            const kosong = {
                    tahun: "",
                    deskripsi: ['',''],
                    pkMilestoneId: "",
                    posisi: 0
                }

            if (lastRow.length === 2) {
                this.lastRow = [
                    lastRow[0],
                    kosong,
                    lastRow[1]
                ]
            } else if (lastRow.length ===1) {
                this.lastRow = [
                    kosong,
                    lastRow[0]
                ]
            } else {
                this.lastRow = lastRow
            }



        },
        rowClass(rowItem) {
            const cek = parseInt(rowItem) % 2 === 0 ? ' flex-row-reverse ' : '' 
            return cek;
        },
        itemClass(index, rowItem) {
            const cek = parseInt(rowItem) % 2 === 0 ? 'reverse' : 'normal' 
            if (this.guideBaris.barisKiri.includes(index) && cek === 'normal') {
                return 'mi-satu'
            } else if (this.guideBaris.barisKanan.includes(index) && cek === 'normal') {
                return 'mi-tiga'
            } else if (this.guideBaris.barisKiri.includes(index) && cek === 'reverse') {
                return 'mi-tiga'
            } else if (this.guideBaris.barisKanan.includes(index) && cek === 'reverse') {
                return 'mi-satu'
            } else {
                return 'mi-dua'
            }
        },
        itemClassAkhir(index, rowItem, item) {

            const awal = item.posisi === 1 ? ' first-milestone-item '  : ''
            const akhir = this.dataMilestone.length === item.posisi ? 'last-milestone-item' : ''
            const biasa = this.itemClass(index, rowItem);
            
            return biasa + ' ' + akhir + awal
        }


    }
}
</script>