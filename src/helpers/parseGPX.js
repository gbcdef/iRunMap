// 将GPX格式文件转化为点array

import transformFromWGSToGCJ from "wgs2mars";

export default function parseGPX(plaintext) {
    let xml = new DOMParser().parseFromString(plaintext, 'text/xml')
    let points = []
    let trkpts = xml.getElementsByTagName('trkpt')

    //记录点过于密集对性能有影响
    let simplifySteps = 10
    for (let i = 0; i < trkpts.length; i += simplifySteps ) {
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
