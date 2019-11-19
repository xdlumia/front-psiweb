/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-19 10:38:23
 * @Description: 换货扫码公共组件 已绑定字段 1
*/
<template>
  <el-dialog :title="title||'换货扫码'" :visible.sync="showEditPage" @close="close" v-dialogDrag v-if="visible">
    <div :style="{
      maxHeight:maxHeight+'px'
    }" class="d-auto-y" v-if="form">
      <form-card class="borrow-goods-info" title="换入库房">
        <el-form label-position="top" label-width="100px" ref="queryForm" size="small">
          <el-form-item :error="wmsError" label="换入库房" prop="name">
            <el-select @change="wmsError=''" placeholder="请选择" style="width:30%" v-model="currentWMS">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item of wmsList"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </form-card>
      <!-- 换入库商品 -->
      <form-card
        :key="item.commodityList"
        :title="index == 1 ? '换入库商品' : ''"
        class="borrow-goods-info mt10"
        v-for="(item,index) of form.inCommodityList"
      >
        <buying-goods-edit
          :customColumns="[
              { label:'数量', key:'inNumber', width:140, prop:'commodityCode', format:()=>'0/0' },
          ]"
          :data="{commodityList:[item]}"
          :show="[
            'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!formTitle'
          ]"
          :showSummary="false"
          :sort="['inNumber','commodityCode','goodsName',]"
        ></buying-goods-edit>

        <div class="mt10 mb10">
          <span class="b mt5">机器号/扫SN码</span>
          <el-input @keypress.13.native="checkIn(index)" class="ml10 mt5" size="mini" style="width:200px;" v-model="inSNInput[index]"></el-input>
          <span class="fr d-text-black mr10 mt5">
            <span>本次成功扫码</span>
            <span class="b d-text-red f16">3</span>
            <span>件，历史扫码</span>
            <span class="b d-text-green f16">5</span>
            <span>件，还需扫码</span>
            <span class="b d-text-blue f16">127</span>
            <span>件</span>
          </span>
        </div>
      </form-card>

      <!-- 换出库商品 -->
      <form-card class="borrow-goods-info mt10" title="换出库商品">
        <buying-goods-edit
          :customColumns="[
              { label:'数量', key:'outNumber', width:140, prop:'commodityCode', format:()=>'0/0' },
          ]"
          :data="{commodityList:form.outCommodityList}"
          :show="[
            'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!formTitle'
          ]"
          :showSummary="false"
          :sort="['outNumber','commodityCode','goodsName']"
        ></buying-goods-edit>

        <div class="mt10 mb10">
          <span class="b mt5">机器号/扫SN码</span>
          <el-input @keypress.13.native="checkOut(outSNInput)" class="ml10 mt5" size="mini" style="width:200px;" v-model="outSNInput"></el-input>
          <span class="fr d-text-black mr10 mt5">
            <span>本次成功扫码</span>
            <span class="b d-text-red f16">3</span>
            <span>件，历史扫码</span>
            <span class="b d-text-green f16">5</span>
            <span>件，还需扫码</span>
            <span class="b d-text-blue f16">127</span>
            <span>件</span>
          </span>
        </div>
      </form-card>

      <!-- 机器号/SN码 -->
      <form-card title="机器号/SN码">
        <buying-goods-edit
          :customColumns="[
              { label:'操作', key:'actions', width:140, prop:'commodityCode',slot:'actions' },
              { label:'编号', key:'index', width:140, prop:'index', format:(a,b,c)=>c.index+1 },
              { label:'操作', key:'operate', width:140, prop:'operate', format:(a,b,c)=>b.exchangeType=='in'?'待入库':'待出库' },
              { label:'SN码', key:'snCode', width:140, prop:'snCode', },
              { label:'机器码', key:'robotCode', width:140, prop:'robotCode', },
              { label:'库房', key:'wmsName', width:140, prop:'wmsName', },
              { label:'换货人', key:'operator', width:140, prop:'operator',format:()=>currentUser },
              { label:'换入/换出时间', key:'createTime', width:140, prop:'createTime',type:'timestamp' },
          ]"
          :data="{commodityList:snList}"
          :show="[
            'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!formTitle'
          ]"
          :showSummary="false"
          :sort="['actions','index','operate','snCode','robotCode','wmsName','exchangeUser','time','commodityCode','goodsName','preTaxAmount']"
        >
          <template slot="actions" slot-scope="{info}">
            <span @click="remove(info.index)" class="el-icon-circle-close f18 d-pointer d-text-red"></span>
          </template>
        </buying-goods-edit>
      </form-card>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="close" size="small">关 闭</el-button>
      <el-button @click="save" size="small" type="primary">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    title: String
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 156;
    },
    currentUser() {
      return (this.$local.fetch('userInfo') || {}).userName;
    }
  },
  data() {
    return {
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      currentWMS: '',
      wmsError: '',
      wmsList: [],
      snList: [],
      inSNInput: [],
      outSNInput: ''
    };
  },
  mounted() {
    this.getWMSList();
  },
  methods: {
    getDetail() {
      if (this.rowData) return this.rowData;
    },
    async getWMSList() {
      let {
        data
      } = await this.$api.seePsiWmsService.commonwmsmanagerUsableList();
      this.wmsList = data;
    },
    async checkOut(sn) {
      let {
        data
      } = await this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck(
        {
          snCode: sn,
          commodityList: []
        }
      );
      this.outSNInput = '';
      this.snList.unshift(
        this.findExtrasInfo(this.form.outCommodityList, {
          ...data,
          exchangeType: 'out',
          createTime: +new Date()
        })
      );
      console.log(data);
    },
    async checkIn(index) {
      if (!this.currentWMS) {
        this.wmsError = '请先选择入库库房';
        return this.$message({
          message: '请先选择入库库房',
          type: 'warning'
        });
      } else {
        this.wmsError = '';
      }
      let sn = this.inSNInput[index];
      let good = this.form.inCommodityList[index];
      let {
        data
      } = await this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck(
        {
          snCode: sn,
          categoryCode: good.categoryCode,
          commodityCode: good.commodityCode,
          wmsId: this.currentWMS,
          putawayCommodityList: []
        }
      );
      this.inSNInput[index] = '';
      this.snList.unshift(
        this.findExtrasInfo(this.form.inCommodityList, {
          ...data,
          exchangeType: 'in',
          createTime: +new Date()
        })
      );
      console.log(data);
    },
    findExtrasInfo(list, data) {
      let [a] = list.filter(item => item.commodityCode == data.commodityCode);
      if (a) {
        ['categoryCode', 'className', 'specOne', 'configName', 'noteText'].map(
          key => {
            data[key] = a[key];
          }
        );
      }
      return data;
    },
    remove(i) {
      this.snList.splice(i, 1);
    },
    async save() {
      console.log(this.snList);
      if (this.snList.length) {
        let { ins, outs } = this.snList.reduce(
          (data, item) => {
            if (item.exchangeType == 'in') {
              data.ins.push(item);
            } else {
              data.outs.push(item);
            }
            return data;
          },
          { ins: [], outs: [] }
        );
        Promise.all([
          ins.length
            ? this.$api.seePsiWmsService.wmsinventorydetailBatchPutaway({
                businessCode: this.form.businessCode,
                putawayCommodityList: ins
              })
            : Promise.resolve(),
          outs.length
            ? this.$api.seePsiWmsService.wmsinventorydetailBatchShipment({
                businessCode: this.form.businessCode,
                putawayCommodityList: outs
              })
            : Promise.resolve()
        ]);
      } else {
        this.close();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>