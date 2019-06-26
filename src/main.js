// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

import 'jquery'
import '../node_modules/jquery/dist/jquery.min'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/bootstrap-3.3.7-dist/js/bootstrap.min'


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);


const routes=[
  {
    path:'/goods',
    component:goods
  },
  {
    path:'/ratings',
    component:ratings
  },
  {
    path:'/seller',
    component:seller
  }
];

const router=new VueRouter({
  routes:routes,
  linkActiveClass:'active'
});

// new Vue({
//   el: '#app',
//   router: router,
//   template: '<App></App>',
//   components: {App}
// })

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

//默认跳转到 '/goods'
router.push('/goods');




