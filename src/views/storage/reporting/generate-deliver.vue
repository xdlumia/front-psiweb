/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 生成发货单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="生成发货单"
    v-dialogDrag
  >
    <el-container>
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
            >发货信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >物流信息</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main
        :style="{
                maxHeight:maxHeight+'px'
            }"
        style="padding:0;"
      >
        <el-form
          :model="form"
          class="p10"
        >
          <deliverEdit ref="deliverEdit" />
        </el-form>
        <logisticsEdit ref="logisticsEdit" />
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="centerDialogVisible = false"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="centerDialogVisible = false"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import deliverEdit from '@/components/formComponents/deliver-edit';
import logisticsEdit from '@/components/formComponents/logistics-edit';

export default {
  components: {
    deliverEdit,
    logisticsEdit
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: ''
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>