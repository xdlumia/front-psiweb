/*
 * @Author: 徐贺
 * @Date: 2019-10-25 15:24:18
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  采购单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible="visible"
    v-loading="loading"
    @close="$emit('update:visible',false)"
    :title="`采购单-${codeSlice(code)}`"
    width="990px"
  >
    <!-- class="d-auto-y"
      style="height:calc(100vh - 160px)" -->
    <div>
      <div class="drawer-header">
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <purchaseBase :data="detailForm" />
            <purchaseReceivingInfo :data="detailForm" />
            <goodsWarehousing
              @reload='reload'
              :data="detailForm"
              :drawerData="drawerData"
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="拆卸任务"
          name="storageDisassemble"
        >
          <FullscreenWrap v-if="activeName == 'storageDisassemble'">
            <storageDisassemble
              v-if="activeName == 'storageDisassemble'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.purchaseCode}"
            ></storageDisassemble>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="采购入库单"
          name="orderStorage"
        >
          <FullscreenWrap v-if="activeName == 'orderStorage'">
            <orderStorage
              v-if="activeName == 'orderStorage'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.purchaseCode}"
            ></orderStorage>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="应付账单"
          name="financePayable"
        >
          <FullscreenWrap v-if="activeName == 'financePayable'">
            <financePayable
              v-if="activeName == 'financePayable'"
              :button="false"
              :params="{page:1,limit:15,busCode:detailForm.putinCode}"
            ></financePayable>
          </FullscreenWrap>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script> 
import purchaseBase from '@/components/formComponents/purchase-base'
import purchaseReceivingInfo from '@/components/formComponents/purchase-receiving-info';
import goodsWarehousing from '@/components/formComponents/goods-warehousing';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '入库状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      detailForm: {},
      activeName: '',
      loading: false
    };
  },
  components: {
    purchaseBase,
    purchaseReceivingInfo,
    SideDetail,
    goodsWarehousing
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    // 查看详情
    wmsallocationorderInfo() {
      this.loading = true
      this.$api.seePsiPurchaseService.purchaseGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.putinState == 0 ? '待入库' : this.detailForm.putinState == 1 ? '部分入库' : this.detailForm.putinState == 2 ? '完成入库' : this.detailForm.putinState == 3 ? '终止' : '-'
          this.status[1].value = this.detailForm.createTime
          this.status[2].value = this.detailForm.creatorName
          this.status[3].value = this.detailForm.deptName
          this.status[4].value = this.detailForm.source
        })
        .finally(() => {
          this.loading = false
        })
    },
    reload() {
      this.$emit('reload')
      this.wmsallocationorderInfo()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
