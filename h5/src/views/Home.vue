<template>
	<div class="page">
		<div id="amap_map"></div>
		<van-search class="index-search" id="index_search" :background="'#2aa2ff'" v-model="searchVal" placeholder="请输入搜索关键词"/>
		<bottom-nav :active="buttonNavActive"></bottom-nav>
	</div>
</template>

<script>
// import $ from 'jquery';
import BottomNav from '@/components/BottomNav.vue';

export default {
	data(){
		return {
			buttonNavActive: 0,
			searchVal:'',
		}
	},
	methods:{
		// 搜索并定位
		_searchPosition(map, opt){
			var _self = this;
			var marker = null;
			new AMap.Autocomplete({
				input: "index_search",
			}).on('select', function(res){
				if(res.poi.location===''){
					_self.$dialog.alert({
						title:'温馨提示',
						message: '暂时无法定位到该位置！',
					}).then(() => {
						// on close
					});
					return;
				}
				var lng = res.poi.location.lng;
				var lat = res.poi.location.lat;
				
				if(marker!==null){
					map.remove(marker);
				}
				marker = new AMap.Marker({
					icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
					position: [lng, lat],
					offset: new AMap.Pixel(-13, -30),
					draggable: true,
					cursor: 'move',
					raiseOnDrag: true,
				});
				marker.id = 'position';
				marker.setMap(map);
				map.setFitView();
			});
		},

		// 定位到当前位置
		_positionNowLocal(map){
			// 定位到当前位置
			map.plugin('AMap.Geolocation',()=>{
				var geolocation = new AMap.Geolocation({
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					maximumAge: 0,           //定位结果缓存0毫秒，默认：0
					convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true,        //显示定位按钮，默认：true
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
				_self.$dialog.alert({
					title:'温馨提示',
					message:'您未打开定位权限！',
				}).then(() => {
					// on close
				});
			}
		}
	},
	mounted(){
		var _self = this;
		var map = new AMap.Map('amap_map',{
			isHotspot: true,
			zoom:15,
		}); 

		_self._positionNowLocal(map);
		_self._searchPosition(map);
	},
	components:{
		'bottom-nav':BottomNav
	}
}
</script>