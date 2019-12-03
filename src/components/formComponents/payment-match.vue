/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 16:43:13
 * @Description: 匹配
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>匹配</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <el-form :model="form" ref="form" v-if="form&&showEditPage">
        <form-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                :rules="[
                    {required:true,message:'必填项'},
                    {type:'price'},
                    {validator:checkMatch}
                ]"
                label="匹配金额"
                prop="matchAmount"
                size="mini"
              >
                <el-input append="元" v-model="form.matchAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
        <div class="mt10">
          <div>账单未结清金额：{{bill.billAmount||0}}</div>
          <div>流水未匹配金额：{{bill.unmatch||0}}</div>
        </div>
      </el-form>
    </div>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">确定</el-button>
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
    from: String, // 来源
    bill: Object
  },
  computed: {},
  data() {
    return {
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
      form: {
        matchAmount: 0
      }
    };
  },
  mounted() {},
  methods: {
    checkMatch(rule, value, cb) {
      if (
        value > 0 &&
        value <= this.bill.billAmount &&
        value <= this.bill.unmatch
      ) {
        cb();
      } else {
        cb(new Error('匹配金额需大于0并且小于等于未结清金额和未匹配金额'));
      }
    },
    async save() {
      await this.$refs.form.validate();
      this.$emit('change', this.form.matchAmount);
      this.close();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>