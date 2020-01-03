/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-03 11:18:48
 * @Description: 客户管理-新增客户
*/
<template>
  <el-dialog
    :title="title"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >

    <el-form
      v-loading="loading"
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
        <!-- 基本信息 -->
        <base-info
          :hide="['code','note']"
          :data="form"
          id="baseInfo"
        />
        <!-- 发票信息 -->
        <invoice-info
          :data="form"
          id="invoiceInfo"
        />
        <!-- 备注信息 -->
        <extras-info
          :data="form"
          id="extrasInfo"
        />
      </d-tabs>
      <div class="ac pt20">
        <el-button
          @click="$emit('update:visible', false)"
          size="small"
        >取消</el-button>
        <el-button
          type="primary"
          @click="saveHandle()"
          size="small"
        >保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>

export default {
  components: {
  },
  props: ['visible', 'code', 'type', 'rowData'],
  data() {
    return {
      loading: false,
      activeName: 'baseInfo',
      // tab操作栏
      tabs: {
        baseInfo: '基本信息',
        invoiceInfo: '发票信息',
        extrasInfo: '备注信息',
      },
      form: {
        accountBank: '', // 示例：开户银行,
        address: '', // 示例：地址,
        id: '',
        bankAccount: '', // 示例：银行账号,
        clientName: '', // 示例：客户姓名,
        code: '', // 示例：编号,
        companyName: '', // 示例：公司名称,
        deptTotalCode: '', // 示例：部门code,
        grade: '', // 示例：客户级别,
        invoiceAddres: '', // 示例：开票地址,
        invoiceTitle: '', // 示例：发票抬头,
        linkManName: '', // 示例：联系人,
        phone: '', // 示例：客户手机号,
        registerAddres: '', // 示例：注册地址,
        registerPhone: '', // 示例：注册电话,
        registrationNo: '', // 示例：注册号,
        note: '', // 示例：备注,
        attachList: [
          // string
        ],
        source: '', // 示例：客户来源,
        responsibleUser: '',//客户责任人 
        customerAssociated: '', //客户关联
        taxpayersNum: '', // 示例：纳税人识别号,
        trade: '', // 示例：行业
      },
    }
  },
  computed: {
    showPop: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', false)
      }
    },
    // title
    title() {
      return this.type == 'add' ? '新增客户' : `编辑:${this.rowData.code}`
    },
  },
  mounted() {

  },
  watch: {
    visible(val) {
      if (val) {
        this.initForm()
      }
    }
  },
  methods: {
    // 初始化表单
    initForm() {
      if (this.type === 'edit') {
        // 获取详情信息
        this.commonclientinfoInfoBycode()
      } else {
        // 清空form表单
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = ''
        })

      }
    },
    commonclientinfoInfoBycode() {
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfoBycode(null, this.code)
        .then(res => {
          const data = res.data || {}
          for (const key in this.form) {
            this.form[key] = data[key]
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 保存表单数据
    async saveHandle() {
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'commonclientinfoUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'commonclientinfoSave'
            // 编辑保存
          }
          this.$api.seePsiCommonService[api](this.form)
            .then(res => {
              this.showPop = false
              // console.log('保存成功');
              this.$emit('reload')
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
