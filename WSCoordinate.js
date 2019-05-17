var x_pi = Math.PI * 3000.0 / 180.0;
var a = 6378245.0;
var ee = 0.00669342162296594323;


function bd09togcj02(bd_lon, bd_lat) {
//    百度坐标系(BD-09)转火星坐标系(GCJ-02)

    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    this.latitude = gg_lat;
    this.longitude = gg_lng;
}


function gcj02towgs84(lng, lat){
//    GCJ02(火星坐标系)转GPS84

    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * Math.PI;
    var magic = Math.sin(radlat);
    var magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    var dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI);
    var dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    this.longitude = lng * 2 - mglng;
    this.latitude = lat * 2 - mglat;
}

function transformlat(lng, lat){
    ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat){
    ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng +  0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
    return ret
}