/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  销售单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    :title="'销售单-' + data.salesSheetCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
        >发货</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form size="mini">
            <goodsExported :detailForm='detailForm' />
            <deliverInfo
              :data='detailForm.salesQuotationEntity'
              :disabled='true'
            />
            <generateDeliver
              :visible.sync='orderStorageVisible'
              :form='detailForm'
              v-if="orderStorageVisible"
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="拣货单">
          <storagePicking
            :button="false"
            :params="{page:1,limit:15,salesSheetCode:detailForm.salesSheetCode}"
          ></storagePicking>
        </el-tab-pane>
        <el-tab-pane label="组装任务">
          <storageAssembly
            :button="false"
            :params="{page:1,limit:15,salesSheetCode:detailForm.salesSheetCode}"
          ></storageAssembly>
        </el-tab-pane>
        <el-tab-pane label="发货单">
          <storageDeliver
            :button="false"
            :params="{page:1,limit:15,salesSheetCode:detailForm.salesSheetCode}"
          ></storageDeliver>
        </el-tab-pane>
        <el-tab-pane label="销售出库单">
          <salesOutLibrary
            :button="false"
            :params="{page:1,limit:15,salesSheetCode:detailForm.salesSheetCode}"
          ></salesOutLibrary>
        </el-tab-pane>
        <el-tab-pane label="借入单">
          <orderBorrow
            :button="false"
            :params="{page:1,limit:15,borrowLoanType:0,salesSheetCode:detailForm.salesSheetCode}"
          ></orderBorrow>
        </el-tab-pane>
        <el-tab-pane label="应收账单">
          <financeReceivable :button="false"></financeReceivable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import goodsExported from '@/components/formComponents/goods-exported'
//这里直接用公共的了
// import shipInfo from '@/components/formComponents/ship-info';
import deliverInfo from '@/components/formComponents/deliver-info';
import generateDeliver from './generate-deliver';
import SideDetail from '@/components/side-detail';
export default {
  props: ['data', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '出库状态', value: '待出库' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      orderStorageVisible: false,
      detailForm: {},
    };
  },
  components: {
    goodsExported,
    deliverInfo,
    generateDeliver,
    SideDetail
  },
  created() {

  },
  mounted() {
    this.salessheetInfo()
  },
  methods: {
    //查询详情  
    salessheetInfo() {
      this.$api.seePsiSaleService.salessheetGetInfoByCode({ code: this.code })
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.deliverState == 0 ? '待发货' : this.detailForm.deliverState == 1 ? '完成发货' : this.detailForm.deliverState == 2 ? '终止' : ''
          this.status[1].value = this.detailForm.createTime
          this.status[2].value = this.detailForm.creator
          this.status[3].value = this.detailForm.deptName
          this.status[4].value = this.detailForm.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
