/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-30 17:43:52
 * @Description: 组装任务组装弹窗 
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      title="组装-DHYFBHBAFVDI"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:600px;">
          <!-- 商品列表 -->
          <form-card
            class="borrow-goods-info"
            title="新商品组装"
          >
            <el-table
              border
              :data="tableData"
              max-height="400"
              size="mini"
            >
              <el-table-column
                label="未装数量"
                min-width="70"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品编号"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品类别"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品分类"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品名称"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品配置"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="商品规格"
                min-width="110"
                prop="name"
              ></el-table-column>
              <el-table-column
                label="备注"
                min-width="120"
                prop="name"
              ></el-table-column>
            </el-table>

            <div class="mt10 mb10">
              <span class="b mt5">机器号</span>
              <el-input
                size="mini"
                style="width:200px;"
                class="ml10 mt5"
                v-model="data"
              ></el-input>
              <span class="fr d-text-black mr10 mt5">
                <span>本次成功扫码</span>
                <span class="b d-text-red f16">3</span>
                <span>件，历史扫码</span>
                <span class="b d-text-green f16">5</span>
                <span>件，还需扫码</span>
                <span class="b d-text-blue f16">127</span>
                <span>件</span>
              </span>
            </div>
          </form-card>
          <d-table
            api="seePumaidongService.collegeManagerList"
            :params="queryForm"
            ref="companyTable"
            class="college-main mt15"
            style="height:300px"
            :tree-props="{children: 'id', hasChildren: 'id'}"
          >
            <el-table-column
              fixed
              min-width="50"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="">
                <i
                  class="el-icon-error d-pointer"
                  style="font-size:20px;color:#F5222D"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="cityName"
              min-width="80"
              label="编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              fixed
              prop="title"
              label="SN码"
              min-width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="title"
              label="机器号"
              min-width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="cityName"
              min-width="100"
              label="自定义项"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              fixed
              prop="cityName"
              min-width="100"
              label="拣货库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="cityName"
              min-width="100"
              label="拣货人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="拣货时间"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
            <el-table-column
              prop="cityName"
              min-width="100"
              label="商品编号"
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
              label="配置"
              show-overflow-tooltip
            ></el-table-column>
          </d-table>
        </el-main>
      </el-container>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="$emit('close')"
          size="small"
        >确 定</el-button>
        <el-button
          @click="$emit('close')"
          size="small"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: '',
      tableData: [{ name: '写的假的' }],
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
    };
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>