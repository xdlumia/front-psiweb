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
      <el-table-column
        fixed
        min-width="50"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="80"
        prop="name"
      >
        <!-- v-if='scope.row.noChildren' v-if='scope.row.commodityCode'-->
        <template
          slot-scope="scope"
          v-if='scope.row.commodityCode'
        >
          <span v-if='!scope.row.quotationId'>
            <!-- <i
              class='el-icon-circle-plus f18 d-text-blue d-pointer'
              @click="appand(scope)"
            ></i> -->
            <i
              v-if='!scope.row.quotationId'
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
          <commoditySelector
            :disabled='!!scope.row.quotationId'
            :params='{wmsId:addform.wmsId}'
            @choose='commodityChoose(arguments,scope)'
            type="code"
            v-model="scope.row.commodityCode"
            :codes="tableData.map(item=>item.commodityCode)"
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
            :params='{wmsId:addform.wmsId}'
            @choose='commodityChoose(arguments,scope)'
            v-model="scope.row.goodsName"
            :codes="tableData.map(item=>item.commodityCode)"
          />
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
      ></el-table-column>
      <el-table-column
        label="商品配置"
        min-width="110"
        prop="configName"
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>
      <el-table-column
        label="单位"
        min-width="120"
        prop="unit"
      >
        <template slot-scope="scope">
          <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <commodityChoose
      @update=update
      :visibleData='visibleData'
      :visible='visible'
    />
  </form-card>
</template>
<script>
import commodityChoose from './commodity-choose'
import commoditySelector from '@/components/formComponents/commodity-selector';
export default {
  props: ['addform'],
  components: { commodityChoose, commoditySelector },
  data() {
    return {
      tableData: [{}],
      commodityList: [],
      showInFullscreen: false,
      state: '',
      codes: [],
      value: '',
      ceIndex: '',
      visibleData: {

      },
      codeVisible: false,
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
      list.forEach((item) => {
        if (!this.codes.includes(item.commodityCode) && scope.row.commodityCode && type == 'select') {//区分非选择状态下的选择商品信息
          this.$set(this.tableData, scope.$index, item)
        } else if (!this.codes.includes(item.commodityCode)) {
          this.tableData.unshift(item)
        }
      })
      this.codes = []
    },
    //表格查询数据懒加载
    load(tree, treeNode, resolve) {
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ page: 1, limit: 50, commodityCode: tree.commodityCode })
        .then(res => {
          let list = res.data || []
          resolve(list)
        })
        .finally(() => {
          treeNode.loading = false
        })
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击新增一行
    appand(row) {
      // this.tableData.splice(row.$index + 1, 0, { name: '新的', children: [], noChildren: true })
      this.tableData.push({})
    },
    //点击删除当前行
    deleteInfo(row) {
      this.tableData.splice(row.$index, 1)
    },
    //关闭弹窗
    update() {
      this.visible = false
    },

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
