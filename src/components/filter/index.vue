/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:31:09
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 11:11:50
 * @Description: 通用过滤组件
*/
<template>
  <div class="table-filter-box">
    <div class="bb mb10" style="height:25px;">
      <span class="b" style="margin-left:112px">筛选</span>
    </div>
    <div class="d-auto-y" style="max-height:400px; overflow-x:hidden">
      <!-- 过滤绘制区域 -->
      <el-form :model="form" class="filter-form" label-position="top" ref="filterForm" size="mini">
        <component
          :form="form"
          :is="getCmp(item)"
          :item="item"
          :key="item.props"
          v-for="item of filterAvailable"
          v-model="form[item.prop]"
          @change="startFilter"
        />
      </el-form>
    </div>
    <div style="height:30px; line-height:30px;">
      <!-- 添加筛选 -->
      <el-popover placement="bottom" ref="morePopover" trigger="click" width="200">
        <el-link :underline="false" @click="$refs.morePopover.doClose()" class="el-icon-close close fr" title="关闭"></el-link>
        <div>
          <div :key="item.prop" v-for="item of options">
            <el-checkbox v-model="usedFilter[item.prop]">
              <span class="checkbox-label">{{item.label}}</span>
            </el-checkbox>
          </div>
        </div>
        <el-link :underline="false" class="el-icon-circle-plus-outline" size="mini" slot="reference" type="primary">添加筛选</el-link>
      </el-popover>

      <el-link :underline="false" @click="clearFilter" class="fr" size="mini" type="primary">清空筛选</el-link>
    </div>
  </div>
</template>
<script>
const filterCmp = require.context('.', false, /(?<!index)\.vue$/);
const ComponentList = filterCmp.keys().reduce((cmp, name) => {
  let cmpName = name
    .replace(/-[a-z]/g, a => a[1].toUpperCase())
    .split(/[.\/.]/)
    .slice(-2)[0];
  let file = filterCmp(name).default;
  cmp[cmpName] = file;
  cmp[cmpName.toLowerCase()] = file;
  return cmp;
}, {});

export default {
  model: {
    prop: 'form',
    event: 'input'
  },
  props: {
    form: Object,
    options: {
      type: Array,
      default: () => [
        { label: '采购单编号', prop: 'orderNo', default: true },
        {
          label: '下拉选框',
          prop: 'select',
          default: true,
          type: 'select',
          options: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' }
          ]
        },
        {
          label: '单据状态',
          prop: 'orderStatus',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        }, // 业务字典
        { label: '销售要求到货时间', prop: 'requireTime', type: 'daterange' }, // 时间区间
        { label: '数量', prop: 'numNo', type: 'numberrange' }, // 数字区间
        { label: '单据执行人', prop: 'actUser', type: 'employee' } // 员工搜索
      ]
    }
  },
  data() {
    return {
      addMoreFilter: false,
      usedFilter: {}
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    filterAvailable() {
      return this.options.filter(item => {
        let choose = this.usedFilter[item.prop];
        if (!choose) {
          if (item.type && item.type.match(/range$/i)) {
            this.$set(this.form, 'min' + item.prop, '');
            this.$set(this.form, 'max' + item.prop, '');
          } else {
            this.$set(this.form, item.prop, '');
          }
        } else {
          this.$set(
            this.form,
            item.prop,
            typeof this.form[item.prop] == 'undefined'
              ? ''
              : this.form[item.prop]
          );
        }
        return choose;
      });
    }
  },
  methods: {
    init() {
      console.log(this);
      let used = {};
      this.options.map(item => {
        used[item.prop] = item.default ? true : false;
      });
      this.usedFilter = used;
    },
    clearFilter() {
      this.$refs.filterForm.resetFields();
    },
    getCmp(item) {
      let type = String(item.type || 'text');
      return (
        ComponentList[type] ||
        ComponentList[type.toLowerCase()] ||
        ComponentList.text
      );
    },
    resetPropsModel() {
      //
    },
    startFilter(){
    }
  }
};
</script>
<style lang="scss" scoped>
.table-filter-box {
  .filter-form {
    /deep/ {
      .el-form-item {
        margin-bottom: 5px;
      }
    }
  }
  .checkbox-label {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
    display: inline-block;
  }
}
</style>