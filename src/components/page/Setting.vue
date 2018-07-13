<template>
<div>
  <div class="loginPage" v-show="isShow">
    <h1>管理员登录</h1>
  <el-form :model="formName" status-icon  ref="formName" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="user">
      <el-input type="text" v-model="formName.user" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="formName.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formName')">登录</el-button>
      <el-button @click="resetForm('formName')">重置</el-button>
    </el-form-item>
  </el-form>
  </div> 
  <div v-show="tt">
    <input type="button" @click="exit()" class="exit" value="退出">
    <div class="setUser" >
    <h3>添加新成员:</h3>
      <el-form ref="form" :model="form" status-icon  label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">添加</el-button>
          <el-button @click="resetForm1('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div> 
  </div>
  <div class="users" v-show="tt">
    <el-table
      :data="tableData1"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        type="index"
        prop="Snumber"
        label="序号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
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
</div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
         else {
          callback();
        }
      };
      return {
        formName: {
          user: '',
          pass: '',
        },
        form:{
          name:'',
          password:''
        },
        tableData:[],
        isShow :true,
        tt:false,
        tableData1:[],
    }
    },
    methods: {
      submitForm(formName) {
        const user = this.formName.user,
              pass = this.formName.pass; 
              console.log(user,pass);
                let AdminLoginParams = { 
                  'name' : user,
                  'password' : pass
                };
                console.log(AdminLoginParams);
          axios.get("/api/adminlogin/getAccount",{params:AdminLoginParams})   
              .then(res =>{
                console.log(this.tableData);
                console.log(res.data);
                if(res.data.length>0){
                  this.isShow = false;
                  this.tt = true;
                } else{
                  alert("用户名或密码错误");
                }
                  for(let i in this.tableData){
                    this.tableData1.push({'name':this.tableData[i].user,'password':this.tableData[i].password,'Snumber':i})
                  }
                  console.log(this.tableData1);
              })
              .catch(function(){
              })
        this.$refs[formName].resetFields();
      },//管理员登录
      onSubmit(form){
        let newUser = {
          'name':this.form.name,
          'password':this.form.password
        }
        console.log(newUser);
        if(newUser.name =="" || newUser.password ==""){
          alert("用户名或密码不能为空");
        }
        else{
          axios.post("/api/login/createAccount",{params:newUser});
          alert("添加成功")
          axios.get('/api/login/getAccount').then(res =>{
          console.log(res);
          this.tableData1 = res.data;
          console.log(this.tableData1);
        })          
        }
        this.$refs[form].resetFields();
      },//添加新用户
      resetForm1(form){
        this.$refs[form].resetFields();
        console.log('重置成功')
      },//清空输入
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },//清空输入
      exit(){
        this.isShow=true;
        this.tt = false
      },//退出登录
      deleteRow(item) {
        // console.log(this.tableData1);
        console.log(item.name);
        let Member = {
          'name':item.name,
          'password':item.password
        }
        console.log(Member);
        axios.get('/api/login/delAccount',{params:Member});
        axios.get('/api/login/getAccount').then(res =>{
          console.log(res);
          this.tableData1 = res.data;
          console.log(this.tableData1);
        })
      }//删除用户
    },
    created:function(){
      axios.get('/api/login/getAccount').then(res =>{
        console.log(res);
        this.tableData1 = res.data;
        console.log(this.tableData1);
      })
    }
  }
</script>

<style scoped>
.loginPage{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -175px;
  width: 350px;
  min-height: 300px;
  padding: 30px 20px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
}
.setUser{
  margin-left: 30px;
  width: 450px;
  box-sizing: border-box;
}
.users{
  margin-left: 30px;  
  width: 550px;
  box-sizing: border-box;
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
</style>
