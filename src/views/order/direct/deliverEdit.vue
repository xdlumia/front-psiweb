/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-10 20:30:48
 * @Description: 直发单发货
*/
<template>
    <el-dialog :visible="visible" @close="close" v-dialogDrag>
        <div slot="title">
            <span>直发单发货</span>
        </div>
        <el-form :style="{
      maxHeight:maxHeight+'px'
    }" ref="form" v-model="form">
            <deliverGoods :data="form" id="deliverGoods"></deliverGoods>
        </el-form>
        <div class="ac" slot="footer">
            <el-button @click="save" size="mini" type="primary">确定</el-button>
            <el-button @click="close" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
    mixins: [VisibleMixin],
    components: {},
    computed: {
        maxHeight() {
            return window.innerHeight - 240;
        }
    },
    data() {
        return {
            form: {
                // delivers
                delivers: [{}, {}],
                directCode: '',
                // 是否完成 0全部为空 1部分为空 2全部不为空
                flag: ''
            }
        };
    },
    mounted() {},
    methods: {
        async save() {
            console.log(JSON.parse(JSON.stringify(this.form)));
            await this.$refs.form.validate();
        }
    }
};
</script>
<style lang="scss" scoped>
</style>