<template>
  <div class="left-nav">
    <ul>
        <router-link to="/">
            <li>
                <i class="icon iconfont icon-goumai"></i>
                <div>收银</div>
            </li>
        </router-link> 
        <router-link to="/Store">
            <li>
                <i class="icon iconfont icon-dianpu"></i>
                <div>店铺</div>
                </li>
        </router-link>
        <router-link to="/Goods">
            <li>
                <i class="icon iconfont icon-hanbao"></i>
                <div>商品</div>
            </li>
        </router-link>
       
        <router-link to="/Vip">
            <li>
                <i class="icon iconfont icon-huiyuanqia"></i>
                <div>会员</div>
            </li>            
        </router-link>
        <router-link to="/Discount">
            <li>
                <i class="icon iconfont icon-shezhi"></i>
                <div>折扣</div>
            </li>
        </router-link>
        <router-link to="/Statistical">
            <li>
                <i class="icon iconfont icon-shezhi"></i>
                <div>统计</div>
            </li>            
        </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .left-nav{
       color:#fff;
       font-size:10px;
       height:100%;
       background-color: #1D8ce0;
       float:left;
       width:5%;
    }
    .iconfont{
       font-size:24px;
    }
    .left-nav ul{
        padding:0px;
        margin: 0px;
    }
    .left-nav li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #20a0ff;
        padding:10px;
    }
    a{
        list-style: none;
        color: #fff;
        text-decoration: none;
    }
</style>
