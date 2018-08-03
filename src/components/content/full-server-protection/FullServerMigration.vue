<template>
  <div class="col-md-12">
    <el-card>
      <div slot="header"
           class="mg-header">{{ header }}</div>
      <div v-show="showTasks">
        <el-table ref="migration_table"
                  :data="table_migration"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="500"
                  :row-class-name="tableRowClassName"
                  @selection-change="changeSelection">
          <el-table-column v-for="col in cols"
                           :type="col.type"
                           :width="col.width"
                           :key="col.propName"
                           :prop="col.propName"
                           :label="col.labelName"
                           :sortable="col.sortable"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
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
        <el-button type="primary"
                   size="small"
                   style="margin:30px 0 20px 0"
                   @click="showTasks = false;header = '新建迁移任务'">新建</el-button>
        <el-button type="danger"
                   size="small">删除</el-button>
        <el-button type="primary"
                   size="small">启动</el-button>
        <el-button type="primary"
                   size="small">停止</el-button>
      </div>
      <migration-task v-if="!showTasks"
                      @back="showTasks = true;header = '迁移任务'"></migration-task>
    </el-card>
  </div>
</template>

<script>
import migrationTask from '@/components/content/full-server-protection/NewMigrationTask'
export default {
  components: { migrationTask },
  props: {},
  data () {
    return {
      header: '迁移任务',
      showTasks: true,
      cols: [
        {
          type: 'selection',
          width: 30
        },
        {
          propName: 'name',
          labelName: '名称',
          sortable: true
        },
        {
          propName: 'status',
          labelName: '状态',
          sortable: true
        },
        {
          propName: 'workMachine',
          labelName: '工作机',
          sortable: true
        },
        {
          propName: 'disMachine',
          labelName: '灾备机',
          sortable: true
        },
        {
          propName: 'owner',
          labelName: '所有者',
          sortable: true
        }
      ],
      operatBtns: [
        {
          name: '启动',
          operate: 'start'
        }, {
          name: '停止',
          operate: 'stop'
        }, {
          name: '删除',
          operate: 'delete'
        }],
      table_migration: [
        {
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
          status: '迁移完成',
          workMachine: '192.168.2.1',
          disMachine: '192.168.2.2',
          owner: 'admin'
        }, {
          name: '迁移任务6',
          status: '迁移失败',
          workMachine: '192.168.2.1',
          disMachine: '192.168.2.2',
          owner: 'admin'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === '迁移完成') {
        return 'success-row'
      } else if (row.status === '迁移失败') {
        return 'failed-row'
      }
      return ''
    },
    changeSelection () {

    },
    btnOperate (operatBtn, index, row) {
      switch (operatBtn) {
        case 'start':
          console.log('start' + ' row ' + index + '-----' + JSON.stringify(row))
          this.start(index, row)
          break
        case 'stop':
          console.log('stop' + ' row ' + index + '-----' + JSON.stringify(row))
          this.stop(index, row)
          break
        case 'delete':
          console.log('delete' + ' row ' + index + '-----' + JSON.stringify(row))
          this.delete(index, row)
          break
        default:
          break
      }
    },
    start (index, row) { },
    stop (index, row) { },
    delete (index, row) { }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="">
.mg-header {
  font-size: 18px;
  font-weight: 600;
}
.el-table .failed-row {
  background: #f39d9d85;
}

.el-table .success-row {
  background: #b2e499ba;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: inherit !important;
}
</style>
