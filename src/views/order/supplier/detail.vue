/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 10:41:42
 * @Description: 供应商编号
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="close" title="供应商编号" v-loading="loading" width="990px">
    <template slot="button">
      <el-button @click="changeState(0)" size="mini" type="primary" v-if="detail&&detail.state!=0">启用</el-button>
      <el-button @click="changeState(1)" size="mini" type="danger" v-else>停用</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form v-if="detail">
          <form-card title="往来账款">
            <el-row>
              <el-col :span="8">
                <span class="b mr10">应付欠款</span>
                <span>0元</span>
              </el-col>
              <el-col :span="8">
                <span class="b mr10">预付款</span>
                <span>0元</span>
              </el-col>
            </el-row>
          </form-card>
          <supplier-base-edit :data="detail" disabled></supplier-base-edit>
          <invoice-info :data="detail" disabled></invoice-info>
          <extras-info :data="detail" disabled></extras-info>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="可供商品">
        <el-form class="supplier-goods" v-if="detail">
          <supplier-goods :supplierId="detail.id" show-cat />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
      <el-tab-pane label="采购合同">采购合同</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
      <el-tab-pane label="采购退货单">采购退货单</el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
      <el-tab-pane label="发票记录">发票记录</el-tab-pane>
    </el-tabs>
    <Edit :code="detail.code" :visible.sync="showEdit" @reload="reloadDetail" v-if="detail" />
  </sideDetail>
</template>
<script>
import Edit from './edit';

export default {
  components: {
    Edit
  },
  props: {
    visible: Boolean,
    code: String
  },
  data() {
    return {
      showEdit: false,
      showPop: false,
      detail: null,
      loading: false,
      modified: false
    };
  },
  mounted() {
    this.checkVisible();
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  computed: {
    status() {
      if (!this.detail) return [];
      return [
        {
          label: '状态',
          value: this.detail.state,
          options: [{ label: '启用', value: 0 }, { label: '停用', value: 1 }]
        },
        { label: '供应商创建人', value: this.detail.creatorName },
        { label: '创建部门', value: this.detail.deptName },
        { label: '创建时间', value: this.detail.createTime, isTime: true },
        {
          label: '来源',
          value: this.detail.tenementSource,
          dictName: 'PSI_KHGL_LY'
        }
      ];
    }
  },
  methods: {
    checkVisible() {
      this.showPop = this.visible;
      if (this.visible) {
        this.getDetail();
      } else {
        if (this.modified) {
          this.$emit('reload');
        }
      }
    },
    async getDetail() {
      this.loading = true;
      try {
        let {
          data
        } = await this.$api.seePsiCommonService.commonsupplierinfoInfoBycode(
          null,
          this.code
        );
        data.productRange = data.productRange
          ? data.productRange.split(',')
          : [];
        this.detail = data;
      } catch (error) {}
      this.loading = false;
    },
    async update(data) {
      this.loading = true;
      try {
        await this.$api.seePsiCommonService.commonsupplierinfoUpdate(
          Object.assign(
            {
              id: this.detail.id,
              code: this.detail.code
            },
            data
          )
        );
        this.modified = true;
        Object.assign(this.detail, data);
      } catch (error) {}
      this.loading = false;
    },
    close() {
      if (this.modified) {
        this.$emit('reload');
      }
      this.$emit('update:visible', false);
    },
    reloadDetail() {
      this.modified = true;
      this.getDetail();
    },
    async changeState(state) {
      await this.$confirm(
        `是否要${state == 0 ? '启用' : '停用'}该供应商？`,
        '提示'
      );
      this.update({ state });
    }
  }
};
</script>
<style lang="scss" scoped>
.supplier-goods /deep/ .supplier-goods-form-card {
  height: calc(100vh - 250px);
}
</style>