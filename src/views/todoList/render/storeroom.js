/*
 * @Author: 高大鹏
 * @Date: 2019-11-12 15:20:55
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-10 10:31:49
 * @Description: description
 */
const storeroom = [
  {
    label: '待发货销售单',
    key: 'psi_wms_sales_04',
    component: 'StorageSales',
    authorityCode: '',
    processNum: 0,
    show: true,
    params: {
      deliverStates: [-1, 0]
    }
  },
  {
    label: '分配给我的组装任务',
    key: 'psi_wms_assembleTask',
    component: 'StorageAssembly',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '分配给我的拣货任务',
    key: 'psi_wms_pickingTask',
    component: 'StoragePicking',
    authorityCode: '',
    processNum: 0,
    show: true
  },
  {
    label: '待入库采购单',
    key: 'psi_wms_data_03',
    component: 'StoragePurchase',
    authorityCode: '',
    processNum: 0,
    show: true,
    params: {
      states: [0, 1]
    }
  },
  {
    label: '分配给我的拆卸任务',
    key: 'psi_wms_disassemblyTask',
    component: 'StorageDisassemble',
    authorityCode: '',
    processNum: 0,
    show: true
  }
]

export default storeroom
