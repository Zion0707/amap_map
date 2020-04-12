var api = 'http://localhost:3008/api'; // 接口地址
var map =null;
$(function(){
    map = new AMap.Map('container',{
        isHotspot: true,
        zoom:15,
    }); 

    // 设置移动手势icon 为 + 字
    map.setDefaultCursor('crosshair');

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
        // AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError); 
    }); 

    // 点击当前位置添加标识
    map.on('dblclick', (ev)=>{
        // wu.showToast(ev.lnglat.getLng() + ',' + ev.lnglat.getLat())
        setLightMarker({
            lng: ev.lnglat.getLng(),
            lat: ev.lnglat.getLat()
        });
    });


    // 获取路灯列表
    $.get(`${api}/light/list`, function(data){
        if(data.code==0){
            var list = data.data.list;
            list.map((item, index)=>{
                var lng = item.lng;
                var lat = item.lat;
                var id = item.id;
                lightMarkerShow({
                    lng, lat, id
                });
            }); 
        }else{
            wu.showToast(data.msg);
        }
    });


})

// 定位当前位置
function getNowLocat(){
    $('.amap-geo').click();
    map.getCity((info)=>{
        console.log( JSON.stringify(info) );
        // wu.showDialog({
        //     content:JSON.stringify(info),
        // });
    });
}

// 设置标记
function setLightMarker(opt){
    var lng = opt.lng;
    var lat = opt.lat;
    $.post(`${api}/light/create`,{
        lng,
        lat
    }, (data)=>{
        if(data.code==0){
            var id = data.data.id;
            lightMarkerShow({
                lng, 
                lat,
                id
            });
        }else{
            wu.showToast(data.msg);
        }
    });    
}


// 路灯marker点显示
function lightMarkerShow(opt){
    var lng = opt.lng || ''; //经度
    var lat = opt.lat || ''; //纬度
    var id = opt.id || '';
    if(lng===''||lat===''){
        wu.showToast('经纬度是必须的！');
    }
    var marker = new AMap.Marker({
        icon:'static/images/light.png',
        position:[lng, lat],
        // draggable:true, //是否允许拖拽
    });
    marker.id = id;
    marker.on('click', function(ev){
        var _self = this;
        // console.log(ev);
        wu.showAction({
            title: '路灯操作',
            menuArray: [
                {
                    title: '是否开启拖拽',
                    value: 'draggable',
                    color: ''
                },
                {
                    title: '删除该路灯',
                    value: 'delete',
                    color: 'red'
                } //如果是删除  value 必须是 "delete"
            ],
            success: function(res) {
                if(res.value == "delete") {
                    $.post(`${api}/light/remove`, {id}, function(data){
                        if(data.code==0){
                            _self.hide();
                        }else{
                            wu.showToast({
                                icon:'icon-error',
                                title:'删除失败！'
                            });
                        }
                    });
                }else if(res.value=='draggable'){
                    _self.setDraggable(true);
                }
            }
        })
    });

    marker.on('dragend', function(ev){
        console.log(ev);
    });
    map.add(marker);
}

// 成功回调
function onComplete(){
    wu.showToast({
        title:'获取成功',
        icon:'icon-success'
    });
}
// 失败回调
function onError(){
    wu.showDialog({
        title:'温馨提示',
        content:'您未打开定位权限！',
    });
}