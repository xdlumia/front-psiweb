/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  盘点单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="close"
    :title="'盘点单'+drawerData.blitemCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          @click="backVisible=true,isComponents = 'scanInCode',dialogData.title = '调入扫码'"
          size="mini"
          type="primary"
        >完成盘点</el-button>
        <el-button
          @click="reportingVisible=true"
          size="mini"
          type="primary"
        >生成报损单</el-button>
        <el-button
          @click="reportingVisible=true"
          size="mini"
          type="primary"
        >生成报溢单</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <inventoryInfo
              :disabled='true'
              :addform='detailForm'
            />
            <goodsInventory :data='detailForm' />
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <reportingGenerate :visible.sync='reportingVisible' />
  </SideDetail>

</template>
<script>
import inventoryInfo from '@/components/formComponents/inventory-info'
import goodsInventory from '@/components/formComponents/goods-inventory';
import SideDetail from '@/components/side-detail';
import reportingGenerate from './reporting-generate'//生成报溢报损单
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '盘点状态', value: '2019-9-21 10:04:38' }, { label: '创建时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      reportingVisible: false,
      isComponents: '',
      dialogData: {
        title: ''
      },
      detailForm: {

      }
    };
  },
  components: {
    inventoryInfo,
    goodsInventory,
    SideDetail,
    reportingGenerate
  },
  mounted() {
    this.wmsreportinglossesInfo()
  },
  methods: {
    wmsreportinglossesInfo() {
      this.$api.seePsiWmsService.wmsblitemInfo(null, this.drawerData.id)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.drawerData.blitemState == 1 ? '进行中' : '盘点完成'
          this.status[1].value = this.drawerData.createTime
          this.status[2].value = this.drawerData.creator
          this.status[3].value = this.drawerData.deptName
          this.status[4].value = this.drawerData.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
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
        width: 100% !important;
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
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
