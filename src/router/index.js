import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Vip from '@/components/page/Vip'
import Store from '@/components/page/Store'
import Goods from '@/components/page/Goods'
import Discount from '@/components/page/Discount' 
import Statistical from '@/components/page/Statistical' 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path:'/Vip',
      name:'Vip',
      component:Vip
    },
    {
      path:'/Store',
      name:'Store',
      component:Store
    },
    {
      path:'/Goods',
      name:'Goods',
      component:Goods
    }
    ,    {
      path:'/Statistical',
      name:'Statistical',
      component:Statistical
    },
    {
      path:'/Discount',
      name:'Discount',
      component:Discount
    }
  ]
})
