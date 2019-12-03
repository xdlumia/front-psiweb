/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:27:50
 * @Description: 新增借入单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading" width="900px">
    <div slot="title">
      <span>{{isEdit?'编辑':'新增'}}借入/出单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)" v-if="form&&visible">
      <d-tab-pane :label="form.borrowLoanType==1?'借出信息':'借入信息'" name="borrowIn" />
      <d-tab-pane :label="form.borrowLoanType==1?'借出商品':'借入商品'" name="borrowGoods" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible&&form">
          <borrowIn :data="form" :disables="(isEdit||from)?['borrowLoanType']:[]" id="borrowIn" />
          <borrowGoodsEdit :data="form" id="borrowGoods" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import dTabs from '@/components/tabs/index';
import dTabPane from '@/components/tabs/tab-pane';
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String
  },
  computed: {},
  data() {
    return {
      form: {
        // 借入借出单编号 示例：借入借出单编号
        borrowLoanCode: '',
        // 借入借出数量 9
        borrowLoanNum: '',
        // 借入借出类型（0-借入 1-借出） 0
        borrowLoanType: '',
        // 借入库房ID 100000
        borrowWmsId: '',
        // 借入借出商品lsit undefined
        commodityList: [],
        // 借入方 示例：借入方
        debtor: '',
        // 物流费用 98765432109876.12
        logisticsFees: '',
        // 备注 示例：备注
        note: '',
        // 借出方 示例：借出方
        outSide: '',
        // 返还数量 9
        returnNum: '',
        // 返还时间 1572437406222
        returnTime: '',
        // 销售单编号 示例：销售单编号
        salesSheetCode: '',
        // 服务类型 示例：服务类型
        serveType: '',
        // 服务商ID 100000
        serviceProviderId: '',
        // 来源 示例：来源
        source: '',
        // 运单号 示例：运单号
        waybillCode: '',
        id: ''
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {
  },
  methods: {
    getDetail() {
      if (this.rowData) {
        return this.rowData;
      }
    },
    async save() {
      if (!this.form.commodityList || !this.form.commodityList.length) {
        return this.$message({
          message: '无商品借入',
          showClose: true,
          type: 'warning'
        });
      }
      await this.$refs.form.validate();
      this.loading = true;
      this.form.borrowLoanNum = this.form.commodityList.reduce(
        (data, item) => data + parseInt(item.borrowLoanNum),
        0
      );
      try {
        if (this.isEdit) {
          await this.$api.seePsiWmsService.wmsborrowloanorderUpdate(this.form);
        } else {
          this.form.source = this.from || '新建';
          await this.$api.seePsiWmsService.wmsborrowloanorderSave(this.form);
        }
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>