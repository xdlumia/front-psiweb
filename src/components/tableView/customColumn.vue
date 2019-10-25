/*
 * @Author: web.王晓冬
 * @Date: 2019-10-25 09:10:36
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 12:07:39
 * @Description: file content
*/
<template>
  <el-dialog :visible="visible" center title="自定义列" v-dialogDrag>
    <div class="custom-column-view">
      <div>已显示列（拖拽可调整排序）</div>
      <div>
        <draggable v-model="list">
          <transition-group>
            <el-button :key="item" class="drag-btn" plain size="mini" type="primary" v-for="item of list">{{item}}</el-button>
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
      <el-button @click="close" size="small">取 消</el-button>
      <el-button @click="confirm" size="small" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable';

/**
 * @author 赵伦 2019-10-24
 * @description 自定义列表头
 */
export default {
  components: {
    draggable
  },
  props: {
    visible: Boolean, // 显示隐藏
    headers: Array // 列头信息
  },
  data() {
    return {
      list: Array(30)
        .fill('')
        .map((str, i) => i + 1),
      showList: Array(30)
        .fill('')
        .map((str, i) => ({
          name: i + 1,
          selected: true
        }))
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
    confirm() {
      console.log(this.list, this.showList);
      this.close();
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-column-view {
  .drag-btn,
  .choose-btn {
    margin-bottom: 5px;
    margin-left: 0;
    margin-right: 5px;
    &.is-plain {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    &.sortable-chosen {
      filter: grayscale(1);
      border-style: dashed;
    }
  }
}
</style>
