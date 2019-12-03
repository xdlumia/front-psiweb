/*
 * @Author: web.王晓冬
 * @Date: 2019-06-18 17:34:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-28 10:12:14
 * @Description: 验证过文件
 */


import Schema from 'async-validator';

const verify = {
  // 正整数
  taxRate(_rule, value, callback) {
    // /^\d+(?=\.{0,1}\d+$|$)/
    var reg = /^(?:[1-9]?\d|100)$/
    if (!value || reg.test(value)) {
      callback();
    } else {
      callback(new Error('只能输入0-100的整数'));
    }
  }
};

for (let key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}

// export default verify
