  /*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 入库商品
 */
<template>
  <div>
    <form-card title='入库商品'>
      <div slot="title">
        <span></span>
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
          prop="title"
          label="操作"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="">
            <el-button
              type="primary"
              size="mini"
              @click="wareVisible = true,dialogData.title = '入库-IADFGHIDASHUN',dialogData.type = 'able'"
            >入库</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="入库数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="拆卸数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="title"
          label="机器号/SN码"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              class="d-text-blue"
              @click="wareVisible = true,dialogData.title = '机器号/SN码记录',dialogData.type = 'disable'"
            >{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="是否拆卸"
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
          label="商品名称"
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
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
    <purchaseWarehousing
      :visible='wareVisible'
      :dialogData='dialogData'
      @close='wareVisible = false'
    />
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import purchaseWarehousing from './purchase-warehousing'
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
      showInFullscreen: false,
      wareVisible: false,
      dialogData: {
        title: ''
      }
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    purchaseWarehousing,
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
