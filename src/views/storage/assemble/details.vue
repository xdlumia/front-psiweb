/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装单 详情组件
 */
<template>
  <SideDetail
    v-loading="loading"
    :status="status"
    :visible="visible"
    @close="$emit('update:visible',false)"
    :title="`组装单-${codeSlice(detailForm.assembleOrderCode)}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <!-- {value == 0 ? '未开始' : value == 1 ? '待执行' : value == 2 ? '部分完成' : value == 3 ? '已完成' : value == -1 ? '终止' : '' -->
        <!-- && detailForm.generateOrder> 0  -->
        <!-- && detailForm.undistributedNum > 0 -->
        <el-button
          v-if="detailForm.assembleOrderState !== 3 && detailForm.assembleOrderState !== -1 && authorityButtons.includes('psi_wms_assemble_03') && detailForm.undistributedNum > 0"
          type="primary"
          size='mini'
          @click="taskVisible = true"
        >
          生成拣货单和组装任务</el-button>
        <el-button
          v-if="detailForm.assembleOrderState !== 3 && detailForm.assembleOrderState !== -1  && authorityButtons.includes('psi_wms_assemble_08')"
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
          <FullscreenWrap v-if="activeName == 'storagePicking'">
            <storagePicking
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
            ></storagePicking>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="组装任务"
          name="storageAssembly"
        >
          <FullscreenWrap v-if="activeName == 'storageAssembly'">
            <storageAssembly
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
            ></storageAssembly>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="销售单"
          name="storageSales"
        >
          <FullscreenWrap v-if="activeName == 'storageSales'">
            <storageSales
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.assembleOrderCode}"
            ></storageSales>
          </FullscreenWrap>
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
      status: [{ label: '组装状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      taskVisible: false,
      addVisible: false,
      loading: false,
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
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查看详情
    wmsassembleorderInfo() {
      this.loading = true
      this.$api.seePsiWmsService.wmsassembleorderGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.assembleOrderState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
        })
        .finally(() => {
          this.loading = false
        })
    },
    reload() {
      this.wmsassembleorderInfo()
      this.$emit('reload')
    },
    fStop() {
      this.$confirm('确认终止当前组装单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsassembleorderTermination(null, this.detailForm.assembleOrderCode)
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
