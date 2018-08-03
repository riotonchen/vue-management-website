<template>
    <div class="new-task">
        <el-tabs v-model="activeTab"
                 @tab-click="handleClick">
            <el-tab-pane label="基本设置"
                         name="basic">
                <el-form status-icon
                         :model="bascForm"
                         ref="bascForm"
                         size="mini"
                         label-width="100px">
                    <el-form-item label="任务名称："
                                  prop="name"
                                  :rules="$validateRules({ required: true, requiredItem: '任务名称' })">
                        <el-input v-model="bascForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="迁移类型："
                                  prop="migrationType"
                                  :rules="$validateRules({ required: true, requiredItem: '迁移类型' })">
                        <el-select v-model="bascForm.migrationType"
                                   placeholder="请选择迁移类型">
                            <el-option label="整机迁移"
                                       value="whole"></el-option>
                            <el-option label="系统迁移"
                                       value="sys"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工作机："
                                  prop="workMachine"
                                  :rules="$validateRules({ required: true, requiredItem: '工作机' })">
                        <el-select v-model="bascForm.workMachine"
                                   placeholder="请选择工作机">
                            <el-option label="192.168.1.1"
                                       value="192.168.1.1"></el-option>
                            <el-option label="192.168.2.2"
                                       value="192.168.2.2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="灾备机："
                                  prop="disMachine"
                                  :rules="$validateRules({ required: true, requiredItem: '灾备机' })">
                        <el-select v-model="bascForm.disMachine"
                                   placeholder="请选择灾备机">
                            <el-option label="192.168.3.3"
                                       value="192.168.3.3"></el-option>
                            <el-option label="192.168.4.4"
                                       value="192.168.4.4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="同步项："
                                  prop="syncItem"
                                  :rules="$validateRules({ required: true, requiredItem: '同步项' })">
                        <el-checkbox v-model="bascForm.syncItem">C</el-checkbox>
                    </el-form-item>
                    <el-form-item class="bascForm-sync-item">
                        <el-table class="bascForm-sync-table"
                                  ref="bascForm_sync_table"
                                  :data="netForm.table_NICMapping"
                                  tooltip-effect="dark"
                                  max-height="500">
                            <el-table-column prop="workMachineNIC"
                                             :label="'工作机源目录和文件' + '(' + bascForm.workMachine + ')'"
                                             align="center"
                                             :render-header="syncTableHeadRender">
                            </el-table-column>
                            <el-table-column :label="'工作机源目录和文件' + '(' + bascForm.disMachine + ')'"
                                             align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.disMachineNIC"
                                               placeholder="请选择灾备机网卡">
                                        <el-option label="本地连接"
                                                   value="localConnect"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="网络设置"
                         name="net">
                <el-form status-icon
                         :model="netForm"
                         ref="netForm"
                         size="mini"
                         label-position="top"
                         label-width="80px">
                    <el-form-item label="网络迁移配置："
                                  prop="network"
                                  :rules="$validateRules({ required: true, requiredItem: '网络迁移配置' })">
                        <el-radio-group v-model="netForm.network">
                            <el-radio class="wrap-radio"
                                      label="LAN">将工作机的网络配置同步到灾备机(局域网(LAN)推荐该选项)</el-radio>
                            <el-radio class="wrap-radio"
                                      label="WAN">保留灾备机的网络设置，即不同步工作机的网络配置(广域网(WAN)推荐该选项)</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="网卡映射："
                                  :rules="$validateRules({ required: true, requiredItem: '网卡映射' })">
                        <el-table class="netForm-NICMapping-table"
                                  ref="netForm_NICMapping_table"
                                  :data="netForm.table_NICMapping"
                                  tooltip-effect="dark"
                                  max-height="500">
                            <el-table-column prop="workMachineNIC"
                                             label="工作机网卡"
                                             align="center">
                            </el-table-column>
                            <el-table-column label="灾备机网卡"
                                             align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.disMachineNIC"
                                               placeholder="请选择灾备机网卡">
                                        <el-option label="本地连接"
                                                   value="localConnect"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="迁移设置"
                         name="migration">
                <el-form status-icon
                         :model="migrationForm"
                         ref="migrationForm"
                         size="mini"
                         label-position="top"
                         label-width="80px">
                    <el-form-item prop="switch">
                        <el-radio class="wrap-radio"
                                  v-model="migrationForm.switch"
                                  label="manualSwitch">完成系统和数据同步之后，继续监控和同步数据，等待用户手工切换</el-radio>
                        <el-radio class="wrap-radio"
                                  v-model="migrationForm.switch"
                                  label="autoSwitch"
                                  disabled>完成系统和数据同步之后，自动切换到灾备机</el-radio>
                    </el-form-item>
                    <el-form-item prop="autoClose">
                        <el-checkbox v-model="migrationForm.autoClose">切换到灾备机（重启备机）时，自动关闭工作机</el-checkbox>
                    </el-form-item>
                    <el-form-item prop="MSCS">
                        <el-checkbox v-model="migrationForm.MSCS">MSCS支持</el-checkbox>
                    </el-form-item>
                    <el-form-item label="错误处理方式："
                                  prop="errorHandle"
                                  :rules="$validateRules({ required: true, requiredItem: '错误处理方式' })">
                        <el-radio-group v-model="migrationForm.errorHandle">
                            <el-radio class="wrap-radio"
                                      label="stopSyncing">遇到错误，立即停止同步</el-radio>
                            <el-radio class="wrap-radio"
                                      label="logAndSyncing">遇到错误，写入日志并继续同步</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="compression">
                        <el-checkbox v-model="migrationForm.compression.isTrue">压缩</el-checkbox>
                        <el-radio-group class="pdleft-30"
                                        disabled
                                        v-model="migrationForm.compression.level">
                            <el-radio label="low">低</el-radio>
                            <el-radio label="medium">中</el-radio>
                            <el-radio label="high">高</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <el-button type="primary"
                   size="small"
                   style="margin:30px 0 20px 0">提交</el-button>
        <el-button size="small"
                   @click="backToTasks">返回</el-button>
        <el-dialog title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose"
                   append-to-body="true">
            <span>这是一段信息</span>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      dialogVisible: false,
      // 默认选中的tab
      activeTab: 'basic',
      // 基本设置表单
      bascForm: {
        name: '', // 迁移任务名称
        migrationType: '', // 迁移类型
        workMachine: '', // 工作机
        disMachine: '', // 灾备机
        syncItem: true
      },
      // 网络设置表单
      netForm: {
        network: 'LAN', // 网络迁移配置（lan：同步网络配置/wan：不同步网络配置）
        // 网卡映射表
        table_NICMapping: [{
          workMachineNIC: '本地连接 192.168.1.11/255.255.0.0', // 工作机网卡
          disMachineNIC: 'localConnect' // 灾备机网卡
        }]
      },
      // 迁移设置表单
      migrationForm: {
        switch: 'manualSwitch', // 数据同步完的切换方式（手动/自动）
        autoClose: false, // 切换到灾备机（重启备机）时，是否自动关闭工作机
        MSCS: false, // 是否支持MSCS
        // 错误处理方式：
        // stopSyncing：遇到错误，立即停止同步
        // logAndSyncing：遇到错误，写入日志并继续同步
        errorHandle: 'stopSyncing',
        // 压缩处理
        compression: {
          isTrue: false, // 是否压缩
          level: 'low' // 压缩等级（低/中/高）
        }
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    syncTableHeadRender (h, { column, $index }) {
      return [h('span', column.label),
        h('el-button',
          {
            class: 'el-button--text',
            style: 'float:right',
            on: {
              click: () => { this.dialogVisible = true }
            }
          }, '添加')]
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    backToTasks () {
      this.$emit('back')
    },
    handleClick () { }
  },
  created () { },
  mounted () { }
}
</script>
<style>
.new-task .el-form {
  margin: 15px 15px;
}
.new-task .el-input {
  width: 217px;
}
.new-task .wrap-radio {
  width: 100%;
  margin: 10px 0;
}
.pdleft-30 {
  padding-left: 30px;
}
.bascForm-sync-item .el-form-item__content {
  margin-left: 0 !important;
}
.netForm-NICMapping-table {
  width: 500px;
}
</style>
