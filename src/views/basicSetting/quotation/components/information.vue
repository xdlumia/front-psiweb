<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 11:24:00
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-11 17:59:04
 * @Description: description
 -->
<template>
  <div class>
    <form-card title="基本信息">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item prop="goodName" label="商品信息">
            <el-input v-model="data.goodName" v-if="detail"></el-input>
            <commodity-selector
              v-else
              class="wfull"
              :isChooseOne="true"
              :autoClear="false"
              @choose="choose"
              :kinds="[{label: '整机', value:'PSI_SP_KIND-1'}]"
              :value="data.goodName || ''"
            ></commodity-selector>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品编号" prop="commodityCode">
            <el-input v-model="data.commodityCode" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配置名称" prop="quotationName">
            <el-input v-model="data.quotationName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="note">
            <el-input type="textarea" v-model="data.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  methods: {
    choose(goods) {
      this.data.commodityCode = goods[0].commodityCode
      this.data.goodName = goods[0].goodsName
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-select {
  display: block;
}
</style>
