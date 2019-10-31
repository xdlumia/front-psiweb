/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 组装商品 
 */
<template>
  <div>
    <form-card title='组装商品'>
      <d-table
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="title"
          label="操作"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="">
            <el-button
              type="primary"
              size="mini"
              @click='assemblyVisible = true'
            >组装</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="组装数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="可用数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="机器号/SN码"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="title"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>

      </d-table>
    </form-card>
    <commodityAssemblyEdit
      :visible='assemblyVisible'
      @close="assemblyVisible = false"
    />
  </div>
</template>
<script>
import commodityAssemblyEdit from './commodity-assembly-edit'
export default {
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
      assemblyVisible: false,//组装弹窗
    }
  },
  methods: {
  },
  components: {
    commodityAssemblyEdit
  },
}
</script>
<style scoped>
</style>
