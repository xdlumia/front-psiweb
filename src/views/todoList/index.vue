<!--
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:16:28
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-12 17:52:23
 * @Description: 待办事项
 -->
<template>
  <div class="todo">
    <h3>待办事项</h3>
    <div class="todo-wrapper">
      <div class="menu">
        <el-menu>
          <el-submenu v-for="(item, index) in list" :key="index" :title="item.label" :index="index">
            <template slot="title">
              <span>{{item.label}}</span>
            </template>
            <el-menu-item v-for="(sub, key) in item.children" :key="key">{{sub.label}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import list from './render'
export default {
  data () {
    return {
      list
    }
  },
  components: {
  }
}
</script>

<style scoped lang='scss'>
.todo {
  background: #f5f5f8;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  h3 {
    padding: 10px 0;
  }
  .todo-wrapper {
    flex: 1;
    display: flex;
    overflow: hidden;
    .menu {
      flex: 0 0 250px;
      background: #fff;
      margin-left: 20px;
      border-radius: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 100%;
      /deep/ .el-menu {
        border-right: none;
      }
    }
    .content {
      flex: 1;
    }
  }
}
</style>
