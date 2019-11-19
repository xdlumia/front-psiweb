/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-19 16:46:48
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
      :key="index"
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
            width="130"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="编号"
            min-width="100"
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            min-width="80"
          />
          <el-table-column
            label="商品类别"
            min-width="70"
          >
            <template>配件</template>
          </el-table-column>
          <el-table-column
            prop="specOne"
            min-width="80"
            label="商品规格"
          />
          <el-table-column
            prop="saleReferencePrice"
            width="90"
            label="销售参考价"
          />
        </el-table>
      </div>
    </quotationInfo>
    <!-- 整机列表信息 -->
    <quotationInfo
      v-for="(item,index) of data.KIND1List"
      :key="KIND2Length+index"
      :title="`${KIND2Length+index+1}商品名称:${item.configGoodName}`"
    >
      <!-- <el-button
        slot="title"
        size="mini"
        v-if="item.disabled"
        @click="resetConfig(item,index)"
      >重置</el-button> -->
      <el-button
        slot="title"
        type="primary"
        v-if="!item.disabled"
        size="mini"
        @click="chooseNotConfig(item,index)"
      >不选择此配置</el-button>
      <div slot="body">
        <el-table
          size="mini"
          max-height="350px"
          :data="item.children"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          row-key="id"
          default-expand-all
          border
        >
          <el-table-column
            prop="className"
            label="商品分类"
            width="130"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="商品编号"
            min-width="100"
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            min-width="80"
          />
          <el-table-column
            label="商品类别"
            min-width="70"
          >
            <template>整机</template>
          </el-table-column>
          <el-table-column
            prop="specOne"
            min-width="80"
            label="商品规格"
          >
          </el-table-column>
          <el-table-column
            prop="commodityNum"
            min-width="80"
            label="商品数量"
          />
          <el-table-column
            prop="saleReferencePrice"
            width="90"
            label="销售参考价"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-checkbox
                @change="checkboxChange(scope.row,index)"
                :checked="scope.row.checked"
                :label="scope.row.commodityCode"
              >{{&nbsp;}}</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </quotationInfo>
  </div>
</template>
<script>
import quotationInfo from '@/components/formComponents/quotation-info'
import { log } from 'util'
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
      wholeCacheList: [] // 存放根据nama查出来的整机配置信息
    }
  },
  created() {

  },
  mounted() {
  },
  computed: {
    KIND2Length() {
      return Object.keys(this.KIND2List).length
    },
    KIND2List() {
      const newJson = {}
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
      this.data.KIND2List = newJson
      return newJson
    }
  },
  methods: {
    // resetConfig(item, index) {
    //   const deepCopy = JSON.parse(JSON.stringify(this.wholeCacheList[index]))
    //   this.$set(this.data.KIND1List, index, deepCopy)
    // },
    // 不选择此配置
    async chooseNotConfig(item, index) {
      console.log(item)
      let { data } = await this.$api.seeGoodsService.getGoodsByNameForJXC({ name: item.configGoodName })
      console.log((data))
      item.disabled = true
      this.$set(this.data.KIND1List, index, item)
    },
    // 选中项目
    checkboxChange(row, index) {
      row.checked = !row.checked
      // 扁平化数据
      const flattenData = this.$$util.jsonFlatten(this.data.KIND1List[index].children)
      // 获取选中数据的code
      let checkedCods = flattenData.filter(v => v.checked).map(v => v.commodityCode)
      if (checkedCods.length) {
        // 获取交际quotationIds
        let quotationIds = this.idsContract(flattenData, checkedCods)
        // 根据quotationIds 过滤数据
        let filterData = flattenData.filter(v => quotationIds.includes(v.quotationId))
        let framtData = this.$$util.formatChildren(filterData, 'className')
        this.$set(this.data.KIND1List[index], 'children', framtData)
      } else {
        row = JSON.parse(JSON.stringify(this.wholeCacheList[index]))
      }
    },
    // 查出交际的ids
    idsContract(array, choose) {
      let tempids = [];
      for (let j = 0; j < choose.length; j++) {
        let ids = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i].commodityCode == choose[j]) {
            ids.push(array[i].quotationId)
          }
        }
        if (tempids.length) {
          tempids = [].concat(tempids, ids).filter(item => tempids.includes(item) && ids.includes(item))
        } else {
          tempids = ids
        }
      }

      tempids = tempids.filter((item, i) => tempids.indexOf(item) == i)
      return tempids;
    },
    // 格式化列表数据
    filterKIND1List(data) {
      this.data.KIND1List = []
      /**
       * 名称:newJson
       * 数据格式:{key:[]}
       */
      const newJson = {}
      data.forEach(item => {
        // 把分类名称当做key  如果没有当前key 创建当前key 并赋值为空数组
        if (!newJson.hasOwnProperty(item.configGoodName)) {
          newJson[item.configGoodName] = [item]
        }
        // 如果当前有key 那一定有子项.children
        else {
          newJson[item.configGoodName].push(item)
        }
      })
      // let newArr = []
      for (const key in newJson) {
        const childrenData = newJson[key]
        // $$util.formatChildren 相同类型的数据格式化成children格式
        this.data.KIND1List.push({
          configGoodName: key,
          /**
           *  childrenData 数组数据
           * className 根据 className格式化成children数据
           */
          children: this.$$util.formatChildren(childrenData, 'className')
        })
      }
      // 清空整机选择
      // 第一层的chilrder是必选并且不能修改的类型
      // 并且默认选中
      // this.data.KIND1List.forEach(item => {
      //   item.children.forEach(sub => {
      //     sub.disabled = true
      //   })
      // })
      // 缓存列表 方便重置
      this.wholeCacheList = JSON.parse(JSON.stringify(this.data.KIND1List))
    },
    // 根据名称获取整机信息
    commonquotationconfigdetailsListConfigByGoodName() {
      const params = {
        // doodsName 如果查传的是'' 查的是全部 所以没有值得时候传 ' '
        goodsName: this.data.KIND1Data.map(v => v.name),
        page: 1,
        limit: 100
      }
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName(params)
        .then(res => {
          // 给整机数据换成新数据
          const data = res.data || []
          this.filterKIND1List(data)
        })
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
