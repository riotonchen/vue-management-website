<template>
  <div class="col-md-12">
    <el-table ref="multipleTable"
              :data="table_migration"
              tooltip-effect="dark"
              style="width: 100%"
              max-height="500"
              @selection-change="changeSelection">
      <el-table-column type="selection"
                       width="30"
                       align="center"></el-table-column>
      <el-table-column v-for="col in cols"
                       :key="col.propName"
                       :prop="col.propName"
                       :label="col.labelName"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="operation"
                       label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button v-for="btn in operatBtns"
                     :key="btn.operate"
                     @click.native.prevent="btnOperate(btn.operate, scope.$index, scope.row)"
                     type="text"
                     size="small">{{ btn.name }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      cols: [{
        propName: 'name',
        labelName: '名称'
      },
      {
        propName: 'status',
        labelName: '状态'
      },
      {
        propName: 'workMachine',
        labelName: '工作机'
      },
      {
        propName: 'disMachine',
        labelName: '灾备机'
      },
      {
        propName: 'owner',
        labelName: '所有者'
      }],
      operatBtns: [{
        name: '启动',
        operate: 'start'
      }, {
        name: '停止',
        operate: 'stop'
      }, {
        name: '删除',
        operate: 'delete'
      }],
      table_migration: [{
        name: '迁移任务1',
        status: '迁移完成',
        workMachine: '192.168.1.1',
        disMachine: '192.168.1.2',
        owner: 'sys'
      }, {
        name: '迁移任务2',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }, {
        name: '迁移任务3',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }, {
        name: '迁移任务4',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }, {
        name: '迁移任务5',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }, {
        name: '迁移任务6',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }, {
        name: '迁移任务7',
        status: '迁移失败',
        workMachine: '192.168.2.1',
        disMachine: '192.168.2.2',
        owner: 'admin'
      }]
    }
  },
  watch: {},
  computed: {},
  methods: {
    changeSelection () {

    },
    btnOperate (operatBtn, index, row) {
      switch (operatBtn) {
        case 'start':
          console.log('start' + ' row ' + index + '-----' + JSON.stringify(row))
          break
        case 'stop':
          console.log('stop' + ' row ' + index + '-----' + JSON.stringify(row))
          break
        case 'delete':
          console.log('delete' + ' row ' + index + '-----' + JSON.stringify(row))
          break
        default:
          break
      }
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="">
</style>
