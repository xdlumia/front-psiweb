/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 11:19:44
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <div class="drawer-header">
      <!-- 操作按钮 -->
      <span
        v-for="(item,index) of buttons"
        :key="index"
      >
        <el-button
          class="mr10"
          @click="buttonsClick(item.label)"
          v-if="currStatusType[currStatus].includes(item.label)"
          size="mini"
          :type="item.type"
        >{{item.label}}</el-button>
      </span>

    </div>
    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-position="top"
    >
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        >
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <components
          class="d-auto-y"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>
      </keep-alive>
    </el-form>
  </div>
</template>
<script>
import detail from './details/detail' //详情
import outLib from './details/outLib' //报价单
export default {
  components: {
    detail,
    outLib
  },
  props: ['drawerData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: '', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '退货扫码', type: 'primary', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatus: 3,
      currStatusType: {
        1: ['提交审核', '编辑', '删除'], // 新建
        2: ['撤销审核', '审核通过', '驳回'], // 审核中
        3: ['退货扫码'], // 待退货
        4: ['退货扫码'], //部分退货
        5: [], //已退货
        6: ['提交审核', '编辑', '删除'], //已驳回
      },
      // tab操作栏
      tabs: {
        detail: '详情',
        outLib: '销售出库单',
      },
      activeName: 'detail',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
