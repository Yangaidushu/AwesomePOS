
        //设置数据库相关
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test",{useMongoClinet:true});
const db = mongoose.connection;
db.once("open",function(){
  console.log("连接到数据库");
});
const User = mongoose.Schema({
    name:String,
    password:String
});
const Admin = mongoose.Schema({
    name:String,
    password:String
})
const Money = mongoose.Schema({
    orderNumber:Number,
    date:String,
    money:Number,
    num:Number,
})
const Models = {
    Login : mongoose.model('Login',User),
    AdminLogin: mongoose.model('AdminLogin',Admin),
    GetMoney:mongoose.model('GetMoney',Money)
}
module.exports = Models;
// Models.Login.create({name:"test",password:"111"});
// Models.AdminLogin.create({name:"test",password:"111"});
//  Models.GetMoney.create({orderNum:1,date:'1',money:12,num:4});
// var model = mongoose.model('',User);
// model.create({name:});
// User.create({name:"test",password:"111"},function(){
//     console.log("插入成功");
// });
// console.log(User);
// var user = User.findById({name:1,password:1});
// User.findById();