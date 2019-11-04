/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 15:45:50
 * @Description: 其他合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>其他合同</span>
      <span class="fr mr20">
        <el-select class="mr10" size="mini" v-model="tmp">
          <el-option value>选择合同模板</el-option>
        </el-select>
        <el-button size="mini" type="primary">预览</el-button>
        <el-button @click="save" size="mini" type="primary">生成</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="单据信息" name="titleInfo" />
      <d-tab-pane label="甲方信息" name="firstClass" />
      <d-tab-pane label="乙方信息" name="secondClass" />
      <d-tab-pane label="合同期限" name="expire" />
      <d-tab-pane label="补充信息" name="desc" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form">
          <contract-title :data="form" id="titleInfo"></contract-title>
          <contract-signer :data="form" id="firstClass" name="甲方" type="A"></contract-signer>
          <contract-signer :data="form" id="secondClass" name="乙方" type="B"></contract-signer>
          <contract-expire :data="form" id="expire"></contract-expire>
          <contract-extras :data="form" id="desc"></contract-extras>
          <extrasInfo :data="form" id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      tmp: '',
      activeName: '',
      form: {
        // 附件 示例：附件
        attachList: [
          {
            // 附件名称 身份证明
            fileName: '',
            // 附件地址 http://
            fileUrl: ''
          }
        ],
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
        fieldList: [
          {
            // 字段码 fieldVal
            fieldCode: '',
            // 字段值 张三
            fieldVal: ''
          }
        ],
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
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    },
    save() {
      console.log(this);
      console.log(this.$refs.form.validate());
      console.log({ ...this.form });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>