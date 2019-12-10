/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  调拨单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible="visible"
    @close="close"
    :title="`调拨单-${code}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          v-if="detailForm.allocationOrderState == 2 && detailForm.allocationOrderState != -1 && authorityButtons.includes('psi_wms_allocation_05')"
          @click="backVisible=true,isComponents = 'scanInCode',dialogData.title = '调入扫码'"
          size="mini"
          type="primary"
        >调入扫码</el-button>
        <el-button
          v-if="(outNum < outAllNum) && detailForm.allocationOrderState != -1 && authorityButtons.includes('psi_wms_allocation_04')"
          @click="backVisible=true,isComponents = 'scanOutCode',dialogData.title = '调出扫码'"
          size="mini"
          type="primary"
        >调出扫码</el-button>
        <el-button
          v-if="detailForm.allocationOrderState == 1 && authorityButtons.includes('psi_wms_allocation_06')"
          @click="wmsallocationorderUpdateOrderState('-1')"
          size="mini"
          type="primary"
        >终止</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form
            :model="detailForm"
            ref="detailForm"
          >
            <allocationInfo
              :disabled='true'
              :form='detailForm'
            />
            <goodsAllocation :form='detailForm' />

            <el-dialog
              :visible.sync="backVisible"
              :title="dialogData.title"
              v-if="backVisible"
              v-dialogDrag
            >
              <components
                @reload='reload'
                :dialogData='data'
                :is='isComponents'
                :visible.sync="backVisible"
              >
              </components>
            </el-dialog>

          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import allocationInfo from '@/components/formComponents/allocation-info'
import goodsAllocation from '@/components/formComponents/goods-allocation';
import SideDetail from '@/components/side-detail';
import scanOutCode from './scan-out-code';
import scanInCode from './scan-in-code';
export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      backVisible: false,
      isComponents: '',
      dialogData: {
        title: ''
      },
      detailForm: {

      },
      outNum: 0,//目前调出数量的和
      outAllNum: 0,//所有应该调出的数量和
    };
  },
  components: {
    allocationInfo,
    goodsAllocation,
    SideDetail,
    scanOutCode,
    scanInCode
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    getNum(list) {
      this.outNum = 0
      this.outAllNum = 0
      list.forEach((item) => {
        this.outNum = this.outNum + (item.outAccomplishNum || 0)
        this.outAllNum = this.outAllNum + (item.num || 0)
      })
    },
    //查看调拨单详情
    wmsallocationorderInfo() {
      this.$api.seePsiWmsService.wmsallocationorderInfo(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = res.data.createTime
          this.status[1].value = res.data.creatorName
          this.status[2].value = res.data.deptName
          this.status[3].value = res.data.source
          if (this.detailForm.allocationCommodityList && this.detailForm.allocationCommodityList.length > 0) {
            this.getNum(this.detailForm.allocationCommodityList)
          }
          this.data = JSON.parse(JSON.stringify(this.detailForm))
          this.data.allocationCommodityList.forEach((item) => {
            this.$set(item, 'snCode', '')
          })
        })
        .finally(() => {

        })
    },
    //点击终止
    wmsallocationorderUpdateOrderState() {
      this.$confirm('是否终止当前调拨单?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsallocationorderUpdateOrderState({ allocationOrderState: '-1', id: this.detailForm.id })
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
      });

    },
    reload() {
      this.wmsallocationorderInfo()
      this.$emit('reload')
    }
  },

}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
