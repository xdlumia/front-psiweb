/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:29:13
 * @Description: 采购-供应商
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <div class="supplier-cat-page wfull" style="position:relative;">
      <div class="cat-tree">
        <ProductArea @change="reload" v-model="defaultParams.productRange" />
      </div>
      <TableView
        :exportButton="authorityButtons.includes('psi_supplier_03')"
        :filterOptions="filterOptions"
        :params="Object.assign(defaultParams,params)"
        api="seePsiCommonService.commonsupplierinfoPagelist"
        busType="42"
        exportApi="seePsiCommonService.commonsupplierinfoExport"
        ref="tableView"
        title="供应商"
      >
        <template slot="button">
          <el-button @click="showCat=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_supplier_06')">商品供应分类表</el-button>
          <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_supplier_07')">新增供应商</el-button>
        </template>
        <template slot-scope="{column,row,value,prop}">
          <span v-if="prop=='code'">
            <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value|codeSlice}}</el-link>
          </span>
          <span v-else-if="prop=='productRange'">
            <el-tag
              :disable-transitions="false"
              :key="item"
              @close="delProductRange(row,item)"
              class="mr5"
              closable
              size="mini"
              type="info"
              v-for="item of getProductRangeList(value)"
            >{{item|dictionary('PSI_GYS_CPFW')}}</el-tag>
          </span>
          <span v-else>{{value}}</span>
        </template>
      </TableView>
      <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
      <Edit :visible.sync="showEdit" @reload="reload" v-if="showEdit" />
      <Cat :visible.sync="showCat" @reload="reload" v-if="showCat" />
    </div>
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 供应商详情
import Edit from './edit'; // 供应商详情
import Cat from './cat'; // 供应商详情

import ProductArea from './product-area';

export default {
  components: {
    TableView,
    Detail,
    Edit,
    Cat,
    ProductArea
  },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 20 })
    }
  },
  data() {
    return {
      defaultParams: {
        page: 1,
        limit: 20,
        productRange: ''
      },
      status: [],
      showDetail: false,
      showEdit: false,
      showCat: false,
      currentCode: '',
      filterOptions: [
        { label: '供应商编号', prop: 'code', default: true },
        { label: '供应商名称', prop: 'fuzzySupplierName', default: true },
        {
          label: '状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '启用中', value: 0 },
            { label: '停用中', value: 1 }
          ],
          default: true
        },
        { label: '联系人', prop: 'linkManName', default: true },
        { label: '联系电话', prop: 'phone', default: true },
        {
          label: '产品范围',
          prop: 'productRange',
          type: 'dict',
          dictName: 'PSI_GYS_CPFW',
          default: true
        },
        { label: '供应商创建人', prop: 'creator', type: 'employee' },
        { label: '创建人部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    reload() {
      this.$refs.tableView.reload();
    },
    getProductRangeList(item) {
      return String(item || '')
        .split(',')
        .map(a => a.trim())
        .filter(a => a);
    },
    async delProductRange(row, item) {
      await this.$confirm(`是否删除？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
        center: true
      });
      let leftList = this.getProductRangeList(row.productRange)
        .filter(a => a != item)
        .join(',');
      await this.$api.seePsiCommonService.commonsupplierinfoUpdate({
        id: row.id,
        code: row.code,
        productRange: leftList
      });
      row.productRange = leftList;
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
  .supplier-cat-page {
    position: relative;
    width: 100%;
    height: 100%;
    .cat-tree {
      position: absolute;
      top: 47px;
      width: 320px;
      height: calc(100% - 80px);
      border: 1px solid #f1f1f1;
      border-right: 0px;
    }
    .main-content {
      height: 100%;
      /deep/ {
        > div:first-child + div {
          > .el-table {
            width: calc(100% - 320px) !important;
            margin-left: 320px;
          }
        }
      }
    }
  }
}
</style>
