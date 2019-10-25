import Vue from 'vue'

/**
 * @author 赵伦 2019-10-24
 * @description 在滚动区域内滚动到指定区域
 *
 * @example 在例子中，需要声明ref变量，变量需要保证唯一性
 *
 * <span v-anchor:target>点击后滚动到目标滚动区域</span>
 *
 * <div ref="target">目标滚动区域</div>
 *
 */

Vue.directive('anchor', {
  inserted(el, bind, vm) {
    const targetRefName = bind.arg;
    el.addEventListener('click', vm.hookfn = () => {
      let targetRefContext = vm.context;
      while (!targetRefContext.$refs[targetRefName] && targetRefContext.$parent) {
        targetRefContext = targetRefContext.$parent;
      }
      if (targetRefContext) {
        const node = targetRefContext.$refs[targetRefName]
        let el = node;
        if (!(node instanceof HTMLElement)) {
          el = node.$el;
        }
        if (el) {
          el.scrollIntoView(true)
        }
      }
    }, this)
  }
})
