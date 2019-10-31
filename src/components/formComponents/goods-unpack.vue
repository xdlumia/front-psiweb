/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:02:43 
 * @Description: 拆卸商品
 */
<template>
  <div>
    <form-card title="拆卸商品">
      <div slot="title">
        <span>拆卸商品</span>
        <span class="fr">
          <span>
            <el-link :underline="false" @click="fullscreen" type="primary">全屏显示</el-link>
          </span>
        </span>
      </div>
      <d-table
        :params="queryForm"
        :tree-props="{children: 'id', hasChildren: 'id'}"
        api="seePumaidongService.collegeManagerList"
        class="college-main"
        ref="companyTable"
        style="height:calc(100vh - 340px)"
      >
        <el-table-column fixed label="拆卸数量" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column fixed label="待分配" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column fixed label="机器号/SN码" min-width="100" prop="title" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="getTableVisible(scope.row)" class="d-text-blue">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" min-width="140" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="配件数量" min-width="140" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="采购单价" min-width="140" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="税率" min-width="140" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="含税总价" min-width="140" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品名称" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品类别" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品分类" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品规格" min-width="140" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品配置" min-width="100" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="单位" min-width="80" prop="cityName" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" min-width="80" prop="cityName" show-overflow-tooltip></el-table-column>
      </d-table>
      <FullscreenElement :element="$refs.companyTable" :visible.sync="showInFullscreen" />
      <el-dialog :visible.sync="dialogVisible" title="机器号/SN码记录" v-dialogDrag width="600">
        <commodityPicking />
        <machineSn />
      </el-dialog>
    </form-card>
  </div>
</template>
<script>
import commodityPicking from '@/components/formComponents/commodity-picking';
import FullscreenElement from '@/components/fullscreen-element';
import machineSn from '@/components/formComponents/machine-sn';
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
    };
  },
  methods: {
    //点击机器号和SN码
    getTableVisible() {
      this.dialogVisible = true;
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    commodityPicking,
    machineSn,
    FullscreenElement
  }
};
</script>
<style scoped>
</style>
