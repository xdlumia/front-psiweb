/*
 * @Author: 赵伦
 * @Date: 2019-11-30 12:52:08
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-30 14:07:06
 * @Description: file content
 */
/**
 * @description 根据busCode获取开/收票商品信息
 * 
 */

export default {
    data() {
        return {
            // prettier-ignore
            busConfig: {
                // 销售出库单
                0: {
                    detailApi: 'seePsiSaleService.salesshipmentGetShipmentCommodity',
                    paramFn: (code) => ({ code }),
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'discountSprice', quantity: 'commodityNumber'
                    }
                },
                // 销售退货单
                1: null,
                // 销售换货单
                2: null,
                // 费用单
                3: null,
                // 采购入库单
                4: {
                    detailApi: 'seePsiPurchaseService.purchaseputinGetByCode',
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'purchasePrice', quantity: 'commodityNumber'
                    }
                },
                // 采购退货单
                5: null,
                // 采购换货单
                6: null
            }
        }
    },
    methods: {
        async getInvoiceGoods(code, busType) {
            let config = this.busConfig[busType]
            if (!config) return []
            let { data } = await this.$getApi(config.detailApi).apply(
                null,
                config.paramFn ? [config.paramFn(code)] : [null, code]
            )
            let commodityList = [];
            if (!Array.isArray(data) && data) {
                commodityList = data[config.commodityKey || 'commodityList'] || []
            } else commodityList = data;
            return commodityList.map(item => {
                return typeof config.transfer == 'function' ? config.transfer(item) : {
                    ...Object.keys(config.transfer).reduce((data, key) => {
                        data[key] = item[config.transfer[key] || key]
                        return data;
                    }, {}),
                    isOrder: 1,
                    type: 0,
                }
            })
        }
    }
}