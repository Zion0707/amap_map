<template>
    <div class="city">
		<div id="nav">
			<router-link to="/city">City</router-link> |
			<router-link to="/about">About</router-link>
		</div>

		城市

		<br>
		{{ city }}{{ name }}
		<input type="text" v-model="inputVal">
		<button @click="submit">提交</button>
		<button @click="submit2">改变</button>

		<van-button @click="backout">退出</van-button>
    </div>
</template>

<script>
export default{
	data(){
		return {
			inputVal:'',
		}
	},
	methods:{
		submit(){
			// 改变城市名称
			this.$store.commit('changeCity', this.inputVal);
		},
		submit2(){
			this.$store.commit('changeName', '黄')
		},
		backout(){
			sessionStorage.removeItem('vuex');
			window.location.href='';
		}
	},
	computed:{
		city(){
			return this.$store.state.city
		},
		name(){
			return this.$store.state.name
		}
	},
	mounted(){
	}
}
</script>