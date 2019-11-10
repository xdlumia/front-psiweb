/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-09 12:53:57
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
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderSubmission',{ busCode:detail.stockCode },'提交审核')"
        size="mini"
        type="primary"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderUnsubmission',{ busCode:detail.stockCode },'撤销审核')"
        size="mini"
        type="danger"
      >撤销审核</el-button>
      <el-button @click="$submission('seePsiPurchaseService.purchasestockorderExamine',{ isAgree:true },'通过')" size="mini" type="primary">通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasestockorderExamine',{ isAgree:false },'驳回',true)"
        size="mini"
        type="danger"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
      <el-button @click="del" size="mini" type="danger">删除</el-button>
      <el-button @click="showAddOrderStorage=true" size="mini" type="primary">采购</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form size="mini" v-if="detail">
          <form-card id="arrivalInfo" title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :rules="[{ required: true, trigger: 'blur' }]" label="采购预计到货时间" prop="purchaseArrivalTime">
                  <el-date-picker
                    :placeholder="`请选择采购预计到货时间`"
                    class="wfull"
                    disabled
                    v-model="form.purchaseArrivalTime"
                    value-format="timestamp"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buyingGoodsEdit :data="detail" disabled />
          <customInfo :data="detail" disabled />
          <extrasInfo :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <addOrderStorage :visible.sync="showAddOrderStorage" from="备货单" />
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
      this.getDetail();
      this.setEdit();
    },
    async del() {
      await this.$confirm('是否确定删除该备货单？');
      this.loading = true;
      try {
        await this.$api.seePsiPurchaseService.purchasestockorderLogicDelete({
          id: this.detail.id
        });
        console.log('删除备货单');
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>