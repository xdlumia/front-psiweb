/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 17:20:21
 * @Description: 公司信息
*/
<template>
    <form-card title="公司信息">
        <el-row>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item
                    :rules="[ 
                    {required:true,message:'必填项'}
                ]"
                    label="公司发票账户"
                    prop
                    size="mini"
                >
                    <el-select filterable placeholder="请选择" v-model="form.bankCard">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item
                    :rules="[ 
                    {required:true,message:'必填项'}
                ]"
                    label="公司结算账户"
                    prop
                    size="mini"
                >
                    <el-select filterable placeholder="请选择" v-model="form.bankCard">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item :rules="[ 
                    {required:true,message:'必填项'}
                ]" label="发票抬头" size="mini">
                    <el-input disabled placeholder="请输入发票抬头" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item :rules="[ 
                    {required:true,message:'必填项'}
                ]" label="纳税人识别号" size="mini">
                    <el-input disabled placeholder="请输入纳税人识别号" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item :rules="[ 
                    {required:true,message:'必填项'}
                ]" label="注册地址" size="mini">
                    <el-input disabled placeholder="请输入注册地址" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item :rules="[{type:'telePhone'},
                    {required:true,message:'必填项'}]" label="注册电话" size="mini">
                    <el-input disabled placeholder="请输入注册电话" v-model="form.telPhone" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item :rules="[ 
                    {required:true,message:'必填项'}
                ]" label="开户银行" size="mini">
                    <el-input disabled placeholder="请输入开户银行" />
                </el-form-item>
            </el-col>
            <el-col :span="8" class="pl5 pr5 pb5">
                <el-form-item
                    :rules="[
                    {type:'bankCard',message:'请填写银行账户'},
                    {required:true,message:'必填项'}
                ]"
                    label="开户行账号"
                    prop="bankCard"
                    size="mini"
                >
                    <el-input disabled placeholder="请输入开户行账号" v-model="form.bankCard" />
                </el-form-item>
            </el-col>
        </el-row>
    </form-card>
</template>
<script>
export default {
    props: {
        form: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            options: []
        };
    }
};
</script>
<style lang="scss" scoped>
</style>