  /*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:02:43
 * @Description: 换货任务 换货商品
 */
<template>
  <div>
    <form-card title='换货商品'>
      <div slot="title">
        <span>换货商品</span>
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
      <div ref="companyTable">
        <!-- 换入 -->
        <d-table
          api="seePumaidongService.collegeManagerList"
          :params="queryForm"
          class="college-main"
          max-height='300px'
          :tree-props="{children: 'id', hasChildren: 'id'}"
        >
          <el-table-column
            fixed
            prop="cityName"
            min-width="100"
            label="换入数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="SN码"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                class="d-text-blue"
                @click="wareVisible = true,dialogData.title = '商品调入记录',dialogData.type = 'disable'"
              >{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="cityName"
            min-width="100"
            label="换入库房"
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
          <el-table-column
            prop="cityName"
            min-width="100"
            label="换入数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="换入金额"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="税率"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="含税金额"
            show-overflow-tooltip
          ></el-table-column>

        </d-table>

        <!-- 换出 -->
        <d-table
          api="seePumaidongService.collegeManagerList"
          :params="queryForm"
          class="college-main mt15"
          max-height='300px'
          :tree-props="{children: 'id', hasChildren: 'id'}"
        >
          <el-table-column
            fixed
            prop="cityName"
            min-width="100"
            label="换出数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="SN码"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                class="d-text-blue"
                @click="wareVisible = true,dialogData.title = '商品调出记录',dialogData.type = 'disable'"
              >{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="cityName"
            min-width="100"
            label="换入库房"
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
          <el-table-column
            prop="cityName"
            min-width="100"
            label="换出数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="换出金额"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="税率"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="含税金额"
            show-overflow-tooltip
          ></el-table-column>

        </d-table>
      </div>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
    <commodityRecord
      :visible.sync='wareVisible'
      :dialogData='dialogData'
      @close='wareVisible = false'
    />
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import commodityRecord from './commodity-record'
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
    commodityRecord,
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
