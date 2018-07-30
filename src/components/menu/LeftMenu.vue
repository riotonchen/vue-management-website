<template>
  <el-scrollbar class="menu-wrap">
    <el-menu router
             :default-active="$route.path"
             :collapse="isCollapse"
             class="el-menu-vertical-demo"
             text-color="#696969">
      <menu-tree :menuData="this.menuData"></menu-tree>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import menuTree from '@/components/menu/MenuTree'
export default {
  components: { menuTree },
  data () {
    return {
      menuData: [],
      isCollapse: null
    }
  },
  mounted () {
    this.getMenuDate()
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    getMenuDate () {
      this.$service.getMenuData().then(result => {
        this.menuData = result.MENU_DATA
      }).catch(reason => {
        console.error(reason)
      })
    },
    handleResize () {
      document.body.clientWidth < 768 ? this.isCollapse = true : this.isCollapse = false
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="">
.menu-wrap {
  width: 230px;
  margin-top: 81px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.menu-wrap .el-menu-vertical-demo {
  padding-top: 20px;
}
.menu-wrap .el-submenu__title,
.menu-wrap .el-menu-item {
  font-size: 15px !important;
}
@media (max-width: 768px) {
  .menu-wrap {
    width: 63px;
  }
  .menu-wrap .el-menu-vertical-demo .el-submenu__title span {
    display: none;
  }
}
</style>
