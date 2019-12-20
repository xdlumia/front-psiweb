/*
 * @Author: web.王晓冬
 * @Date: 2019-06-18 17:34:58
 * @LastEditors  : 赵伦
 * @LastEditTime : 2019-12-20 17:52:46
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
  },
  bankCard: function bankCard(_rule, value, callback) {
    var reg = /^[a-zA-Z0-9\*]{1,25}$/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入1-25位银行卡号'));
    }
  },
};

for (let key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}

// export default verify
