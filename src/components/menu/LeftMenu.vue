<template>
  <el-scrollbar class="menu-wrap">
    <div class="menu-title menu-font">菜单</div>
    <el-menu router
             :default-active="$route.path"
             :collapse="isCollapse"
             text-color="#696969"
             background-color="#f5f5f5">
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
  width: 210px;
  position: fixed;
  top: 61px;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-right: 1px solid #e6e6e6;
  background-color: #f5f5f5;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.menu-wrap .el-menu {
  border-right: none !important;
}
.menu-wrap .menu-title {
  padding: 30px 0 0 20px;
  color: #b0b0b0;
  line-height: 30px;
  font-size: 13px;
}
@media (max-width: 768px) {
  .menu-wrap {
    width: 63px;
  }
  .menu-wrap .el-submenu__title span {
    display: none;
  }
}
</style>
