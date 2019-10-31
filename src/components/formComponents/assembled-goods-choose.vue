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
        <el-form
          :model="form"
          class="p10"
        >
        </el-form>
        <form-card
          class="borrow-goods-info"
          title="选择组装商品"
        >
          <div slot="title">
            <span>选择组装商品</span>
          </div>
          <el-table
            :data="tableData"
            max-height="400"
            ref="elTable"
            row-key="name"
            size="mini"
          >
            <el-table-column
              class-name="hide-children"
              min-width="1"
              width="1"
            ></el-table-column>
            <el-table-column
              label=""
              min-width="50"
              prop="name"
            >
              <template slot-scope="scope">
                <span v-if='scope.row.noChildren'>
                  <el-radio
                    v-model="scope.row.name"
                    label=""
                  ></el-radio>
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="40">
              <template slot-scope="{row}">
                <div
                  class="expanded-icons d-text-gray"
                  v-if="row.children&&row.children.length"
                >
                  <span
                    @click="expand(row)"
                    class="el-icon-plus d-pointer"
                    v-if="!row.expanded"
                  ></span>
                  <span
                    @click="expand(row)"
                    class="el-icon-minus d-pointer"
                    v-else
                  ></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="组装数量"
              min-width="100"
              prop="name"
            >
              <template slot-scope="{}">
                <el-button
                  @click='recordVisible = true'
                  type="text"
                >0/5</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="商品编号"
              min-width="150"
            >
              <template
                slot-scope="{}"
                class="d-relative"
              >
                <el-button type="text">43523456546</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="商品类别"
              min-width="110"
              prop="name"
            ></el-table-column>
            <el-table-column
              label="商品分类"
              min-width="110"
              prop="name"
            ></el-table-column>
            <el-table-column
              prop='name'
              label="商品名称"
              min-width="100"
            >
            </el-table-column>
            <el-table-column
              label="商品配置"
              min-width="110"
              prop="name"
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="110"
              prop="name"
            ></el-table-column>
            <el-table-column
              label="备注"
              min-width="120"
              prop="name"
            ></el-table-column>
          </el-table>

          <assemblyRecord
            @close='recordVisible = false'
            :visibleData='visibleData'
            :visible='recordVisible'
          />
          <commodityAssemblyEdit
            @close='assemblyVisible = false'
            :visibleData='visibleData'
            :visible='assemblyVisible'
          />

        </form-card>
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="$emit('close')"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="$emit('close'),assemblyVisible = true"
        size="small"
      >确定并组装</el-button>
    </span>
  </el-dialog>
</template>
<script>
import assemblyRecord from './assembly-record'
import commodityAssemblyEdit from './commodity-assembly-edit'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: { assemblyRecord, commodityAssemblyEdit },
  data() {
    return {
      tableData: [{ name: '110', children: [{ name: '1120' }], noChildren: true }, { name: '120', children: [], noChildren: true }],
      showInFullscreen: false,
      cities: [{
        value: 'Beijing',
        label: '北京北京北京北京北京北京北京北京北京北京北京北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      state: '',
      value: '',
      visibleData: {

      },
      recordVisible: false,
      assemblyVisible: false
    };
  },
  methods: {
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击新增一行
    appand(row) {
      this.tableData.push({ name: '新的', children: [], noChildren: true })
    },
    //点击删除当前行
    deleteInfo(row) {
      this.tableData.splice(row.$index, 1)
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
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
<style>
.borrow-goods-info .el-autocomplete-suggestion {
  width: 400px !important;
}
</style>
