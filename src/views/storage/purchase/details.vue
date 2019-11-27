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
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    :title="`采购单-${drawerData.purchaseCode}`"
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
          <storageDisassemble
            v-if="activeName == 'storageDisassemble'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.purchaseCode}"
          ></storageDisassemble>
        </el-tab-pane>
        <el-tab-pane
          label="采购入库单"
          name="orderStorage"
        >
          <orderStorage
            v-if="activeName == 'orderStorage'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.purchaseCode}"
          ></orderStorage>
        </el-tab-pane>
        <el-tab-pane
          label="应付账单"
          name="financePayable"
        >
          <financePayable
            v-if="activeName == 'financePayable'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.purchaseCode}"
          ></financePayable>
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
      status: [{ label: '入库状态', value: '待入库' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      detailForm: {},
      activeName: ''
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
    // 查看详情
    wmsallocationorderInfo() {
      this.$api.seePsiPurchaseService.purchaseGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.putinState == 0 ? '待入库' : this.detailForm.putinState == 1 ? '部分完成' : this.detailForm.putinState == 2 ? '完成入库' : this.detailForm.putinState == 3 ? '终止' : '全部'
          this.status[1].value = this.detailForm.createTime
          this.status[2].value = this.detailForm.creatorName
          this.status[3].value = this.detailForm.deptName
          this.status[4].value = this.detailForm.source
        })
        .finally(() => {

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
