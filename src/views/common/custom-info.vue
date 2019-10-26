/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 13:17:05
 * @Description: 自定义信息
*/
<template>
    <form-card title="自定义信息">
        <el-table :data="tableData">
            <el-table-column label="字段名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="字段内容" min-width="200" prop="value" show-overflow-tooltip></el-table-column>
        </el-table>
    </form-card>
</template>
<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => [{ name: '安装系统', value: '邮箱' }]
        }
    }
};
</script>
<style lang="scss" scoped>
</style>