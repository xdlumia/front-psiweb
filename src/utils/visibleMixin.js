/*
 * @Author: 赵伦
 * @Date: 2019-11-07 09:47:39
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 16:51:59
 * @Description: 编辑、详情 visible 辅助 mixin ，这是一个和业务紧密结合的mixin，所以需要在特定业务环境下使用
 */

export default {
  props: {
    visible: Boolean,
    code: String,
    rowData: [Object, Array], //报价单需要批量处理
    type: String,
    // 新增用到
    params: { default: () => ({}), type: Object },
  },
  data() {
    return {
      detail: {},// 详情
      form: null,// 表单
      isModified: false,// 是否有修改，有的话关闭弹出框会触发reload
      showDetailPage: false,
      showEditPage: false,
      loading: false,// 加载中
      stateText: {},
      closeTimer: null
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
  computed: {
    isEdit() {
      return this.type == 'edit'
    },
    status() {

      if (!this.getDetail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source }
        ];
      }
    }
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
        this.isModified = false;
        try {
          if (this.type == 'add') {
            // 清空form表单
            this.$nextTick(() => {
              console.log(this.$refs.form);

              this.$refs.form.resetFields()
              this.form.id = ''
            })
          } else {
            let data = await this.getDetail();
            if (data) {
              data = JSON.parse(JSON.stringify(data))
              this.detail = data;
              if (this.form && this.type == 'edit') {
                for (let key in this.form) {
                  if (this.form[key] instanceof Array) {
                    this.form[key] = data[key] || []
                  } else {
                    this.form[key] = data[key]
                  }
                }
              } else {
                this.form = data;
              }
            }
          }
        } catch (error) {
          console.error(error)
          this.close()
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
      if (this.visible) {
        if (this.isModified) {
          this.$emit('reload')
        }
        this.$emit('update:visible', false)
      }
    },
    // 审核
    async $submission(api, data, title, needNote) {
      if (needNote) {
        let { value } = await this.$prompt(`确定要${title}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "textarea",
          closeOnClickModal: false,
          inputValidator(value) {
            if (value && value.length < 300) {
              return true;
            } else return `请填写${title}原因且字数不能超过300字`;
          }
        })
        data.note = value;
      } else {
        await this.$confirm(`是否${title}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
          center: true
        })
      }
      let fn = api.split('.').reduce((api, item) => api[item], this.$api)
      if (data instanceof Array && data[0] == null) {
        await fn(data[0], data[1])
      } else {
        await fn(data)
      }
      if (title === '删除') {
        this.setEdit()
        this.close()
      } else {
        this.getDetail()
      }
    }
  }
}