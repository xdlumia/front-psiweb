/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 16:16:39
 * @Description: 新增账单调价单
*/
<template>
  <el-dialog
    title="新增账单调价单"
    :visible.sync="showEditPage"
    width="920px"
    :status="status"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'新增账单调价单':`编辑:${code}`}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle()"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>

    <el-form
      v-if="visible"
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
        <!-- 账单调整 -->
        <bill-adjust
          :data="form"
          id="billAdjust"
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
      loading: false,
      // tab操作栏
      tabs: {
        billAdjust: '账单调整',
        extrasInfo: '备注信息',
      },
      activeName: 'baseInfo',
      form: {
        adjustPriceDifference: '', //调价差异
        adjustPriceType: 1, // 调价类型(1-销售调价，2-采购调价)
        approvalState: '',// 状态
        attachList: [],
        code: [],// 调价单编号,
        commonAdjustPriceDetailedEntityList: [
          // {
          //   adjustPriceDifference: '',// 调价差异
          //   adjustPriceMoney: '',// 9876543210987654,
          //   commodityCode: '',// 示例：商品编号,
          //   commodityId: '',// 9,
          //   companyCode: '',// 示例：公司编码code,
          //   createTime: '',// 1572342343503,
          //   creator: '',// 100000,
          //   deptTotalCode: '',// 示例：部门code,
          //   id: '',// 100000,
          //   isDelete: '',// 9,
          //   modifier: '',// 100000,
          //   modifyTime: '',// 1572342343503,
          //   note: '',// 示例：备注,
          //   originalMoney: '',// 9876543210987654,
          //   profitRatio: '',// 10.01,
          //   repertoryCost: '',// 9876543210987654,
          //   sellBillsId: '',// 100000,
          //   sellReferencePrice: '',// 9876543210987654
          // }
        ],
        note: '',// 示例：备注,
        taskNode: '',// string
      },
    }
  },
  computed: {

  },
  methods: {
    // 保存表单数据
    saveHandle(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true

          // rules 表单验证是否通过
          let api = 'fbilladjustUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'fbilladjustSave'
            // 编辑保存
          }
          let params = Object.assign(this.form, this.params)
          this.$api.seePsiFinanceService[api](params)
            .then(res => {
              this.setEdit()
              this.close()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
