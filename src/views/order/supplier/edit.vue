/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 11:56:24
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
    <d-tabs style="max-height:calc(100vh - 130px)" v-loading="loading">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="发票信息" name="invoiceInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <d-tab-pane label="可供商品" name="commodityInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini">
          <supplier-base-edit :data="form" id="supplierInfo"></supplier-base-edit>
          <invoice-info :data="form" id="invoiceInfo"></invoice-info>
          <extras-info :data="form" id="extrasInfo"></extras-info>
          <!-- 新增供应商之后再加商品 -->
          <!-- <supplier-goods :data="form" id="commodityInfo" v-if="visible" /> -->
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
    },
    code: String,
    rowData: Object
  },
  computed: {
    
  },
  data() {
    return {
      loading: false,
      showChoose: true,
      activeName: '',
      alwaysDropAndCopyForm: true, // 在getDetail返回数据后，重新覆盖form
      form: {
        // 开户账号 示例：开户账号
        account: '',
        // 开户银行 示例：开户银行
        accountBank: '',
        bankAccount: '',
        // 地址 杭州
        address: '',
        // 附件JSON undefined
        attachList: [],
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
        // 发票抬头 示例：发票抬头
        invoiceTitle: '',
        // 是否删除 9
        isDelete: '',
        // 联系人 码云
        linkManName: '',
        // 备注 外星人
        note: '',
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
        // 启用状态 1
        state: '0',
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
  watch: {
    visible() {
      if (this.visible) {
        if (this.code || this.rowData) {
          this.getDetail();
        } else {
          this.$refs.form && this.$refs.form.resetFields();
        }
      }
    }
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
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
        console.log(this);
        this.form = data;
      } catch (error) {}
      this.loading = false;
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      let data = Object.assign({}, this.form);
      data.productRange = data.productRange.join(',');
      console.log(JSON.parse(JSON.stringify(data)));
      try {
        if (this.code || this.rowData) {
          await this.$api.seePsiCommonService.commonsupplierinfoUpdate(data);
        } else {
          await this.$api.seePsiCommonService.commonsupplierinfoSave(data);
        }
      } catch (error) {}
      this.loading = false;
      this.$emit('reload');
      this.close();
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>