/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:29:48
 * @Description: 其他合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>其他合同</span>
      <span class="fr mr20">
        <el-select class="mr10" size="mini" v-model="form.templateId">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item of tmpList">{{item.name}}</el-option>
        </el-select>
        <el-button @click="preview" size="mini" type="primary">预览</el-button>
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="单据信息" name="titleInfo" />
      <d-tab-pane label="甲方信息" name="firstClass" />
      <d-tab-pane label="乙方信息" name="secondClass" />
      <d-tab-pane label="合同期限" name="expire" />
      <d-tab-pane label="补充信息" name="desc" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="form&&showEditPage">
          <contract-title :data="form" id="titleInfo"></contract-title>
          <contract-signer :data="form" id="firstClass" name="甲方" type="A"></contract-signer>
          <contract-signer :data="form" id="secondClass" name="乙方" type="B"></contract-signer>
          <contract-expire :data="form" id="expire"></contract-expire>
          <contract-extras :data="form" :templateList.sync="tmpList" id="desc" type="3"></contract-extras>
          <extrasInfo :data="form" id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
    <contractPreview :templateData="templateData" :visible.sync="showContractPreview" />
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import contractPreview from '@/views/asistant/templateManage/contract-preview.vue';

export default {
  mixins: [VisibleMixin],
  components: {
    contractPreview
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {
      tmp: '',
      tmpList: [],
      showContractPreview: false,
      templateData: {
        name: '',
        context: ''
      },
      activeName: '',
      form: {
        // 附件 示例：附件
        attachList: [],
        // 合同开始时间 1572346561998
        beginDate: '',
        // 公司编码code 示例：公司编码code
        companyCode: '',
        // 合同编号 示例：合同编号
        contractCode: '',
        // 合同名称 示例：合同名称
        contractName: '',
        // 部门code 示例：部门code
        deptTotalCode: '',
        // 合同结束时间 1572346561998
        endDate: '',
        // 自定义字段 示例：自定义字段
        fieldList: [],
        // 备注信息 示例：备注信息
        note: '',
        // 甲方 示例：甲方
        partyA: '',
        // 甲方签订时间 1572346561998
        partyADate: '',
        // 甲方证件号 示例：甲方证件号
        partyAId: '',
        // 甲方联系人 示例：甲方联系人
        partyALinkman: '',
        // 甲方联系电话 示例：甲方联系电话
        partyAPhone: '',
        // 甲方签订人 示例：甲方签订人
        partyASign: '',
        // 乙方 示例：乙方
        partyB: '',
        // 乙方签订时间 1572346561998
        partyBDate: '',
        // 乙方证件号 示例：乙方证件号
        partyBId: '',
        // 乙方联系人 示例：乙方联系人
        partyBLinkman: '',
        // 乙方联系电话 示例：乙方联系电话
        partyBPhone: '',
        // 乙方签订人 示例：乙方签订人
        partyBSign: '',
        // 来源 示例：来源
        source: '',
        // 合同状态 9
        state: '',
        // 合同模版 100000
        templateId: ''
      }
    };
  },
  mounted() {
    // prettier-ignore
    this.form = {"attachList":[],"beginDate":1574179200000,"companyCode":"","contractCode":"010","contractName":"合同名称","deptTotalCode":"","endDate":1574179200000,"fieldList":[{"fieldCode":"userField__ziDingYiYi","fieldName":"自定义一","fieldVal":"自定义内容"}],"note":"合同备注一下","partyA":"甲方爸爸","partyADate":1574179200000,"partyAId":"100861111111111111","partyALinkman":"甲方爸爸","partyAPhone":"10086111","partyASign":"甲方爸爸","partyB":"乙方儿子","partyBDate":1574179200000,"partyBId":"100861111111111111","partyBLinkman":"乙方儿子","partyBPhone":"10086111","partyBSign":"乙方儿子","source":"","state":"","templateId":15}
  },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    async preview() {
      if (!this.form.templateId) {
        return this.$message({
          message: '请选择合同模板',
          type: 'warning',
          showClose: true
        });
      }
      await this.$refs.form.validate();
      this.loading = true;
      try {
        let { data } = await this.$api.seePsiContractService.contractPreview(
          this.form
        );
        this.showContractPreview = true;
        this.templateData.name = this.form.contractName || '其他合同';
        this.templateData.context = data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    async save() {
      if (!this.form.templateId) {
        return this.$message({
          message: '请选择合同模板',
          type: 'warning',
          showClose: true
        });
      }
      await this.$refs.form.validate();
      this.loading = true;
      try {
        await this.$api.seePsiContractService.contractSave(this.form);
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