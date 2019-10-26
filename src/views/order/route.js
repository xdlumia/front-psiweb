/*
 * @author: 赵伦
 * @Date: 2019-10-26 10:29:53
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 10:42:00
 * @Description: 采购模块路由
 */
const OrderBuying = () => import('./buying')

export default [
    {
        path: '/order/buying',
        name: '/order/buying',
        component: OrderBuying,
        meta: {
            parent: '采购',
            title: '采购请购单'
        }
    },
]