/*
 * @Author: 赵伦
 * @Date: 2019-10-29 11:57:36
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 18:57:33
 * @Description: tabs
*/
<template>
  <el-container class="wfull hfull d-tabs">
    <el-header class="d-bg-white" style="height:40px;padding:0;">
      <el-tabs @tab-click="tabChange" v-model="activeName">
        <el-tab-pane :key="item.name" :label="item.label" :name="item.name" v-for="item of tabs"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main ref="elMain" style="padding:0;">
      <slot name="body" />
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      activeName: '',
      tabsVisible: {},
      timer: null
    };
  },
  computed: {
    tabs() {
      return this.$slots.default
        .filter(a => a.componentOptions.Ctor.extendOptions.name == 'dTabPanel')
        .map(node => node.componentOptions.propsData);
    }
  },
  watch: {},
  mounted() {
    this.$refs.elMain.$el.onscroll = this.onScroll;
  },
  methods: {
    onScroll() {
      clearTimeout(this.timer);
      let baseDom = this.$refs.elMain.$el;
      this.timer = setTimeout(() => {
        let rootRect = baseDom.getBoundingClientRect();
        this.tabs
          .map(item => ({
            dom: document.getElementById(item.name),
            name: item.name
          }))
          .filter(a => a.dom)
          .some(({ dom, name }) => {
            let childRect = dom.getBoundingClientRect();
            let interHeight = childRect.bottom - rootRect.top;
            if (interHeight > 50 && interHeight < childRect.height + 50) {
              this.activeName = name;
              return true;
            }
          });
      }, 200);
    },
    tabChange({ name }) {
      let el = document.getElementById(name);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.d-tabs {
  /deep/ {
    > .el-header > .el-tabs > .el-tabs__content {
      display: none;
    }
  }
}
</style>
