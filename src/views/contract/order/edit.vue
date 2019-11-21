/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 09:38:24
 * @Description: 采购合同
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>采购合同</span>
      <span class="fr mr20">
        <el-select class="mr10" size="mini" v-if="form" v-model="form.templateId">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item of tmpList">{{item.name}}</el-option>
        </el-select>
        <el-button @click="preview" size="mini" type="primary">预览</el-button>
        <el-button @click="save" size="mini" type="primary">生成</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="form&&showEditPage&&!loading">
          <supplierInfo :data="form" :defaultData="form.supplierInfo" disabled id="supplierInfo" />
          <companyInfo
            :data="form"
            :defaultData="{
              ...form.corporation,
              commonCorporationAccountEntities:form.corporationAccount?[form.corporationAccount]:[]
            }"
            disabled
            id="companyInfo"
          />
          <arrivalInfo :data="detail" disabled id="arrivalInfo" v-if="form.source!='直发单'" />
          <buyingDeliverInfo
            :data="detail"
            :defaultClientData="form.shipmentsLogistics"
            disabled
            id="deliverInfo"
            ref="deliverInfo"
            v-else
          />
          <buying-goods-edit
            :data="form"
            :show="[
            'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
          ]"
            disabled
            id="commodityInfo"
            priceKey="costAmount"
          />
          <buyingPaymentLate :data="form" disabled id="paymentLate" />
          <order-storage-bill :data="form" disabled id="billInfo" />
        </el-form>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="form&&showEditPage&&!loading">
          <contract-extras :data="form" :templateList.sync="tmpList" id="customInfo" type="2" />
          <extrasInfo :data="form" disabled id="extrasInfo" />
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
    from: String // 来源
  },
  computed: {
    
  },
  data() {
    return {
      tmpList: [],
      showContractPreview: false,
      templateData: {
        name: '',
        context: ''
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    getDetail() {
      if (this.code) {
      } else if (this.rowData) {
        this.rowData.logistics = this.rowData.shipmentsLogistics;
        console.log(this.rowData);
        return this.rowData;
      }
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
        let {
          data
        } = await this.$api.seePsiContractService.contractpurchaseSave(
          this.form
        );
        this.setEdit();
        this.close();
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
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
        let {
          data
        } = await this.$api.seePsiContractService.contractpurchasePreview(
          this.form
        );
        this.showContractPreview = true;
        this.templateData.name = '采购合同';
        this.templateData.context = data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>