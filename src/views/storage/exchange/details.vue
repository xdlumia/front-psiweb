/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  换货任务
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="close"
    :title="'换货任务-'+drawerData.swapTaskCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          @click="exchangeVisible=true"
          size="mini"
          type="primary"
        >换货扫码</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form
            size="mini"
            v-if='detailForm'
          >
            <approvePanel />
            <exchange-info
              :data="detailForm"
              disabled
              id="exchangeInfo"
            />
            <buying-exchange-goods
              :data="detailForm"
              disabled
              exchangeType="in"
              id="inGoods"
            />
            <buying-exchange-goods
              :data="detailForm"
              disabled
              exchangeType="out"
              id="outGoods"
            />
            <!-- <exchangeCommodityNoedit /> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账单管理">账单管理</el-tab-pane>
        <el-tab-pane label="发票管理">发票管理</el-tab-pane>
      </el-tabs>
      <exchangeSweepcode
        :visible.sync="exchangeVisible"
        v-if="exchangeVisible"
        :data='detailForm'
        @reload='reload'
        :allData='drawerData'
      />
    </div>
  </SideDetail>

</template>
<script>
import approvePanel from '@/components/formComponents/approve-panel'
import exchangeInfo from '@/components/formComponents/exchange-info';
// import exchangeCommodityNoedit from '@/components/formComponents/exchange-commodity-noedit';
import exchangeSweepcode from '@/components/formComponents/exchange-sweepcode';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '换货状态', value: '2019-9-21 10:04:38' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      exchangeVisible: false,
      dialogData: {
        title: '换货扫码UAVBFUSBDFU',
      },
      detailForm: {},
      state: {
        2: '待换货',
        3: '部分换货',
        4: '完成换货'
      },
    };
  },
  components: {
    approvePanel,
    exchangeInfo,
    exchangeSweepcode,
    SideDetail,
    // exchangeCommodityNoedit
  },
  mounted() {
    this.wmsassembleorderInfo()
  },
  methods: {
    //查看详情
    wmsassembleorderInfo() {
      this.$api.seePsiWmsService.wmsswaporderGetByCode(null, this.drawerData.swapOrderCode)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.swapState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
          this.detailForm.putinCommodityList.map(item => {
            item.commodityCode = item.swapInCommodityCode;
          });
          this.detailForm.putoutCommodityList.map(item => {
            item.commodityCode = item.swapOutCommodityCode;
          });
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    reload() {
      this.wmsassembleorderInfo()
      this.$emit('reload')
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
    position: relative;
    width: 100% !important;
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
</style>
