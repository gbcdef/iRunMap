'use strict';
// SJTU lng=121.433951&lat=31.199027
var map = new AMap.Map('map-container', {
    zoom: 12,
    center: [121.433951, 31.199027],
    mapStyle: 'dark',
    features: ['bg'] 
});

$(document).ready(function(){
    $('#clear').on('click', (function(){
        map.clearMap();
    }));
    $('#file-upload').on('change', function(){
        for(var i=0,f;f=this.files[i];i++){
            var fPath = window.URL.createObjectURL(f);
            $.getJSON(fPath, function(data){
                var lineArr = new Array();
                for(var i=0;i<data.lat.length;i++){
                    lineArr.push(new AMap.LngLat(data.lon[i],data.lat[i]));
                }
                var polyline =new AMap.Polyline({
                    path: lineArr,
                    strokeColor: "#00ff00",
                    strokeOpacity: 0.5,
                    strokeWeight: 3, 
                    strokeStyle: "solid",
                });
                polyline.setMap(map);
            });
        }
    });
});
