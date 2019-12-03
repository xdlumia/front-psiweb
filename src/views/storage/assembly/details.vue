/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible="visible"
    @close="close"
    :title="`组装任务-${detailForm.assembleTaskCode}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          v-if="detailForm.assembleTaskState == 0 && detailForm.assembleTaskState !=-1"
          @click="wmsassembletaskStart"
          size="mini"
          type="primary"
        >确认收到并开始</el-button>
        <el-button
          v-if="detailForm.assembleTaskState !== -1 && detailForm.assembleTaskState !== 3"
          @click="wmsassembletaskTransferTask"
          size="mini"
          type="primary"
        >转移</el-button>
        <el-button
          v-if="(detailForm.isHang == 0 || !detailForm.isHang) && detailForm.assembleTaskState != -1 && detailForm.assembleTaskState !== 3"
          @click="wmsdisassemblytaskHangTask"
          size="mini"
          type="primary"
        >挂起</el-button>
        <el-button
          v-if="detailForm.isHang == 1 && detailForm.assembleTaskState != -1 && detailForm.assembleTaskState !== 3"
          @click="wmsassembletaskContinueTask"
          size="mini"
          type="primary"
        >继续</el-button>
        <el-button
          v-if="(detailForm.assembleTaskState == 1 || detailForm.assembleTaskState == 2) && detailForm.isHang==0 && detailForm.assembleTaskState != -1"
          @click="goodsVisible=true"
          size="mini"
          type="primary"
        >组装</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <goodsAssemble
              :data='detailForm'
              :drawerData='data'
              @reload="reload"
            />
            <assemblyInfo :data='detailForm' />
            <assembledGoodsChoose
              :visible.sync='goodsVisible'
              :data='detailForm'
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="组装单"
          name="storageAssemble"
        >
          <FullscreenWrap v-if="activeName == 'storageAssemble'">
            <storageAssemble
              :button="false"
              v-if="activeName == 'storageAssemble'"
              :params="{page:1,limit:15,relationCode:detailForm.assembleTaskCode}"
            ></storageAssemble>
          </FullscreenWrap>
        </el-tab-pane>
      </el-tabs>
    </div>
    <transfer
      :visible.sync='transferVisible'
      :data="detailForm"
      @reload="reload"
    />
    <hangUp
      :visible.sync='hangVisible'
      v-if="hangVisible"
      :data="detailForm"
      @reload="reload"
    />
  </SideDetail>

</template>
<script> 
import goodsAssemble from '@/components/formComponents/goods-assemble'
import assemblyInfo from '@/components/formComponents/assembly-info';
import transfer from '@/components/formComponents/transfer';
import hangUp from './hang-up';
import assembledGoodsChoose from '@/components/formComponents/assembled-goods-choose';
import SideDetail from '@/components/side-detail';

export default {
  props: ['data', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '组装状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      transferVisible: false,//转移
      hangVisible: false,//挂起
      goodsVisible: false,//组装
      activeName: '',
      state: {
        '-1': '终止',
        0: '未开始',
        1: '待组装',
        2: '部分组装',
        3: '完成组装'
      },
      detailForm: {}
    };
  },
  components: {
    goodsAssemble,
    assemblyInfo,
    assembledGoodsChoose,
    SideDetail,
    transfer,
    hangUp,
  },
  mounted() {
    this.wmsassembleorderInfo()
  },
  methods: {
    //查看详情
    wmsassembleorderInfo() {
      this.$api.seePsiWmsService.wmsassembletaskGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.assembleTaskState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
        })
        .finally(() => {

        })
    },
    reload() {
      this.wmsassembleorderInfo()
      this.$emit('reload')
    },
    close() {
      this.$emit('update:visible', false)
    },
    //确认并开始组装任务
    wmsassembletaskStart() {
      this.$confirm('确认收到并开始组装任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsassembletaskStart(null, this.data.id)
          .then(res => {
            this.reload()
          })
          .finally(() => {

          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    //挂起
    wmsdisassemblytaskHangTask() {
      this.hangVisible = true
    },
    //转移
    wmsassembletaskTransferTask() {
      this.transferVisible = true
    },
    //继续
    wmsassembletaskContinueTask() {
      this.$confirm('是否继续组装任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsassembletaskContinueTask({ id: this.detailForm.id, isHang: 0 })
          .then(res => {
            this.reload()
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
