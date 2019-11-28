/*
 * @Author: web.王晓冬
 * @Date: 2019-06-18 17:34:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-28 10:04:50
 * @Description: 验证过文件
 */

// 验证正则
import Schema from 'async-validator'
const verify = {
  // 税率验证
  taxRate(rule, value, callback) {

    console.log(value);

    var reg = /^(?:[1-9]?\d|100)$/
    console.log(!reg.test(value));

    if (!reg.test(value)) {
      callback(new Error('只能输入0-100的整数'));
    }
    else {
      callback();
    }
  }
}
for (const key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}

// export default verify
