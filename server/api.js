        //编写接口
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
//创建账号接口
router.post('/api/login/createAccount',(req,res) =>{
    let newAccount = new models.Login({
        name:req.body.params.name,  //post请求参数对象 req.body
        password: req.body.params.password
    });
    //保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if(err) {
            res.send(err);
        }
        else{
            res.send('createAccount successed');
        }
    });
});
//获取已有账号接口
router.get('/api/login/getAccount',(req,res)=>{
    let param = {
        name:req.query.name, // get请求参数对象 req.query
        password: req.query.password
    };
    // console.log(param);
    // 通过模型去查找数据库
    if(param.name == undefined){
        models.Login.find((err,data) => {
            if(err) {
                res.send(err);
            } else{
                // console.log(data);
                res.send(data);
            }
        }); 
    }
    else{
        models.Login.find(param,(err,data) => {
            if(err) {
                res.send(err);
            } else{
                // console.log(data);
                res.send(data);
            }
        });        
    }
});
// 删除账号接口
router.get('/api/login/delAccount',(req,res) => {
    let param = {
        name:req.query.name,
        password:req.query.password
    };
    console.log(param.name);
    models.Login.remove(param,(err,data)=>{
        if(err) {
            res.send(err);
        } else{
            // console.log(data);
            res.send(data);
        }
    });
})
//创建账号接口
router.post('/api/adminlogin/createAccount',(req,res) =>{
    let newAccount = new models.AdminLogin({
        name:req.body.params.name,
        password: req.body.params.password
    });
    //保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if(err) {
            res.send(err);
        }
        else{
            res.send('createAccount successed');
        }
    });
});
//获取已有账号接口
router.get('/api/adminlogin/getAccount',(req,res)=>{
    let param = {
        name:req.query.name,
        password: req.query.password
    };
    console.log(param);
    // 通过模型去查找数据库
    models.AdminLogin.find(param,(err,data) => {
        if(err) {
            res.send(err);
        } else{
            console.log(data);
            res.send(data);
        }
    });
});

router.post('/api/getmoney/createAccount',(req,res) => {
    let newAccount = new models.GetMoney({
        orderNumber:req.body.params.orderNumber,
        date:req.body.params.date,
        num:req.body.params.num,
        money:req.body.params.money
    });
    newAccount.save((err,data) => {
        if(err) {
            res.send(err);
        } else{
            res.send('createAccount successed');
        }
    })
})
router.get('/api/getmoney/getAccount',(req,res) =>{
    let param = {
        orderNumber:req.query.orderNumber,
        date:req.query.date,
        num:req.query.num,
        money:req.query.money
    };
    console.log(param);
    if(param.money == undefined){
        models.GetMoney.find((err,data) => {
            if(err) {
                res.send(err);
            } else{
                // console.log(data);
                res.send(data);
            }
        }); 
    }
    else{
        models.GetMoney.find(param,(err,data) => {
            if(err) {
                res.send(err);
            } else{
                // console.log(data);
                res.send(data);
            }
        });        
    }
})
module.exports = router;