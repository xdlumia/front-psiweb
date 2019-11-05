/*
 * @Author: web.王晓冬
 * @Date: 2019-06-18 17:34:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 15:12:04
 * @Description: 验证过文件
 */

/**
* @desc 公共验证方法
* @author web-王晓冬
* @date 2018年9月18号
* @example 调用示例
*          :rules="{ type:'phone',message:'请输入正确的手机号'}"
 * @deprecated yanchao 2018年11月22日 大部分校验已经移至基础包中
**/
// 验证正则
import Schema from 'async-validator'
const verify = {
  // 付款周期，只能从1到12。（以月为单位）
  payCycle: (_rule, value, callback) => {
    const reg = new RegExp('^(0|([1-9][0-9]*))$')
    if (value === '' || reg.test(value) && value <= 12 && value >= 1) {
      callback()
    } else {
      return callback(new Error('付款周期'))
    }
  },
  // 合同期限年数上限，暂时设置为最大10年。
  maxYear: (_rule, value, callback) => {
    const reg = new RegExp('^(0|([1-9][0-9]*))$')
    if (value === '' || reg.test(value) && value <= 30) {
      callback()
    } else {
      return callback(new Error('月数不合法'))
    }
  },
  // 合同期限月数上限(月份到达12个月就相当于1年)
  maxMonth: (_rule, value, callback) => {
    const reg = new RegExp('^(0|([1-9][0-9]*))$')
    if (value === '' || reg.test(value) && value <= 11) {
      callback()
    } else {
      return callback(new Error('月数不合法'))
    }
  },
  // 合同期限天数上限(天数到达30天就相当于1个月)
  maxDay: (_rule, value, callback) => {
    const reg = new RegExp('^(0|([1-9][0-9]*))$')
    if (value === '' || reg.test(value) && value <= 29) {
      callback()
    } else {
      return callback(new Error('天数不合法'))
    }
  },
  // 最大指定日。主要用在指定付款日里，不能超过28，因为2月份有可能只有28天。
  maxDesignationDay: (_rule, value, callback) => {
    const reg = new RegExp('^(0|([1-9][0-9]*))$')
    if (value === '' || reg.test(value) && value <= 28 && value >= 1) {
      callback()
    } else {
      return callback(new Error('天数不合法'))
    }
  }
}
for (const key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}

// export default verify
