/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-07 17:09:03
 * @Description: 选择产品
*/
<template>
  <div v-loading="loading">
    <div
      class="d-flex"
      style="width:80%; margin:30px auto"
    >
      <!-- 选择类型 -->
      <el-select
        v-model="queryForm.categoryCode"
        size="small"
        @change="categoryChange"
        placeholder="请选择"
      >
        <!-- //过滤掉服务字典 此处不需要 -->
        <el-option
          v-for="item in dictionaryOptions('PSI_SP_KIND').filter(item=>item.content!=='服务')"
          :key="item.code"
          :label="item.content"
          :value="item.code"
        >
        </el-option>
      </el-select>

      <el-input
        size="small"
        placeholder="请输入名称"
        v-model="queryForm.name"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
        >搜索</el-button>
      </el-input>
      <!-- <el-select
        size="small"
        placeholder="请输入名称"
        :remote-method="getClinent"
        class="wfull mr5"
        filterable
        @change="commonclientinfoInfo"
        remote
        reserve-keyword
        v-model="data.clientId"
      >
        <el-option
          :key="item.id"
          :label="item.clientName"
          :value="item.id"
          v-for="item in goodsOptions"
        ></el-option>
      </el-select> -->
      <div
        class="f16 b d-flex"
        style="white-space:nowrap;align-items:center;"
      >已选商品
        <el-popover
          placement="bottom-end"
          width="400"
          trigger="click"
        >
          <el-table :data="[...gridData,...gridData2]">
            <el-table-column
              width="50"
              property="date"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  class="d-text-blue"
                  @click="editClick(scope.row)"
                >删除</span>
              </template>
            </el-table-column>
            <el-table-column
              property="name"
              label="商品编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              property="address"
              label="商品名称"
            ></el-table-column>
          </el-table>
          <span
            slot="reference"
            class="f24 el-icon-s-goods"
          ></span>
        </el-popover>

      </div>
    </div>
    <el-divider></el-divider>
    <product-list
      ref="kind1"
      v-show="queryForm.categoryCode == 'PSI_SP_KIND-1'"
      :params="queryForm"
      title="整机列表"
      :data="KIND1Data"
    />
    <product-list
      ref="kind2"
      :params="queryForm"
      v-show="queryForm.categoryCode == 'PSI_SP_KIND-2'"
      title="配件列表"
      :data="KIND2Data"
    />
  </div>
</template>
<script>
import goodsSelect from '@/components/formComponents/goods-select'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    goodsSelect
  },
  data() {
    return {
      loading: false,
      // 查询字段
      queryForm: {
        categoryCode: 'PSI_SP_KIND-1',//默认选中整机列表
        name: ''
      },
      KIND1Data: [], //整机列表
      KIND2Data: [], //配件列表
      // goodsOptions: [],
      gridData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  created() {


  },
  mounted() {
    // 初始化整机列表
    this.$refs.kind1.reload()
  },
  methods: {
    // 产品类型切换
    categoryChange(code) {
      if (code === 'PSI_SP_KIND-1') {
        this.$refs.kind1.reload()
      } else if (code === 'PSI_SP_KIND-2') {
        this.$refs.kind2.reload()
      }
    },

    // 点击步骤条触发
    editClick() {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
