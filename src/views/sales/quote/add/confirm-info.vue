/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-12 14:28:46
 * @Description: 确定配置信息
*/
<template>
  <div v-loading="loading">
    <div
      class="ac mt20"
      v-if="!data.KIND1Data.length && !data.KIND2Data.length"
    >请先选择产品</div>
    <!-- 配件列表 -->
    <quotationInfo
      v-for="(val,key) of KIND2List"
      :key="key"
      :title="key"
    >
      <div slot="body">
        <el-table
          size="mini"
          max-height="350px"
          :data="val.children"
          ref="kind2"
          border
        >
          <el-table-column
            prop="secondClassName"
            label="商品分类"
            width="180"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="编号"
            min-width="180"
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            prop="specOne"
            min-width="120"
            label="规格"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            width="120"
            label="销售参考价"
          >
          </el-table-column>
        </el-table>
      </div>
    </quotationInfo>
    <!-- <quotationInfo
      v-for="(item,index) of data.KIND1Data"
      :key="index"
      :title="item.name"
    >
      <el-button
        slot="title"
        type="primary"
        size="mini"
      >不选择此配置</el-button>
      <div slot="body">
        这是个表单数据
      </div>
    </quotationInfo> -->
  </div>
</template>
<script>
import quotationInfo from '@/components/formComponents/quotation-info'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    quotationInfo
  },
  data() {
    return {
      loading: false,

    }
  },
  created() {

  },
  mounted() {
    let params = {}
    this.commonquotationconfigdetailsListConfigByGoodName(params)
  },
  computed: {
    KIND2List() {
      let newJson = {}
      this.data.KIND2Data.forEach(item => {
        // 如果没有当前key 创建当前key 并创建.chiler 为数组
        if (!newJson.hasOwnProperty(item.secondClassName)) {
          newJson[item.secondClassName] = {}
          newJson[item.secondClassName].children = [item]
        }
        // 如果当前有key 那一定有子项.children
        else {
          newJson[item.secondClassName].children.push(item)
        }
      })
      return newJson
    }
  },
  methods: {
    // 根据名称获取整机信息
    commonquotationconfigdetailsListConfigByGoodName(params) {
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(params)
        .then(res => {

        })
    },

  }
}
</script>
<style lang="scss" scoped>
</style>
