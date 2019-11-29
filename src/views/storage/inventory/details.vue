/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  盘点单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="close"
    :title="'盘点单-'+drawerData.blitemCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          v-if="detailForm.blitemState == 1"
          @click="clickFinish"
          size="mini"
          type="primary"
        >完成盘点</el-button>
        <el-button
          v-if="detailForm.blitemState == 1"
          @click="fStop"
          size="mini"
          type="primary"
        >终止</el-button>
        <el-button
          v-if="detailForm.isLose == 1"
          @click="changeReportingVisible(2)"
          size="mini"
          type="primary"
        >生成报损单</el-button>
        <el-button
          v-if="detailForm.isProfit == 1"
          @click="changeReportingVisible(1)"
          size="mini"
          type="primary"
        >生成报溢单</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <inventoryInfo
              :disabled='true'
              :addform='detailForm'
            />
            <goodsInventory
              :data='detailForm'
              ref='goodsInventory'
            />
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <reportingGenerate
      :visible.sync='reportingVisible'
      :data='detailForm'
      @reload='reload'
      v-if='reportingVisible'
      :type='type'
    />
  </SideDetail>

</template>
<script>
import inventoryInfo from '@/components/formComponents/inventory-info'
import goodsInventory from '@/components/formComponents/goods-inventory';
import SideDetail from '@/components/side-detail';
import reportingGenerate from './reporting-generate'//生成报溢报损单
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '盘点状态', value: '-' }, { label: '创建时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      backVisible: false,
      reportingVisible: false,
      isComponents: '',
      type: 0,
      dialogData: {
        title: ''
      },
      detailForm: {

      }
    };
  },
  components: {
    inventoryInfo,
    goodsInventory,
    SideDetail,
    reportingGenerate
  },
  mounted() {
    this.wmsreportinglossesInfo()
  },
  methods: {
    wmsreportinglossesInfo() {
      this.$api.seePsiWmsService.wmsblitemInfo(null, this.drawerData.id)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.blitemState == 1 ? '进行中' : '盘点完成'
          this.status[1].value = this.detailForm.createTime
          this.status[2].value = this.detailForm.creatorName
          this.status[3].value = this.detailForm.deptName
          this.status[4].value = this.detailForm.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    changeReportingVisible(type) {
      this.type = type
      this.reportingVisible = true
    },
    close() {
      this.$emit('update:visible', false)
    },
    reload() {
      this.$emit('reload')
      this.close()
    },
    //终止
    fStop() {
      this.$confirm('确定终止当前盘点单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsblitemUpdateState({ id: this.detailForm.id })
          .then(res => {
            this.$emit('reload')
            this.wmsreportinglossesInfo()
          })
          .finally(() => {

          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //完成盘点
    clickFinish() {
      let isCan = this.detailForm.commodityCodeList.every((item) => {
        return item.commodityInfoList && item.commodityInfoList.length > 0
      })
      if (isCan) {
        this.$confirm('确定完成盘点吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            blitemId: this.detailForm.id,
            commodityList: this.detailForm.commodityCodeList
          }
          this.$api.seePsiWmsService.wmsblitemStart(params)
            .then(res => {
              this.$emit('reload')
              this.wmsreportinglossesInfo()
            })
            .finally(() => {

            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.$message({
          type: 'error',
          message: '请扫码添加完毕所有盘点商品！'
        })
      }
    },
  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
