/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:29:00
 * @Description: 拆卸单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>拆卸单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="商品信息" name="unpackGoods" />
      <d-tab-pane label="基本信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="form&&visible">
          <unpackGoods :data="form" id="unpackGoods" />
          <extrasInfo :data="form" :needUpload="false" id="unpackGoods" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String // 来源
  },
  computed: {
    
  },
  data() {
    return {
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    getDetail() {
      if (this.rowData) {
        return this.rowData;
      }
      return {
        commodityList: []
      };
    },
    getCommodityInfo({
      children,
      commodityCode,
      goodsName,
      disassemblyNum,
      purchaseUnivalence,
      singleNum
    }) {
      return {
        childrenCommoditySaveVoList:
          children && children.length
            ? children.map(this.getCommodityInfo)
            : undefined,
        commodityCode,
        goodsName,
        disassemblyNum,
        purchaseUnivalence,
        singleNum
      };
    },
    async save() {
      if (!this.form.commodityList || !this.form.commodityList.length) {
        return this.$message({
          message: '请选择带拆卸商品',
          type: 'warning'
        });
      }
      if (
        this.form.commodityList.some(item => {
          if (!item.children || !item.children.length) {
            return true;
          }
        })
      ) {
        return this.$message({
          message: '请添加整机拆卸配件',
          type: 'warning'
        });
      }
      await this.$showFormError(this.$refs.form);
      this.loading = true;
      try {
        let form = { ...this.form };
        form.commoditySaveVoList = form.commodityList.map(item => {
          return this.getCommodityInfo(item);
        });
        form.commoditySaveVoList.reduce((data, item) => {
          form.undistributedNum = form.undistributedNum || 0;
          form.undistributedNum += parseInt(item.disassemblyNum) || 0;
          return form;
        }, form);
        delete form.commodityList;
        form.source = this.source || '新建';
        if (this.isEdit) {
          await this.$api.seePsiWmsService.wmsdisassemblyorderUpdate(form);
        } else {
          await this.$api.seePsiWmsService.wmsdisassemblyorderSave(form);
        }
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