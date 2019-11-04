/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 15:39:50
 * @Description: 拆卸商品编辑页面
*/  
<template>
  <form-card
    class="borrow-goods"
    title="商品信息"
  >
    <div slot="title">
      <span>商品信息</span>
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
        label="操作"
        min-width="70"
        prop="name"
      >
        <template slot-scope="{}">
          <span class="d-text-blue">添加配件</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60">
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
        label="商品编号"
        min-width="200"
        prop="name"
      >
        <template>
          <commodity-selector />
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="200"
        prop="name"
      >
        <template>
          <commodity-selector />
        </template>
      </el-table-column>
      <el-table-column
        label="单件数量"
        min-width="120"
        prop="name"
      >
        <template>
          <el-input
            size="mini"
            v-model="data"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="拆卸数量"
        min-width="120"
        prop="name"
      >
        <template>
          <el-input
            size="mini"
            v-model="data"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="采购单件"
        min-width="110"
        prop="name"
      >
        <template>
          <el-input
            size="mini"
            v-model="data"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="税率"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="含税总价"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品图片"
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
        label="商品规格"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="单位"
        min-width="60"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品配置"
        min-width="110"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="备注"
        min-width="60"
        prop="name"
      ></el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [{ name: '110', children: [{ name: '1120' }] }],
      showInFullscreen: false,
      data: ''
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
