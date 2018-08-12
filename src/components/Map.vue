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
import drawGPXFile from "../drawer";
let log = console.log.bind(this);
import mapStyle from "../config/mapStyle";

export default {
  data() {
    return {
      msg: "",
      recordCount: 0
    };
  },

  mounted() {
    // 没办法，不想用vue-amap，直接操作DOM吧
    window.amap = new AMap.Map("map-container", mapStyle);
  },

  methods: {
    // 清空地图并重置计数
    clearTracks() {
      window.amap.clearMap();
      this.msg = "轨迹已清除";
      this.recordCount = 0;
    },

    drawTracks() {
      let files = document.getElementById("file").files;
      let map = window.amap;
      let recordNum = files.length;
      this.recordCount += recordNum;

      for (let i = 0; i < recordNum; i++) {
        let f = files[i];

        // 通过xhr读取本地文件时，先生成文件的URL
        // let filePath = window.URL.createObjectURL(f)

        // 通过HTML5 API读取文件
        let reader = new FileReader();
        reader.readAsText(f);

        // 读取完成后将文件绘制到地图上
        reader.onload = function() {
          drawGPXFile(this.result, map);
        };
      }

      // 提示完成
      this.msg = ["处理完成，累计绘制", this.recordCount, "条记录"].join("");
    } // drawTracks
  } // methods
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
