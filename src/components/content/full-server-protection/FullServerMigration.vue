<template>
  <div class="col-md-12">
    <el-card :class="showTasks ? 'tasks-card' : ''">
      <div slot="header"
           class="mg-header">{{ header }}</div>
      <div v-show="showTasks">
        <el-table ref="migration_table"
                  :data="table_migration"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="500"
                  header-cell-class-name="header-cell"
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
                           width="300"
                           align="center">
            <template slot-scope="scope">
              <el-button v-for="btn in operatBtns"
                         :class="btn.class ? btn.class : 'table-btn'"
                         :type="btn.type"
                         :key="btn.operate"
                         :icon="btn.icon"
                         :title="btn.name"
                         size="mini"
                         circle
                         @click.native.prevent="btnOperate(btn.operate, scope.$index, scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary"
                   size="small"
                   style="margin:30px 0 20px 20px"
                   @click="showTasks = false;header = '新建迁移任务'">新建</el-button>
        <el-button type="danger"
                   size="small">删除</el-button>
        <el-button type="success"
                   size="small">启动</el-button>
        <el-button type="warning"
                   size="small">停止</el-button>
        <el-button type="info"
                   size="small">刷新</el-button>
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
          width: 80
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
          operate: 'start',
          type: 'primary',
          icon: 'el-icon-menuicon-start'
        }, {
          name: '停止',
          operate: 'stop',
          type: 'warning',
          icon: 'el-icon-menuicon-icon--'
        }, {
          name: '删除',
          operate: 'delete',
          type: 'danger',
          icon: 'el-icon-delete'
        }, {
          name: '查看',
          operate: 'view',
          type: 'info',
          icon: 'el-icon-view'
        }, {
          name: '迁移',
          operate: 'migration',
          type: 'success',
          icon: 'el-icon-menuicon-swap'
        }, {
          name: '重启',
          operate: 'restart',
          class: 'table-btn restart-btn',
          icon: 'el-icon-menuicon-reload'
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
        case 'view':
          console.log('view' + ' row ' + index + '-----' + JSON.stringify(row))
          this.view(index, row)
          break
        case 'migration':
          console.log('migration' + ' row ' + index + '-----' + JSON.stringify(row))
          this.migration(index, row)
          break
        case 'restart':
          console.log('restart' + ' row ' + index + '-----' + JSON.stringify(row))
          this.restart(index, row)
          break
        default:
          break
      }
    },
    start (index, row) { },
    stop (index, row) { },
    delete (index, row) { },
    view (index, row) { },
    migration (index, row) { },
    restart (index, row) { }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="">
.tasks-card .el-card__body {
  padding: 20px 0;
}
.mg-header {
  font-size: 18px;
  font-weight: 600;
}
.table-btn i {
  font-size: 12px;
}
.restart-btn:focus,
.restart-btn:hover {
  background: #a58fe2;
  border-color: #a58fe2;
  color: #fff;
}
.restart-btn,
.restart-btn:active {
  color: #fff;
  background: #8f75da;
  border-color: #8f75da;
  outline: 0;
}
.header-cell {
  font-family: 'menufont' !important;
  font-weight: 400;
  font-size: 15px;
}

/* .el-table .failed-row {
  background: #f39d9d85;
}

.el-table .success-row {
  background: #b2e499ba;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: inherit !important;
} */
</style>
