/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 新增报溢报损单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="新增报溢报损单"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-header
        class="d-bg-white"
        style="height:54px;padding:0;"
      >
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane name="deliverEdit">
            <span
              slot="label"
              v-anchor:deliverEdit
            >报溢报损信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >报溢报损商品</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main style="padding:0;max-height:700px;">
        <el-form
          :model="addForm"
          class="p10"
        >
          <reportingInfo
            ref="deliverEdit"
            :addForm='addForm'
          />
        </el-form>
        <commodityInfoEdit
          ref="logisticsEdit"
          :addForm='addForm'
        />
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template> 
<script>
import reportingInfo from '@/components/formComponents/reporting-info';
import commodityInfoEdit from '@/components/formComponents/commodity-info-edit';

export default {
  components: {
    reportingInfo,
    commodityInfoEdit
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      addForm: {
        commodityList: [],//商品列表
        type: 2,//类别（1-报溢 2-报损）
        wmsId: '',//库房id
        personInChargeId: '',//责任人id
        note: '',//备注
        totalCostPrice: '',//成本金额总计
        taxInclusiveTotalCostPrice: '',//含税成本金额总计
      },
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    //点一下保存
    submit() {
      this.$api.seePsiWmsService.wmsreportinglossesSave(this.addForm)
        .then(res => {

        })
        .finally(() => {

        })

    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>