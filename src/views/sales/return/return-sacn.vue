/*
 * @Author: web.王晓冬
 * @Date: 2019-11-23 17:02:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-23 17:59:05
 * @Description: 退货扫码
*/

<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="920px"
    v-dialogDrag
    @close="close"
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{`销售退货单:${code}`}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>

    <el-form
      :model="form"
      ref="form"
    >
      <!-- 库房列表 -->
      <warehouse-list :data="form" />
    </el-form>
  </el-dialog>
</template> 
<script>
// import FullscreenElement from '@/components/fullscreen-element';
// import purchaseWarehousing from './purchase-warehousing'
// import purchaseWareDisabled from './purchase-ware-disabled'

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
  },
  data() {
    return {
      form: {
        wmsId: '',
      },
    }
  },
  methods: {
    //保存
    saveHandle() {
      this.$api.seePsiWmsService.wmsinventorydetailBatchPutaway({ businessCode: this.drawerData.purchaseCode, businessId: this.drawerData.id, putawayCommodityList: this.tableData, businessType: 13 })
        .then(res => {
          this.setEdit()
          this.close()
        })
        .finally(() => {

        })
    }
  },

}
</script>
<style scoped>
</style>
