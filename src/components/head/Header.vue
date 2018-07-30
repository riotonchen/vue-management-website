<template>
  <div class="head-wrap">
    <el-container class="container">
      <el-aside width="230px">
        <div class="head-logo">
          <img src="/static//img/logo.png"
               alt="">
        </div>
      </el-aside>
      <el-main>
        <div class="head-title">
          <span>{{ selectedMenu }}</span>
        </div>
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
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="">
.head-wrap {
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
}
.head-wrap .container {
  height: 80px;
}
.head-wrap .container .el-aside {
  overflow: hidden !important;
}
.head-wrap .container .head-logo img {
  height: 40px;
  margin: 20px 20px;
}
.head-wrap .container .head-title {
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 40px;
  color: #404040;
}
@media (max-width: 768px) {
  .head-wrap {
    background-color: #4285f4;
  }
  .head-wrap .container .el-aside {
    display: none;
  }
  .head-wrap .container .head-title {
    color: #fff;
  }
}
</style>
