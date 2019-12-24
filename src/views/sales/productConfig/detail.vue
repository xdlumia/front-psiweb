/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-24 15:10:00
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
        '0': '新建',
        '1': '审核中',
        '2': '待借入',
        '3': '待借出',
        '4': '部分借入',
        '5': '部分借出',
        '6': '待归还',
        '7': '待返还',
        '8': '部分返还',
        '9': '部分归还',
        '10': '完成返还',
        '11': '完成归还',
        '12': '已驳回',
        '-1': '终止'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.borrowLoanState] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source }
        ];
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsborrowloanorderGetByCode(
          null,
          this.code
        );
        data.commodityList = data.commodityShowList || [];
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