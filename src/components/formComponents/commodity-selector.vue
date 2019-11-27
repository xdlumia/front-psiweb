/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-27 13:56:28
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
      v-model="selectGood"
    >
      <el-option
        :key="item.commodityCode"
        :label="type=='code'?item.commodityCode:item.goodsName"
        :value="item.commodityCode"
        v-for="(item,i) in options"
      >
        <el-row>
          <el-col :span="6" class="b d-text-black" v-if="i==0">商品名称</el-col>
          <el-col :span="18" class="b d-text-black" v-if="i==0">商品编号</el-col>
          <el-col :span="6" class="d-hidden d-elip">{{item.goodsName}}</el-col>
          <el-col :span="18" class="d-hidden d-elip">
            <span :title="item.commodityCode">{{item.commodityCode}}</span>
          </el-col>
        </el-row>
      </el-option>
    </el-select>
    <i @click="openDialog" class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon" v-if="!disabled"></i>
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
let preReqs = new Map();

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
    } else {
      this.search();
      this.$root.$on('loadSearch', () => {
        this.searchTable = [];
        this.search();
        this.$refs.commodityChoose.reload();
      });
    }
  },
  watch: {
    value() {
      this.selectGood = this.value || '';
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
          item => item.commodityCode === e.commodityCode
        );
        if (index === -1) {
          this.options.push(e);
        }
        this.selectGood = e.commodityCode;
        this.preSelectGoods = e.commodityCode;
      }
      const choose = e.filter(a => !this.codes.includes(a.commodityCode));
      if (choose.length) {
        this.$emit('choose', e, 'choose');
      }
    },
    async search(words = '') {
      words = String(words).trim();
      if (this.searchTable[words]) {
        return (this.options = this.searchTable[words]);
      }
      this.loading = true;
      const api = this.sn ? 'wmsinventorydetailList' : 'wmsinventoryList';
      let params = Object.assign(
        {
          page: 1,
          limit: 50,
          goodsName: words,
          categoryCode:
            this.kinds && this.kinds.length ? this.kinds[0].value : ''
        },
        this.params
      );
      let key = JSON.stringify({ ...params, sn: this.sn });
      let preReq = preReqs.get(key);
      let req = Promise.resolve();
      if (preReq && preReq.timestamp >= +new Date() - 10 * 1000) {
        req = preReq.data;
      } else {
        req = this.$api.seePsiWmsService[api](params);
        preReqs.set(key, {
          data: req,
          timestamp: +new Date()
        });
      }
      const { data } = await req;
      this.options = data || [];
      this.loading = false;
      this.searchTable[words] = data;
      this.$emit('response', data);
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
        this.selectGood = this.preSelectGoods || '';
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
