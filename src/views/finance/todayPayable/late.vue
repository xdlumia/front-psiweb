/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-03 14:56:04
 * @Description: 滞纳金
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>滞纳金</span>
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
                    {validator:checkLateAmount}
                ]"
                prop="lateFeeAmount"
                label="滞纳金"
                size="mini"
              >
                <el-input v-model="form.lateFeeAmount"></el-input>
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
    from: String, // 来源
    pageConfig: Object
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
    checkLateAmount(rule, value, cb) {
      value = parseFloat(value) || 0;
      console.log(value);
      if (value <= 0) {
        cb(new Error('滞纳金必须大于0'));
      } else {
        cb();
      }
    },
    getDetail() {
      if (this.rowData) {
        return {
          lateFeeAmount: 0,
          id: this.rowData.id
        };
      }
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      try {
        await this.$getApi(this.pageConfig.api.lateFee)(this.form);
        this.setEdit();
        this.close();
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>