/*
 * @Author: 赵伦
 * @Date: 2019-10-28 08:50:47
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 16:23:00
 * @Description: 合同模块路由
 */
const SaleContract = () => import('./sale')
const OrderContract = () => import('./order')
const OtherContract = () => import('./other')

export default [
    { path: '/contract/sale', name: '/contract/sale', component: SaleContract, meta: { parent: '合同', title: '销售合同' } },
    { path: '/contract/order', name: '/contract/order', component: OrderContract, meta: { parent: '合同', title: '采购合同' } },
    { path: '/contract/other', name: '/contract/other', component: OtherContract, meta: { parent: '合同', title: '其他合同' } },
]