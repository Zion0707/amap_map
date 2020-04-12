<template>
	<div class="main">
		<div id="map" class="map"></div>
		<van-button>按钮</van-button>
		<div id="tool" class="tool"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	methods:{

	},
	mounted(){
		var map = new AMap.Map('map',{
			isHotspot: true,
			zoom:15,
		}); 
	}
}
</script>
