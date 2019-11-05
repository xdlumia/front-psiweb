/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 14:42:44
 * @Description: 客户管理-新增客户
*/
<template>
  <el-dialog
    title="新增客户"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >

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
        <!-- 基本信息 -->
        <base-info
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
  props: ['visible', 'type', 'rowData'],
  data() {
    return {
      // tab操作栏
      tabs: {
        baseInfo: '基本信息',
        invoiceInfo: '发票信息',
        extrasInfo: '备注信息',
      },
      activeName: 'baseInfo',
      form: {
        accountBank: '', // 示例：开户银行,
        address: '', // 示例：地址,
        attachs: [
          // string
        ],
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
        remark: '', // 示例：备注,
        source: '', // 示例：客户来源,
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
    }
  },
  methods: {
    // 保存表单数据
    saveHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const [currCity] = this.citys().filter(
            item => item.id === this.addForm.cityId
          )
          this.addForm.cityName = currCity.name
          this.loading = true
          delete this.addForm.start_date
          // rules 表单验证是否通过
          let api = 'collegeManagerUpdate' // 默认编辑更新
          // 新增保存
          if (this.dialogMeta.type === 'add') {
            api = 'collegeManagerSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.addForm)
            .then(res => {
              this.dialogMeta.visible = false
              this.$emit('submit', 'success')
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
