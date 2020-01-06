/*
 * @Author: 赵伦
 * @Date: 2019-11-07 09:47:39
 * @LastEditors  : web.王晓冬
 * @LastEditTime : 2020-01-06 09:47:21
 * @Description: 编辑、详情 visible 辅助 mixin ，这是一个和业务紧密结合的mixin，所以需要在特定业务环境下使用
 */
import Vue from 'vue'
export default {
  props: {
    visible: Boolean,
    code: String,
    rowData: [Object, Array], // 报价单需要批量处理
    type: String,
    // 新增用到
    params: { default: () => ({}), type: Object }
  },
  data() {
    return {
      detail: {}, // 详情
      form: null, // 表单
      isModified: false, // 是否有修改，有的话关闭弹出框会触发reload
      showDetailPage: false,
      showEditPage: false,
      loading: false, // 加载中
      stateText: {},
      closeTimer: null,
      alwaysDropAndCopyForm: false,
      isDataReady: false, // 是否数据准备完毕，可以渲染视图了
      activeTab: '', // 页签
      tabStatus: {}, // 页签状态
    }
  },
  watch: {
    visible() {
      this.$checkVisible();
    },
    // 监听页签切换，改变状态，为true开始渲染
    activeTab() {
      this.$set(this.tabStatus, this.activeTab, true)
    }
  },
  mounted() {
    this.$checkVisible();
    // 添加列表里的状态 只能是当前列表的详情页.如果是列表页调用别的详情页就挂了. 所以 stateText 还要自己设置
    // if (this.type !== 'add' && this.type !== 'edit') {
    //   let statusList
    //   try {
    //     statusList = this.$parent.$refs.table.statusList
    //     statusList.forEach(item => {
    //       if (item.name != '全部' && !Object.keys(this.stateText).length) {
    //         this.stateText[item.state || item.approvalState] = item.name
    //       }
    //     })
    //   } catch (error) { }
    // }

  },
  computed: {
    isEdit() {
      return this.type == 'edit'
    },
    status() {
      if (!this.getDetail) return [];
      else {
        // if (!this.stateText) {
        //   this.$message({
        //     message: '当前引用详情页没有设置stateText状态值,不知道是啥的问王晓冬',
        //     type: 'error',
        //     showClose: true,
        //   });
        //   this.stateText = {}
        // }
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
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    async $reload() {
      this.loading = true;
      this.isDataReady = false;
      try {
        let data = await this.getDetail();
        if (data) {
          data = JSON.parse(JSON.stringify(data))
          this.detail = data || {}
          if (this.alwaysDropAndCopyForm && data) this.form = data
          else {
            // this.rowData = data || {}
            if (this.form && this.type == 'edit' || this.type == 'copy') {
              for (const key in this.form) {
                if (this.form[key] instanceof Array) {
                  this.form[key] = data[key] || []
                } else {
                  this.form[key] = data[key]
                }
              }
            } else {
              // this.form = data;
            }
          }
        }
        if (this.afterDetailInit) this.afterDetailInit()
      } catch (error) {
        console.error(error)
      }
      this.isDataReady = true;
      this.loading = false;
    },
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
              this.$refs.form.resetFields()
              this.form.id = ''
            })
          } else {
            await this.$reload()
          }
        } catch (error) {
          console.error(error)
          this.close()
        }
        this.loading = false;
      } else {
        this.showDetailPage = false;
        this.showEditPage = false;
        this.isDataReady = false;
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
        const { value } = await this.$prompt(`确定要${title}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          closeOnClickModal: false,
          inputValidator(value) {
            if (value && value.length < 200) {
              return true;
            } else return `请填写${title}原因且字数不能超过200字`;
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
      this.loading = true
      try {
        const fn = api.split('.').reduce((api, item) => api[item], this.$api)
        if (!fn) console.error(`接口不存在 ${api}`)
        if (data instanceof Array && data[0] == null) {
          await fn(data[0], data[1])
        } else {
          await fn(data)
        }
      } catch (error) { }
      this.loading = false
      this.setEdit()
      if (title === '删除') {
        this.close()
      } else {
        this.$reload()
      }
    }
  }
}
