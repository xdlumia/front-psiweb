/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  拆卸任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="close"
    title="拆卸任务"
    width="990px"
  >
    <div
      class="d-auto-y"
      style="height:calc(100vh - 160px)"
    >
      <div class="drawer-header">
        <el-button
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
        >确认收到并开始</el-button>
        <el-button
          @click="disassembleVisible =true"
          size="mini"
          type="primary"
        >拆卸</el-button>
        <el-button
          @click="hangVisible=true"
          size="mini"
          type="primary"
        >挂起</el-button>
        <el-button
          @click="orderStorageVisible=true"
          size="mini"
          type="primary"
        >继续</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <dismantlingMerchandise />
            <form-card
              class="choose-man"
              title="人员分配"
            >
              <el-row>
                <el-col :span="20">
                  <div class="d-text-black">拆卸人</div>
                  <div class="d-text-qgray mt5 mb20">{{detailForm.disassemblyPersonName}}</div>
                </el-col>
                <el-col :span="20">
                  <div class="d-text-black">备注</div>
                  <div class="d-text-qgray mt5">{{detailForm.note}}</div>
                </el-col>

              </el-row>
            </form-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="拆卸单">拆卸单</el-tab-pane>
      </el-tabs>
      <!-- <hangUp
        :visible='hangVisible'
        @close='hangVisible = false'
      />
      <disassembleGoodsChoose
        :visible='disassembleVisible'
        @close='disassembleVisible = false'
      /> -->
    </div>
  </SideDetail>

</template>
<script>
import dismantlingMerchandise from '@/components/formComponents/dismantling-merchandise'
// import disassembleGoodsChoose from '@/components/formComponents/disassemble-goods-choose'
// import hangUp from '@/components/formComponents/hang-up';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '拆卸状态', value: '待拆卸' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      hangVisible: false,
      generateVisible: false,
      disassembleVisible: false,
      detailForm: {},
      state: {
        '-1': '终止',
        '0': '未开始',
        '1': '待拆卸',
        '2': '部分拆卸',
        '3': '完成拆卸',
      }
    };
  },
  components: {
    dismantlingMerchandise,
    SideDetail,
    // hangUp,
    // disassembleGoodsChoose
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    //查看拆卸任务详情
    wmsallocationorderInfo() {
      this.$api.seePsiWmsService.wmsdisassemblytaskInfo(null, this.drawerData.id)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.disassemblyTaskState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    }
  },
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
