<template lang="pug">
//- 地图及工具栏根容器
#container
    #left-toolbar
        input#file(type='file', multiple, accept='.gpx', v-on:change='drawTracks')
        label(for='file') 上传GPX文件
        div#msg {{ msg }}
        .demo
            a(href='./assets/demo.gpx') 下载demo.gpx
    a#right-toolbar(v-on:click='clearTracks') 清空地图
    //- 地图容器
    #map-container
</template>

<script>
import parseGPX from "../helpers/parseGPX.js";
let log = console.log.bind(this);

export default {
  data: function() {
    return {
      // 跑步轨迹记录的数量
      recordNum: 0,
      msg: ""
    };
  },

  mounted: function() {
    // 没办法，不想用vue-amap，直接操作DOM吧
    window.amap = new AMap.Map("map-container", {
      zoom: 12,
      center: [121.433951, 31.199027],
      mapStyle: "dark",
      features: ["bg", "road"]
    });
  },

  methods: {
    // 清空地图并重置计数
    clearTracks: function() {
      window.amap.clearMap();
      this.recordNum = 0;
      this.msg = "cleared";
    },

    drawTracks: function() {
      let files = document.getElementById("file").files;
      let map = window.amap;
      this.recordNum += files.length;

      for (let i = 0; i < files.length; i++) {
        let f = files[i];

        // 通过xhr读取本地文件时，先生成文件的URL
        // let filePath = window.URL.createObjectURL(f)

        // 通过HTML5 API读取文件
        let reader = new FileReader();
        reader.readAsText(f);
        reader.onload = function() {
          let points = parseGPX(this.result);

          this.msg = ["处理完成，累计绘制", this.recordNum, "条记录"].join("");
          //把所有轨迹点串成一条线并绘制在地图上
          if (points.length > 0) {
            map.setCenter(new AMap.LngLat(points[0].lon, points[0].lat));
          }
          let lineArr = new Array();
          for (var i = 0; i < points.length; i++) {
            lineArr.push(new AMap.LngLat(points[i].lon, points[i].lat));
            var polyline = new AMap.Polyline({
              map: map,
              path: lineArr,
              isOutline: false,
              outlineColor: "#ff0000",
              strokeColor: "#00ff00",
              strokeOpacity: 0.35,
              strokeWeight: 3,
              strokeStyle: "solid"
            });
          }
        };
      }
    }
  }
};
</script>

<style lang="less">
#container {
  width: 100%;
  height: 100%;
  #map-container {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 600px;
    background-color: #121212;
  }
  #left-toolbar {
    z-index: 8;
    margin: 0;
    position: fixed;
    float: left;
    top: 2em;
    left: 3em;
    label {
      background-color: #ff5000;
      color: #fff;
      padding: 0.5em 2em;
      cursor: pointer;
      margin-right: 1em;
      margin-bottom: 2.5em;
    }
    input {
      display: none;
    }
    #msg {
      display: inline-block;
      color: #fff;
    }
    .demo {
      padding: 0.5em 2em;
      a {
        text-decoration: underline;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  #right-toolbar {
    z-index: 8;
    margin: 0;
    position: fixed;
    float: right;
    top: 2em;
    right: 3em;
    // border-radius: 10em;
    text-decoration: none;
    background-color: #ff5000;
    padding: 0.5em 2em;
    color: #fff;
    cursor: pointer;
  }
}
</style>
