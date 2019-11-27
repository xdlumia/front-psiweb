/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装单 详情组件
 */
<template>
  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    :title="`组装单-${detailForm.assembleOrderCode}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          type="primary"
          size='mini'
          @click="taskVisible = true"
        >
          生成拣货单和组装任务</el-button>
        <el-button
          type="primary"
          size='mini'
          :visible='addVisible'
          @click='fStop'
        >终止</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <assembleNoedit
              :data='detailForm'
              :drawerData='data'
            />
            <assembleInfo
              :disabled='true'
              :data='detailForm'
            />
            <assemblyTask
              :visible.sync='taskVisible'
              v-if="taskVisible"
              :data='detailForm'
              @reload='reload'
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="拣货单"
          name="storagePicking"
        >
          <storagePicking
            v-if="activeName == 'storagePicking'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
          ></storagePicking>
        </el-tab-pane>
        <el-tab-pane
          label="组装任务"
          name="storageAssembly"
        >
          <storageAssembly
            v-if="activeName == 'storageAssembly'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
          ></storageAssembly>
        </el-tab-pane>
        <el-tab-pane
          label="销售单"
          name="storageSales"
        >
          <storageSales
            v-if="activeName == 'storageSales'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
          ></storageSales>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>
</template>
<script>
import assembleNoedit from '@/components/formComponents/assemble-noedit'
import assembleInfo from '@/components/formComponents/assemble-info';
import assemblyTask from './assembly-task';
import SideDetail from '@/components/side-detail';
export default {
  props: ['data', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '组装状态', value: '待拆卸' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      taskVisible: false,
      addVisible: false,
      activeName: '',
      state: {
        '-1': '终止',
        '0': '未开始',
        '1': '待执行',
        '2': '部分完成',
        '3': '已完成',
      },
      detailForm: {}
    };
  },
  components: {
    assembleNoedit,
    assembleInfo,
    assemblyTask,
    SideDetail
  },
  mounted() {
    this.wmsassembleorderInfo()
  },
  methods: {
    //查看详情
    wmsassembleorderInfo() {
      this.$api.seePsiWmsService.wmsassembleorderGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.assembleOrderState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    reload() {
      this.$emit('reload')
    },
    fStop() {
      this.$confirm('确认终止当前组装单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsassembleorderTermination(null, this.detailForm.id)
          .then(res => {
            this.reload()
            this.wmsassembleorderInfo()
          })
          .finally(() => {

          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
