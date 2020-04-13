<template>
  <div id="app">
    <router-view />
    <tabbar />
  </div>
</template>
<script>
import tabbar from "@/components/tabbar";
export default {
  components: {
    tabbar
  }
};
</script>
<style lang='less'>
@import "./assets/css/reset.css";
@import "./assets/css/common.less";
html,
body,
#app {
  height: 100%;
}
</style>
