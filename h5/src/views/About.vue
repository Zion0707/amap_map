<template>
	<div class="about">
		<div id="nav">
			<router-link to="/city">City</router-link> |
			<router-link to="/about">About</router-link>
		</div>

		关于

		<br>
		{{ city }}
		<input type="text" v-model="inputVal"/>
		<button @click="submit">提交</button>
	</div>
</template>

<script>
export default {
	data(){
		return {
			inputVal:''
		}
	},
	methods:{
		submit(){
			// 改变城市名称
			this.$store.commit('changeCity', this.inputVal)
		}
	},
	computed:{
		city(){
			return this.$store.state.city
		}
	},
	mounted(){

	}
}
</script>