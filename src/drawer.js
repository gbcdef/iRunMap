
import transformFromWGSToGCJ from "wgs2mars";
import trackStyle from "./config/trackStyle";

// 将GPX格式文件转化为 点数组
function parseGPX(plaintext) {
    let xml = new DOMParser().parseFromString(plaintext, 'text/xml')
    let points = []
    let trkpts = xml.getElementsByTagName('trkpt')

    //记录点过于密集对性能有影响
    let simplifySteps = 2
    for (let i = 0; i < trkpts.length; i += simplifySteps) {
        let trkpt = trkpts[i]
        let p = {
            lat: parseFloat(trkpt.getAttribute('lat')),
            lon: parseFloat(trkpt.getAttribute('lon')),
        }
        //gpx中使用lat=0 lon=0来代表暂停，需要剔除
        if (p.lat != 0 && p.lon != 0) {
            let gcjloc = transformFromWGSToGCJ(p.lon, p.lat);
            let loc = {
                lat: gcjloc.lat,
                lon: gcjloc.lng,
            }
            points.push(loc)
        }
    }
    return points
}

function parseTrackPL(points) {
    // 把所有轨迹点串成一条线
    let path = new Array();
    for (let i = 0; i < points.length; i++) {
        path.push(new AMap.LngLat(points[i].lon, points[i].lat));
    }
    return path;
}

function drawPathToMap(path, map) {
    // 视点居中
    map.setCenter(path[0]);

    // 绘制在地图上
    let polyline = new AMap.Polyline({
        map,
        path,
        ...trackStyle
    });
}

export default function(plaintextGPX, map) {
    let points = parseGPX(plaintextGPX)
    let path = parseTrackPL(points);
    drawPathToMap(path, map);
}