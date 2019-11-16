/*
 * @Author: 高大鹏
 * @Date: 2019-11-16 13:08:31
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-16 13:09:07
 * @Description: description
 */
const filter = {
  filter: {
    // 千位分隔符转换
    thousandBitSeparator(num) {
      return num && num
        .toString()
        .replace(/^\d+/, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
    }
  }}

export default filter
