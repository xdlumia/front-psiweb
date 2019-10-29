/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 14:42:50
 * @Description: 在滚动区域内滚动到指定区域
 */
import Vue from 'vue'

/**
 * @author 赵伦 2019-10-24
 * @description 在滚动区域内滚动到指定区域
 *
 * @example 在例子中，需要声明ref变量，变量需要保证唯一性，或者使用dom的id
 *
 * <span v-anchor:target>点击后滚动到目标滚动区域</span>
 *
 * <div ref="target" id="target">目标滚动区域</div>
 *
 */

Vue.directive('anchor', {
  inserted(el, bind, vm) {
    const targetRefName = bind.arg;
    el.addEventListener('click', () => {
      let targetRefContext = vm.context;
      while (!targetRefContext.$refs[targetRefName] && targetRefContext.$parent) {
        targetRefContext = targetRefContext.$parent;
      }
      let el = null;
      if (targetRefContext) {
        const node = targetRefContext.$refs[targetRefName]
        el = node;
      } else {
        if (targetRefName) {
          el = document.getElementById(targetRefName);
        } else if (typeof bind.value == "string" && bind.value) {
          el = document.querySelector(bind.value)
        }
      }
      if (el && !(el instanceof HTMLElement)) {
        el = el.$el;
      }
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  }
})