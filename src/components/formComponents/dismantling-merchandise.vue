/*
 * @Author: 徐贺
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-29 16:16:52
 * @Description: 拆卸商品
*/  
<template>
  <form-card
    class="borrow-goods-info"
    title="拆卸商品"
  >
    <div slot="title">
      <span>拆卸商品</span>
      <span class="fr">
        <span>
          <el-link
            :underline="false"
            @click="fullscreen"
            type="primary"
          >全屏显示</el-link>
        </span>
      </span>
    </div>
    <el-table
      border
      :data="tableData"
      max-height="400"
      ref="companyTable"
      row-key="name"
      size="mini"
    >
      <el-table-column
        class-name="hide-children"
        min-width="1"
        width="1"
      ></el-table-column>

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
        label="操作"
        min-width="80"
        prop="name"
      >
        <template slot-scope="">
          <el-button
            size="mini"
            type="primary"
            @click="disVisible = true"
          >拆卸</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="拆卸数量"
        min-width="100"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="机器号/SN码"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">
          <span class="d-text-blue">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="商品编号"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="d-text-blue">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品类别"
        min-width="100"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品分类"
        min-width="100"
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
    <FullscreenElement
      :element="$refs.companyTable"
      :visible.sync="showInFullscreen"
    />
    <disassDsassemble
      :visible.sync='disVisible'
      @close='disVisible = false'
    />
  </form-card>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import disassDsassemble from './disass-disassemble';//拆卸

export default {
  components: { FullscreenElement, disassDsassemble },
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
      disVisible: false
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
      // this.tableData.splice(row.$index + 1, 0, { name: '新的', children: [], noChildren: true })
      this.tableData.push({ name: '新的', children: [], noChildren: true })
    },
    //点击删除当前行
    deleteInfo(row) {
      this.tableData.splice(row.$index, 1)
    },
    //召唤弹窗
    changeVisible() {
      console.log(this.visible)
      this.visible = true
    },
    //关闭弹窗
    update() {
      this.visible = false
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
