/*
* @Author: web.王晓冬
* @Date: 2019-05-14 18:08:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 12:00:52
* @Description: 表单卡片
* @param  title 表单title
* @param  shadow 卡片阴影出现的时机  默认never
* @slot name=title 自定义title样式
* @slot  默认
* @date 2018年11月1日
* @example 使用示例 1
*        <form-card title="发票信息">
            <div>示意</div>
        </form-card>

* @example 使用示例 2
*        <form-card :title="true">
            <div slot = "title"> <el-row>自定义title</el-row> </div>
            <div>内容</div>
    </form-card>
**/
<template>
  <div>
    <div class="pl15 pr15 d-flex-lr table-header-box">
      <section class="d-flex-lr">
        <div class="b f16" style="margin-right:40px;">报价单</div>
        <div class="f14 d-text-gray">
          <span class="mr30">报价单</span>
          <span class="mr30">报价单</span>
          <span class="mr30">报价单</span>
        </div>
      </section>
      <section class="table-header-tool">
        <!-- 更多功能 -->
        <el-dropdown trigger="click">
          <el-button size="mini" class="mr15" icon="el-icon-more" title="更多"></el-button>
          <el-dropdown-menu slot="dropdown">
            <slot name="more-button">
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>打印</el-dropdown-item>
            </slot>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 筛选 -->
        <el-popover placement="bottom" v-model="filterPopover" trigger="click" width="250">
          <div class="table-filter-box">
            <el-container>
              <el-header style="height:30px;">
                <span>筛选</span>
                <el-link
                  :underline="false"
                  @click="filterPopover = false"
                  class="el-icon-close close"
                  title="关闭"
                ></el-link>
              </el-header>
              <el-main style="max-height:500px;">
                <slot name="filter">自定义筛选slot name = filter</slot>
              </el-main>
              <div class="pl10 pr10" style="height:30px; line-height:30px;">
                <el-link
                  size="mini"
                  :underline="false"
                  class="el-icon-circle-plus-outline"
                  type="primary"
                >添加筛选</el-link>
                <el-link size="mini" :underline="false" class="fr" type="primary">清空筛选</el-link>
              </div>
            </el-container>
          </div>
          <el-button size="mini" slot="reference" title="筛选" icon="iconfont icon-filter"></el-button>
        </el-popover>

        <el-button
          @click="showCustomColumn=!showCustomColumn"
          size="mini"
          class="ml15"
          icon="iconfont icon-col"
          title="自定义列"
        ></el-button>
      </section>
    </div>
    <!-- 自定义列弹出框 -->
    <el-dialog :visible="showCustomColumn" @close="close" center title="自定义列" v-dialogDrag>
      <div class="custom-column-view">
        <div>选择显示示列</div>
        <div>
          <draggable v-model="showList">
            <transition-group>
              <el-button
                class="drag-btn"
                :key="item.id"
                :plain="!item.selected"
                @click="item.selected=!item.selected"
                size="mini"
                type="primary"
                v-for="(item) of showList"
              >{{item.name}}</el-button>
            </transition-group>
          </draggable>
        </div>
        <div>选择显示示列</div>
        <div>
          <el-button
            :key="item.name"
            :plain="!item.selected"
            @click="item.selected=!item.selected"
            class="choose-btn"
            size="mini"
            type="primary"
            v-for="(item) of showList"
          >{{item.name}}</el-button>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="showCustomColumn = false" size="small">取 消</el-button>
        <el-button @click="confirm" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "table-top",
  props: {
    title: {
      default: false
    },
    shadow: {
      default: "never"
    }
  },
  data() {
    return {
      filterPopover: false,
      showCustomColumn: false
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.table-header-box {
  justify-content: space-between;
  height: 45px;
  border: 1px solid #efefef;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}
.table-header-tool {
  .el-button--mini {
    width: 28px;
    height: 28px;
    padding: 0;
  }
}
</style>
