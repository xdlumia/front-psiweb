/**
 * @description 函数防抖
 * @param {*} func 回调方法
 * @param {*} delay 延迟时间
 * @author 高大鹏
 * @date 2019-07-30 16:55:49
 */
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
