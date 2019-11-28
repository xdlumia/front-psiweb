/*
 * @Author: 徐贺
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-29 16:16:52
 * @Description: 选择组装商品
*/  
<template>
  <el-dialog
    :visible.sync="visible"
    @close="close"
    title="选择组装商品"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{
                maxHeight:maxHeight+'px'
            }"
        style="padding:0;"
      >
        <el-form class="p10">
        </el-form>
        <form-card
          class="borrow-goods-info"
          title="选择组装商品"
        >
          <div slot="title">
            <span>选择组装商品</span>
          </div>
          <el-table
            border
            :data="data.commodityList"
            max-height="400"
            ref="companyTable"
            row-key="commodityCode"
            size="mini"
            :tree-props="{children: 'childrenCommodityList'}"
          >
            <el-table-column
              min-width="1"
              width="50"
            >
            </el-table-column>

            <el-table-column
              label=""
              width="40"
            >
              <template slot-scope="scope">
                <el-radio
                  v-if='scope.row.childrenCommodityList !=null'
                  v-model="radioData"
                  :label='scope.row'
                > </el-radio>
              </template>
            </el-table-column>

            <el-table-column
              prop="cityName"
              min-width="100"
              label="组装数量"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.accomplishNum || 0}}/{{scope.row.allocationNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品名称"
              min-width="110"
              prop="goodsName"
            ></el-table-column>
            <el-table-column
              prop="commodityCode"
              label="商品编号"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.commodityCode}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品类别"
              min-width="100"
              prop="name"
            >
              <template slot-scope="scope">
                <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品分类"
              min-width="100"
              prop="className"
            ></el-table-column>
            <el-table-column
              label="商品名称"
              min-width="100"
              prop="goodsName"
            ></el-table-column>
            <el-table-column
              label="商品配置"
              min-width="100"
              prop="configName"
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="110"
              prop="specOne"
            ></el-table-column>
            <el-table-column
              label="备注"
              min-width="120"
              prop="note"
            ></el-table-column>
          </el-table>
          <commodityAssemblyEdit
            @reload='reload'
            :data='radioData'
            :allData='data'
            :visible.sync='disVisible'
            v-if="disVisible"
          />

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
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >确定并组装</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import assemblyRecord from './assembly-record'
import commodityAssemblyEdit from './commodity-assembly-edit'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  components: { commodityAssemblyEdit },
  data() {
    return {
      showInFullscreen: false,
      state: '',
      value: '',
      // recordVisible: false,
      disVisible: false,
      radioData: {}
    };
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
    close() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.disVisible = true
      console.log(this.radioData)
    },
    reload(){
      this.$emit('reload')
      this.close()
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
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
/deep/.el-radio__label {
  display: none !important;
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
<style>
.borrow-goods-info .el-autocomplete-suggestion {
  width: 400px !important;
}
</style>
