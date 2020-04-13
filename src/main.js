import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import '@/utils/rem'; // 使用rem布局
import '@/utils/iosInputHack';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name!=='Login' &&!localStorage.getItem("auth")) {
    console.log(localStorage.getItem("auth"));
    next({name:'Login'});
  } 
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')