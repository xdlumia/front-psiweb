/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 10:42:25
 * @Description: 商品输入选框 字段已绑定 1
*/
<template>
  <span class="d-inline d-relative">
    <el-select
      :loading="loading"
      :remote-method="search"
      @change="onSelect"
      filterable
      placeholder="搜索商品名称"
      popper-class="custom-goods-selector"
      remote
      size="mini"
      v-model="selectGood"
    >
      <el-option
        :key="item.commodityCode"
        :label="type=='code'?item.commodityCode:item.goodsName"
        :value="item.commodityCode"
        v-for="(item,i) in options"
      >
        <el-row>
          <el-col
            :span="6"
            class="b d-text-black"
            v-if="i==0"
          >商品名称</el-col>
          <el-col
            :span="18"
            class="b d-text-black"
            v-if="i==0"
          >商品编号</el-col>
          <el-col
            :span="6"
            class="d-hidden d-elip"
          >{{item.goodsName}}</el-col>
          <el-col
            :span="18"
            class="d-hidden d-elip"
          >
            <span :title="item.commodityCode">{{item.commodityCode}}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
    <i
      @click="openDialog"
      class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon"
    ></i>
    <commodity-choose
      :isChooseOne="isChooseOne"
      :kinds="kinds"
      :params="wmsId?{wmsId}:params"
      :sn="sn"
      :visible.sync="showCommodityGoods"
      @choose="choose"
      @chooseOne="chooseOne"
      v-if="showCommodityGoods||showed"
    />
  </span>
</template>
<script>
export default {
  props: {
    codes: {
      type: Array,
      default: () => []
    },
    autoClear: {
      type: Boolean,
      default: true
    },
    kinds: Array,
    type: String,
    sn: Boolean,
    value: String,
    params: {
      type: Object,
      default: () => ({})
    },
    wmsId: Number, // 库房id,新增报溢报损要筛选当前库房下的id
    isChooseOne: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCommodityGoods: false,
      selectGood: '',
      options: [],
      showed: false,
      loading: false,
      searchTable: {}
    };
  },
  mounted() {
    if (this.value) {
      this.selectGood = this.value;
    } else {
      this.search();
    }
  },
  watch: {
    value() {
      this.selectGood = this.value || '';
    }
  },
  methods: {
    openDialog() {
      this.showCommodityGoods = true;
      this.showed = true;
    },
    choose(e) {
      const choose = e.filter(a => !this.codes.includes(a.commodityCode));
      if (choose.length) {
        this.$emit('choose', e, 'choose');
      }
    },
    chooseOne(e) {
      this.options.push(e);
      this.selectGood = e.commodityCode;
      this.$emit('choose', e);
    },
    async search(words = '') {
      words = String(words).trim();
      if (this.searchTable[words]) {
        return (this.options = this.searchTable[words]);
      }
      this.loading = true;
      const { data } = await this.$api.seePsiWmsService.wmsinventoryList({
        page: 1,
        limit: 5,
        goodsName: words,
        wmsId: this.wmsId
      });
      this.options = data || [];
      this.loading = false;
      this.searchTable[words] = data;
    },
    onSelect(e) {
      const goods = this.options.filter(
        item =>
          item.commodityCode == e && !this.codes.includes(item.commodityCode)
      );
      if (goods.length) {
        this.$emit('choose', goods, 'select');
        if (this.autoClear) {
          this.selectGood = '';
        }
      } else {
        this.selectGood = '';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select-icon {
  z-index: 200;
  background-color: #fff;
  height: 26px;
  top: 1px;
  width: 24px;
  text-align: center;
  line-height: 26px;
  right: 2px;
}
</style>
<style lang="scss">
.custom-goods-selector {
  .el-select-dropdown__item {
    &:first-child {
      height: 68px;
    }
  }
}
</style>
