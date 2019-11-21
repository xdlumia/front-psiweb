/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 16:52:25
 * @Description: 操作记录
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>操作记录</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <d-table api="seePsiFinanceService.todaybillList">
        <el-table-column label="操作人" prop></el-table-column>
        <el-table-column label="操作内容"></el-table-column>
        <el-table-column label="操作时间"></el-table-column>
      </d-table>
    </div>
    <div class="ac" slot="footer">
      <el-button @click="close" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String // 来源
  },
  computed: {},
  data() {
    return {
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
      form: {
        lateFeeAmount: 0
      }
    };
  },
  mounted() {},
  methods: {
    getDetail() {
      if (this.rowData) {
        return {
          lateFeeAmount: 0,
          id: this.rowData.id
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>