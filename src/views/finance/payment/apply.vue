/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 11:21:55
 * @Description: 付款申请
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>付款申请</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <el-form :model="form" v-if="form&&showEditPage">
        <form-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="预付金额" size="mini">
                <el-input disabled v-model="form.predictAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="应付金额" size="mini">
                <el-input disabled v-model="form.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="应付款时间" size="mini">
                <el-date-picker :placeholder="`请选择`" class="wfull" disabled v-model="form.payEndDate" value-format="timestamp" />
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
      </el-form>
    </div>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">保存</el-button>
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
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    getDetail() {
      if (this.rowData) return this.rowData;
    },
    async save() {
      this.loading = true;
      try {
        await this.$api.seePsiFinanceService.paybillPaymentApply({
          apprpvalNode: this.form.apprpvalNode,
          id: this.form.id,
          processType: 'psi_finance_pay_bill_01'
        });
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