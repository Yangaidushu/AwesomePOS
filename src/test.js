const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test",{useMongoClinet:true});
mongoose.connection.once("open",function(){
  console.log("连接到数据库");
});
var User = mongoose.model('User',{name:String,password:String});
User.create({name:"test",password:"111"},function(){
    console.log("插入成功");
});
console.log(User);
var user = User.findById({name:1,password:1});
User.findById();

let a = 1;
let b =2 ;
console.log(a+b);