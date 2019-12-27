/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-26 09:56:29
 * @Description: 整机配置单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading" width="900px">
    <div slot="title">
      <span>{{isEdit||(form&&form.id)?'编辑':'新增'}}整机配置单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)" v-if="form&&visible">
      <d-tab-pane label="基本信息" name="baseInfo" />
      <d-tab-pane label="配置信息" name="goods" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible&&form">
          <Info :data="form" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Info from './info';

export default {
  mixins: [VisibleMixin],
  components: {
    Info
  },
  props: {
    from: String
  },
  computed: {},
  data() {
    return {
      form: {
        id: '',
        quotationName: '',
        goodName: '',
        commodityId: '',
        commodityCode: '',
        note: '',
        commonQuotationConfigDetailsEntitys: []
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    getDetail() {
      if (this.rowData) {
        return this.rowData;
      }
    },
    async save() {
      if (!this.form.commodityList || !this.form.commodityList.length) {
        return this.$message({
          message: '无配件',
          showClose: true,
          type: 'warning'
        });
      }
      await this.$showFormError(this.$refs.form);
      this.loading = true;
      this.form.type = 1;
      this.form.commonQuotationConfigDetailsEntitys = this.form.commodityList;
      try {
        if (this.isEdit||this.form.id) {
          await this.$api.seePsiCommonService.commonquotationconfigUpdate(
            this.form
          );
        } else {
          this.form.source = this.from || '新建';
          await this.$api.seePsiCommonService.commonquotationconfigSave(
            this.form
          );
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