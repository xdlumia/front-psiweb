/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-25 18:02:01
 * @Description: 库房  销售单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <table-top>
    </table-top>
     <d-table
      api="seePumaidongService.collegeManagerList"
      :params="queryForm"
      ref="companyTable"
      class="college-main"
      style="height:calc(100% - 40px)"
    >
      <el-table-column prop="title" label="销售出库单编号" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="d-text-blue">XSD20190201000001</span>
        </template>
      </el-table-column>
      <el-table-column prop="cityName" min-width="100" label="客户名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="销售单编号" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="getTableVisible(scope.row)" class="d-text-blue ac">XSD20190201000001</span>
        </template>
      </el-table-column>
      <el-table-column prop="cityName" min-width="100" label="出库状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="发货状态" show-overflow-tooltip></el-table-column>
      <el-table-column align="left" prop="cityName" label="组装任务状态" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="拣货状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="商品类别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="出库数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="未出库量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="已出库量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="出库人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="生成时间" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column prop="cityName" min-width="100" label="单据创建人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" min-width="100" label="创建部门" show-overflow-tooltip></el-table-column>
    </d-table>
    <!-- 右侧滑出 -->
    <el-drawer
      :title="visibleMeta.title"
      :visible.sync="tableVisible"
      direction="rtl"
      size="50%">
      <div class='p10'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="详情"></el-tab-pane>
          <el-tab-pane label="拣货单"></el-tab-pane>
          <el-tab-pane label="组装任务"></el-tab-pane>
          <el-tab-pane label="发货单"></el-tab-pane>
          <el-tab-pane label="销售出库单"></el-tab-pane>
          <el-tab-pane label="借入单"></el-tab-pane>
          <el-tab-pane label="应收账单"></el-tab-pane>
        </el-tabs>
        <components :is='visibleMeta.component' :visibleMeta="visibleMeta">
        </components>
      </div>
    </el-drawer>
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import Details from './details.vue'
export default {
  components: {
    Details
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
      componentActive:'',//当前的组件
      tableVisible:false,//销售单右侧抽屉
      visibleMeta:{//弹框的相关数据
        title:'',
        component:'Details'
      },
      activeName:''
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data){
      this.tableVisible = true
      this.visibleMeta.title = '销售单'+data.id
    },
    //tab换组件
    handleClick(){
      
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
