/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 生成拣货单和组装任务
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="生成拣货单和组装任务"
    v-dialogDrag
  >
    <el-container>
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
          <chooseAssembly ref="chooseAssembly" />
        </el-form>

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
import chooseAssembly from '@/components/formComponents/choose-assembly';

export default {
  components: {
    deliverEdit,
    chooseAssembly
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
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>