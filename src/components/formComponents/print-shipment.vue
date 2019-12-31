/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-21 09:20:26
 * @Description: 打印销售出库单号
*/
<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    title="打印销售出库单号"
    @close="close"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{maxHeight:'calc(100vh - 180px)'}"
        style="padding:0;"
      >
        <div ref='detail'>
          <span>销售出库单号：</span>
          <span>{{code}}</span>
        </div>
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="print"
        size="small"
      >打 印</el-button>
      <el-button
        @click="close"
        size="small"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Print from '@/utils/print';
export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    code: '',
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      loading: false,
      activeName: ''
    };
  },
  mounted() { },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    print() {
      Print(this.$refs.detail, {
        windowWidth: 960,
        title: '销售出库单编号'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>