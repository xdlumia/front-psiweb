/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-18 10:46:35
 * @Description: 拆卸记录 已绑定 1
*/
<template>
  <div>
    <el-dialog :visible="visible" @close="close" title="拆卸记录" v-dialogDrag width="800px">
      <el-container>
        <el-main style="padding:0;max-height:600px;">
          <buying-goods-edit
            :data="{commodityList:commodityList||[]}"
            :show="[
              'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!fullscreen'
            ]"
            :showSummary="false"
            title="拆卸信息"
          ></buying-goods-edit>
          <form-card title="机器号/SN记录">
            <d-table
              :params="queryForm"
              :tree-props="{children: 'id', hasChildren: 'id'}"
              api="seePsiWmsService.wmsflowrecordList"
              class="college-main"
              ref="companyTable"
              style="height:380px;"
            >
              <el-table-column label="SN码" min-width="100" prop="snCode" show-overflow-tooltip></el-table-column>
              <el-table-column label="机器号" min-width="100" prop="robotCode" show-overflow-tooltip></el-table-column>
              <el-table-column label="库房" min-width="100" prop="wmsName" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作人" min-width="100" prop="operator" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作时间" min-width="100" prop="createTime" show-overflow-tooltip>
                <template slot-scope="{row}">
                  <span>{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品编号" min-width="100" prop="commodityCode" show-overflow-tooltip></el-table-column>
              <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip></el-table-column>
              <el-table-column label="配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
            </d-table>
          </form-card>
        </el-main>
      </el-container>
      <span class="dialog-footer" slot="footer">
        <el-button @click="close" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      defaults: false
    },
    params: {
      type: Object
    },
    commodityList: Array
  },
  data() {
    return {
      // 查询表单
      queryForm: {
        businessCode:'',
        commodityCode:'',
        page: 1,
        limit: 20
      }
    };
  },
  mounted() {
    Object.assign(this.queryForm, this.params);
    console.log(this)
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>