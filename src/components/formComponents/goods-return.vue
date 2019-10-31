/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 19:10:49
 * @Description: 退货商品信息
*/
<template>
  <div>
    <form-card title='退货商品信息'>
      <div slot="title">
        <span>退货商品信息</span>
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
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
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
          label="拣货数量"
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
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>

      </d-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
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
    }
  },
  components: {
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
