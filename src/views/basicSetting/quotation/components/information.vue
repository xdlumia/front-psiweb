<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 11:24:00
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-09 12:05:12
 * @Description: description
 -->
<template>
  <div class>
    <form-card title="基本信息">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item prop="commonPromotionCommodityDetailsEntities" label="商品信息">
            <commodity-selector
              class="wfull"
              :isChooseOne="true"
              :autoClear="false"
              @choose="choose"
            ></commodity-selector>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    choose () {

    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-select {
  display: block;
}
</style>
