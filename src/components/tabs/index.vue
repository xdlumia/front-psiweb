/*
 * @Author: 赵伦
 * @Date: 2019-10-29 11:57:36
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 14:32:03
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
      <slot />
    </el-main>
  </el-container>
</template>
<script>
/**
 * @example 需要通过样式设置最大高度，形成滚动区域，自动监听滚动事件
 *   <d-tabs :style="{maxHeight:'600px'}">
 *     <d-tab-pane label="供应商信息" name="supplierInfo" /> 
 *     <div slot="body">
 *       <el-form class="p10">
 *         <SupplierInfo id="supplierInfo" /> 
 *       </el-form>
 *     </div>
 *   </d-tabs>
 */
export default {
  props: {
    scrollView: HTMLElement
  },
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
        .filter(a => a.componentOptions && a.componentOptions.Ctor.extendOptions.name == 'dTabPanel')
        .map(node => node.componentOptions.propsData);
    },
    scrollEl(){
      if(this.scrollView instanceof HTMLElement){
        return this.scrollView;
      }else return this.$refs.elMain.$el;
    }
  },
  watch: {},
  mounted() {
    this.scrollEl.onscroll = this.onScroll;
  },
  methods: {
    onScroll() {
      clearTimeout(this.timer);
      let baseDom = this.scrollEl;
      this.timer = setTimeout(() => {
        let rootRect = baseDom.getBoundingClientRect();
        this.tabs
          .map(item => ({
            dom: baseDom.querySelector(`#${item.name}`),
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
