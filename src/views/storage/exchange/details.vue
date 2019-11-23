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
        <el-tab-pane label="应收账单">
          <financeReceivable
            :button="false"
            :params="{page:1,limit:15,swapTaskCode:detailForm.swapTaskCode}"
          ></financeReceivable>
        </el-tab-pane>
        <el-tab-pane label="应付账单">
          <financePayable
            :button="false"
            :params="{page:1,limit:15,swapTaskCode:detailForm.swapTaskCode}"
          ></financePayable>
        </el-tab-pane>
        <el-tab-pane label="待开票">
          <financeBilling
            :button="false"
            :params="{page:1,limit:15,swapTaskCode:detailForm.swapTaskCode}"
          ></financeBilling>
        </el-tab-pane>
        <el-tab-pane label="待收票">
          <financeReceipt
            :button="false"
            :params="{page:1,limit:15,swapTaskCode:detailForm.swapTaskCode}"
          ></financeReceipt>
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
      this.$api.seePsiWmsService.wmsswaptaskGetByCode(null, this.code)
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
</style>
