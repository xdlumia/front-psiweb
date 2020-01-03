/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-03 19:50:18
 * @Description: 邮件担保 or 合同收回
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showEditPage"
      width="920px"
      @close="close"
      v-dialogDrag
    >
      <!-- 确定按钮 -->
      <div slot="title">
        <span>确认邮件担保</span>
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
      <div
        v-loading="loading"
        class="d-auto-y"
        style="height:calc(100vh - 110px)"
      >
        <el-form
          v-if="visible"
          ref="form"
          size="small"
          :model="form"
          label-position="top"
        >
          <!-- 备注信息 -->
          <remark-info
            id="extrasInfo"
            :data="form[type]"
          />
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 填写报价信息
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  props: {
    type: String,
    params: Object,
    rowData: Object
  },
  components: {
  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      form: {
        apprpvalNode: '',// "string",
        busCode: '',// "string",
        busType: '',// "业务类型",
        contractAttachsInfo: {
          attachsVos: [
            // {
            //   fileName: '',// "身份证明",
            //   fileUrl: '',// "http://"
            // }
          ],
          fileNames: [],
          note: '',// "备注信息"
        },
        contractRecycleState: '',// 0,
        id: this.rowData.id,// 100000,
        mailEnsureAttachsInfo: {
          attachsVos: [
            // {
            //   fileName: '',// "身份证明",
            //   fileUrl: '',// "http://"
            // }
          ],
          fileNames: [],
          note: '',// "备注信息"
        },
        note: '',// "示例：备注",
        processType: 'psi_sales_outlibrary_01',// "string"
      },
    }
  },
  created() {
    // this.init()
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },
  methods: {

    async getDetail() {
      if (this.code) {
        const { data } = await this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        return data;
      }
    },
    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesshipmentMailEnsureApproval'
          if (this.type == 'type') {
            let api = 'salesshipmentWithdrawApproval'  //收回合同
          }
          const params = Object.assign(this.form, this.params)
          params[this.type].fileNames = params[this.type].fileNames.map(item => item.name)
          this.$api.seePsiSaleService[api](params)
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
  }
}
</script>
<style lang="scss" scoped>
</style>
