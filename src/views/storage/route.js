/*
 * @author: 徐贺
 * @Date: 2019-10-26 10:29:53
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-28 14:28:01
 * @Description: 库房模块路由
 */
const sales = () => import('./sales')
const assemble = () => import('./assemble')
const picking = () => import('./picking')
const assembly = () => import('./assembly')
const deliver = () => import('./deliver')
const purchase = () => import('./purchase')
const disassemble = () => import('./disassemble')
const exchange = () => import('./exchange')
const borrow = () => import('./borrow')
const allocation = () => import('./allocation')
const inventory = () => import('./inventory')
const reporting = () => import('./reporting')
const stock = () => import('./stock')
export default [{
    path: '/storage/sales',
    name: '/storage/sales',
    component: sales,
    meta: {
      parent: '库房',
      title: '销售单'
    }
  },
  {
    path: '/storage/assemble',
    name: '/storage/assemble',
    component: assemble,
    meta: {
      parent: '库房',
      title: '组装单'
    }
  },
  {
    path: '/storage/picking',
    name: '/storage/picking',
    component: picking,
    meta: {
      parent: '库房',
      title: '拣货单'
    }
  },
  {
    path: '/storage/assembly',
    name: '/storage/assembly',
    component: assembly,
    meta: {
      parent: '库房',
      title: '组装任务'
    }
  },
  {
    path: '/storage/deliver',
    name: '/storage/deliver',
    component: deliver,
    meta: {
      parent: '库房',
      title: '发货单'
    }
  },
  {
    path: '/storage/purchase',
    name: '/storage/purchase',
    component: purchase,
    meta: {
      parent: '库房',
      title: '采购单'
    }
  },
  {
    path: '/storage/disassemble',
    name: '/storage/disassemble',
    component: disassemble,
    meta: {
      parent: '库房',
      title: '拆卸任务'
    }
  },
  {
    path: '/storage/exchange',
    name: '/storage/exchange',
    component: exchange,
    meta: {
      parent: '库房',
      title: '换货任务'
    }
  },
  {
    path: '/storage/borrow',
    name: '/storage/borrow',
    component: borrow,
    meta: {
      parent: '库房',
      title: '借入借出任务'
    }
  },
  {
    path: '/storage/allocation',
    name: '/storage/allocation',
    component: allocation,
    meta: {
      parent: '库房',
      title: '调拨单'
    }
  },
  {
    path: '/storage/inventory',
    name: '/storage/inventory',
    component: inventory,
    meta: {
      parent: '库房',
      title: '盘点单'
    }
  },
  {
    path: '/storage/reporting',
    name: '/storage/reporting',
    component: reporting,
    meta: {
      parent: '库房',
      title: '报溢报损单'
    }
  },
  {
    path: '/storage/stock',
    name: '/storage/stock',
    component: stock,
    meta: {
      parent: '库房',
      title: '库存查询'
    }
  }
]