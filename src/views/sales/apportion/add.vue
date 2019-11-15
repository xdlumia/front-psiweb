/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 19:02:27
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

      <d-tabs :style="{maxHeight:'calc(100vh - 180px)'}">
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
        <!-- 商品信息 -->
        <commodity-info
          :data="form"
          id="commodityInfo"
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
            alterationNumber: '', //9,
            alterationPrice: '', //98765432109876.12,
            apportionmentAmount: '', //98765432109876.12,
            busCode: '', //"业务编号",
            busType: '', //9,
            commodityCode: '', //"商品编号",
            commodityNumber: '', //9,
            costAmount: '', //98765432109876.12,
            discount: '', //98765432109876.12,
            discountSprice: '', //98765432109876.12,
            isAssembly: '', //9,
            isDirect: '', //9,
            isTeardown: '', //9,
            note: '', //"备注",
            parentCommodityCode: '', //"100000",
            pickingNumber: '', //9,
            preTaxAmount: '', //98765432109876.12,
            putawayType: '', //9,
            reference: '', //98765432109876.12,
            salesPrice: '', //98765432109876.12,
            shipmentsNumber: '', //9,
            snCode: '', //"SN码",
            taxPrice: '', //98765432109876.12,
            taxTotalAmount: '', //98765432109876.12
          }
        ],
        companyCode: '', //"公司编码code",
        costAmount: '', //98765432109876.12,
        costApportionCode: '', //"分摊单编号",
        costCode: '', //"100000",
        deptCode: '', //"部门code",
        isDelete: '', //9,
        note: '', //"备注",
        shipmentCode: '', //"100000",
        state: '', //9

      },
    }
  },
  computed: {

  },
  methods: {
    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {

        if (valid) {
          this.loading = true
          this.form.quotationIds = this.rowDatas.map(item => item.id)
          // rules 表单验证是否通过
          let api = 'salesshipmentUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesshipmentSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](this.form)
            .then(res => {
              this.close()
              this.setEdit()
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
