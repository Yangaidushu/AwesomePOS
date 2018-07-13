<template>
<div class="bill">
<el-table
    :data="tableData"
    height="500"
    style="width: 100%">
    <el-table-column
    prop="orderNumber"
    label="订单号"
    width="100">
    </el-table-column>
    <el-table-column
    prop="date"
    label="时间"
    width="180">
    </el-table-column>
    <el-table-column
    prop="num"
    label="数量"
    width="120">
    </el-table-column>
    <el-table-column    
    prop="money"
    label="金额"
    width="120">
    </el-table-column>
    <el-table-column
    label="操作"
    width="120">
    <template slot-scope="scope">
        <el-button
        @click.native.prevent="deleteRow(scope.row)"
        type="text"
        size="small">
        移除
        </el-button>
    </template>
    </el-table-column>
</el-table>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
    },
    created:function(){
      axios.get('/api/getmoney/getAccount').then(res =>{
        console.log(res);
        this.tableData = res.data;
        console.log(this.tableData1);
      })
    }
}
</script>

<style scoped>
.bill{
    margin-left: 30px;  
    width: 600px;
    box-sizing: border-box;
}
</style>
