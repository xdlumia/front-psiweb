/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-29 20:31:01
 * @Description: 直发单发货
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>直发单发货</span>
    </div>
    <el-form ref="form" style="max-height:calc(100vh - 130px)" v-model="form">
      <deliverGoods :data="form" id="deliverGoods"></deliverGoods>
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">确定</el-button>
      <el-button @click="close" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  computed: {
    maxHeight() {
      return window.innerHeight - 240;
    }
  },
  data() {
    return {
      form: {
        // delivers
        delivers: [],
        directCode: '',
        // 是否完成 0全部为空 1部分为空 2全部不为空
        flag: ''
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    async save() {
      let data = {};
      let delivers = [];
      let currentCode = '';
      this.form.delivers.map(item => {
        if (!item.fake) {
          currentCode = item.commodityCode;
          data[currentCode] = {
            bcId: item.bcId || item.id,
            directCode: this.code || this.rowData.directCode,
            commodityCode: item.commodityCode,
            commodityNumber: item.commodityNumber,
            completeNumber: 0,
            directDeliverList: []
          };
          delivers.push(data[currentCode]);
        }
        if (item.deliverInfo.snCode || item.deliverInfo.orderCode) {
          data[currentCode].directDeliverList.push({
            ...item.deliverInfo,
            bcId: item.bcId || item.id,
            directCode: this.code || this.rowData.directCode
          });
          if (item.deliverInfo.snCode && item.deliverInfo.orderCode) {
            data[currentCode].completeNumber++;
          }
        }
      });
      // 是否完成 0全部为空 1部分为空 2全部不为空
      let flag = 0;
      let flagStatus = delivers.reduce(
        (data, item) => {
          data.total += item.commodityNumber;
          data.complete += item.completeNumber;
          return data;
        },
        {
          total: 0,
          complete: 0
        }
      );
      if (flagStatus.complete != flagStatus.total) {
        if (flagStatus.complete) {
          flag = 1;
        }
      } else {
        flag = 2;
      }
      this.loading = true;
      try {
        await this.$api.seePsiPurchaseService.purchasedirectDeliver({
          delivers: delivers.filter(item => item.directDeliverList.length),
          directCode: this.form.directCode,
          flag
        });
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    },
    async getDetail() {
      let code = this.code || this.rowData.directCode;
      if (code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchasedirectDeliverList(
          null,
          code
        );
        let deliverGoodsStatus = data.reduce((data, item) => {
          data[item.commodityCode] = item;
          return data;
        }, {});
        this.rowData.commodityEntityList.map(item => {
          if (!deliverGoodsStatus[item.commodityCode]) {
            data.push({ ...item });
          } else {
            Object.assign(deliverGoodsStatus[item.commodityCode], {
              ...item,
              directDeliverList:
                deliverGoodsStatus[item.commodityCode].directDeliverList
            });
          }
        });
        let delivers = [];
        data.map(item => {
          item.deliverInfo = {
            snCode: '',
            orderCode: ''
          };
          delivers.push(item);
          let listNum = item.commodityNumber || 0;
          let preNum = 1;
          if (item.directDeliverList && item.directDeliverList.length) {
            item.deliverInfo = item.directDeliverList.splice(0, 1)[0];
            item.directDeliverList.map(item => {
              preNum++;
              delivers.push({
                deliverInfo: item,
                fake: true,
                commodityCode: item.commodityCode
              });
            });
          }
          if (preNum < listNum) {
            Array(listNum - preNum)
              .fill('')
              .map(() => {
                delivers.push({
                  deliverInfo: {
                    snCode: '',
                    orderCode: ''
                  },
                  fake: true,
                  commodityCode: item.commodityCode
                });
              });
          }
        });
        return {
          delivers,
          directCode: code,
          flag: 0
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>