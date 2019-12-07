/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-06 17:26:51
 * @Description: 确定配置信息
*/
<template>
  <div v-loading="loading">
    <div class="ac mt20" v-if="!data.KIND1Data.length && !data.KIND2Data.length">请先选择产品</div>
    <!-- 配件列表 -->
    <quotationInfo :key="index" :title="`${index+1}.商品名称:${key}`" v-for="(val,key,index) of KIND2List">
      <div slot="body">
        <el-table :data="val" border max-height="350px" ref="kind2" size="mini">
          <el-table-column label="商品编号" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="80" prop="name"></el-table-column>
          <el-table-column label="商品类别" prop="categoryCode" width="130">
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" prop="secondClassName" width="130"></el-table-column>
          <el-table-column label="规格" min-width="80" prop="specOne" />
          <el-table-column label="销售参考价" prop="saleReferencePrice" width="90" />
        </el-table>
      </div>
    </quotationInfo>
    <!-- 整机列表信息 -->
    <quotationInfo
      :key="KIND2Length+index"
      :title="`${KIND2Length+index+1}商品名称:${item.configGoodName}`"
      v-for="(item,index) of data.KIND1List"
    >
      <!-- <el-button
        slot="title"
        size="mini"
        v-if="item.disabled"
        @click="resetConfig(item,index)"
      >重置</el-button>-->
      <span slot="title" v-if="!item.noConfig">
        <el-button @click="chooseNotConfig(item,index)" size="mini" type="primary" v-if="!item.disabled">不选择此配置</el-button>
        <el-button @click="recoveryConfig(item,index)" size="mini" type="primary" v-else>挑选配置</el-button>
      </span>
      <div slot="body">
        <el-table
          :data="item.children"
          :show-summary="!item.disabled"
          :summary-method="getSummary.bind(this,item)"
          :tree-props="{children: 'children'}"
          border
          default-expand-all
          max-height="350px"
          row-key="id"
          size="mini"
          ref="kind1table"
        >
          <el-table-column label="商品分类" prop="className" v-if="!item.disabled" width="130">
            <template slot-scope="{row}">
              <span>{{row.className||row.secondClassName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="80" prop="goodsName"></el-table-column>
          <el-table-column label="商品类别" prop="categoryCode" width="130">
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" min-width="80" prop="specOne"></el-table-column>
          <el-table-column label="商品数量" min-width="80" prop="commodityNum" />
          <el-table-column label="销售参考价" prop="saleReferencePrice" width="90"></el-table-column>
          <el-table-column label="操作" min-width="120" v-if="!item.disabled">
            <template slot-scope="scope">
              <el-checkbox
                :disabled="!(avaliableConfig(item).indexOf(`${scope.row.commodityCode}-${scope.row.commodityNum}`)>=0)"
                :label="scope.row.commodityCode"
                @change="checkOther(item,$event)"
                v-model="scope.row.checked"
              >{{&nbsp;}}</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </quotationInfo>
  </div>
</template>
<script>
import quotationInfo from '@/components/formComponents/quotation-info';
import { log } from 'util';
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
      configList: {},
      preConfigGoods: {},
      configNames:{},
      wholeCacheList: [] // 存放根据nama查出来的整机配置信息
    };
  },
  created() {},
  mounted() {},
  computed: {
    KIND2Length() {
      return Object.keys(this.KIND2List).length;
    },
    KIND2List() {
      const newJson = {};
      this.data.KIND2Data.forEach(item => {
        // 把分类名称当做key  如果没有当前key 创建当前key 并赋值为空数组
        if (!newJson.hasOwnProperty(item.name)) {
          newJson[item.name] = [item];
        }
        // 如果当前有key 那一定有子项.children
        else {
          newJson[item.name].push(item);
        }
      });
      this.data.KIND2List = newJson;
      return newJson;
    }
  },
  methods: {
    getSummary(row, param) {
      let { allConfigGoods, configName } = this.getAllConfigGoods(row);
      let { columns } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (['commodityNum'].includes(col.property)) {
          let prop = col.property;
          sums[index] =
            +Number(
              allConfigGoods
                .map(item => Number(item[prop]) || 0)
                .reduce((sum, item) => sum + item, 0)
            ).toFixed(2) || '-';
        } else if (['saleReferencePrice'].includes(col.property)) {
          if (row.disabled) {
            sums[index] = (row.children[0] || {}).saleReferencePrice || '-';
          } else {
            sums[index] =
              +Number(
                allConfigGoods
                  .map(
                    item =>
                      +Number(
                        item.saleReferencePrice *
                          (1 + 0 / 100) *
                          item.commodityNum || 0
                      ).toFixed(2)
                  )
                  .reduce((sum, item) => sum + item, 0)
              ).toFixed(2) || '-';
          }
        } else if (index == 1) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      if (!row.disabled) {
        sums[sums.length - 1] = configName ? configName : '未确定配置';
      }
      return sums;
    },
    getCurrentConfig(row) {
      let configs = Object.keys(this.configList).filter(key => {
        let keys = key.split('-');
        keys.pop();
        if (keys.join('-') == row.goodsCode) {
          return true;
        } else return false;
      });
      let children = this.flatten(row.children);
      let checkeds = children.filter(item => {
        return item.checked;
      });
      let selectedConfigs = configs.filter(
        key =>
          !checkeds.some(
            item =>
              !(this.configList[key] || []).includes(
                `${item.commodityCode}-${item.commodityNum}`
              )
          )
      );
      return selectedConfigs;
    },
    checkOther(row, e) {
      if (e) {
        let children = this.flatten(row.children);
        let configs = this.getCurrentConfig(row);
        if (configs && configs.length == 1) {
          children
            .filter(item =>
              this.configList[configs[0]].includes(
                `${item.commodityCode}-${item.commodityNum}`
              )
            )
            .map(item => (item.checked = true));
        }
      }
    },
    avaliableConfig(item) {
      if (!item) return [];
      return (
        this.getCurrentConfig(item).reduce(
          (keys, key) => keys.concat(this.configList[key] || []),
          []
        ) || []
      );
    },
    findSelectedConfig(item) {
      let { configId } = this.getAllConfigGoods(item);
      return configId;
    },
    getAllConfigGoods(row) {
      let children = this.flatten(row.children);
      let configs = this.getCurrentConfig(row);
      let allConfigGoods = [];
      let configName = '';
      let configId = ''
      if (configs && configs.length >= 1) {
        configs.some(config => {
          let configList = JSON.parse(
            JSON.stringify(this.configList[config] || [])
          );
          let selectedGoods = children.filter(item => item.checked);
          let selectedConfigList = selectedGoods.map(
            item => `${item.commodityCode}-${item.commodityNum}`
          );
          let isFullMatch = ![]
            .concat(configList, selectedConfigList)
            .some(
              key =>
                !(configList.includes(key) && selectedConfigList.includes(key))
            );
          if (isFullMatch) {
            allConfigGoods = selectedGoods;
            configId = config.split('-').pop()
            configName = this.configNames[configId]
          }
          return isFullMatch;
        });
      }
      return {
        configId,
        configName,
        allConfigGoods
      };
    },
    flatten(data) {
      let all = [];
      data.map(item => {
        all.push(item);
        if (item.children && item.children.length) {
          all = all.concat(this.flatten(item.children));
        }
      });
      return all;
    },
    // resetConfig(item, index) {
    //   const deepCopy = JSON.parse(JSON.stringify(this.wholeCacheList[index]))
    //   this.$set(this.data.KIND1List, index, deepCopy)
    // },
    // 不选择此配置
    async chooseNotConfig(item, index) {
      if (this.preConfigGoods[item.goodsCode]) {
        this.$set(
          this.data.KIND1List,
          index,
          this.clone(this.preConfigGoods[item.goodsCode])
        );
        return;
      }
      let params = {
        categoryCode: 'PSI_SP_KIND-1',
        // name: item.configGoodName,
        goodsCode: item.goodsCode
      };
      let { data } = await this.$api.seeGoodsService.getGoodsByNameForJXC(
        params
      );
      item.disabled = true;

      item.children = (data || []).map(item => {
        item.goodsName = item.name;
        item.commodityCode = item.goodsCode;
        item.quotationIds = item.configId;
        item.reference = item.saleReferencePrice;
        return item;
      });
      this.preConfigGoods[item.goodsCode] = this.clone(item);
      this.$set(this.data.KIND1List, index, item);
    },
    clone(a) {
      return JSON.parse(JSON.stringify(a));
    },
    recoveryConfig(item, i) {
      this.$set(
        this.data.KIND1List,
        i,
        JSON.parse(JSON.stringify(this.wholeCacheList[i]))
      );
    },
    // 选中项目
    checkboxChange(row, index) {
      row.checked = !row.checked;
      // 扁平化数据
      const flattenData = this.$$util.jsonFlatten(
        this.data.KIND1List[index].children
      );
      // 获取选中数据的code
      let checkedCods = flattenData
        .filter(v => v.checked)
        .map(v => v.commodityCode);
      if (checkedCods.length) {
        // 获取交际quotationIds
        let quotationIds = this.idsContract(flattenData, checkedCods);
        // console.log(quotationIds);

        // 根据quotationIds 过滤数据
        let filterData = flattenData.filter(v =>
          quotationIds.includes(v.quotationId)
        );
        let framtData = this.$$util.formatChildren(filterData, 'className');
        this.$set(this.data.KIND1List[index], 'children', framtData);
      } else {
        row = JSON.parse(JSON.stringify(this.wholeCacheList[index]));
      }
    },
    // 查出交际的ids
    idsContract(array, choose) {
      let tempids = [];
      for (let j = 0; j < choose.length; j++) {
        let ids = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i].commodityCode == choose[j]) {
            ids.push(array[i].quotationId);
          }
        }
        if (tempids.length) {
          tempids = []
            .concat(tempids, ids)
            .filter(item => tempids.includes(item) && ids.includes(item));
        } else {
          tempids = ids;
        }
      }

      tempids = tempids.filter((item, i) => tempids.indexOf(item) == i);
      return tempids;
    },
    // 格式化列表数据
    filterKIND1List(data) {
      this.data.KIND1List = [];
      let configList = {};
      let configKeys = {};
      let keyNames = {};
      /**
       * 名称:newJson
       * 数据格式:{key:[]}
       */
      const newJson = {};
      data.forEach(item => {
        item.checked = false;
        this.configNames[item.quotationId] = item.quotationName
        let configKey = `${item.configGoodCode}-${item.quotationId}`;
        configList[configKey] = configList[configKey] || [];
        configList[configKey].push(
          `${item.commodityCode}-${item.commodityNum}`
        );
        let configItemKey = `${item.configGoodCode}-${item.commodityCode}-${item.commodityNum}`;
        // 把分类名称当做key  如果没有当前key 创建当前key 并赋值为空数组
        if (!newJson.hasOwnProperty(item.configGoodCode)) {
          configKeys[configItemKey] = true;
          newJson[item.configGoodCode] = [item];
        }
        // 如果当前有key 那一定有子项.children
        else if (!configKeys[configItemKey]) {
          configKeys[configItemKey] = true;
          newJson[item.configGoodCode].push(item);
        }
      });
      let Kind1DataList = this.data.KIND1Data.reduce((data, item) => {
        keyNames[item.goodsCode] = item.name;
        return { ...data, [item.goodsCode]: false };
      }, {});
      // let newArr = []
      for (const key in newJson) {
        const childrenData = newJson[key];
        Kind1DataList[key] = true;
        // $$util.formatChildren 相同类型的数据格式化成children格式
        this.data.KIND1List.push({
          goodsCode: key,
          configGoodName: keyNames[key],
          /**
           *  childrenData 数组数据
           * className 根据 className格式化成children数据
           */
          children: this.$$util.formatChildren(childrenData, 'className')
        });
      }
      for (let key in Kind1DataList) {
        if (!Kind1DataList[key]) {
          this.data.KIND1List.push({
            goodsCode: key,
            configGoodName: keyNames[key],
            disabled: true,
            noConfig: true,
            children: []
          });
        }
      }
      this.data.KIND1List.map((item, i) => {
        item.disabled && this.chooseNotConfig(item, i);
      });
      // 清空整机选择
      // 第一层的chilrder是必选并且不能修改的类型
      // 并且默认选中
      // this.data.KIND1List.forEach(item => {
      //   item.children.forEach(sub => {
      //     sub.disabled = true
      //   })
      // })
      // 缓存列表 方便重置
      this.wholeCacheList = JSON.parse(JSON.stringify(this.data.KIND1List));
      console.log(this.data.KIND1List);
      this.configList = configList;
    },
    // 根据名称获取整机信息
    commonquotationconfigdetailsListConfigByGoodName() {
      // 如果没有商品不查询
      this.data.KIND1List=[]
      if (!this.data.KIND1Data.length) return;
      const params = {
        // doodsName 如果查传的是'' 查的是全部 所以没有值得时候传 ' '
        codes: this.data.KIND1Data.map(v => v.goodsCode),
        page: 1,
        limit: 100
      };
      this.$api.seePsiCommonService
        .commonquotationconfigdetailsListConfigByGoodName(params)
        .then(res => {
          // 给整机数据换成新数据
          const data = res.data || [];
          this.filterKIND1List(data);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
