/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 15:56:19
 * @Description: 借入/借出商品
*/  
<template>
  <form-card
    class="borrow-goods"
    title="借入/借出商品"
  >
    <div slot="title">
      <span>借入/借出商品</span>
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
      :data="tableData"
      max-height="400"
      ref="elTable"
      row-key="name"
      size="mini"
    >
      <el-table-column
        class-name="hide-children"
        fixed
        min-width="1"
        width="1"
      ></el-table-column>
      <el-table-column
        fixed
        min-width="60"
      >
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
        fixed
        label="借入数量"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        fixed
        label="借入库房"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        fixed
        label="机器号/SN码"
        min-width="110"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span
            class="d-text-blue d-pointer"
            @click="visible = true"
          >{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="返还数量"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        fixed
        label="返还库房"
        min-width="70"
        prop="name"
      ></el-table-column>
      <el-table-column
        fixed
        label="机器号/SN码"
        min-width="110"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        fixed
        label="成本单价(含税)"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品编号"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品名称"
        min-width="110"
        prop="name"
      ></el-table-column>
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
        label="单位"
        min-width="60"
        prop="name"
      ></el-table-column>
    </el-table>
    <FullscreenElement
      :element="$refs.elTable"
      :visible.sync="showInFullscreen"
    />
    <commodityRecordBorrow :visible.sync='visible' />
  </form-card>

</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import commodityRecordBorrow from './commodity-record-borrow'
export default {
  components: {
    FullscreenElement,
    commodityRecordBorrow
  },
  data() {
    return {
      tableData: [{ name: '110', children: [{ name: '1120' }] }],
      showInFullscreen: false,
      visible: false,
    };
  },
  methods: {
    getData(data) {
      console.log(data);
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
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
</style>
