/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 采购入库单
*/
<template>
    <el-dialog :visible.sync="visible" title="采购入库单" v-dialogDrag>
        <el-container>
            <el-header class="d-bg-white" style="height:54px;padding:0;">
                <el-tabs @tab-click="handleClick" v-model="activeName">
                    <el-tab-pane name="supplierInfo">
                        <span slot="label" v-anchor:supplierInfo>供应商信息</span>
                    </el-tab-pane>
                    <el-tab-pane name="companyInfo">
                        <span slot="label" v-anchor:companyInfo>公司信息</span>
                    </el-tab-pane>
                    <el-tab-pane name="deliverInfo">
                        <span slot="label" v-anchor:deliverInfo>到货信息</span>
                    </el-tab-pane>
                    <el-tab-pane name="goodsInfo">
                        <span slot="label">商品信息</span>
                    </el-tab-pane>
                    <el-tab-pane name="taxInfo">
                        <span slot="label" v-anchor:taxInfo>收票滞纳金</span>
                    </el-tab-pane>
                    <el-tab-pane label="自定义信息" name="customInfo">
                        <span slot="label"></span>
                    </el-tab-pane>
                    <el-tab-pane label="备注信息" name="extrasInfo">
                        <span slot="label"></span>
                    </el-tab-pane>
                </el-tabs>
            </el-header>
            <el-main :style="{
                maxHeight:maxHeight+'px'
            }" style="padding:0;">
                <el-form :model="form" class="p10">
                    <SupplierInfo ref="supplierInfo" />
                    <CompanyInfo ref="companyInfo" />
                    <DeliverInfo ref="deliverInfo" />
                    <TaxInfo ref="taxInfo" />
                </el-form>
            </el-main>
        </el-container>
    </el-dialog>
</template>
<script>
import ApprovePanel from '@/components/form-components/approve-panel';
import CustomInfo from '@/components/form-components/custom-info';
import CompanyInfo from '@/components/form-components/company-info';
import PayExpire from '@/components/form-components/pay-expire';
import ExtrasInfo from '@/components/form-components/extras-info';
import SupplierInfo from '@/components/form-components/supplier-info';
import DeliverInfo from '@/components/form-components/deliver-info';
import TaxInfo from '@/components/form-components/extratax-info';

export default {
    components: {
        SupplierInfo,
        CompanyInfo,
        DeliverInfo,
        TaxInfo
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        form: {}
    },
    computed: {
        maxHeight() {
            return window.innerHeight - 130;
        }
    },
    data() {
        return {
            activeName: ''
        };
    },
    mounted() {},
    methods: {
        handleClick({ label, name }) {
            this.activeName = '';
        }
    }
};
</script>
<style lang="scss" scoped>
</style>