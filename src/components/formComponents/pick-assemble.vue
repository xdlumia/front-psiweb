/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 组装商品 组装单详情弹窗
 */
<template>
  <div>
    <form-card title='组装商品'>
      <el-table
        border
        size='mini'
        :data="data.commodityList"
        ref="companyTable"
        row-key="commodityCode"
        style="max-height:300px"
        :tree-props="{children: 'childrenCommodityList'}"
      >
        <el-table-column
          fixed
          min-width="50"
        ></el-table-column>
        <el-table-column
          min-width="100"
          label="待分配"
          show-overflow-tooltip
        >
          <template
            slot-scope="scope"
            v-if="scope.row.childrenCommodityList"
          >
            <span>{{scope.row.allocationNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="本次分配数量"
          min-width="150"
          show-overflow-tooltip
        >
          <template
            slot-scope="scope"
            v-if="scope.row.childrenCommodityList"
          >
            <el-input-number
              class="wfull"
              size='mini'
              v-model="scope.row.num"
              :controls='false'
              :min="0"
              label="请输入"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>

      </el-table>
    </form-card>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      dialogVisible: false,
    }
  },
  methods: {
  },
  components: {
  },
}
</script>
<style scoped>
</style>
