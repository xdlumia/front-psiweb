/*
 * @Author: 赵伦
 * @Date: 2019-10-28 08:50:47
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:59:50
 * @Description: 采购模块路由
 */
const OrderBuying = () => import('./buying')
const OrderPrepare = () => import('./prepare')
const OrderDirect = () => import('./direct')
const OrderStorage = () => import('./storage')
const OrderReject = () => import('./reject')
const OrderUnpack = () => import('./unpack')
const OrderPrice = () => import('./price')
const OrderBorrow = () => import('./borrow')
const OrderExchange = () => import('./exchange')
const OrderPay = () => import('./pay')
const OrderSupplier = () => import('./supplier')

export default [
    { path: '/order/buying', name: '/order/buying', component: OrderBuying, meta: { parent: '采购', title: '请购单' } },
    { path: '/order/prepare', name: '/order/prepare', component: OrderPrepare, meta: { parent: '采购', title: '备货单' } },
    { path: '/order/direct', name: '/order/direct', component: OrderDirect, meta: { parent: '采购', title: '直发单' } },
    { path: '/order/storage', name: '/order/storage', component: OrderStorage, meta: { parent: '采购', title: '采购入库单' } },
    { path: '/order/reject', name: '/order/reject', component: OrderReject, meta: { parent: '采购', title: '采购退货单' } },
    { path: '/order/unpack', name: '/order/unpack', component: OrderUnpack, meta: { parent: '采购', title: '拆卸单' } },
    { path: '/order/price', name: '/order/price', component: OrderPrice, meta: { parent: '采购', title: '采购调价单' } },
    { path: '/order/borrow', name: '/order/borrow', component: OrderBorrow, meta: { parent: '采购', title: '借入借出单' } },
    { path: '/order/exchange', name: '/order/exchange', component: OrderExchange, meta: { parent: '采购', title: '换货单' } },
    { path: '/order/pay', name: '/order/pay', component: OrderPay, meta: { parent: '采购', title: '付款单' } },
    { path: '/order/supplier', name: '/order/supplier', component: OrderSupplier, meta: { parent: '采购', title: '供应商' } },
]