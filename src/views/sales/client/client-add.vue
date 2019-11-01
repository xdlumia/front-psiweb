/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 15:55:04
 * @Description: 客户管理-新增客户
*/
<template>
  <div>

    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-position="top"
    >

      <d-tabs :style="{maxHeight:'calc(100vh - 220px)'}">
        <d-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        />
        <!-- 基本信息 -->
        <base-info id="baseInfo" />
        <!-- 发票信息 -->
        <invoice-info id="invoiceInfo" />
        <!-- 备注信息 -->
        <extras-info id="extrasInfo" />
      </d-tabs>
      <div class="ac pt20">
        <el-button
          type="primary"
          @click="saveHandle()"
          size="small"
        >保存</el-button>
        <el-button
          @click="dialogData.visible = false"
          size="small"
        >取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: ['dialogData'],
  data() {
    return {
      // tab操作栏
      tabs: {
        baseInfo: '基本信息',
        invoiceInfo: '发票信息',
        extrasInfo: '备注信息',
      },
      activeName: 'basicInfo',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
