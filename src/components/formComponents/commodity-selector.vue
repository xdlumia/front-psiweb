/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-02 18:45:40
 * @Description: 商品输入选框 字段已绑定 1
*/
<template>
  <span class="d-inline d-relative">
    <el-select
      :disabled="disabled"
      :loading="loading"
      :remote-method="search"
      @change="onSelect"
      filterable
      placeholder="搜索商品名称"
      popper-class="custom-goods-selector"
      remote
      size="mini"
      :value="selectGood"
    >
      <!-- // 有Sn码的时候，商品code有可能是重复的，所以要snCode—+机器号作为唯一值 -->
      <el-option
        :key="item.snCode"
        :label="type=='code'?$options.filters.codeSlice(item.commodityCode):item.goodsName"
        :value="sn?(item.snCode+item.robotCode):item.commodityCode"
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
            <span :title="item.commodityCode">{{item.commodityCode|codeSlice}}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
    <i
      @click="openDialog"
      class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon"
      v-if="!disabled"
    ></i>
    <commodity-choose
      :kinds="kinds"
      :multiple="multiple"
      :params="wmsId?{wmsId}:params"
      :sn="sn"
      :visible.sync="showCommodityGoods"
      @choose="choose"
      ref="commodityChoose"
      v-if="showCommodityGoods||showed"
    />
  </span>
</template>
<script>
import { RequestCache } from '@/utils/requestCache';
let cache = new RequestCache();

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
    sn: {
      type: Boolean,
      default: false
    },
    value: String,
    params: {
      type: Object,
      default: () => ({})
    },
    wmsId: Number, // 库房id,新增报溢报损要筛选当前库房下的id
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },
  data() {
    return {
      showCommodityGoods: false,
      selectGood: '',
      preSelectGoods: '',
      options: [],
      showed: false,
      loading: false,
      searchTable: {}
    };
  },
  mounted() {
    if (this.value) {
      this.selectGood = this.value;
      this.preSelectGoods = this.value;
      if(this.type=='code'){
        this.selectGood=this.$options.filters.codeSlice(this.selectGood)
      }
    } else {
      this.search();
      this.$root.$on('loadSearch', () => {
        this.searchTable = [];
        this.search();
        this.showCommodityGoods = false;
        this.showed = false;
      });
    }
  },
  watch: {
    value() {
      this.selectGood = this.value || '';
      if(this.type=='code'){
        this.selectGood=this.$options.filters.codeSlice(this.selectGood)
      }
      this.preSelectGoods = this.value || '';
    }
  },
  methods: {
    openDialog() {
      this.showCommodityGoods = true;
      this.showed = true;
    },
    choose(e) {
      if (!this.multiple) {
        const index = this.options.findIndex(
          item => item.commodityCode === e[0].commodityCode
        );
        if (index === -1) {
          this.options.push(e[0]);
        }
        this.selectGood = e[0].commodityCode;
        if(this.type=='code'){
          this.selectGood=this.$options.filters.codeSlice(this.selectGood)
        }
        this.preSelectGoods = e[0].commodityCode;
      }
      const choose = e.filter(a => !this.codes.includes(a.commodityCode));
      if (choose.length) {
        this.$emit('choose', choose, 'choose');
      }
    },
    async search(words = '') {
      words = String(words).trim();
      if (this.searchTable[words]) {
        return (this.options = this.searchTable[words]);
      }
      this.loading = true;
      const api = this.sn ? 'wmsinventorydetailList' : 'wmsinventoryList';
      const { data } = await cache.in(10).for(
        this.$api.seePsiWmsService[api],
        Object.assign(
          {
            page: 1,
            limit: 50,
            goodsName: words,
            categoryCode:
              this.kinds && this.kinds.length ? this.kinds[0].value : ''
          },
          this.params
        )
      );
      this.options = data || [];
      this.loading = false;
      this.searchTable[words] = data;
      this.$emit('response', data);
    },
    onSelect(e) {
      const goods = !this.sn ? this.options.filter(
        item =>
          item.commodityCode == e && !this.codes.includes(item.commodityCode)
      )
        // 有Sn码的时候，商品code有可能是重复的，所以要snCode—+机器号作为唯一值
        : this.options.filter(
          item =>
            (item.snCode + item.robotCode) == e
        )

      if (goods.length) {
        this.$emit('choose', goods, 'select');
        if (this.autoClear) {
          this.selectGood = '';
        }else{
          if(this.type=='code'){
            this.selectGood=this.$options.filters.codeSlice(this.selectGood)
          }
        }
      this.$forceUpdate()
      } else {
        this.selectGood = this.preSelectGoods || '';
        if(this.type=='code'){
          this.selectGood=this.$options.filters.codeSlice(this.selectGood)
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select-icon {
  z-index: 1;
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
