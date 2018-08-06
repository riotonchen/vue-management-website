<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
}
#app .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-loading-spinner .path {
  stroke: #eee;
}
.el-loading-spinner .el-loading-text {
  color: #eee;
}
</style>
