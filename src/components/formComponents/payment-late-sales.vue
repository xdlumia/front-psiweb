/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-04 15:32:54
 * @Description: 收款滞纳金
 */
<template>
  <form-card title="收款滞纳金">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="{ required: true,trigger: 'blur' }"
          label="滞纳金方案"
          prop="lateFeesInfo"
        >
          <el-select
            @change="change"
            class="wfull"
            :disabled='disabled'
            v-model="lateFeesInfo"
            value-key="overdueFineName"
          >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.overdueFineName"
              :value="item"
            />
          </el-select>
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
            disabled
            v-model.trim="lateFeesInfo[item.prop]"
            :placeholder="`请输入${item.label}`"
          />

        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
import { log } from 'util';
export default {
  props: {
    data: {
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: [],
      detail: {},
      items: [
        // { label: '滞纳金方案', prop: 'lateFeesId', type: 'input', rules: [{ required: false, trigger: 'change' }], },
        { label: '滞纳金比例', prop: 'limitType', type: 'input', rules: [{ required: false, trigger: 'change' }], },
        { label: '滞纳金间隔', prop: 'overdueFineInterval', type: 'input', rules: [{ required: false, }], },
        { label: '滞纳金上限', prop: 'overdueFineUpperLimit', type: 'input', rules: [{ required: false, }], },
      ]
    };
  },
  computed: {
    lateFeesInfo: {
      get() {
        return (JSON.parse(this.data.lateFeesInfo || '{}'))
      },
      set(val) {
        this.data.lateFeesInfo = JSON.stringify(val)
      }
    },
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop))
    }
  },
  watch: {

  },
  mounted() {

    this.getList();
  },
  methods: {
    async getList() {
      try {
        let { data: { configJson } } = await this.$api.seePsiCommonService.commonsystemconfigInfo(null, 3);
        let list = JSON.parse(configJson).financeConfigList;
        this.options = list;
      } catch (error) {
        console.error(error);
        this.options = [];
      }
    },
    change(item) {
      // let item = this.options.find(v => v.id = id)
      // this.detail = item
    }
  }
};
</script>
<style scoped>
</style>
