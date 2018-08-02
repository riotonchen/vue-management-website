<template>
  <div class="head-wrap">
    <el-container class="container">
      <el-aside width="210px">
        <div class="head-logo">
          <img src="/static/img/logo.png">
        </div>
      </el-aside>
      <el-main>
        <div class="head-title">
          <span class="menu-font">{{ selectedMenu }}</span>
        </div>
        <div class="head-icon">
          <img src="/static/img/avatar.png">
        </div>
        <div class="head-icon">
          <el-tooltip class="item"
                      effect="dark"
                      content="登出"
                      placement="bottom">
            <i class="el-icon-menuicon-logout"
               @click="logout"></i>
          </el-tooltip>
        </div>
        <div class="head-icon">
          <el-tooltip class="item"
                      effect="dark"
                      content="帮助"
                      placement="bottom">
            <i class="el-icon-menuicon-question-circle"></i>
          </el-tooltip>
        </div>
        <div class="head-icon">
          <el-tooltip class="item"
                      effect="dark"
                      content="刷新"
                      placement="bottom">
            <i class="el-icon-menuicon-reload"
               @click="refresh"></i>
          </el-tooltip>
        </div>
        <!-- <div class="head-icon">
          <el-tooltip class="item"
                      effect="dark"
                      content="用户"
                      placement="bottom">
            <i class="el-icon-menuicon-user1"></i>
          </el-tooltip>
        </div> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
    selectedMenu () {
      return this.$route.name
    }
  },
  methods: {
    refresh () {
      location.reload()
    },
    logout () {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('password')
      this.$router.push({
        path: '/login'
      })
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="">
.head-wrap {
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #f2f6fc;
  border-bottom: 1px solid #dcdfe6;
}
.head-wrap .container {
  height: 60px;
}
.head-wrap .container .el-aside {
  overflow: hidden !important;
}
.head-wrap .container .head-logo img {
  height: 40px;
  margin: 10px 20px;
}
.head-wrap .container .head-title {
  padding: 0 20px;
  float: left;
}
.head-wrap .container .head-title span {
  font-size: 1.5rem;
}
.head-wrap .container .el-main {
  padding: 0 !important;
  overflow: hidden !important;
  line-height: 60px;
}
.head-wrap .container .el-main .head-icon {
  float: right;
  margin-right: 20px;
  color: #737373;
}
.head-wrap .container .el-main .head-icon i {
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
  vertical-align: middle;
}
.head-wrap .container .el-main .head-icon img {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 20px 0 10px;
  vertical-align: middle;
}
@media (max-width: 768px) {
  .head-wrap {
    background-color: #4285f4;
  }
  .head-wrap .container .el-aside,
  .head-wrap .container .head-title {
    display: none;
  }
  .head-wrap .container .el-main .head-icon {
    float: left;
  }
  .head-wrap .container .el-main .head-icon i {
    color: #fff;
  }
}
</style>
