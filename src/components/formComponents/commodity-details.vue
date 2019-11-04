/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 商品明细
 */
<template>
  <div>
    <form-card title='商品明细'>
      <d-table
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          prop="cityName"
          min-width="50"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
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
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="title"
          label="商品规格"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="SN码"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="140"
          label="机器号"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="入库人"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="入库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="关联业务编号"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
    </form-card>
  </div>
</template>
<script>
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
