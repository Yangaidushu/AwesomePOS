<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col id="order-list" :span='7' class="pos-order">
          <!-- <div class="order-list-fun"> -->
            <el-tabs>
              <el-tab-pane label="点餐">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="goodsName" label="商品"></el-table-column>
                  <el-table-column prop="count" label="量" width="50"></el-table-column>
                  <el-table-column prop="price" label="金额" width="70"></el-table-column>
                  <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                      <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button> 
                    </template>
                  </el-table-column>
                </el-table>
                <div class="total">
                  <span><small>数量</small>：{{totalCount}}</span>
                  <span><small>金额</small>：{{totalMoney}}</span>
                </div>
                <div class="functi">
                  <el-button type="warning" @click="pendingOrder()">挂单</el-button>
                  <el-button type="danger" @click="delAllGoods()">删除</el-button>
                  <el-button type="success" @click="checkOut()">结账</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="挂单">
                挂单
              </el-tab-pane>
              <el-tab-pane label="外卖">外卖</el-tab-pane>
            </el-tabs>
            <!-- </div> -->
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                  <span>{{goods.goodsName}}</span>
                  <span class="one-price">￥{{goods.price}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <div>
                  <ul class="cook-list">
                    <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                      <span class="foodsImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodsName">{{goods.goodsName}}</span>
                      <span class="foodsPrice">￥{{goods.price}}</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="小吃">
                <div>
                  <ul class="cook-list">
                    <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                      <span class="foodsImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodsName">{{goods.goodsName}}</span>
                      <span class="foodsPrice">￥{{goods.price}}</span>
                    </li>
                  </ul>
                </div>  
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                  <ul class="cook-list">
                    <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                      <span class="foodsImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodsName">{{goods.goodsName}}</span>
                      <span class="foodsPrice">￥{{goods.price}}</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane> 
              <el-tab-pane label="套餐">
                <div>
                  <ul class="cook-list">
                    <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                      <span class="foodsImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodsName">{{goods.goodsName}}</span>
                      <span class="foodsPrice">￥{{goods.price}}</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane> 
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'pos',
    data(){
      return{
        activeName: 'second',
            tableData: [],
            oftenGoods: [],
            type0Goods: [],
            type1Goods: [],
            type2Goods: [],
            type3Goods: [],
            totalMoney: 0, //订单总价格
            totalCount: 0  //订单商品总数量
      }
    },
    methods:{
      checkOut(){
        if(this.totalCount!= 0 ){
          this.tableData = [];
          this.totalMoney = 0;
          this.totalCount = 0;
          this.$message({
            type:'success',
            message:'结账成功，感谢你又出了一份力'
          });
        }else{
          this.$message.error('数目不能为0')
        }
      },
      getAllMoney(){
        this.totalMoney = 0;
        this.totalCount = 0;
        if(this.tableData){
        this.tableData.forEach((element)=>{
          this.totalCount+=element.count;
          this.totalMoney = this.totalMoney+(element.price*element.count)
        });
        }
      },
      pendingOrder(){         
        this.tableData.forEach((element) =>{
          console.log(element);
        });
        this.totalMoney = 0;
        this.totalCount = 0;
        this.tableData = [];
      },
      delSingleGoods(goods){
        console.log(goods);
        let array = this.tableData.filter(o=> o.goodsId ==goods.goodsId);
        if(array[0].count ==1){
          this.tableData = this.tableData.filter(o=> o.goodsId !==goods.goodsId);
        }
        else{
          array[0].count--;
        }
        this.getAllMoney()
      },
      delAllGoods(){
        this.totalMoney=0;
        this.totalCount=0;
        this.tableData = [];
      },
      addOrderList(goods){
        this.totalCount = 0;
        this.totalMoney = 0 ;
        let isHave = false;
        for(let i=0;i<this.tableData.length;i++){
          console.log(this.tableData[i].goodsId);
          if(this.tableData[i].goodsId==goods.goodsId){
            isHave = true;
          }
          }
          if(isHave){
            let arr = this.tableData.filter(o=>o.goodsId==goods.goodsId);
            arr[0].count++;
            console.log(arr);
          }else{
            let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
            this.tableData.push(newGoods);
          }
          this.getAllMoney();
      }
    },
    created:function(){
      axios.get('https://www.easy-mock.com/mock/5abdf4d21fc7eb0367395d73/example/oftenGoods')
      .then(response =>{
        this.oftenGoods=response.data;
      })
      .catch(error=>{
        console.log(error);
        alert('网络错误，不能访问');
      })
      axios.get('https://www.easy-mock.com/mock/5abdf4d21fc7eb0367395d73/example/typeGoods')
      .then(response =>{
        console.log(response);
        this.type0Goods=response.data[0];
        this.type1Goods=response.data[1];
        this.type2Goods=response.data[2];
        this.type3Goods=response.data[3];
      })
      .catch(error=>{
        console.log(error);
        alert('网络错误，不能访问');
      })
    },
    mounted:function(){
      var orderHeight=document.body.clientHeight;
      console.log(orderHeight)
      document.getElementById("order-list").style.height=orderHeight+'px';
    }
 
}
</script>

<style scoped>
.pos-order{
  background-color: #F9FAFC;
  border-right: 1px solid #C0CCDA;
  height: 100%;

}
#order-list{
  padding-left: 24px;
}
.el-tab-pane{
  text-align: center
}
.functi{
  margin-top: 20px;
}
.often-goods .title{
  text-align: left;
  height: 19px;
  border-bottom: 1px solid #C0CCDA;
  padding: 10px;
}
.often-goods-list ul li{
  margin: 5px;
  list-style: none;
  background-color: #F9FAFC;
  padding: 10px;
  float: left;
  cursor: pointer;
}
.one-price{
  color: #58B7FF; 
}
.goods-type{
  clear: both;
  padding-left:24px;
}
.cook-list li{
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cook-list li span {
  display: block;
  float: left;
}
.foodsImg{
  width: 40%;
}
.foodsName{
  font-size: 14px;
  padding-left: 10px;
  color: brown;
}
.foodsPrice{
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.total{
  margin-top: 10px;
}
</style>
