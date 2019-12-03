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
    :visible="visible"
    @close="close"
    :title="'换货任务-'+drawerData.swapTaskCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          v-if="drawerData.swapState != 4"
          @click="exchangeVisible=true"
          size="mini"
          type="primary"
        >换货扫码</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form
            size="mini"
            :model="detailForm"
            ref="form"
            v-if='detailForm'
          >
            <!-- <approvePanel /> -->
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
        <el-tab-pane
          label="应收账单"
          name='financeReceivable'
        >
          <FullscreenWrap v-if="activeName == 'financeReceivable'">
            <financeReceivable
              v-if="activeName == 'financeReceivable'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.swapTaskCode}"
            ></financeReceivable>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="应付账单"
          name='financePayable'
        >
          <FullscreenWrap v-if="activeName == 'financePayable'">
            <financePayable
              v-if="activeName == 'financePayable'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.swapTaskCode}"
            ></financePayable>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="待开票"
          name='financeBilling'
        >
          <FullscreenWrap v-if="activeName == 'financeBilling'">
            <financeBilling
              v-if="activeName == 'financeBilling'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.swapTaskCode}"
            ></financeBilling>
          </FullscreenWrap>
        </el-tab-pane>
        <el-tab-pane
          label="待收票"
          name='financeReceipt'
        >
          <FullscreenWrap v-if="activeName == 'financeReceipt'">
            <financeReceipt
              v-if="activeName == 'financeReceipt'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.swapTaskCode}"
            ></financeReceipt>
          </FullscreenWrap>
        </el-tab-pane>
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
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '换货状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      exchangeVisible: false,
      dialogData: {
        title: '换货扫码UAVBFUSBDFU',
      },
      activeName: '',
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
      this.$api.seePsiWmsService.wmsswaptaskGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[this.drawerData.swapState]
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
</style>
