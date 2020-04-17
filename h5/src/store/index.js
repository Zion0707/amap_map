import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// 数据持久化插件
const vuexLocal = new VuexPersistence({
	storage: window.sessionStorage,
});

export default new Vuex.Store({
	state: {
		city:'meizhou',
		name:'Zion',
	},
	mutations: {
		changeCity(state, value){
			state.city = value;
		},
		changeName(state, value){
			state.name = value;
		}
	},
	actions: {

	},
	modules: {

	},
	plugins: [vuexLocal.plugin]
})

