<template>
    <div class="">
        <el-button type="primary"
                   size="small"
                   style="margin:30px 0 20px 0"
                   @click="backToTasks">返回</el-button>
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
  watch: {},
  computed: {},
  methods: {
    backToTasks () {
      this.$emit('back')
    }
  },
  created () { },
  mounted () { }
}
</script>
<style>
</style>
