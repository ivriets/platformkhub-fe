<template>
    <div>
        <table class="table-standar table-zebra bg-white w-full border-collapse" :class="customClass">
        <thead :class="headClass ? headClass : ''">
            <tr>
                <th v-for="(item, index) in tableDetail" :key="'th-'+index" :class="tdClass(item)">
                    <slot :name="'header' +item.itemValue" >
                    {{ item.header }}
                    </slot>
                </th>
            </tr>
        </thead>
        <draggable v-model="tableData" tag="tbody" v-if="drag && drag === true" @change="indexChange">
            <tr v-for="(item,index) in tableData" :key="'tre-'+index" :class="trClass(index)" @click="selectRow(index)">
                <td v-for="(i, index2) in tableDetail" :key="'tde-'+index2" :class="tdClass(i)">
                    <div v-if="i.type==='index'">
                        {{(startIndex ? startIndex : 0) + index + 1}}
                    </div>
                    <div v-else-if="i.type==='date'">
                         {{ $dayjs(item[i.itemValue]).format(i.format ? i.format : 'DD MMMM YYYY') }}
                    </div>
                    <div v-else-if="i.type==='rupiah'" class="flex justify-between" :class="i.itemClass ? i.itemClass : defaultWidth">
                        <div>Rp</div>  <div>{{item[i.itemValue] | number('0,0')}}</div>
                    </div>
                    <div v-else>
                        <slot :name="i.itemValue" v-bind:item="item" v-bind:index="index">
                         {{item[i.itemValue]}} 
                        </slot>
                    </div>
                </td>
            </tr>
        </draggable>
        <tbody  v-if="!drag">
            <tr v-for="(item,index) in tableData" :key="'tre-'+index" :class="trClass(index)" @click="selectRow(index)">
                <td v-for="(i, index2) in tableDetail" :key="'tde-'+index2" :class="tdClass(i)">
                    <div v-if="i.type==='index'">
                        {{(startIndex ? startIndex : 0) + index + 1}}
                    </div>
                    <div v-else-if="i.type==='date'">
                         {{ $dayjs(item[i.itemValue]).format(i.format ? i.format : 'DD MMMM YYYY') }}
                    </div>
                    <div v-else-if="i.type==='rupiah'" class="flex justify-between" :class="i.itemClass ? i.itemClass : defaultWidth">
                        <div>Rp</div>  <div>{{item[i.itemValue] | number('0,0')}}</div>
                    </div>
                    <div v-else>
                        <slot :name="i.itemValue" v-bind:item="item" v-bind:index="index">
                         {{item[i.itemValue]}} 
                        </slot>
                    </div>
                </td>
            </tr>
        </tbody>


            <slot name="footer">

                <tfoot v-if="checkFooter()">
                    <tr>
                        <td v-for="(item, index) in tableDetail" :key="'tfooth-'+index">
                            <div v-if="item.footer && item.type==='rupiah'" class=" flex justify-between" :class="tdClass(item)" >
                                <div>Rp</div> <div>{{sumTable(item.itemValue) | number('0,0')}}</div>
                            </div>
                            <div v-else-if="item.footer && item.type!=='rupiah' && item.footer === 'sum'" class="" :class="tdClass(item)" >
                                <div>{{sumTable(item.itemValue) | number('0,0')}}</div>
                            </div>
                            <div v-else-if="item.footer && item.footer==='sumrupiah'" class=" flex gap-x-3" :class="tdClass(item)" >
                                <div>Rp</div> <div>{{sumTable(item.itemValue) | number('0,0')}}</div>
                            </div>

                        </td>
                    </tr>
                </tfoot>
            </slot>

        </table>

        <!-- <div class="hidden">
        <PrintMaster v-if="printStatus">
            <slot name="printTemplate" />
        </PrintMaster>
        </div> -->

    </div>
</template>
<script>
export default {
    props: ['tableDetail', 'headClass', 'value', 'customClass', 'startIndex', 'selectedIndex', 'hightlightRow', 'drag', 'dragChange'],
                // {
                //     header: 'No',
                //     itemValue: 'index',
                //     type: 'index',
                //     itemClass: 'w-10'
                // },

    data() {
        return {
            selectedRow: null,
            defaultWidth: 'w-36',
        }
    },
    computed: {
        tableData: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    watch: {
        selectedIndex(val) {
            // console.log('selectIndex',val)
            this.selectedRow = val
        }
    },
    methods: {
        sumTable(itemValue) {
            const total = _.sumBy(this.tableData, itemValue)
            return total
        },
        tdClass(detail ) {
            var kelas = ''
            if (detail.type === 'rupiah') {
                kelas = this.defaultWidth
            }

            return detail.itemClass ? detail.itemClass : kelas
        },
        trClass(index) {
            if (this.hightlightRow && this.hightlightRow == true) {
                
                return this.selectedRow===index?'tr-aktif':''
            }
            if (this.drag && this.drag === true) {
                return 'cursor-move'
            }
            
        },
        selectRow(index) {
            this.selectedRow = index
        },
        checkFooter() {
            const cari = this.tableDetail.filter(e => e.footer && e.footer !== '');
            return cari.length > 0 ? true : false;
        },
        indexChange(event) {
            this.tableData[event.moved.oldIndex][this.dragChange] = event.moved.newIndex
            this.tableData[event.moved.newIndex][this.dragChange] = event.moved.oldIndex
        }
    }

}
</script>