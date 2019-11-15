/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  销售单 详情组件
 */
<template>
  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    :title="'拣货单-'+ drawerData.pickingOrderCode"
    width="990px"
  >
    <!-- class="d-auto-y"
      style="height:calc(100vh - 160px)" -->
    <div>
      <div class="drawer-header">
        <el-button
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
        >拣货</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <goodsPicking :data='detailForm' />
            <pickingInfo :data='detailForm' />
            <generateDeliver
              :visible.sync='orderStorageVisible'
              v-if='orderStorageVisible'
              :data='detailForm'
              :drawerData='drawerData'
              @reload='reload'
            />
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="销售单">销售单</el-tab-pane>
        <el-tab-pane label="拣货单">拣货单</el-tab-pane>
        <el-tab-pane label="组装任务">组装任务</el-tab-pane>
        <el-tab-pane label="发货单">发货单</el-tab-pane>
        <el-tab-pane label="销售出库单">销售出库单</el-tab-pane>
        <el-tab-pane label="借入单">借入单</el-tab-pane>
        <el-tab-pane label="应收账单">应收账单</el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>
</template>
<script>
import goodsPicking from '@/components/formComponents/goods-picking'
import pickingInfo from '@/components/formComponents/picking-info';
import generateDeliver from './generate-deliver';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '拣货状态', value: '待拣货' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      detailForm: {},
      orderStorageVisible: false
    };
  },
  components: {
    goodsPicking,
    pickingInfo,
    generateDeliver,
    SideDetail
  },
  mounted() {
    this.wmspickingorderInfo()
  },
  methods: {
    //查看拣货单详情 
    wmspickingorderInfo() {
      this.$api.seePsiWmsService.wmspickingorderInfo(null, this.drawerData.id)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.detailForm.state == 2 ? '完成拣货' : this.detailForm.state == 1 ? '部分拣货' : this.detailForm.state == 0 ? '待拣货' : '终止'
          this.status[1].value = this.drawerData.createTime
          this.status[2].value = this.drawerData.creatorName
          this.status[3].value = this.drawerData.deptName
          this.status[4].value = this.detailForm.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    reload() {
      this.$emit('reload')
    }
  }
}
</script>
<style lang='scss' scoped>
.side-page {
  .header-btns {
    position: absolute;
    right: 40px;
    top: 12px;
  }
  /deep/ {
    > .popup-main {
      > .popup-head {
        font-weight: bold;
        font-size: 18px;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .tabs-view {
    width: 100% !important;
    position: relative;
    /deep/ {
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 20px;
        margin-bottom: 0;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 40px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 20px;
      }
    }
  }
}
</style>
