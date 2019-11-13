/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-12 17:39:35
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
      v-for="(val,key,index) of KIND2List"
      :key="key"
      :title="`${index+1}.商品名称:${key}`"
    >
      <div slot="body">
        <el-table
          size="mini"
          max-height="350px"
          :data="val"
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
          />
          <el-table-column
            label="商品类别"
            min-width="120"
          >
            <template>配件</template>
          </el-table-column>
          <el-table-column
            prop="specOne"
            min-width="120"
            label="规格"
          >
          </el-table-column>
          <el-table-column
            prop="saleReferencePrice"
            width="120"
            label="销售参考价"
          >
          </el-table-column>
        </el-table>
      </div>
    </quotationInfo>
    <!-- 整机列表信息 -->
    <quotationInfo
      v-for="(item,index) of KIND1List"
      :key="index"
      :title="`${index+1}商品名称:${item.goodsName}`"
    >
      <el-button
        slot="title"
        type="primary"
        size="mini"
      >不选择此配置</el-button>
      <div slot="body">
        <el-table
          size="mini"
          max-height="350px"
          :data="item.children"
          border
        >
          <el-table-column
            prop="className"
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
              <span class="d-text-blue">{{scope.row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            min-width="120"
          />
          <el-table-column
            label="商品类别"
            min-width="120"
          >
            <template>整机</template>
          </el-table-column>
          <el-table-column
            prop="specOne"
            min-width="120"
            label="规格"
          >
          </el-table-column>
          <el-table-column
            prop="saleReferencePrice"
            width="120"
            label="销售参考价"
          >
          </el-table-column>
        </el-table>
      </div>
    </quotationInfo>
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
      zjList: [], //存放根据nama查出来的整机配置信息

    }
  },
  created() {

  },
  mounted() {
  },
  computed: {
    KIND2List() {
      let newJson = {}
      this.data.KIND2Data.forEach(item => {
        // 把分类名称当做key  如果没有当前key 创建当前key 并赋值为空数组
        if (!newJson.hasOwnProperty(item.name)) {
          newJson[item.name] = [item]
        }
        // 如果当前有key 那一定有子项.children
        else {
          newJson[item.name].push(item)
        }
      })
      return newJson
    },
    // 整机列表
    KIND1List() {
      // TODO 没有商品名称  等待接口添加
      let newJson = {}
      this.zjList.forEach(item => {
        // 把分类名称当做key  如果没有当前key 创建当前key 并赋值为空数组
        if (!newJson.hasOwnProperty(item.goodsName)) {
          newJson[item.goodsName] = [item]
        }
        // 如果当前有key 那一定有子项.children
        else {
          newJson[item.goodsName].push(item)
        }
      })
      let newArr = []
      for (let key in newJson) {
        newArr.push({
          goodsName: key,
          children: newJson[key]
        })
      }
      return newArr
    },
  },
  methods: {
    // 根据名称获取整机信息
    commonquotationconfigdetailsListConfigByGoodName() {
      let params = {
        goodsName: this.data.KIND1Data.map(v => v.name),
        page: 1,
        limit: 100,
      }
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(params)
        .then(res => {
          // 给整机数据换成新数据
          this.zjList = res.data || []
          console.log(this.zjList);

        })
    },

  }
}
</script>
<style lang="scss" scoped>
</style>
