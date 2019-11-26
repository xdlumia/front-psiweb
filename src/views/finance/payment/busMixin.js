/*
 * @Author: 赵伦
 * @Date: 2019-11-22 16:39:19
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-26 11:54:36
 * @Description: 关联业务辅助
 */

export default {
  data() {
    return {
      showBusDetail: false,
      currentBusCode: '',
      currentBusType: '',
      busInfo: {
        // 销售出库单
        0: {
          stateText: {
            '0': '审核中',
            '1': '请购处理',
            '2': '回收合同',
            '3': '已通过',
            '4': '完成',
            '5': '已驳回',
            '6': '终止',
            '-1': '新建'
          },
          detailPage: () => import('@/views/sales/outLibrary/outLib-details.vue'),
          listPage: 'SalesOutLibrary',
          codeFilterKey: 'shipmentCode',
          title: '销售出库单'
        },
        // 销售退货单
        1: {
          stateText: {
            '0': '审核中',
            '1': '待完成',
            '2': '部分完成',
            '3': '已完成',
            '4': '已驳回',
            '-1': '新建'
          },
          detailPage: () => import('@/views/sales/return/details.vue'),
          listPage: 'SalesReturn',
          codeFilterKey: 'alterationCode',
          title: '销售退货单'
        },
        // 销售换货单
        2: {
          stateText: {
            '0': '审核中',
            '1': '待完成',
            '2': '部分完成',
            '3': '已完成',
            '4': '已驳回',
            '-1': '新建'
          },
          detailPage: () => import('@/views/sales/exchange/details.vue'),
          listPage: 'SalesExchange',
          codeFilterKey: 'alterationCode',
          title: '销售换货单'
        },
        // 费用单
        3: {
          stateText: {
            '0': '审核中',
            '1': '待复核',
            '2': '已通过',
            '3': '已驳回',
            '4': '部分分摊',
            '5': '已分摊',
            '-1': '新建'
          },
          detailPage: () => import('@/views/finance/fee/detail.vue'),
          listPage: 'FinanceFee',
          codeFilterKey: 'costCode',
          title: '费用单'
        },
        // 采购入库单
        4: {
          stateText: {
            '0': '新建',
            '1': '审核中',
            '3': '已通过',
            '4': '已完成',
            '5': '已驳回',
            '6': '已终止'
          },
          detailPage: () => import('@/views/order/storage/detail.vue'),
          listPage: 'OrderStorage',
          codeFilterKey: 'putinCode',
          title: '采购入库单'
        },
        // 采购退货单
        5: {
          stateText: {
            '0': '新建',
            '1': '审核中',
            '2': '待退货',
            '3': '部分退货',
            '4': '已退货',
            '5': '已驳回'
          },
          detailPage: () => import('@/views/order/reject/detail.vue'),
          listPage: 'OrderReject',
          codeFilterKey: 'alterationCode',
          title: '采购退货单'
        },
        // 采购换货单
        6: {
          stateText: {
            '0': '新建',
            '1': '审核中',
            '2': '待换货',
            '3': '部分换货',
            '4': '完成换货',
            '-1': '已驳回'
          },
          detailPage: () => import('@/views/order/exchange/detail.vue'),
          listPage: 'OrderExchange',
          codeFilterKey: 'swapOrderCode',
          title: '采购换货单'
        }
      }
    }
  },
  methods: {
    openBusPage(row) {
      this.currentBusCode = row.busCode
      this.currentBusType = row.busType
      this.$nextTick(() => (this.showBusDetail = true))
    }
  }
}
