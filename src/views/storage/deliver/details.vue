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
    @close="$emit('update',false)"
    v-loading='loading'
    :title="`发货单-${codeSlice(detailForm.shipmentsOrderCode)}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <pickingDeliverEditable :data='detailForm' />
            <pickingLogisticsEditable :data='detailForm' />
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
              :params="{page:1,limit:15,relationCode:detailForm.shipmentsOrderCode}"
            ></storageSales>
          </FullscreenWrap>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>
</template>
<script>
import pickingDeliverEditable from '@/components/formComponents/picking-deliver-editable'
import pickingLogisticsEditable from '@/components/formComponents/picking-logistics-editable';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      detailForm: {},
      activeName: '',
      loading: true
    };
  },
  components: {
    pickingDeliverEditable,
    pickingLogisticsEditable,
    SideDetail
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查看调拨单详情
    wmsallocationorderInfo() {
      this.loading = true
      this.$api.seePsiWmsService.wmsshipmentsorderGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = res.data.createTime
          this.status[1].value = res.data.creatorName
          this.status[2].value = res.data.deptName
          this.status[3].value = res.data.source
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>
<style lang='scss' scoped>
</style>
