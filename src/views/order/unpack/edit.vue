/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-16 16:19:10
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
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
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
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    getDetail() {
      if (this.rowData) {
        return this.rowData;
      }
      return {
        commodityList: []
      };
    },
    afterDetailInit() {
      // console.log('afterDetailInit', this.form);
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
          content: '请选择带拆卸商品',
          type: 'info'
        });
      }
      await this.$refs.form.validate();
      this.loading = true;
      try {
        let form = { ...this.form };
        form.commoditySaveVoList = form.commodityList.map(item => {
          return this.getCommodityInfo(item);
        });
        form.commoditySaveVoList.reduce((data, item) => {
          form.noDisassemblyNum = form.noDisassemblyNum || 0;
          form.noDisassemblyNum += parseInt(item.disassemblyNum) || 0;
          return form;
        }, form);
        delete form.commodityList;
        form.source = this.source || '新建';
        console.log(form);
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