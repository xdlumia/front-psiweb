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
        min-width="80"
        prop="name"
      >
        <template slot-scope="scope">
          <span v-if='scope.row.noChildren'>
            <i
              class='el-icon-circle-plus f18 d-text-blue d-pointer'
              @click="appand(scope)"
            ></i>
            <i
              class='el-icon-remove f18 d-text-qgray ml5 d-pointer'
              @click="deleteInfo(scope)"
            ></i>
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
        label="商品编号"
        min-width="150"
      >
        <template
          slot-scope="{}"
          class="d-relative"
        >
          <el-select
            size='mini'
            filterable
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <i
            @click="changeVisible"
            class="el-icon-plus d-text-blue d-absolute f18 b d-pointer"
            style='right:15px;z-index:200;top:20px;'
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="150"
      >
        <template
          slot-scope="{}"
          class="d-relative"
        >
          <el-select
            size='mini'
            filterable
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <i
            @click="changeVisible"
            class="el-icon-plus d-text-blue d-absolute f18 b d-pointer"
            style='right:15px;z-index:200;top:20px;'
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        label="报溢报损数量"
        min-width="150"
      >
        <template
          slot-scope="{}"
          class="d-relative"
        >
          <el-input-number
            size="mini"
            class="wfull"
            :controls='false'
            :min="0"
          ></el-input-number>
          <i
            @click="codeVisible = true"
            class="d-text-blue d-absolute f14 b d-pointer"
            style='right:15px;z-index:200;top:18px;'
          >码</i>
        </template>
      </el-table-column>
      <el-table-column
        label="组装数量"
        min-width="100"
        prop="name"
      >
        <template slot-scope="{}">
          <el-input-number
            size="mini"
            class="wfull"
            :controls='false'
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="借入数量"
        min-width="100"
        prop="name"
      >
        <template slot-scope="{}">
          <el-input-number
            size="mini"
            class="wfull"
            :controls='false'
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="借入价格(单价不含税)"
        min-width="140"
        prop="name"
      >
        <template slot-scope="{}">
          <el-input-number
            size="mini"
            class="wfull"
            :controls='false'
            :min="0"
          ></el-input-number>
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
            :fit="fill"
          ></el-image>
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
    <commodityChoose
      @update=update
      :visibleData='visibleData'
      :visible='visible'
    />
    <reportingLossesCode
      :visible.sync='codeVisible'
      :dialogData='dialogData'
    />
  </form-card>
</template>
<script>
import commodityChoose from './commodity-choose'
import reportingLossesCode from './reporting-losses-code'

export default {
  components: { commodityChoose, reportingLossesCode },
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
      dialogData: {
        title: '机器号/SN码 报溢/报损商品'
      },
      state: '',
      value: '',
      visibleData: {

      },
      codeVisible: false,
      visible: false
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
