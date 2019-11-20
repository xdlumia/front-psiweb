/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 18:02:37
 * @Description: 客户管理-账单调整单
*/
<template>
  <el-dialog
    title="账单调整单"
    :visible.sync="showEditPage"
    width="920px"
    :status="status"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'新增账单调整单':`编辑:${code}`}}</span>
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
        adjustAfterAmount: '',// 调整后金额
        adjustAmount: '',// 调整金额
        adjustBeforAmount: '',// 调整前金额
        adjustCode: '',// 调整单编号,
        adjustDate: '',// 调整时间
        apprpvalState: '',//审核状态
        attachList: [],// 示例：附件,
        companyCode: '',// 示例：公司编码code,
        deptTotalCode: '',// 示例：部门code,
        fbiiBusCode: '',// 示例：账单业务编号,
        fbiiBusType: '',// 100000,
        fbillId: '1232',// 100000,
        id: '',
        note: '',// 示例：备注,
      },
    }
  },
  computed: {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiFinanceService.fbilladjustGetInfoByCode({ code: this.code })
        return data;
      }
    },
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
