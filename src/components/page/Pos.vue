<template>
  <div class="pos">
    <div class="dialog" v-show="isShow">
      <div class="loginPage">
        <h1>员工登录</h1>
        <el-form :model="formName" status-icon  ref="formName">
            <el-form-item label="user">
                <el-input type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)"></el-input>
                <p>{{formName.userError}}</p>
            </el-form-item>
            <el-form-item label="password">
                <el-input type="password" id="password" v-model="formName.password" @blur=" ('password',formName.password)"></el-input>
                <p>{{formName.passwordError}}</p>
            </el-form-item>
            <el-button type="primary" @click="submitForm('formName')" >登录</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form>              
    </div>
</div>
    <div v-show="aj">
      <el-row>
        <el-col id="order-list" :span='7' class="pos-order">
          <!-- <div class="order-list-fun"> -->
            <el-tabs>
              <el-tab-pane label="点餐">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="goodsName" label="商品"></el-table-column>
                  <el-table-column prop="count" label="量" width="50"></el-table-column>
                  <el-table-column prop="price" label="金额" width="70"></el-table-column>
                  <el-table-column prop="discountPrice" label="会员" width="50"></el-table-column>
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
                  <el-button type="warning" @click="pendingOrder('Btn')">挂单</el-button>
                  <el-button type="danger" @click="delAllGoods()">删除</el-button>
                  <el-button type="success" @click="checkOut()">结账</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="挂单">
                <el-table :data="tableData2" border style="width:100%">
                  <el-table-column prop = "num" label="订单号" ></el-table-column>                  
                  <el-table-column prop = "Icount" label="数量" width="50"></el-table-column>                  
                  <el-table-column prop = "Iprice" label="金额" width="70"></el-table-column>                  
                  <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="expend(scope.row)">展开</el-button>
                      <el-button type="text" size="small" @click="delSingleItems(scope.row)">删除</el-button>  
                    </template>  
                  </el-table-column>                  
                </el-table>  
              </el-tab-pane>
              <el-tab-pane label="账单">
                <el-table :data="tableData3" border style="width:100%">
                  <el-table-column prop = "num" label="订单号" ></el-table-column>                  
                  <el-table-column prop = "AllCount" label="数量" width="50"></el-table-column>                  
                  <el-table-column prop = "AllPrice" label="金额" width="70"></el-table-column>                  
                  <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="expend(scope.row)">取消</el-button>
                    </template>  
                  </el-table-column>                  
                </el-table>  
                <div class="total">
                  <span><small>订单量</small>：{{totalAllItems}}</span>
                  <span><small>金额</small>：{{totalAllMoney}}</span>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- </div> -->
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">
              <span>常用商品</span>
              <input type="button" @click="vip()" class="vip" value="会员">
              <input type="button" @click="exit()" class="exit" value="注销">
            </div>
          </div>
            <div>
              <div class="often-goods-list">
                <ul>
                  <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                    <span>{{goods.goodsName}}</span>
                    <span class="one-price">￥{{goods.price}}</span>
                  </li>
                </ul>
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
                        <span class="discountPrice">会员:{{goods.discountPrice}}</span>
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
        formName: {//表单中的参数
        user: '',
        userError: '',
        password: '',
        passwordError: '',
        beDisabled: false
        },
        // beShow: false,//传值给父组件     
        aj:false,
        isShow:true,
        often:true,
        serect:'123',
        activeName: 'one',
        counter:0,
        count:0,
        tableData: [],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalMoney: 0, //订单总价格
        totalCount: 0,  //订单商品总数量
        totalAllMoney:0,//账单总收入
        totalAllItems:0//订单数量
      }
    },
    methods:{
      resetForm:function(){
          this.formName.user = '';
          this.formName.userError = '';
          this.formName.password = '';
          this.formName.passwordError = '';
      },//重置
      submitForm:function(formName){
        //与父组件通信传值
        //this.$emit('showState', [this.beShow,this.formName.user])
        //提交user password
        var user = this.formName.user,
            password = this.formName.password;
            console.log(user,password);
            let LoginParams = { 
              'name' : user,
              'password' : password
            };
            console.log(LoginParams);
        axios.get("/api/login/getAccount",{params:LoginParams})   
          .then(res =>{
            console.log(res.data);
            if(res.data.length>0){
              this.isShow = false;
              this.aj = true;                         
            }
            else{
              this.formName.user = '';
              this.formName.password='';
              alert("用户名或密码错误")
            }
          })
        .catch(function(){
        })   
      },//用户登录
      inputBlur:function(errorItem,inputContent){
          if (errorItem === 'user') {
              if (inputContent === '') {
                  this.formName.userError = '用户名不能为空'
              }else{
                  this.formName.userError = '';
              }
          }else if(errorItem === 'password') {
              if (inputContent === '') {
                  this.formName.passwordError = '密码不能为空'
              }else{
                  this.formName.passwordError = '';
              }s
          }
      },//输入框
      exit(){
        window.location.reload();
      },//退出登录
      vip(){
        this.totalMoney =0;
        this.totalCount =0;
        if(this.tableData){
        this.tableData.forEach((element)=>{
          this.totalCount++;
          this.totalMoney = this.totalMoney+(element.discountPrice*element.count);
        });
        }
      },//会员折扣
      checkOut(element){
        if(this.totalCount!= 0 ){
          console.log(this.tableData);
          // this.tableData = [];
          this.count++;
          let item = {AllCount:this.tableData.length,AllPrice:this.totalMoney,num:this.count};
          console.log(item.num);
          const myDate = new Date();
          const date = myDate.toLocaleString();
          console.log(date);
          let bill = {
            'orderNumber':item.num,
            'date':date,
            'num':item.AllCount,
            'money':item.AllPrice
          }
          axios.post('/api/getmoney/createAccount',{params:bill});
          console.log("添加成功");
          this.tableData3.push(item);
          this.totalMoney = 0;
          this.totalCount = 0;
          this.tableData = [];
          this.$message({
            type:'success',
            message:'结账成功，感谢你又出了一份力'
          });
          this.getMoney()
        }else{
          this.$message.error('数目不能为0')
        }
      },//结算
      getAllMoney(){
        this.totalMoney = 0;
        this.totalCount = 0;
        if(this.tableData){
        this.tableData.forEach((element)=>{
          this.totalCount+=element.count;
          this.totalMoney = this.totalMoney+(element.price*element.count)
        });
        }
      },//计算商品总价
      getMoney(){
        this.totalAllMoney = 0;
        this.totalAllItems = 0;
        this.totalAllItems = this.tableData3.length;
        this.tableData3.forEach((element) =>{
          this.totalAllMoney = this.totalAllMoney+ (element.AllPrice)
        })
      },//计算所有订单总价
      pendingOrder(Btn){      
        this.counter++;   
        this.tableData.forEach((element) =>{
          console.log(element);
          this.tableData1.push(element);
        });
        if(this.tableData1.length >0){
          console.log(this.tableData1);
          var Itemprice = 0;
          for(let i in this.tableData1){
            Itemprice = Itemprice + this.tableData1[i].price*this.tableData1[i].count;
          }
          console.log(Itemprice); 
          let newItems = {num:this.counter,Icount:this.tableData1.length,Iprice:Itemprice
          }
          this.tableData2.push(newItems);
          // this.tableData1 = [];
          this.totalMoney = 0;
          this.totalCount = 0;
          this.tableData = [];          
        }else{
        }

      },//挂单
      delSingleItems(items){
        console.log(items);
        console.log(this.tableData2);
        for(let i in this.tableData2){
          if(items.num == this.tableData2[i].num){
            this.tableData2.splice(i,1);
          }
        }
        this.tableData1 = [];
      },//删除
      expend(items){
        console.log(items);
        console.log(this.tableData1);
        // this.tableData.push(this.tableData1);      
        for(let i in this.tableData1){
          let newItems = {goodsId:this.tableData1[i].goodsId,goodsName:this.tableData1[i].goodsName,price:this.tableData1[i].price,count:this.tableData1[i].count,discountPrice:this.tableData1[i].discountPrice}
          this.tableData.push(newItems);
        }  
        for(let i in this.tableData2){
          if(items.num == this.tableData2[i].num){
            this.tableData2.splice(i,1);
          }
        }
        this.tableData1 = []; 
        this.getAllMoney();
      },//挂单扩展
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
      },//删除单一商品
      delAllGoods(){
        this.totalMoney=0;
        this.totalCount=0;
        this.tableData = [];
        this.tableData1 =[];
      },//删除所有
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
            let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1,discountPrice:goods.discountPrice};

            this.tableData.push(newGoods);
          }
          this.getAllMoney();
      }//添加商品
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
  html,body{
        margin: 0;
        padding: 0;
        position: relative;
    }
  .dialog{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.8);
  }
  .loginPage{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -196px;
    margin-left: -175px;
    width: 330px;
    min-height: 300px;
    padding: 30px 20px 20px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .loginPage p{
      color: red;
      text-align: left;
  }
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
  .exit{
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    background-color: red;
    color: white;
    display: block;
    float: right;
  }
  .vip{
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    background-color: lightgreen;
    color: #ffffff;
    display: block;
    float: right;
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
    padding-left: 11px;
    padding-top: 4px;
    font-weight: 400px;
    color:rgb(60, 60, 60);
    text-decoration: line-through;
  }
  .discountPrice{
    color: red;
    padding-left: 11px;
  }
  .total{
    margin-top: 10px;
  }
</style>
