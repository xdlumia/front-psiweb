/*
 * @Author: 赵伦
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 17:55:01
 * @Description: 客户信息 1
 */
<template>
  <form-card title='客户信息'>
    <el-row :gutter="10">
      <el-col :span="8">
        <!-- 如果禁用 否则就仅仅做展示使用 调用clientName -->
        <el-form-item
          v-if="disabled && !select"
          :rules="{ required: true, trigger: 'blur' }"
          label="客户名称"
          prop="调用clientName"
        >
          <el-input
            :disabled='disabled'
            v-model.trim="data.调用clientName"
            :placeholder="`请输入客户名称`"
          />
        </el-form-item>
        <!-- 如果没有禁用 或者当前可以选择 那就更改clientId -->
        <el-form-item
          v-else
          :rules="{ required: true, trigger: 'blur' }"
          label="客户名称"
          prop="clientId"
        >
          <el-select
            placeholder="请选择客户"
            :remote-method="getClinent"
            class="wfull mr5"
            filterable
            @change="commonclientinfoInfo"
            remote
            reserve-keyword
            v-model="data.clientId"
          >
            <el-option
              :key="item.id"
              :label="item.clientName"
              :value="item.id"
              v-for="item in clientOptions"
            ></el-option>
          </el-select>
          <!-- <el-select
            class="wfull"
            v-model.trim="data.clientId"
            :placeholder="`请输入客户名称`"
          >
          </el-select> -->

        </el-form-item>

      </el-col>
      <el-col
        :span="item.span || 8"
        v-for="(item,index) of formItems"
        :key="index"
      >
        <el-form-item
          :rules="item.rules"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input
            v-if="item.type =='input'"
            :disabled='disabled'
            v-model.trim="data[item.prop]"
            :placeholder="`请输入${item.label}`"
          />
          <el-select
            class="wfull"
            v-else-if="item.type =='select' && item.prop=='clientId'"
            :disabled='disabled'
            v-model="data[item.prop]"
            :placeholder="`请选择${item.label}`"
          >
            <el-option
              v-for="item in item.options"
              :key="item.code"
              :label="item.content"
              :value="item.code"
            />
          </el-select>
          <el-date-picker
            class="wfull"
            v-else-if="item.type =='date'"
            value-format="timestamp"
            :disabled='disabled'
            v-model="data[item.prop]"
            :placeholder="`请选择${item.label}`"
          />
        </el-form-item>
      </el-col>
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  // 客户名称编辑的时候使用clientId显示的时候使用clientName
  // { label: '客户名称', prop: 'clientId', type: 'select', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'phone' }], },
  { label: '注册电话', prop: 'registerPhone', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
  { label: '开户行帐号', prop: 'bankAccount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'bankCard' }], },
]
export default {
  props: {
    data: {
      default: () => ({})
    },
    // 有可能辉出现禁用的时候客户名称可以选择
    select: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      clientOptions: [],
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  methods: {
    async getClinent(words) {
      if (words) {
        let { data } = await this.$api.seePsiCommonService.commonclientinfoQueryList({
          fuzzyNameOrCode: words,
        });
        this.clientOptions = data || []
      } else {
        this.clientOptions = [];
      }
    },
    // 获取客户详情信息
    commonclientinfoInfo() {
      if (!this.data.clientId) {
        this.$message.error({
          showClose: true,
          message: '客户内容不能为空'
        })
        return
      }
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.data.clientId)
        .then(res => {
          this.clientInfo = res.data || {}
        })
        .finally(() => {
          this.loading = false
        })
    },  }
}
</script>
<style scoped>
</style>
