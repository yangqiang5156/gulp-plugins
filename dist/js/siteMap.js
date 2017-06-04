var siteData = [{
    "pm25": 53,
    "co": 0.833,
    "pm10": 112,
    "city": "七台河",
    "o3": 60,
    "lon": 131.01904804712,
    "so2": 18,
    "time": "2017-02-08T09:00:00",
    "lat": 45.77500536864,
    "aqi": 82,
    "no2": 26
}, {
    "pm25": 23,
    "co": 0.9,
    "pm10": 48,
    "city": "三亚",
    "o3": 47,
    "lon": 109.52277128136,
    "so2": 1,
    "time": "2017-02-08T09:00:00",
    "lat": 18.257775914897,
    "aqi": 49,
    "no2": 20
}, {
    "pm25": 33,
    "co": 2.025,
    "pm10": 41,
    "city": "三明",
    "o3": 23,
    "lon": 117.64219393404,
    "so2": 13,
    "time": "2017-02-08T09:00:00",
    "lat": 26.270835279362,
    "aqi": 148,
    "no2": 32
}]
$(function() {
    showSiteMap();
});

function showSiteMap() {
    // 百度地图API功能

    $('#site_map').css({
        height: $('body').height() - 110,
        width: $('body').width()

    });
    //地图信息设置
    var map = new BMap.Map("site_map", { minZoom: 5, maxZoom: 16 });
    var point = new BMap.Point(109.335682, 38.088328);
    map.centerAndZoom(point, 5);

    //拖拽获取地图中心点
    map.addEventListener("dragend", function() {
        var center = map.getCenter();
        console.log("地图中心点变更为：" + center.lng + ", " + center.lat);
    });
    //缩放获取地图缩放级别
    map.addEventListener("zoomend", function() {
        console.log("地图缩放至：" + this.getZoom() + "级");
    });

    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    var mtCtrl = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] });
    mtCtrl.setOffset(new BMap.Size(65, 10));
    map.addControl(mtCtrl);
    var stCtrl = new BMap.PanoramaControl({ anchor: BMAP_ANCHOR_TOP_RIGHT }); //构造全景控件
    stCtrl.setOffset(new BMap.Size(10, 10));
    map.addControl(stCtrl); //添加全景控件
    
    var maplevel = map.getZoom();
    //批量添加点位信息
    function appendStr(strdata) {
    	var mapIcon;
    	var lfcolor="#ffffff";//label 数字颜色
    	var aqi = strdata.aqi;
        if (aqi < 51){
            mapIcon = "../images/lev1.png";
        }else if (aqi < 101){
            mapIcon = "../images/lev2.png";
            lfcolor = "#000000";
        }else if (aqi < 151){
            mapIcon = "../images/lev3.png";
        }else if (aqi < 201){
            mapIcon = "../images/lev4.png";
        }else if (aqi < 301){
            mapIcon = "../images/lev5.png";
        }else{
            mapIcon = "../images/lev6.png";
        }

        var pt = new BMap.Point(strdata.lon, strdata.lat);
        var strIcon = new BMap.Icon(mapIcon, new BMap.Size(39, 32));
        var strmarker = new BMap.Marker(pt, { icon: strIcon });
        map.addOverlay(strmarker);

        //marker文字标注
        var labelNum = strdata.aqi;
        var xoffset = 10;
        if(String(labelNum).length>=3){
        	xoffset=5;
        }
        var label = new BMap.Label(labelNum, {
            offset: new BMap.Size(xoffset, 5)
        });
        label.setStyle({
            fontSize: "14px",
            height: "15px",
            width: '15px',
            lineHeight: "15px",
            fontFamily: "微软雅黑",
            textAlign: 'center',
            border: '0px',
            backgroundColor: "transparent",
            color: lfcolor
        });
        strmarker.setLabel(label);

        //点位弹出框
        var strpoint = new BMap.Point(strdata.lon, strdata.lat);
        var strinfoWindow = new BMap.InfoWindow('<table class="win_table">' +
            '<tr>' +
            '<td>AQI</td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("aqi", strdata.aqi)[0] + ';"></span><span class="win_value">'+ strdata.aqi + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td><span>PM2.5</span><span class="win_unit">μg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("pm25", strdata.pm25)[0] + ';"></span><span class="win_value">'+ strdata.pm25 + '</span></td>' +
            '</tr>' +
            '<td><span>PM10</span><span class="win_unit">μg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("pm10", strdata.pm10)[0] + ';"></span><span class="win_value">'+ strdata.pm10 + '</span></td>' +
            '</tr>' +
            '<td><span>SO2</span><span class="win_unit">μg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("so2", strdata.so2)[0] + ';"></span><span class="win_value">'+ strdata.so2 + '</span></td>' +
            '</tr>' +
            '<td><span>NO2</span><span class="win_unit">μg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("no2", strdata.no2)[0] + ';"></span><span class="win_value">'+ strdata.no2 + '</span></td>' +
            '</tr>' +
            '<td><span>CO</span><span class="win_unit">mg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("co", strdata.co)[0] + ';"></span><span class="win_value">'+ strdata.co + '</span></td>' +
            '</tr>' +
            '<td><span>O3</span><span class="win_unit">μg/m³</span></td>' +
            '<td><span  class="arrow-left" style=" border-right: 10px solid ' + AQIColor("o3", strdata.o3)[0] + ';"></span><span class="win_value">'+ strdata.o3 + '</span></td>' +
            '</tr>' +
            '</table>'+
            '<p class="win_rep"><a class="rep_link" href="#">分析报告>></a></p>'+
            '<p class="win_time">' + (strdata.time).replace("T","  ") + '</p>' 
        );
        strinfoWindow.setTitle("<h4 style='text-align:center; margin:5px 0'>" + strdata.city + "</h4>");

        strmarker.addEventListener("click", function() {
            map.openInfoWindow(strinfoWindow, strpoint);
        });
    }

    for (var i = 0; i < siteData.length; i++) {
        appendStr(siteData[i]);
    }


}



    function AQIColor(name, value) {
        var colors = ["#cccccc", "#00E400", "#FFFF00", "#FF7E00", "#FF0000", "#99004C", "#7E0023"];
        var array;
        if (name == "aqi")
            array = [0, 50, 100, 150, 200, 300, 400, 500];
        else if (name == "pm25")
            array = [0, 35, 75, 115, 150, 250, 350, 500];
        else if (name == "pm10")
            array = [0, 50, 150, 250, 350, 420, 500, 600];
        else if (name == "so2")
            array = [0, 50, 150, 475, 800, 1600, 2100, 2620];
        else if (name == "no2")
            array = [0, 100, 200, 700, 1200, 2340, 3090, 3840];
        else if (name == "co")
            array = [0, 5, 10, 35, 60, 90, 120, 150];
        else if (name == "o3")
            array = [0, 160, 200, 300, 400, 800, 1000, 1200];

        this.value = function() {
            var index = 0;
            var i;
            for (i = 0; i < array.length; i++)
                if (value <= array[i]) {
                    index = i;
                    break;
                }
            //i = (i == array.length) ? i - 1 : index;
            i = i < 0 ? 0 : i;
            i = i > 5 ? 6 : i;
            return i;
        }
        return [colors[this.value()], this.value() ];
    }