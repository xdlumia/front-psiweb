/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  拣货单 详情组件
 */
<template>
  <SideDetail
    :status="status"
    :visible="visible"
    v-loading="loading"
    @close="$emit('update:visible',false)"
    :title="`拣货单-${codeSlice(detailForm.pickingOrderCode)}`"
    width="990px"
  >
    <!-- class="d-auto-y"
      style="height:calc(100vh - 160px)" -->
    <div>
      <div class="drawer-header">
        <el-button
          v-if="detailForm.state !== 2 && detailForm.state !== -1 && authorityButtons.includes('psi_wms_picking_04')"
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
        >拣货</el-button>

        <el-button
          @click="shipmentVisible=true"
          v-if="detailForm.shipmentCode"
          size="mini"
          type="primary"
        >打印</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <goodsPicking :data='detailForm' />
            <pickingInfo :data='detailForm' />
            <generateDeliver
              :visible.sync='orderStorageVisible'
              v-if='orderStorageVisible'
              :data='JSON.parse(JSON.stringify(detailForm))' 
              :drawerData='drawerData'
              @reload='reload'
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="销售单"
          name="storageSales"
        >
          <FullscreenWrap v-if="activeName == 'storageSales'">
            <storageSales
              v-if="activeName == 'storageSales'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.pickingOrderCode}"
            ></storageSales>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="组装单"
          name="storageAssemble"
        >
          <FullscreenWrap v-if="activeName == 'storageAssemble'">
            <storageAssemble
              v-if="activeName == 'storageAssemble'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.pickingOrderCode}"
            ></storageAssemble>
          </FullscreenWrap>
        </el-tab-pane>
      </el-tabs>
    </div>
    <printShipment
      :code="detailForm.shipmentCode"
      :visible.sync="shipmentVisible"
      v-if="shipmentVisible"
    />
  </SideDetail>
</template>
<script>
import goodsPicking from '@/components/formComponents/goods-picking'
import pickingInfo from '@/components/formComponents/picking-info';
import generateDeliver from './generate-deliver';
import SideDetail from '@/components/side-detail';
import printShipment from '@/components/formComponents/print-shipment';

export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '拣货状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      detailForm: {},
      activeName: '',
      loading: false,
      shipmentVisible: false,
      orderStorageVisible: false
    };
  },
  components: {
    goodsPicking,
    pickingInfo,
    generateDeliver,
    SideDetail,
    printShipment
  },
  mounted() {
    this.wmspickingorderInfo()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查看拣货单详情 
    wmspickingorderInfo() {
      this.loading = true
      this.$api.seePsiWmsService.wmspickingorderGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.state == 2 ? '完成拣货' : this.detailForm.state == 1 ? '部分拣货' : this.detailForm.state == 0 ? '待拣货' : '终止'
          this.status[1].value = this.drawerData.createTime
          this.status[2].value = this.drawerData.creatorName
          this.status[3].value = this.drawerData.deptName
          this.status[4].value = this.detailForm.source
        })
        .finally(() => {
          this.loading = false
        })
    },
    reload() {
      this.wmspickingorderInfo()
      this.$emit('reload')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
