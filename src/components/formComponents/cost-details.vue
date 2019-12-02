/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 成本明细
 */  
<template>
  <div>
    <form-card title='成本明细'>
      <div slot="title">
        <span>成本明细</span>
        <span class="fr">
          <span>
            <el-link
              :underline="false"
              @click="fullscreen"
              type="primary"
            >全屏显示</el-link>
          </span>
        </span>
      </div>
      <d-table
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        max-height='300px'
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          prop="cityName"
          min-width="50"
          label="序号"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="业务日期"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="出入库库房"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="关联业务"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="title"
          label="关联业务编号"
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
          label="入库量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="入库成本单价"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="入库成本总价"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="100"
          label="出库量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="出库成本单价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="出库成本总价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="80"
          label="结余量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="140"
          label="结余成本总价"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
    </form-card>
    <FullscreenElement
      :element="$refs.companyTable"
      :visible.sync="showInFullscreen"
    />
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
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
      showInFullscreen: false
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
  },
  components: {
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
