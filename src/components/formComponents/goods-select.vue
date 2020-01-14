/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 11:25:09
 * @Description: 商品选择
 */
<template>
  <div>
    <form-card :title='title'>
      <d-table
        :paging='false'
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        max-height='300px'
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="拣货数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              @click="getTableVisible(scope.row)"
              class="d-text-blue"
            >{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
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
          prop="cityName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="title"
          label="商品规格"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">XSD20190201000001</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
      <el-dialog
        title="SN码记录"
        :visible.sync="commDialogVisible"
        width="600"
        v-dialogDrag
      >

      </el-dialog>
    </form-card>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '商品选择'
    }
  },
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
      commDialogVisible: false,
    }
  },
  methods: {
    //点击机器号和SN码
  },
  components: {
  },
}
</script>
<style scoped>
</style>
