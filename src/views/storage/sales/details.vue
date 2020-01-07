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
    :visible="visible"
    @close="$emit('update:visible',false)"
    :title="`销售单-${codeSlice(detailForm.salesSheetCode)}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
          v-if="detailForm.deliverState === 0 && authorityButtons.includes('psi_wms_sales_04')"
        >发货</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form
            size="mini"
            :model="detailForm.salesQuotationEntity"
            ref="form"
            v-if='detailForm'
          >
            <goodsExported
              v-if='detailForm'
              :detailForm='detailForm'
              :code='code'
            />
            <deliverInfo
              :data='detailForm.salesQuotationEntity'
              disabled
              :hide="['note']"
            />
            <generateDeliver
              @reload='reload'
              :visible.sync='orderStorageVisible'
              :form='detailForm'
              v-if="orderStorageVisible"
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
              :params="{page:1,limit:15,relationCode:data.salesSheetCode}"
            ></storagePicking>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="组装单"
          name="storageAssemble"
        >
          <FullscreenWrap v-if="activeName == 'storageAssemble'">
            <storageAssemble
              :button="false"
              :params="{page:1,limit:15,relationCode:data.salesSheetCode}"
            ></storageAssemble>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="发货单"
          name="storageDeliver"
        >
          <FullscreenWrap v-if="activeName == 'storageDeliver'">
            <storageDeliver
              :button="false"
              :params="{page:1,limit:15,relationCode:data.salesSheetCode}"
            ></storageDeliver>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="销售出库单"
          name="salesOutLibrary"
        >
          <FullscreenWrap v-if="activeName == 'salesOutLibrary'">
            <salesOutLibrary
              :button="false"
              :params="{page:1,limit:15,shipmentCode:data.shipmentCode}"
            ></salesOutLibrary>
          </FullscreenWrap>
        </el-tab-pane>
        <!-- <el-tab-pane
          label="借入单"
          name="orderBorrow"
        >
          <FullscreenWrap v-if="activeName == 'orderBorrow'">
            <orderBorrow
              :button="false"
              :params="{page:1,limit:15,borrowLoanType:0,relationCode:data.salesSheetCode}"
            ></orderBorrow>
          </FullscreenWrap>
        </el-tab-pane> -->
        <el-tab-pane
          label="应收账单"
          name="financeReceivable"
        >
          <FullscreenWrap v-if="activeName == 'financeReceivable'">
            <financeReceivable
              :button="false"
              :params="{page:1,limit:15,busCode:data.shipmentCode}"
            ></financeReceivable>
          </FullscreenWrap>
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
      status: [{ label: '发货状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      orderStorageVisible: false,
      detailForm: {},
      activeName: '',
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
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查询详情  
    salessheetInfo() {
      this.$api.seePsiSaleService.salessheetGetInfoByCode({ code: this.code })
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.deliverState == 0 ? '待发货' : this.detailForm.deliverState == 1 ? '完成发货' : this.detailForm.deliverState == 2 ? '终止' : '-'
          this.status[1].value = this.detailForm.createTime
          this.status[2].value = this.detailForm.creatorName
          this.status[3].value = this.detailForm.deptName
          this.status[4].value = this.detailForm.source
        })
        .finally(() => {

        })
    },
    reload() {
      this.salessheetInfo()
      this.$emit('reload')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
