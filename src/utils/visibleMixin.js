/*
 * @Author: 赵伦
 * @Date: 2019-11-07 09:47:39
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 10:16:42
 * @Description: 编辑、详情 visible 辅助 mixin ，这是一个和业务紧密结合的mixin，所以需要在特定业务环境下使用
 */

export default {
    props: {
        visible: Boolean,
        code: String,
        rowData: Object,
    },
    data() {
        return {
            detail: null,// 详情
            form: null,// 表单
            isModified: false,// 是否有修改，有的话关闭弹出框会触发reload
            showDetailPage: false,
            showEditPage: false,
            loading: false,// 加载中
        }
    },
    watch: {
        visible() {
            this.$checkVisible();
        }
    },
    mounted() {
        this.$checkVisible();
    },
    methods: {
        // 检查可见状态
        checkVisible() { },
        async $checkVisible() {
            if (this.checkVisible) this.checkVisible()
            if (this.visible) {
                this.showDetailPage = true;
                this.showEditPage = true;
                this.loading = true;
                try {
                    let data = await this.getDetail();
                    if (data) {
                        this.detail = data;
                        this.form = data;
                    }
                } catch (error) {
                    console.error(error)
                }
                this.loading = false;
            } else {
                this.showDetailPage = false;
                this.showEditPage = false;
            }
        },
        // 设置编辑过了
        setEdit() {
            this.isModified = true;
        },
        // 获取详情
        getDetail() { },
        // 关闭
        close() {
            if (this.isModified) {
                this.$emit('reload')
            }
            this.$emit('update:visible', false)
        }
    }
}