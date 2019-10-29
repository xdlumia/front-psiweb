/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 库房  销售单 详情组件 出库商品
 */
<template>
  <div>
    <form-card title='出库商品'>
      <div slot="title">
        <span>出库商品</span>
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
          label="发货数量"
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
          align="left"
          prop="cityName"
          label="总组装数量"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="机器号/SN码"
          min-width="100"
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
          label="出库数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="是否组装"
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
          label="可用库存"
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
          min-width="140"
          label="商品规格"
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
          min-width="80"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>

      </d-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
      <el-dialog
        title="机器号/SN码记录"
        :visible.sync="dialogVisible"
        width="600"
        v-dialogDrag
      >
        <commodityPicking />
        <machineSn />
      </el-dialog>
    </form-card>
  </div>
</template>
<script>
import commodityPicking from '@/components/formComponents/commodity-picking'
import FullscreenElement from '@/components/fullscreen-element';
import machineSn from '@/components/formComponents/machine-sn'
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
    //点击机器号和SN码
    getTableVisible() {
      this.dialogVisible = true
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    commodityPicking,
    machineSn,
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
