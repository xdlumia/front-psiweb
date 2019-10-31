/*
 * @Author: web.王晓冬
 * @Date: 2019-10-31 16:31:36
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 17:36:18
 * @Description: 报价单筛选
*/

<template>
  <el-form
    ref="form"
    label-position="top"
    size="mini"
    :model="form"
  >
    <el-form-item
      v-for="(item,index) of filterList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- 输入框 -->
      <el-input
        @keyup.native.13="submitFilter"
        v-if="item.type == 'input'"
        v-model="form[item.prop]"
        :placeholder="`请输入${item.label}`"
      >
        <el-button
          @click="submitFilter"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <!-- 选择 -->
      <el-select
        class="wfull"
        @change="submitFilter"
        v-else-if="item.type == 'select'"
        v-model="form[item.prop]"
        placeholder="请选择"
      >
        <el-option
          v-for="sub of item.options"
          :key="sub.label"
          :label="sub.label"
          value="sub.label"
        ></el-option>
      </el-select>
      <el-date-picker
        @change="submitFilter"
        v-else-if="item.type == 'date'"
        v-model="form[item.prop]"
        value-format="timestamp"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-date-picker
        @change="submitFilter"
        class="wfurll"
        v-else-if="item.type == 'daterange'"
        v-model="form[item.prop]"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        type="daterange"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  components: {
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    }
  },
  data() {
    return {
      options: [
        { label: 'lable' },
        { label: 'lable3' },
      ],
      // 遍历表单内容
      filterList: [
        { label: '商户编号、商户名称/简称', prop: 'title', type: 'input' },
        { label: '联系人、联系人电话', prop: 'city', type: 'input' },
        { label: '商机阶段', prop: 'pushTime', type: 'select', options: [] },
        { label: '跟进时间起止', prop: 'status', type: 'daterange' },
        { label: '维护人', prop: 'messageType', type: 'select', options: [] },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.filterList[2].options = [
        { label: 'lable' },
        { label: 'lable3' },
      ]
    }, 2000)

  },
  methods: {
    submitFilter() {
      this.$emit('submit-filter')
    },
  },

}
</script>
<style scoped lang="scss">
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
</style>
