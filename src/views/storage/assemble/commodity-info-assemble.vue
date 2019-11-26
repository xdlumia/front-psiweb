/*
 * @Author: 徐贺
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-29 16:16:52
 * @Description: 商品信息 可编辑
*/  
<template>
  <form-card
    class="borrow-goods-info"
    title="商品信息"
  >
    <div slot="title">
      <span>商品信息</span>
    </div>
    <el-table
      border
      :data="tableData"
      max-height="400"
      ref="elTable"
      row-key="id"
      :load="load"
      lazy
      size="mini"
      :tree-props="{children: 'children', hasChildren: 'configId'}"
    >
      >
      <el-table-column
        fixed
        min-width="50"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="50"
        prop="name"
      >
        <template
          slot-scope="scope"
          v-if='scope.row.commodityCode'
        >
          <span v-if='!scope.row.quotationId'>
            <i
              class='el-icon-remove f18 d-text-qgray ml5 d-pointer'
              @click="deleteInfo(scope)"
            ></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品编号"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <!-- 报溢的话 需要选择库房以后再选 商品, 要传过去库房id, 商品是跟库库房来的 报损不需要 -->
          <!--             v-if="addForm.wmsId"
            :sn="addForm.type == 2 ? true : false"
            :params="addForm.type == 2 ? {wmsId:addForm.wmsId} : {wmsId:''}" -->
          <commoditySelector
            :disabled='!!scope.row.quotationId'
            :codes="tableData.map(item=>item.commodityCode)"
            @response='response'
            @choose='commodityChoose(arguments,scope)'
            type="code"
            :params={isConfig:1}
            v-model="scope.row.commodityCode"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <commoditySelector
            :disabled='!!scope.row.quotationId'
            :codes="tableData.map(item=>item.commodityCode)"
            @response='response'
            ref='commdity'
            :params={isConfig:1}
            @choose='commodityChoose(arguments,scope)'
            v-model="scope.row.goodsName"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="商品配置"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <el-select
            :disabled='!!scope.row.quotationId'
            @focus='visibleChange($event,scope)'
            v-model="scope.row.configName"
            @change="changeCommodity($event,scope)"
            placeholder="请选择"
            value-key='configId'
            size="mini"
          >
            <el-option
              v-for="item in configList"
              :key="item.configId"
              :label="item.configName"
              :value="item.configId"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="组装数量"
        min-width="150"
        prop="allocationNum"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <el-input
            v-if="scope.row.commodityCode && !scope.row.quotationId"
            size="mini"
            v-model="scope.row.allocationNum"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{scope.row.commodityNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品图片"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.commodityCode"
            style="width: 100px; height: 40px"
            :src="scope.row.goodsPic"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="商品类别"
        min-width="110"
        prop="categoryCode"
      >
        <template slot-scope="scope">
          <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        min-width="110"
        prop="className"
      >
      </el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>
    </el-table>
    <!-- <commodityChoose
      @update=update
      :visibleData='visibleData'
      :visible='visible'
    />
    <reportingLossesCode
      @sumitSn='sumitSn'
      :visible.sync='codeVisible'
      v-if="codeVisible"
      :commodityForm='commodityForm'
      :addForm='addForm'
      :type='addForm.type'
    /> -->
  </form-card>
</template>
<script>
import commodityChoose from '@/components/formComponents/commodity-choose'
import reportingLossesCode from '@/components/formComponents/reporting-losses-code'
import commoditySelector from '@/components/formComponents/commodity-selector';
export default {
  props: ['addForm'],
  components: { commodityChoose, reportingLossesCode, commoditySelector },
  data() {
    return {
      tableData: [{}],
      commodityList: [],
      showInFullscreen: false,
      state: '',
      infoForm: {},
      codes: [],
      value: '',
      ceIndex: '',
      visibleData: {

      },
      codeVisible: false,
      configList: [],
      visible: false,
      commodityForm: {}//点击的当前行的商品信息
    };
  },
  methods: {
    //选择商品
    commodityChoose(e, scope) {
      let list = e[0]
      let type = e[1]
      this.tableData.forEach((item) => {
        if (item.commodityCode) {
          this.codes.push(item.commodityCode)
        }
      })
      list.forEach((item, index) => {
        if (!this.codes.includes(item.commodityCode) && scope.row.commodityCode && type == 'select') {//区分非选择状态下的选择商品信息
          this.$set(this.tableData, scope.$index, item)
          scope.row.configName = ''
        } else if (!this.codes.includes(item.commodityCode)) {
          this.tableData.unshift(item)
          scope.row.configName = ''
        } else if (this.codes.includes(item.commodityCode)) {//针对配置做判断
          scope.row.configName = this.configName
        }
      })
      this.codes = []
    },
    //表格查询数据懒加载
    load(tree, treeNode, resolve) {
      console.log(tree, treeNode, 'loadloadloadloadload')
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ page: 1, limit: 50, commodityCode: tree.commodityCode })
        .then(res => {
          let list = res.data || []
          resolve(list)
        })
        .finally(() => {
          treeNode.loading = false
        })
    },
    //商品加载成功以后,拿到所有数据,用以选择配置
    response(data) {
      this.configList = data
    },
    //选择重复配置的时候，需要恢复上一次选择的，去掉当前要选的
    visibleChange(val, scope) {
      this.configName = scope.row.configName
    },
    //配置下拉框改变的时候
    changeCommodity(e, scope) {
      let list = this.configList.filter((item) => {
        return item.configId == e
      })
      this.commodityChoose([list, 'select'], scope)

    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击删除当前行
    deleteInfo(row) {
      this.tableData.splice(row.$index, 1)
    },
    sumitSn(data) {
      this.$set(this.tableData[this.ceIndex], 'commodityInfoList', data)
      this.tableData.forEach((item) => {
        if (item.commodityCode) {
          this.addForm.commodityList.push(item)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.expanded-icons {
  > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #999;
    text-align: center;
  }
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
</style>
<style>
.borrow-goods-info .el-autocomplete-suggestion {
  width: 400px !important;
}
</style>
