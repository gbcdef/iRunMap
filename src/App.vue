<template lang='pug'>
#root
    Map
    Copyright
</template>

<script>
import Copyright from "./components/Copyright.vue";
import Map from "./components/Map.vue";

export default {
  name: "app",
  components: {
    Copyright,
    Map
  }
};
</script>

<style lang='less'>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #000;
}
#root {
  width: 100%;
  height: 100%;
}
</style>
