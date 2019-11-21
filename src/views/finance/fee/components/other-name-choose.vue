/*
 * @Author: 赵伦
 * @Date: 2019-10-31 15:05:34
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-18 16:55:38
 * @Description: 商品输入选框 字段已绑定 1
*/
<template>
  <div class="d-relative">
    <el-input
      :disabled="disabled"
      :loading="loading"
      popper-class="custom-goods-selector"
      readonly=""
      size="mini"
      v-model="selectName"
      class="wfull"
      :show-word-limit="false"
    ></el-input>
    <i
      @click="openDialog"
      class="el-icon-plus d-text-blue d-absolute f18 b d-pointer select-icon"
      v-if="!disabled"
    ></i>
    <otherNameList :visible.sync="showCommodityGoods" @choose="choose" v-if="showCommodityGoods" />
  </div>
</template>
<script>
import otherNameList from './other-name-list'
export default {
  components: {
    otherNameList
  },
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
      selectName: '',
      options: [],
      showed: false,
      loading: false,
      searchTable: {}
    };
  },
  mounted() {
    if (this.value) {
      this.selectName = this.value;
    }
  },
  watch: {
    value() {
      this.selectName = this.value || '';
    }
  },
  methods: {
    openDialog() {
      this.showCommodityGoods = true;
    },
    choose(e) {
      if (e.length) {
        this.selectName = e[0].companyName || e[0].supplierName || e[0].serviceName
        this.$emit('choose', e, 'choose');
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
  bottom: 1px;
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
