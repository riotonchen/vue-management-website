<template>
    <el-dialog title="服务器迁移检查列表"
               width="700px"
               :visible.sync="checkResult.show"
               append-to-body>
        <span slot="footer"
              class="dialog-footer">
            <el-button size="small"
                       type="success"
                       @click="resubmit">重新检查</el-button>
            <el-button size="small"
                       @click="checkResult.show = false">取消</el-button>
            <el-button size="small"
                       type="primary"
                       @click="checkResult.show = false">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  components: {},
  props: { checkResult: Object },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    resubmit () {
      this.$emit('resubmit')
      this.checkResult.show = false
    }
  },
  created () { },
  mounted () { }
}
</script>
<style>
</style>
