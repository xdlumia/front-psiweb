/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:55
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 10:34:25
 * @Description: description
 */
const storeroom = [
  {
    label: '待出库销售单',
    key: '',
    component: 'StorageSales',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '分配给我的组装任务',
    key: '',
    component: 'StorageAssembly',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '分配给我的拣货任务',
    key: '',
    component: 'StoragePicking',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待入库采购单',
    key: '',
    component: 'StoragePurchase',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '分配给我的拆卸任务',
    key: '',
    component: 'StorageDisassemble',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待审批换货单',
    key: '',
    component: 'StorageExchange',
    authorityCode: '',
    processNum: 0,
    show: true
  }
]

export default storeroom
