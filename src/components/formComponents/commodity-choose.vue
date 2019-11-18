/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 10:04:59
 * @Description: 选择商品 字段已绑定 1
*/
<template>
  <el-dialog :visible="visible" @close="close" title="选择商品" v-dialogDrag width="60%">
    <div class="mb15">
      <el-input @change="reload" placeholder="搜索商品名称" size="small" style="width:250px" v-model="queryForm.goodsName"></el-input>
      <el-button @click="multipleVisible = !multipleVisible" class="fr" size="small">已选择（{{selected.length}}）</el-button>
    </div>
    <el-container class="choose-container">
      <!-- 左侧 -->
      <el-aside class="choose-aside" width="250px">
        <commodity-cat :kinds="kinds" :mainCat.sync="queryForm.categoryCode" :subCat.sync="queryForm.classId" @change="reload" />
      </el-aside>
      <!-- 表格 -->
      <el-main>
        <d-table
          :api="sn?'seePsiWmsService.wmsinventorydetailList':'seePsiWmsService.wmsinventoryList'"
          :autoInit="false"
          :class="{'remove-selection': !multiple}"
          :params="queryForm"
          :reserve-selection="true"
          :rowKey="sn?'_rowKey':'commodityCode'"
          :tree-props="{children: 'children', hasChildren: 'children'}"
          @response="onTableData"
          @selection-change="handleSelectionChange"
          class="college-main"
          ref="multipleTable"
          style="height:100%"
          v-show="!multipleVisible"
        >
          <el-table-column :selectable="selectable" type="selection" width="55">
            <tempalte slot="header" v-if="!multiple">3</tempalte>
          </el-table-column>
          <el-table-column :reserve-selection="true" label="商品编号" min-width="200" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="d-text-blue">{{row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="SN码/机器码" min-width="100" prop="goodsName" show-overflow-tooltip v-if="sn">
            <template slot-scope="{row}">
              <span>{{row.snCode||row.robotCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品图片" min-width="130" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
                <span slot="error">暂无图片</span>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品类别" min-width="100" prop="categoryCode" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" min-width="100" prop="cityName" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.unit | dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="税率" min-width="80" prop="taxRate" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.taxRate ? row.taxRate + '%' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="可用库存" min-width="100" prop="usableInventoryNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.usableInventoryNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="期初库存" min-width="100" prop="originalInventoryNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.originalInventoryNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库数量" min-width="80" prop="sumShipmentNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.sumShipmentNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出库数量" min-width="80" prop="sumPutawayNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.sumPutawayNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="待入库数量" min-width="120" prop="waitShipmentNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.waitShipmentNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="待出库数量" min-width="120" prop="waitPutawayNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.waitPutawayNum||0}}</span>
            </template>
          </el-table-column>
        </d-table>
        <!-- 点击数量覆盖下来的表格 -->
        <el-table :data="selected" border v-show="multipleVisible">
          <el-table-column fixed label="操作" min-width="50" show-overflow-tooltip>
            <template slot-scope="{row}">
              <i @click="deleteChoose(row)" class="el-icon-error d-pointer" style="font-size:20px;color:#F5222D"></i>
            </template>
          </el-table-column>
          <el-table-column :reserve-selection="true" label="商品编号" min-width="100" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="d-text-blue">{{row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="SN码/机器码" min-width="100" prop="goodsName" show-overflow-tooltip v-if="sn">
            <template slot-scope="{row}">
              <span>{{row.snCode||row.robotCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品图片" min-width="130" prop="title" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
                <span slot="error">暂无图片</span>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品类别" min-width="100" prop="categoryCode" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品分类" min-width="100" prop="cityName" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.unit | dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="税率" min-width="80" prop="taxRate" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.taxRate ? row.taxRate + '%' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="可用库存" min-width="100" prop="usableInventoryNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.usableInventoryNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="期初库存" min-width="100" prop="originalInventoryNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.originalInventoryNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库数量" min-width="80" prop="sumShipmentNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.sumShipmentNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出库数量" min-width="80" prop="sumPutawayNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.sumPutawayNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="待入库数量" min-width="120" prop="waitShipmentNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.waitShipmentNum||0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="待出库数量" min-width="120" prop="waitPutawayNum" show-overflow-tooltip v-if="!sn">
            <template slot-scope="{row}">
              <span>{{row.waitPutawayNum||0}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <span class="dialog-footer" slot="footer">
      <el-button @click="close" size="small">关 闭</el-button>
      <el-button @click="save" size="small" type="primary">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pickAssemble from '@/components/formComponents/pick-assemble';
import chooseAssembly from '@/components/formComponents/choose-assembly';

export default {
  name: 'CommodityChoose',
  components: {
    pickAssemble,
    chooseAssembly
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {},
    kinds: Array,
    sn: Boolean,
    multiple: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      data: '',
      multipleVisible: false,
      preSelection: [],
      multipleSelection: [], // 当前展示选择
      currentRow: {}, // 单选
      // 查询表单
      queryForm: {
        // 物品类别，例如整机，配件，服务 PSI_SP_KIND-2
        categoryCode: '',
        // 物品分类id 物品分类id
        classId: '',
        // 物品名称 分类名称
        goodsName: '',
        // 每页显示记录数 每页显示记录数
        limit: 15,
        // 当前页数 当前页数
        page: 1
      }
    };
  },
  watch: {
    visible() {
      if (this.visible) {
        this.multipleSelection = [];
        this.preSelection = [];
        this.multipleVisible = false;
        if (
          this.$refs.multipleTable &&
          this.$refs.multipleTable.$refs.elTable
        ) {
          this.$refs.multipleTable.$refs.elTable.clearSelection();
        }
      }
    }
  },
  computed: {
    selected() {
      return [].concat(this.preSelection, this.multipleSelection);
    }
  },
  beforeMount() {
    Object.assign(this.queryForm, this.params);
  },
  methods: {
    selectable(row, index) {
      if (!this.multiple && this.multipleSelection.length > 0) {
        return this.multipleSelection.every(
          item => item.commodityCode === row.commodityCode
        );
      }
      return true;
    },
    getPreSelectObj() {
      return this.preSelection.reduce((data, item) => {
        data[this.sn ? item._rowKey : item.commodityCode] = item;
        return data;
      }, {});
    },
    reload() {
      this.$refs.multipleTable.reload(1);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除某项
    deleteChoose(row) {
      this.preSelection.some((item, i) => {
        if (
          this.sn
            ? item._rowKey == row._rowKey
            : item.commodityCode == row.commodityCode
        ) {
          this.preSelection.splice(i, 1);
          return true;
        }
      });
      this.multipleSelection.some((item, i) => {
        if (
          this.sn
            ? item._rowKey == row._rowKey
            : item.commodityCode == row.commodityCode
        ) {
          this.preSelection.splice(i, 1);
          return true;
        }
      });
      this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row, false);
    },
    close() {
      this.$emit('update:visible', false);
    },
    save() {
      this.$emit('choose', this.selected);
      this.close();
    },
    onTableData(e) {
      this.preSelection = this.preSelection.concat(
        this.multipleSelection || []
      );
      this.multipleVisible = false;
      if (e.data && e.data.length) {
        e.data.map(item =>
          this.$set(item, '_rowKey', item.snCode || item.robotCode)
        );
        this.$nextTick(() => {
          const selectObj = this.getPreSelectObj();
          const selection = [];
          e.data.map(item => {
            if (selectObj[this.sn ? item._rowKey : item.commodityCode]) {
              this.$refs.multipleTable.$refs.elTable.toggleRowSelection(
                item,
                true
              );
              selection.push(item);
              delete selectObj[this.sn ? item._rowKey : item.commodityCode];
            }
          });
          this.tableData = e.data;
          this.multipleSelection = selection;
          this.preSelection = Object.values(selectObj);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-tabs__nav-scroll {
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.el-table__body-wrapper {
  z-index: 3;
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
.choose-container {
  border: 1px solid #f2f2f2;
  height: 500px;
  .choose-aside {
    border-right: 1px solid #f2f2f2;
  }
}
/deep/ .remove-selection {
  .el-table__header {
    .cell {
      text-align: center;
      .el-checkbox {
        display: none;
      }
      &:before {
        content: '选择';
        white-space: nowrap;
      }
    }
  }
}
</style>
