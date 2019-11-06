<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 22:07:18
 * @Description: description
 -->
<template>
  <sideDetail
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    width="990px"
    v-loading="loading"
    :title="rowData.name + ':' + rowData.goodsCode"
    class="good-detail"
  >
    <template slot="button">
      <el-button size="mini" type="primary" @click="commonserviceproviderUpdate(rowData.id, 1)">期初库存</el-button>
      <el-button size="mini" type="primary" @click="showEdit = true">编辑</el-button>
      <el-button size="mini" type="danger" @click="deleteGoodsList(rowData.id)">删除</el-button>
    </template>
    <div class="d-bg-gray" style="display: flex;margin:-40px -15px 10px">
      <img
        :src="rowData.goodsPic || noPic"
        style="width:120px;height:120px;object-fit: cover;margin:20px;"
      />
      <div style="display: flex;flex-direction: column;justify-content: space-around;margin:20px 0">
        <span>商品类别：{{rowData.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        <span>商品分类：{{rowData.secondClassName}}</span>
        <span>商品规格：{{rowData.specOne}}</span>
        <span>商品配置：{{rowData.configName || '-'}}</span>
      </div>
    </div>
    <sideStatusbar style="margin:-10px -15px 10px" :status="status" />
    <el-tabs
      class="wfull hfull tabs-view tabs-view-good"
      style="height: calc(100vh - 270px)!important"
    >
      <el-tab-pane label="详情">
        <good :code="code" :disabled="true"></good>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="showEdit" title v-dialogDrag :show-close="false" width="1000px">
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">新增商品</h3>
        <div>
          <el-button type="primary" size="mini" @click="saveGood">保存</el-button>
          <el-button size="mini" @click="showEdit=false">关闭</el-button>
        </div>
      </div>
      <good :code="code" :isEdit="true" @refresh="refresh" v-if="showEdit" ref="addGood"></good>
    </el-dialog>
  </sideDetail>
</template>

<script>
import good from './add-good'
export default {
  components: {
    good
  },
  props: {
    visible: Boolean,
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      noPic: require('@/assets/img/no-pic.png'),
      showEdit: false,
      loading: false,
      showPop: false,
      etailForm: {},
      status: [
        { label: '创建时间', value: this.rowData.state ? '停用' : '启用' },
        { label: '创建人', value: this.rowData.creatorName },
        { label: '来源', value: this.rowData.deptName }
      ]
    }
  },
  mounted() {
    console.log(this.rowData)
    this.checkVisible();
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  methods: {
    saveGood() {
      this.$refs.addGood && this.$refs.addGood.saveGood()
    },
    deleteGoodsList(id) {
      this.$confirm(`是否删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeGoodsService.deleteGoodsList([id]).then(res => {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

    },
    refresh() {
      this.emit('refresh')
    },
    checkVisible() {
      this.showPop = this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.good-detail {
  /deep/ .tabs-view-good {
    height: calc(100vh - 240px) !important;
  }
}
</style>
