// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button, Toast} from 'vant'
import App from './App'
import router from './router'
import store from './store'

// import 'vant/lib/index.css'
import '../static/css/style.css'

Vue.use(Button)
   .use(Toast)
   .use(store)

Vue.config.productionTip = false

//rem计算
var docEl = document.documentElement, Size = docEl.clientWidth / (750 / 40); 
docEl.style.fontSize = Size + 'px'; 
if(Size >= 25){ 
	Size = 20;
	docEl.style.fontSize = '20px';
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
