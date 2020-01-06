/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:35:36
 * @Description: 其他合同
*/
<template>
  <sideDetail :status="status" :title="`其他合同 ${codeSlice(code)||''}`" :visible="showDetailPage" @close="close" v-loading="loading" width="990px">
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" class="p10" ref="form" size="mini" v-if="detail&&showDetailPage&&!loading">
          <contract-title :data="detail" disabled id="titleInfo" />
          <contract-signer :data="detail" disabled id="firstClass" name="甲方" type="A" />
          <contract-signer :data="detail" disabled id="secondClass" name="乙方" type="B" />
          <contract-expire :data="detail" disabled id="expire" />
          <contract-extras :data="detail" disabled id="desc" />
          <extrasInfo :data="detail" disabled id="extrasInfo" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true }
        ];
      }
    }
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiContractService.contractGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>