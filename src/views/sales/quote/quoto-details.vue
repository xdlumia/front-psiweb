/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 20:22:31
 * @Description: 报价单详情
*/
<template>
  <div>
    <div class="mb10">
      <!-- 操作按钮 -->
      <span
        v-for="(item,index) of buttons"
        :key="index"
      >
        <el-button
          class="mr10"
          @click="buttonsClick(item.name)"
          v-if="currStatusType[currStatus].includes(item.label)"
          size="small"
          :type="item.type"
        >{{item.label}}</el-button>
      </span>

    </div>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <!-- 状态详情 -->
      <side-statusbar :status="[{ label: '状态', value: '新建' }]" />
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="详情"
          name="detail"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="销售出库单"
          name="outLibrary"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="请购单"
          name="buy"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
        <el-tab-pane
          label="操作记录"
          name="record"
        >
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          ></components>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import sideStatusbar from '@/components/formComponents/side-statusbar' //顶部状态
import detail from './quotoDetails/detail' //详情
import outLibrary from './quotoDetails/outLibrary' //销售出库单
import buy from './quotoDetails/buy' //采购单
import record from '@/components/formComponents/record' //操作记录

export default {
  components: {
    sideStatusbar,
    detail,
    outLibrary,
    buy,
    record
  },
  props: ['drawerData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        { label: '提交审核', name: 'submit', type: 'primary', authCode: '' },
        { label: '撤销审核', name: 'undo', type: 'danger', authCode: '' },
        { label: '审核通过', name: 'pass', type: 'primary', authCode: '' },
        { label: '编辑', name: 'edit', type: 'primary', authCode: '' },
        { label: '删除', name: 'del', type: 'danger', authCode: '' },
        { label: '驳回', name: 'reject', authCode: '' },
        { label: '生成销售出库单', name: 'generateSales', type: 'primary', authCode: '' },
        { label: '生成请购单', name: '', type: 'generateBuying', authCode: '' },
        { label: '终止', name: 'termination', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       * 1:新建 2:审核中 3:已通过 4:已驳回 5:已完成
       */
      currStatus: 1,
      currStatusType: {
        1: ['提交审核', '编辑', '删除'],
        2: ['撤销审核', '审核通过', '驳回'],
        3: ['生成销售出库单', '生成请购单', '终止'],
        4: ['提交审核', '编辑', '删除'],
        5: []
      },
      activeName: 'detail',
      form: {},
    }
  },
  methods: {
    buttonsClick(name) {
      this.$emit('buttonClick', name, this.drawerData.data)
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
