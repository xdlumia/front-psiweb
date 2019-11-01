/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 选择商品
*/
<template>
  <el-dialog
    :visible.sync="visible"
    @close='close'
    title="选择商品"
    v-dialogDrag
    width='60%'
  >
    <div class="mb15">
      <el-input
        size='small'
        v-model="input"
        placeholder="搜索商品编号/名称"
        style="width:250px"
      ></el-input>
      <el-button
        class='fr'
        @click="multipleVisible = !multipleVisible"
        size='small'
      >已选择（{{multipleSelection.length}}）</el-button>
    </div>
    <el-container class="choose-container">
      <!-- 左侧 -->
      <el-aside
        width="250px"
        class="choose-aside"
      >
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="整机"
            name="first"
          ></el-tab-pane>
          <el-tab-pane
            label="配件"
            name="second"
          ></el-tab-pane>
          <el-tab-pane
            label="服务"
            name="third"
          ></el-tab-pane>
        </el-tabs>
        <el-input
          style="width:93%"
          class="ml5"
          prefix-icon="el-icon-search"
          size='small'
          placeholder="搜索分类名称"
          v-model="filterText"
        >
        </el-input>
        <el-button
          type="text"
          class="ml5"
        >全部</el-button>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>

      </el-aside>
      <!-- 表格 -->
      <el-main>
        <d-table
          :reserve-selection='true'
          rowKey="cityName"
          v-show='!multipleVisible'
          api="seePumaidongService.collegeManagerList"
          :params="queryForm"
          ref="multipleTable"
          class="college-main"
          style="height:100%"
          :tree-props="{children: 'id', hasChildren: 'id'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品编号"
            :reserve-selection='true'
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品图片"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 40px"
                src="http://pics.sc.chinaz.com/files/pic/pic9/201910/zzpic20721.jpg"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>

          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品名称"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品类别"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品配置"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品分类"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="cityName"
            min-width="140"
            label="商品规格"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="单位"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="税率"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="可用库存"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="期初库存"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="入库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="出库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="待入库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="待出库数量"
            show-overflow-tooltip
          ></el-table-column>
        </d-table>
        <!-- 点击数量覆盖下来的表格 -->
        <el-table
          :data="multipleSelection"
          v-show='multipleVisible'
          border
        >
          <el-table-column
            fixed
            min-width="50"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="row">
              <i
                class="el-icon-error d-pointer"
                style="font-size:20px;color:#F5222D"
                @click="deleteChoose(row)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品编号"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.cityName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品图片"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 40px"
                src="http://pics.sc.chinaz.com/files/pic/pic9/201910/zzpic20721.jpg"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>

          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品名称"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品类别"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品配置"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="商品分类"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="cityName"
            min-width="140"
            label="商品规格"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="单位"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="税率"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="可用库存"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="期初库存"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="入库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="80"
            label="出库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="待入库数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="待出库数量"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
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
        @click="close"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pickAssemble from '@/components/formComponents/pick-assemble';
import chooseAssembly from '@/components/formComponents/choose-assembly';

export default {
  name: 'commodityChoose',
  components: {
    pickAssemble,
    chooseAssembly
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {}
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: 'first',
      filterText: '',
      multipleVisible: false,
      multipleSelection: [],
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() { },
  methods: {
    handleClick() {

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除某项
    deleteChoose(row) {
      this.multipleSelection.splice(row.$index, 1)
      this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row.row, false);
    },
    close() {
      this.$emit('update:visible', false)
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
</style>