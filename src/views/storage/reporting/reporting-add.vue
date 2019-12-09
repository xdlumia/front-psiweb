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
      :style="{maxHeight:'calc(100vh - 180px)'}"
      style="padding:0;"
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
          ref='addForm'
          :model="addForm"
          class="p10"
        >
          <reportingInfo
            ref="deliverEdit"
            :addForm='addForm'
            @wmsChange='wmsChange'
          />
        </el-form>
        <!-- 报溢的话 需要选择库房以后再选 商品, 商品是跟库库房来的 报损不需要 -->
        <commodityInfoEdit
          v-if="addForm.wmsId"
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
        wmsId: null,//库房id
        personInChargeId: '',//责任人id
        leaderName: '',//
        note: '',//备注
        totalCostPrice: '',//成本金额总计
        taxInclusiveTotalCostPrice: '',//含税成本金额总计
        source: '新增'
      },
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    //每次切换库房,刷新商品信息
    wmsChange() {
      if (this.$refs.logisticsEdit) {
        this.$refs.logisticsEdit.$refs.commdity.searchTable = {}
        this.$refs.logisticsEdit.$refs.commdity.search()
      }
    },
    close() {
      this.$emit('update:visible', false)
    },
    //点一下保存
    submit() {
      // console.log(this.addForm, 'this.addFormthis.addFormthis.addFormthis.addForm')
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$api.seePsiWmsService.wmsreportinglossesSave(this.addForm)
            .then(res => {
              this.close()
              this.$emit("reload")
            })
            .finally(() => {

            })
        } else {
          console.log('error submit!!');
          return false;
        }
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