/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 18:29:27
 * @Description: 操作记录
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>操作记录</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <d-table :params="Object.assign(queryParams,params)" api="operlogService.logQueryList" style="height:calc(100vh - 160px)">
        <el-table-column label="操作人" min-width="80" prop="userName" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作内容" min-width="220" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作时间" min-width="120" prop="createTime" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
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
  props: {},
  computed: {},
  data() {
    return {
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
      form: {
        lateFeeAmount: 0
      },
      queryParams: {
        page: 1,
        limit: 15,
        businessType: 21
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>