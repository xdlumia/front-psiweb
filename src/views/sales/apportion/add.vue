/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 20:16:34
 * @Description: 客户管理-新增分摊
*/
<template>
  <el-dialog
    title="新增分摊"
    :visible.sync="showEditPage"
    width="920px"
    :status="status"
    @close="close"
    v-dialogDrag
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'新增分摊':`编辑:${code}`}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>

    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-position="top"
    >

      <d-tabs :style="{maxHeight:'calc(100vh - 110px)'}">
        <d-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        />
        <!-- 分摊信息 -->
        <apportion-info
          :data="form"
          id="apportionInfo"
        />
        <!-- 备注信息 -->
        <extras-info
          :data="form"
          id="extrasInfo"
        />
      </d-tabs>
    </el-form>
  </el-dialog>
</template>
<script>

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
  },
  data() {
    return {
      // tab操作栏
      tabs: {
        apportionInfo: '分摊信息',
        commodityInfo: '商品信息',
        extrasInfo: '备注信息',
      },
      form: {
        attachList: [], //"附件",
        businessCommoditySaveVoList: [
          {
            alterationNumber: '', //退换商品数
            alterationPrice: '', //实际退/换单价
            apportionmentAmount: '', //分摊后金额
            busCode: '', //"业务编号",
            busType: '', //9,
            commodityCode: '', //"商品编号",
            commodityNumber: '', //9,
            costAmount: '', //采购/销售成本金额
            discount: '', //折扣
            discountSprice: '', //折后单价
            isAssembly: '', //是否组装
            isDirect: '', //是否直发
            isTeardown: '', //是否拆卸
            note: '', //"备注",
            parentCommodityCode: '', //"100000",
            pickingNumber: '', //拣货数量
            preTaxAmount: '', //含税总价
            putawayType: '', //9,
            reference: '', //销售参考价
            salesPrice: '', //销售单价
            shipmentsNumber: '', //9,
            snCode: '', //"SN码",
            taxPrice: '', //税后退货单价
            taxTotalAmount: '', //税后退货总价
          }
        ],
        costAmount: '', //采购/销售成本金额
        unAmount: '',
        costApportionCode: '', //"分摊单编号",
        costCode: '', //费用单编号
        busCode: '',
        busType: '',
        note: '', //"备注",
        state: '', //9
      },
    }
  },
  computed: {

  },
  watch: {
    visible(val) {
      if (val && this.add == 'edit') {
        this.form.businessCommoditySaveVoList = []
      }
    }
  },
  created() {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salescostapportionGetInfoByCode({ code: this.code })
        return data;
      }
    },
    // 保存表单数据
    async saveHandle() {
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salescostapportionUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salescostapportionSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](this.form)
            .then(res => {

              this.setEdit()
              this.close()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
