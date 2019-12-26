/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-26 14:55:30
 * @Description: 整机配置单
*/
<template>
  <sideDetail
    :status="status"
    :title="`整机配置单 ${detail?(detail.borrowLoanCode||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button" v-if="detail">
      <el-button
        @click="commonquotationconfigUpdate(detail.id, 1)"
        size="mini"
        type="danger"
        v-if="!detail.state&&authorityButtons.includes('psi_pricelist_zj_005')"
      >停用</el-button>
      <el-button
        @click="commonquotationconfigUpdate(detail.id, 0)"
        size="mini"
        type="primary"
        v-if="detail.state&&authorityButtons.includes('psi_pricelist_zj_003')"
      >启用</el-button>
      <el-button @click="showEdit = true" size="mini" type="primary" v-if="authorityButtons.includes('psi_pricelist_zj_002')">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <el-form :model="detail" class="hide-form-error" size="mini">
          <Info :data="detail" disabled />
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Edit from './edit';
import Info from './info';

export default {
  mixins: [VisibleMixin],
  components: {
    Edit,
    Info
  },
  props: {},
  data() {
    return {
      showEdit: false,
      stateText: {
        '0': '启用中',
        '1': '停用中'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.detail.state ? '停用中' : '启用中' },
          { label: '提交人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true }
        ];
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonquotationconfigInfoBycode(
          null,
          this.code
        );
        let {
          data: list
        } = await this.$api.seePsiCommonService.commonquotationconfigdetailsQureyListByQuotationInfo(
          { quotationId: data.id }
        );
        data.commodityList = list;
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    async commonquotationconfigUpdate(id, state) {
      await this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      this.loading = true;
      try {
        await this.$api.seePsiCommonService.commonquotationconfigUpdate({
          id,
          state
        });
      } catch (error) {}
      this.loading = false;
      this.$reload();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>