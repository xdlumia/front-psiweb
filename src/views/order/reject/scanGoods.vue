/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-03 13:41:40
 * @Description: 采购退货扫码
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>采购退货单</span>
      <span class="fr mr20"></span>
    </div>
    <el-form :model="form" class="p10">
      <form-card title="采购退货商品">
        <el-form :model="form" ref="form" v-if="form&&visible">
          <rejectScanCard :data="form" id="rejectScanCard"></rejectScanCard>
        </el-form>
      </form-card>
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    id: [Number, String]
  },
  data() {
    return {
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    getDetail() {
      return this.rowData;
    },
    async save() {
      await this.$showFormError(this.$refs.form);
      if (
        !this.form.putawayCommodityList ||
        !this.form.putawayCommodityList.length
      ) {
        return this.close();
      }
      this.loading = true;
      let form = {
        ...this.form,
        businessType: 31
      };
      delete form.commodityList;
      try {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsinventorydetailBatchShipment(
          form
        );
        await this.$api.seePsiPurchaseService.purchasealterationPutout({
          alterationCode: this.rowData.businessCode,
          id: this.id
        });
        this.setEdit();
        this.close();
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>