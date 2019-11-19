/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-19 19:16:49
 * @Description: 生成合同
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showEditPage"
      width="920px"
      @close="close"
      v-dialogDrag
      v-loading="loading"
    >
      <!-- 确定按钮 -->
      <div slot="title">
        <span>{{type=='addContract'?'生成合同':'追加合同模板'}}</span>
        <div class="fr mr30">
          <el-select
            size="mini"
            v-model="form.templateId"
          >
            <el-option
              v-for="item in templateOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button
            @click="previewContract"
            size="mini"
          >预览</el-button>
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
        class="d-auto-y"
        style="height:calc(100vh - 110px)"
      >

        <d-tabs :style="{maxHeight:'calc(100vh - 180px)'}">
          <d-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          />
          <el-form
            v-if="visible"
            size="small"
            label-position="top"
          >
            <!-- 客户信息 -->
            <customerInfo
              disabled
              id="customerInfo"
              :data="detail"
            />
            <!-- 公司信息 -->
            <companyInfo
              disabled
              id="companyInfo"
              :data="detail"
            />
            <!-- 报价单信息 -->
            <quote-info :options="rowData.quotationCodes || []" />
            <!-- 账期信息 -->
            <billInfo
              disabled
              id="billInfo"
              :data="detail"
            />
          </el-form>
          <el-form
            v-if="visible"
            ref="form"
            size="small"
            :model="form"
            label-position="top"
          >
            <!-- 自定义信息 -->
            <customInfo
              id="customInfo"
              :data="form"
            />
            <!-- 备注信息 -->
            <extrasInfo
              id="extrasInfo"
              :data="form"
            />
          </el-form>

        </d-tabs>

      </div>
    </el-dialog>
    <contractPreview
      :visible.sync="previewVisible"
      :templateData="templateData"
    ></contractPreview>
  </div>
</template>
<script>
// 填写报价信息
import quoteInfo from './quote-info';
import VisibleMixin from '@/utils/visibleMixin';
import contractPreview from '@/views/asistant/templateManage/contract-preview.vue';
export default {
  mixins: [VisibleMixin],
  components: {
    quoteInfo,
    contractPreview
  },
  data() {
    return {
      loading: false,
      // tab操作栏
      tabs: {
        customerInfo: '客户信息',
        companyInfo: '公司信息',
        quoteInfo: '报价单信息',
        billInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息'
      },
      // 新增orEdit框内容
      form: {
        attachList: [], // 示例：附件,
        fieldList: [], // 示例：自定义字段,
        shipmentCode: this.rowData.shipmentCode, // 销售出库单编号,
        templateId: '', // 100000,
        templateName: '' // 100000
      },
      // 模板信息
      templateData: {},
      previewVisible: false,
      templateOptions: [] // 合同模板
    }
  },
  created() {
    // this.init()
  },
  mounted() {
    // 获取合同模板
    this.getTemplateList(2)
  },
  computed: {

  },
  methods: {
    // 获取合同模板
    getTemplateList(params) {
      this.$api.seeBaseinfoService.templateList(null, params).then(res => {
        if (res.code == 200) {
          this.templateOptions = res.data || [];
        }
      });
    },

    async getDetail() {
      if (this.code) {
        const { data } = await this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        return data;
      }
    },
    // 合同预览
    previewContract() {
      if (!this.form.templateId) {
        this.$message({
          message: '请选择合同模板',
          type: 'error',
          showClose: true,
        });
        return
      }
      this.templateData = this.templateOptions.find(item => item.id == this.form.templateId)
      this.previewVisible = true
    },
    // 保存表单数据
    saveHandle() {
      console.log(this.type);

      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesshipmentInsertContract' //this.type = addContract //生成合同
          if (this.type == 'editContract') {
            let api = 'salesshipmentUpdateContract'  //生成合同
          }
          const params = Object.assign(this.form, this.params)
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
