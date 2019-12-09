/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 商品查询
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="商品查询"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-main style="padding:0;max-height:700px;">

        <form-card title='明细表'>
          <d-table
            :params="{snCode:snCode,page:1,limit:20}"
            style="height:300px"
            border
            api="seePsiWmsService.wmsflowrecordList"
            size="mini"
          >
            <el-table-column
              type='index'
              label="编号"
              min-width="50"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品编号"
              min-width="140"
              prop="commodityCode"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品类别"
              min-width="100"
              prop="categoryCode"
              show-overflow-tooltip
            >
              <template slot-scope="scope"><span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span></template>
            </el-table-column>
            <el-table-column
              label="商品分类"
              min-width="100"
              prop="className"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品名称"
              min-width="100"
              prop="goodsName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="140"
              prop="specOne"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品配置"
              min-width="100"
              prop="configName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="SN码"
              min-width="100"
              prop="snCode"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="机器号"
              min-width="100"
              prop="robotCode"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="操作人"
              min-width="100"
              prop="operator"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="操作类型"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.operation == 0 ? '入库' : '出库'}}</template>
            </el-table-column>
            <el-table-column
              label="出入库库房"
              min-width="100"
              prop="wmsName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="操作时间"
              min-width="100"
              prop="createTime"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
            <el-table-column
              label="关联业务编号"
              min-width="120"
              prop="businessCode"
              show-overflow-tooltip
            ></el-table-column>
          </d-table>
        </form-card>
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    drawerData: {},
    snCode: ''
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>