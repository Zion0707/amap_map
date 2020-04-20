import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	Button, 
	Dialog,
	Icon,
  Tabbar,
  TabbarItem
} from 'vant'

Vue.config.productionTip = false

import 'vant/lib/index.css';
import './static/css/style.css';

Vue.use(Button)
   .use(Dialog)
   .use(Icon)
   .use(Tabbar)
   .use(TabbarItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
