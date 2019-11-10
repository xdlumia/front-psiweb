/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-10 20:04:07
 * @Description: 直发单详情
*/
<template>
    <sideDetail :status="status" :visible.sync="showDetailPage" @close="close" title="直发单" v-loading="loading" width="990px">
        <template slot="button">
            <el-button
                @click="$submission('seePsiPurchaseService.purchasedirectUnsubmission',{ busCode:detail.stockCode },'提交审核')"
                size="mini"
                type="primary"
            >提交审核</el-button>
            <el-button
                @click="$submission('seePsiPurchaseService.purchasedirectUnsubmission',{ busCode:detail.stockCode },'撤销审核')"
                size="mini"
                type="danger"
            >撤销审核</el-button>
            <el-button
                @click="$submission('seePsiPurchaseService.purchasedirectExamine',{ isAgree:true },'通过')"
                size="mini"
                type="primary"
            >通过</el-button>
            <el-button
                @click="$submission('seePsiPurchaseService.purchasedirectExamine',{ isAgree:false },'驳回',true)"
                size="mini"
                type="danger"
            >驳回</el-button>
            <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
            <el-button @click="del" size="mini" type="primary">删除</el-button>
            <el-button @click="showDeliverGoods=true" size="mini" type="primary">发货</el-button>
            <el-button @click="showAddOrderStorage=true" size="mini" type="primary">采购</el-button>
        </template>
        <el-tabs class="wfull hfull tabs-view">
            <el-tab-pane label="详情">
                <el-form v-if="detail">
                    <approvePanel></approvePanel>
                    <deliverInfo :data="detail" disabled></deliverInfo>
                    <customInfo :data="detail" disabled></customInfo>
                    <extrasInfo :data="detail" disabled></extrasInfo>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
        </el-tabs>
        <addOrderStorage :visible.sync="showAddOrderStorage" from="直发单" />
        <editDirect :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),getDetail()" />
        <deliverEdit :rowData="detail" :visible.sync="showDeliverGoods" @reload="setEdit(),getDetail()" />
    </sideDetail>
</template>
<script>
import AddOrderStorage from '../storage/edit'; // 采购入库单
import EditDirect from './edit'; // 编辑直发单
import DeliverEdit from './deliverEdit'; // 编辑直发单
import VisibleMixin from '@/utils/visibleMixin';

export default {
    mixins: [VisibleMixin],
    components: {
        AddOrderStorage,
        EditDirect,
        DeliverEdit
    },
    data() {
        return {
            showEdit: false,
            showAddOrderStorage: false,
            showDeliverGoods: false,
            stateText: {
                '0': '待完成',
                '1': '部分完成',
                '2': '已完成',
                '3': '已终止'
            }
        };
    },
    mounted() {
        console.log(this);
    },
    methods: {
        async getDetail() {
            if (this.code) {
                let {
                    data
                } = await this.$api.seePsiPurchaseService.purchaseputinGetByCode(
                    null,
                    this.code
                );
                return data;
            } else if (this.rowData) {
                return this.rowData;
            }
        },
        async del() {
            await this.$confirm('是否确定删除该直发单？');
            this.loading = true;
            try {
                await this.$api.seePsiPurchaseService.purchasedirectLogicDelete(
                    {
                        id: this.detail.id
                    }
                );
                console.log('删除直发单');
                this.setEdit();
                this.close();
            } catch (error) {}
            this.loading = false;
        }
    }
};
</script>
<style lang="scss" scoped>
</style>