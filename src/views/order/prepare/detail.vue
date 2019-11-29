/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-29 11:20:24
 * @Description: 备货单详情
*/
<template>
  <sideDetail
    :status="status"
    :title="`备货单 ${detail?detail.stockCode:''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <span></span>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,5].includes(detail.state)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.stockCode
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.state)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="detail&&[0,5].includes(detail.state)">编辑</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderDelete',{
          id:detail.id
        },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0,5].includes(detail.state)"
      >删除</el-button>
      <el-button
        @click="showAddOrderStorage=true"
        size="mini"
        type="primary"
        v-if="waitBuyingNumber>0&&detail&&[2,3].includes(detail.state)"
      >采购</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <approve-panel :busType="29" :id="detail.id" v-if="isDataReady" />
        <el-form size="mini">
          <form-card id="arrivalInfo" title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :rules="[{ required: true, trigger: 'blur' }]" label="采购预计到货时间" prop="purchaseArrivalTime">
                  <el-date-picker
                    :placeholder="`请选择采购预计到货时间`"
                    class="wfull"
                    disabled
                    v-model="detail.purchaseArrivalTime"
                    value-format="timestamp"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buyingGoodsEdit
            :data="detail"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','waitPurchaseNumber','costAmount','commodityNumber','taxRate','preTaxAmount','inventoryNumber'
            ]"
            disabled
          />
          <customInfo :data="detail" busType="29" disabled />
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="isDataReady&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,joinCode:code,relationCode:code}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <addOrderStorage :joinCode="code" :visible.sync="showAddOrderStorage" @reload="setEdit(),$reload()" from="备货单" />
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="reload" type="edit" v-if="showEdit&&detail" />
  </sideDetail>
</template>
<script>
import AddOrderStorage from '../storage/edit'; // 采购入库单
import Edit from './edit'; // 采购入库单
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    AddOrderStorage,
    Edit
  },
  data() {
    return {
      showEdit: false,
      showAddOrderStorage: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '已通过',
        '3': '部分完成',
        '4': '已完成',
        '5': '已驳回'
      }
    };
  },
  computed: {
    waitBuyingNumber() {
      if (this.detail) {
        return []
          .concat(this.detail.commodityList || [])
          .reduce((data, item) => {
            data += Number(item.waitPurchaseNumber) || 0;
            return data;
          }, 0);
      } else return 0;
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchasestockorderGetByCode(
          null,
          this.code
        );
        data.commodityList = data.commodityList || [];
        return data;
      } else if (this.rowData) return this.rowData;
    },
    reload() {
      console.log('detail reload');
      this.setEdit();
      this.$reload();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>