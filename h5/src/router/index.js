import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/center',
		name: 'Center',
		component: () => import('../views/Center.vue')
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
	},
	{
		path: '/test',
		name: 'Test',
		component: () => import('../views/Test.vue')
	}
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
