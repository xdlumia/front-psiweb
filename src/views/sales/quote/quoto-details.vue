/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 17:42:20
 * @Description: 报价单详情
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
          style="height:calc(100vh - 240px)"
          :is="activeName"
        ></components>
      </keep-alive>
    </el-form>
  </div>
</template>
<script>
import detail from './quotoDetails/detail' //详情
import buy from './quotoDetails/buy' //采购单
import record from '@/components/formComponents/record' //操作记录

export default {
  components: {
    detail,
    buy,
    record
  },
  props: ['drawerData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: 'danger', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '生成销售出库单', type: 'primary', authCode: '' },
        { label: '生成请购单', type: 'primary', authCode: '' },
        { label: '终止', authCode: '' }
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
      // tab操作栏
      tabs: {
        detail: '详情',
        salesOutLibrary: '销售出库单',
        buy: '请购单',
        record: '操作记录',
      },
      activeName: 'detail',
      form: {},
    }
  },
  methods: {
    buttonsClick(label) {
      // handleConfirm里的按钮操作是需要二次确认的
      let handleConfirm = ['提交审核', '撤销审核', '驳回', '删除', '终止']
      if (handleConfirm.includes(label)) {
        this.$confirm(`是否${label}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          this.$api.seePumaidongService.collegeManagerDelete({ id: [123] })
            .then(res => {
              this.$emit('reload')
            });
        });
      }
      // 如果是 编辑/生成销售出库单/生成请购单 等操作返回方法在首页index里操作
      else if (label == '编辑' || label == '生成销售出库单' || label == '生成请购单') {
        this.$emit('buttonClick', label, this.drawerData.data)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
