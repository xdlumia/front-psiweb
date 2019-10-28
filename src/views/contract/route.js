/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:32:29
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 14:29:01
 * @Description: 合同模块路由
 */
const BuyingContract = () => import('./buying')

export default [
    {
        path: '/contract/sale', name: '/contract/sale', component: BuyingContract, meta: {
            parent: '合同',
            title: '销售合同'
        }
    },
    {
        path: '/contract/order', name: '/contract/order', component: BuyingContract, meta: {
            parent: '合同',
            title: '采购合同'
        }
    },
    {
        path: '/contract/other', name: '/contract/other', component: BuyingContract, meta: {
            parent: '合同',
            title: '其他合同'
        }
    },
]