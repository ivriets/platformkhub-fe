<template>
    <div>
        <!-- <button @click="downloadExcel" class="btn-action">Export to Excel</button> -->
    </div>
</template>

<script>
import * as XLSX from 'xlsx/xlsx.mjs';
export default {
    props: ['jsonData', 'fileName'],
    data() {
        return {
        }
    },
    mounted() {
        this.downloadExcel()
    },
    methods: {
        initialize() {
            document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
        },
        downloadExcel() {
            // document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const worksheet = XLSX.utils.json_to_sheet(this.jsonData)
            
            const workbook = {
                Sheets: {
                    'data': worksheet 
                },
                SheetNames: ['data']
            }
            const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'}) 
            const data = new Blob([excelBuffer], {type: EXCEL_TYPE})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(data)
            link.download = this.fileName + '.xlsx'
            link.click()
            URL.revokeObjectURL(link.href)
            $nuxt.$emit('downloaded')
        }
    }
}
</script>