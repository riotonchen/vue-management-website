<template>
  <div class="main-wrap">
    <nav-bar></nav-bar>
    <menu-bar></menu-bar>
    <el-scrollbar class="content-wrap">
      <div class="content">
        <router-view></router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import navBar from '@/components/head/Header'
import menuBar from '@/components/menu/LeftMenu'
export default {
  components: { navBar, menuBar }
}
</script>

<style>
.main-wrap {
  height: 100%;
  padding-top: 81px;
}
.content-wrap {
  position: fixed;
  left: 230px;
  top: 0;
  bottom: 0;
  margin-top: 81px;
  width: 100%;
  overflow-x: hidden;
}
.content {
  width: 100%;
  padding: 25px;
}
@media (max-width: 768px) {
  .content-wrap {
    left: 63px;
  }
}
</style>
