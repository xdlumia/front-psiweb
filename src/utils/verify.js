/**
 * @desc 公共验证方法
 * @author web-王晓冬
 * @date 2018年9月18号
 * @example 调用示例
 **/
// 验证正则
import Schema from 'async-validator'

const verify = {}

for (let key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}
