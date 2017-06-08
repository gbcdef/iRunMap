'use strict';
// SJTU lng=121.433951&lat=31.199027
var map = new AMap.Map('map-container', {
    zoom: 12,
    center: [121.433951, 31.199027],
    mapStyle: 'dark',
    features: ['bg']
});

var recordNum = 0

$(document).ready(function() {
    $('#clear').on('click', (function() {
        map.clearMap()
        recordNum = 0
    }));
    $('#file').on('change', function() {
        recordNum += this.files.length

        for (var i = 0; i < this.files.length; i++) {
            var f = this.files[i]
            var filePath = window.URL.createObjectURL(f);
            $.ajax({
                type: 'GET',
                url: filePath,
                dataType: 'xml',
                // 成功回调
                success: function(data) {
                    var points = parseGPX(data)
                        //把所有轨迹点串成一条线并绘制在地图上
                    var lineArr = new Array()
                    for (var i = 0; i < points.length; i++) {
                        lineArr.push(new AMap.LngLat(points[i].lon, points[i].lat))
                        var polyline = new AMap.Polyline({
                            path: lineArr,
                            strokeColor: "#00ff00",
                            strokeOpacity: 0.35,
                            strokeWeight: 3,
                            strokeStyle: "solid",
                        })
                        polyline.setMap(map)
                    }
                    // $('#msg').html('处理完成，累计绘制'+recordNum+'条记录')
                }
            })
            $('#msg').html('处理中...')
        }
    })
})


function parseGPX(xml) {
    var points = [];
    var trkpts = xml.getElementsByTagName('trkpt')
        //记录点过于密集对性能有影响，步进值改为5
    for (var i = 0; i < trkpts.length; i += 5) {
        var trkpt = trkpts[i];
        var p = {
                lat: parseFloat(trkpt.getAttribute('lat')),
                lon: parseFloat(trkpt.getAttribute('lon')),
            }
            //gpx中使用lat=0 lon=0来代表暂停，需要剔除
        if (p.lat != 0 && p.lon != 0) {
            points.push(p)
        }
    }
    return points
}
