/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 17:47:06
 * @Description: 新增供应商
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>新增供应商</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="发票信息" name="invoiceInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <d-tab-pane label="可供商品" name="commodityInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini">
          <supplier-base-edit :data="form" id="supplierInfo"></supplier-base-edit>
          <invoice-info :data="form" id="invoiceInfo"></invoice-info>
          <extras-info :data="form" id="extrasInfo"></extras-info>
          <supplier-goods :data="form" id="commodityInfo" />
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
      showChoose: true,
      activeName: '',
      form: {
        // 开户账号 示例：开户账号
        account: '',
        // 开户银行 示例：开户银行
        accountBank: '',
        // 地址 杭州
        address: '',
        // 附件 undefined
        attachs: '',
        // 编号 1
        code: '',
        // 供应供应商品明细表 9
        commonSupplierCommodityEntities: [],
        // 公司编码code 示例：公司编码code
        companyCode: '',
        // 部门code 示例：部门code
        deptTotalCode: '',
        //  级别 KHJB_1001
        grade: '',
        // 开票地址 杭州
        invoiceAddres: '',
        // 发票抬头 示例：发票抬头
        invoiceTitle: '',
        // 是否删除 9
        isDelete: '',
        // 联系人 码云
        linkManName: '',
        // 联系电话 17788554411
        phone: '',
        // 产品范围 示例：产品范围
        productRange: '',
        // 注册地址 杭州
        registerAddres: '',
        // 注册电话 示例：注册电话
        registerPhone: '',
        // 注册号 12313FSDF
        registrationNo: '',
        // 备注 外星人
        remark: '',
        // 启用状态 1
        state: '',
        // 供应商名称 阿里巴巴
        supplierName: '',
        // 纳税人识别号 SDFSDF2342354R12312
        taxpayersNum: '',
        // 来源 KHLY_1001
        tenementSource: '',
        // 行业 互联网
        trade: ''
      }
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    async save() {
      await this.$refs.form.validate();
      console.log(JSON.parse(JSON.stringify(this.form)));
      await this.$api.seePsiCommonService.commonsupplierinfoSave(this.form);
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>