/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 盘点商品
 */
<template>
  <div>
    <form-card title='盘点商品'>
      <div slot="title">
        <span>盘点商品</span>
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
      <el-table
        ref="companyTable"
        :data="tableData"
        border
        size="mini"
        class="college-main"
        style="height:calc(100vh - 340px)"
      >
        <el-table-column
          fixed
          prop="name"
          label="实际数量"
          min-width="120"
          show-overflow-tooltip
        >
          <template
            slot-scope="scope"
            class="d-relative"
          >
            <div
              class="ac"
              style="width:100px;height:28px;background-color:#F5F7FA;color:#C0C4CC;border:1px solid #E4E7ED;border-radius:5px;line-height:27px"
            >
              {{scope.row.commodityInfoList ? scope.row.commodityInfoList.length : '扫码添加'}}
            </div>
            <i
              @click="clickCode(scope)"
              class="d-text-blue d-absolute f14 b d-pointer"
              style='right:15px;z-index:200;top:8px;'
            >码</i>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="name"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="name"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          min-width="140"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          min-width="80"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>

      </el-table>
      <scanCodeInventory
        :visible.sync='codeVisible'
        :commodityForm='commodityForm'
        :addform='addform'
        @sumitSn='sumitSn'
      />
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import scanCodeInventory from './scan-code-inventory';

export default {
  props: ['addform'],
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
      tableData: [{ name: '假的' }],
      codeVisible: false,
      showInFullscreen: false,
      commodityForm: {}
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击码字
    clickCode(scope) {
      this.codeVisible = true
      this.commodityForm = scope.row
      this.ceIndex = scope.$index
    },
    //扫码成功以后的保存
    sumitSn(data) {
      this.$set(this.tableData[this.ceIndex], 'commodityInfoList', data)
      this.tableData.forEach((item) => {
        if (item.commodityCode) {
          this.addForm.commodityList.push(item)
        }
      })
    }
  },
  components: {
    FullscreenElement,
    scanCodeInventory
  },
}
</script>
<style scoped>
</style>
