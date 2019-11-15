<!--
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:16:28
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 11:25:09
 * @Description: 待办事项
 -->
<template>
  <div class="todo">
    <h3>待办事项</h3>
    <div class="todo-wrapper">
      <div class="menu">
        <el-menu :default-active="defaultActived">
          <el-submenu
            v-for="(item, index) in list"
            :key="index"
            :title="item.label"
            :index="item.label"
          >
            <template slot="title">
              <span class="b">{{item.label}}（{{item.processNum}}）</span>
            </template>
            <el-menu-item
              :index="sub.label"
              v-for="(sub, key) in filterChildren(item.children)"
              :key="key"
              @click="showDetail(sub)"
            >
              <div style="display: flex;justify-content: space-between;align-items: center;">
                <span style="flex:0 0 180px">{{sub.label}}</span>
                <div class="badge">
                  <span>{{sub.processNum > 99 ? '99+' : sub.processNum}}</span>
                </div>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content">
        <component
          :is="componentName"
          :button="false"
          :params="{page: 1, limit: 15, backlogType: 1}"
        ></component>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import list from './render'
export default {
  data () {
    return {
      list: list.filter(item => item.show),
      componentName: '',
      defaultActived: ''
    }
  },
  components: {
  },
  mounted () {
    this.handleList()
    this.defaultMenu()
  },
  methods: {
    showDetail (item) {
      this.componentName = item.component
    },
    defaultMenu () {
      const menu = this.list.find(item => {
        return item.children.some(sub => {
          return sub.show
        })
      })
      const sub = menu.children.find(item => item.show)
      this.componentName = sub.component
      this.defaultActived = sub.label
    },
    filterChildren (list) {
      return list.filter(item => item.show)
    },
    homePageQueryList () {
      return this.$api.seePsiCommonService.homePageQueryList().then(res => {
        const obj = Object.create(null);
        (res.data || []).forEach(item => {
          obj[item.processTypeCode] = item.processNum
        })
        return obj
      })
    },
    handleList () {
      this.homePageQueryList().then(res => {
        this.list.forEach(item => {
          const num = item.children.reduce((val, sub) => {
            sub.processNum = res[sub.key] || 0
            return val + sub.processNum
          }, 0)
          item.processNum = num
        })
      })
    }
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
    text-indent: 20px;
    font-weight: bold;
  }
  .todo-wrapper {
    flex: 1;
    display: flex;
    overflow: hidden;
    .menu {
      flex: 0 0 260px;
      background: #fff;
      margin-left: 20px;
      border-radius: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 100%;
      /deep/ .el-menu {
        border-right: none;
      }
      .badge {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 18px;
        background: #f56c6c;
        color: #fff;
        border-radius: 9px/50%;
        font-size: 0;
        padding: 0 3px;
        border: 1px solid #fff;
        box-sizing: border-box;
        span {
          display: inline-block;
          min-width: 18px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .content {
      flex: 1;
      background: #fff;
      margin-left: 10px;
      overflow-y: auto;
      /deep/ .main-content {
        height: calc(100vh - 150px);
      }
    }
  }
}
</style>
