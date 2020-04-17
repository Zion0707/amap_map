<template>
	<div class="home">
		<div id="amap_map"></div>
		<!-- <div id="tool">
			<ul class="tool-in">
				<li><span onclick="getNowLocat()">定位当前位置</span></li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
import $ from 'jquery'

export default {
	data(){
		return {

		}
	},
	methods:{

	},
	mounted(){
		var map = new AMap.Map('amap_map',{
			isHotspot: true,
			zoom:15,
		}); 

		// 定位到当前位置
		map.plugin('AMap.Geolocation',()=>{
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: false,        //显示定位按钮，默认：true
				buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			});
			map.addControl(geolocation);
			geolocation.getCurrentPosition();
			AMap.event.addListener(geolocation, 'complete', onComplete);
			AMap.event.addListener(geolocation, 'error', onError); 
		}); 

		// 成功回调
		function onComplete(){
			console.log('success');
		}
		// 失败回调
		function onError(){
			console.log('error');
			Dialog.alert({
				title:'温馨提示',
				content:'您未打开定位权限！',
			}).then(() => {
				// on close
			});
		}

	}
}
</script>