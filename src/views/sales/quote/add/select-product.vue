/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 11:33:47
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
        @keyup.native.13="filterHandle"
        placeholder="请输入名称"
        v-model="queryForm.name"
      >
        <el-button
          slot="append"
          @click="filterHandle"
          icon="el-icon-search"
        >搜索</el-button>
      </el-input>
      <div
        class="f16 b d-flex"
        style="white-space:nowrap;align-items:center;"
      >已选商品
        <el-popover
          placement="bottom-end"
          trigger="hover"
          width="400"
        >
          <el-table
            height="450px"
            :data="[...data.KIND1Data,...data.KIND2Data]"
          >
            <el-table-column
              width="50"
              property="date"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  class="d-text-blue d-pointer"
                  @click="delgoods(scope.row)"
                >删除</span>
              </template>
            </el-table-column>
            <el-table-column
              property="goodsCode"
              label="商品编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              property="name"
              label="商品名称"
            ></el-table-column>
          </el-table>
          <!-- 显示商品数据 -->
          <el-badge
            :value="goodsLength"
            slot="reference"
          >
            <!-- 选中商品的图标 -->
            <span class="f24 el-icon-s-goods"></span>
          </el-badge>
        </el-popover>

      </div>
    </div>
    <el-divider></el-divider>
    <product-list
      ref="kind1"
      @selection-change="kind1Select"
      v-show="queryForm.categoryCode == 'PSI_SP_KIND-1'"
      title="整机列表"
      :data="KIND1Data"
    />
    <product-list
      ref="kind2"
      @selection-change="kind2Select"
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

    }
  },
  created() {


  },
  mounted() {
    // 初始化整机列表
    this.$refs.kind1.reload()
  },
  computed: {
    // 获取选中商品的数据
    goodsLength() {
      return (this.data.KIND1Data || []).length + (this.data.KIND2Data || []).length
    }
  },
  methods: {
    // 类型切换的时候清除搜索内容
    categoryChange(code) {
      this.queryForm.name = ''
      this.filterHandle()
    },
    // 筛选
    filterHandle() {
      // 整机
      if (this.queryForm.categoryCode === 'PSI_SP_KIND-1') {
        this.$refs.kind1.filter(this.queryForm.name)
      }
      // 列表
      else if (this.queryForm.categoryCode === 'PSI_SP_KIND-2') {
        this.$refs.kind2.filter(this.queryForm.name)
      }
    },
    // 整机数据多选
    kind1Select(val) {
      this.data.KIND1Data = val
    },
    // 配件数据多选
    kind2Select(val) {
      this.data.KIND2Data = val
    },

    // 删除当前行
    delgoods(row) {
      // 如果当前行有id 那么当前数据是配件列表 否则是整机列表数据
      if (row.id) {
        // 取消表格列表里当前行选中状态
        this.$refs.kind2.toggleRowSelection(row, false);
      } else {
        this.$refs.kind1.toggleRowSelection(row, false);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
