import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
	const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: {
			title: '高德地图-首页'
		},
	},
	{
		path: '/city',
		name: 'City',
		component: () => import('../views/City.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	}
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(function(to,from,next){
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = 'personal learn'
    }
    next()
})

export default router
