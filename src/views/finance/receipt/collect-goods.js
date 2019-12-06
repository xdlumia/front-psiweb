/*
 * @Author: 赵伦
 * @Date: 2019-11-30 12:52:08
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-06 18:22:28
 * @Description: file content
 */
/**
 * @description 根据busCode获取开/收票商品信息
 * 
 */

export default {
    // 票据类型(1收票，0开票)
    props: ['invoiceType'],
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
                1: {
                    detailApi: 'seePsiSaleService.businesscommodityGetBusinessCommodityList',
                    paramFn: (code) => ({ busCode: code }),
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'alterationPrice', quantity: 'alterationNumber'
                    }
                },
                // 销售换货单
                2: {
                    detailApi: 'seePsiSaleService.businesscommodityGetBusinessCommodityList',
                    paramFn: (code) => ({ busCode: code }),
                    getCommodityList: (commodityEntityList) => {
                        // 票据类型(1收票，0开票)
                        // putawayType 0出库 1入库
                        let list = []
                        if (this.invoiceType == 1) {
                            list = commodityEntityList.filter(item => item.putawayType == 1).map(item => ({
                                ...item,
                                price: item.alterationPrice,
                                quantity: item.alterationNumber,
                            }))
                        } else {
                            list = commodityEntityList.filter(item => item.putawayType == 0).map(item => ({
                                ...item,
                                price: item.discountSprice,
                                quantity: item.commodityNumber
                            }))
                        }
                        return list;
                    },
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'price', quantity: 'quantity'
                    }
                },
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
                5: {
                    detailApi: 'seePsiPurchaseService.purchasealterationGetByCode',
                    paramFn: (code) => ({ code }),
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'alterationPrice', quantity: 'alterationNumber'
                    }
                },
                // 采购换货单
                6: {
                    detailApi: 'seePsiWmsService.wmsswaporderGetByCode',
                    paramFn: (code) => ({ code }),
                    getCommodityList: (data) => {
                        // 票据类型(1收票，0开票)
                        let list = (this.invoiceType == 1 ? data.putoutCommodityList : data.putinCommodityList) || [];
                        return list.map(item => ({
                            ...item,
                            price: item.alterationPrice,
                            quantity: item.alterationNumber,
                        }));
                    },
                    transfer: {
                        articleName: 'goodsName', commodityCode: 'commodityCode',
                        taxRate: 'taxRate', price: 'price', quantity: 'quantity'
                    }
                },
                // 开票物流费
                7: null,
                // 调拨单
                8: null,
                // 借入借出单
                9: null
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
            if (typeof config.getCommodityList == "function") {
                commodityList = config.getCommodityList(data) || [];
            } else {
                if (!Array.isArray(data) && data) {
                    commodityList = data[config.commodityKey || 'commodityList'] || []
                } else commodityList = data;
            }
            return commodityList.map(item => {
                let data = typeof config.transfer == 'function' ? config.transfer(item) : {
                    ...Object.keys(config.transfer).reduce((data, key) => {
                        data[key] = item[config.transfer[key] || key]
                        return data;
                    }, {}),
                    isOrder: 1,
                    type: 0,
                };
                if (busType == 0) {
                    data.price = +Number(item.discountSprice / item.discount * (1 + item.taxRate / 100)).toFixed(2);
                }
                return data;
            })
        }
    }
}