/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:32:29
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 10:39:22
 * @Description: 合同模块路由
 */
const BuyingContract = ()=>import('./buying')

export default [
    {
        path: '/contract',
        name: '/contract',
        component: BuyingContract,
        meta: {
            parent: '合同',
            title: '采购合同'
        }
    },
]