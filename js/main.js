'use strict';
// SJTU lng=121.433951&lat=31.199027
var map = new AMap.Map('map-container', {
    zoom: 12,
    center: [121.433951, 31.199027],
    mapStyle: 'dark',
    features: ['bg']
});

$(document).ready(function() {
    $('#clear').on('click', (function() {
        map.clearMap();
    }));
    $('#file-upload').on('change', function() {
        for (var i = 0; i < this.files.length; i++) {
            var f = this.files[i]
            var filePath = window.URL.createObjectURL(f);
            console.log('files path is: ' + filePath)
            var xml = $.ajax({
                    type: 'GET',
                    url: filePath,
                    dataType: 'xml',
                    success: 'parseGPX',
                })
            console.log(xml)
            var points = parseGPX(xml)

            // var lineArr = new Array()
            // for (var i = 0; i < points.length; i++) {
            //     console.log(points[i].lon)
            //     lineArr.push(new AMap.LngLat(points[i].lon, points[i].lat))
            //     var polyline = new AMap.Polyline({
            //         path: lineArr,
            //         strokeColor: "#00ff00",
            //         strokeOpacity: 0.5,
            //         strokeWeight: 3,
            //         strokeStyle: "solid",
            //     })
            //     polyline.setMap(map)
            // }

        }
    })
})


function parseGPX(xml) {
    var points = [];
    // x.responseXML.getElementsByTagName('trkpt')
    var trkpts = $(xml).responseXML.getElementsByTagName('trkpt')
    for (var i = 0; i < trkpts.length; i++) {
        var trkpt = trkpts[i];

        var p = {
            lat: parseFloat(trkpt.getAttribute('lat')),
            lng: parseFloat(trkpt.getAttribute('lon')),
            ele: parseFloat(trkpt.getAttribute('ele'))
        }
        points.push(p);
    }

    return points
}