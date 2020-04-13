<template>
	<div class="about">
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