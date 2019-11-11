/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-10 20:46:07
 * @Description: 采购-采购入库单
*/
<template>
    <div class="buying-requisition-page wfull hfull">
        <TableView
            :filterOptions="filterOptions"
            api="seePsiPurchaseService.purchaseputinList"
            busType="30"
            exportApi="seePsiPurchaseService.purchaseputinExport"
            ref="tableView"
            title="采购入库单"
        >
            <template slot-scope="{column,row,value,prop}">
                <span v-if="prop=='putinCode'">
                    <el-link class="f12" :underline="false" @click="showDetail=true,currentCode=value" type="primary">{{value}}</el-link>
                </span>
                <span v-else-if="prop=='joinCode'">
                    <el-link class="f12" :underline="false" @click="showDetail=true,currentCode=value" type="primary">{{value}}</el-link>
                </span>
                <span v-else-if="prop=='state'">{{stateText[value]}}</span>
                <span v-else-if="['saleTime','purchaseTime','createTime'].includes(prop)">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
                <span v-else>{{value}}</span>
            </template>
        </TableView>
        <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" />
    </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 采购入库单详情

export default {
    components: {
        TableView,
        Detail
    },
    data() {
        return {
            status: [],
            showDetail: false,
            currentCode: '',
            stateText: {
                '0': '新建',
                '1': '审核中',
                '3': '已通过',
                '4': '已完成',
                '5': '已驳回',
                '6': '已终止'
            },
            filterOptions: [
                { label: '入库单编号', prop: 'putinCode', default: true },
                {
                    label: '请购/直发/备货单编号',
                    prop: 'joinCode',
                    default: true
                },
                { label: '单据状态', prop: 'state', default: true },
                { label: '来源', prop: 'source', default: true },
                { label: '供应商ID', prop: 'supplierId', default: true },
                { label: '供应商名称', prop: 'supplierName', default: true },
                {
                    label: '销售预计到/发货时间',
                    prop: 'SaleTime',
                    type: 'dateRange',
                    default: true
                },
                {
                    label: '采购预计到/发货时间',
                    prop: 'PurchaseTime',
                    type: 'dateRange',
                    default: true
                },
                {
                    label: '总计数量',
                    prop: 'PutinNum',
                    type: 'numberRange',
                    default: true,
                    int: true
                },
                {
                    label: '总计采购价',
                    prop: 'PutinAmount',
                    type: 'numberRange'
                },
                { label: '合同创建人', prop: 'creator', type: 'employee' },
                { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
                { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
            ]
        };
    },
    methods: {
        logData(e) {
            console.log(e);
        },
        reload() {
            this.$refs.tableView.reload();
        }
    }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
