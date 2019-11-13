/*
 * @Author: 赵伦
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-13 10:54:32
 * @Description: 客户信息 1  //传入 data:{clientId:'1'} 会自动查询详情
 */
<template>
  <form-card title='客户信息'>
    <el-row :gutter="10">
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
          <el-select
            :disabled="disabled"
            v-if="item.type==='select'"
            placeholder="请输入客户名称选择"
            :remote-method="getClinent"
            class="wfull mr5"
            filterable
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
          <el-input
            v-else
            disabled
            v-model="clientInfo[item.prop]"
            :placeholder="`请输入${item.label}`"
          />
        </el-form-item>
      </el-col>
    </el-row>

  </form-card>
</template>
<script>
let formItems = [
  // 客户名称编辑的时候使用clientId显示的时候使用clientName
  { label: '客户名称', prop: 'clientId', type: 'select', rules: [{ required: true, trigger: 'blur' }], },
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '注册电话', prop: 'registerPhone', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
  { label: '开户行帐号', prop: 'bankAccount', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
]
export default {
  props: {
    data: {
      default: () => ({})
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
      clientInfo: {}, //客户信息
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  created() {

  },
  watch: {
    'data.clientId': {
      handler(val) {
        if (val) {
          // 如果当前列表里有当前id 数据name可以正常显示 
          // let index = this.clientOptions.findIndex(item => val == item.id)
          // // 否则根据id查询当前数据 一般用户初始化页面显示数据的时候
          // console.log(index);
          // if (index == -1)
          this.commonclientinfoInfo(val)
          // if (!this.clientOptions.length) {
          //   this.commonclientinfoInfo(val)
          // }
        }
      },
      immediate: true,
      deep: true
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
    commonclientinfoInfo(id) {
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfo(null, id)
        .then(res => {
          this.clientInfo = res.data || {}
          this.clientOptions = [this.clientInfo];
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>
<style scoped>
</style>
