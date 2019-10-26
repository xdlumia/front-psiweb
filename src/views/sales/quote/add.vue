/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-26 16:43:43
 * @Description: file content
*/
<template>
  <div>
    <el-form
      label-width="160px"
      v-loading="loading"
      :model="addForm"
      ref="addForm"
      size="small"
      label-position="top"
    >
      <div
        style="height:calc(100vh - 160px)"
        class="d-auto-y pr20 d-relative"
      >
        <form-card title='账单信息'>
          <el-row>
            <el-col :span="8">
              <div class="d-text-black">结账方式</div>
              <div class="d-text-qgray mt5 mb20">2019-9-21</div>
            </el-col>
          </el-row>
          <d-table
            :paging="false"
            show-summary
            :summary-method="getSummaries"
            api="seePumaidongService.collegeManagerList"
            ref="companyTable"
            style="height:500px"
          >
            <el-table-column
              prop="title"
              label="账期"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              min-width="140"
              label="付款时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="id"
              min-width="100"
              label="付款金额"
              show-overflow-tooltip
            >
            </el-table-column>
          </d-table>
        </form-card>
      </div>

      <div class="ac pt20">
        <el-button
          type="primary"
          @click="saveHandle('addForm')"
          size="small"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="small"
        >取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['dialogData', 'visible'],
  components: {
  },
  data() {
    return {
      loading: false,
      dataSource: [], // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
    }
  },
  created() {
    // this.initCompanyAdd()
  },
  methods: {
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (index == 2) {
          const values = data.map(item => Number(item[col.property]));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
        }
      });
      return sums
    },
    // 编辑和新增
    initCompanyAdd() {
      if (this.dialogMeta.type === 'add') {
        // 清空form表单
        this.$nextTick(() => {
          this.$refs.addForm.resetFields()
          this.addForm.id = ''
        })
      } else {
        const data = this.dialogMeta.data
        for (const key in this.addForm) {
          this.addForm[key] = data[key]
        }
        this.addForm.start_date = [
          new Date(data.startTime),
          new Date(data.endTime)
        ]
      }
    },
    // 保存表单数据
    saveHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const [currCity] = this.citys().filter(
            item => item.id === this.addForm.cityId
          )
          this.addForm.cityName = currCity.name
          this.loading = true
          delete this.addForm.start_date
          // rules 表单验证是否通过
          let api = 'collegeManagerUpdate' // 默认编辑更新
          // 新增保存
          if (this.dialogMeta.type === 'add') {
            api = 'collegeManagerSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.addForm)
            .then(res => {
              this.dialogMeta.visible = false
              this.$emit('submit', 'success')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    changeTime(time) {
      this.addForm.startTime = time[0]
      this.addForm.endTime = time[1]
    },
    QuillEditor(val) {
      this.addForm.content = val
    }
  }
}
</script>
<style lang="scss" scoped>
.invitation-picUrl {
  position: relative;
  border: 1px solid #efefef;
  .delete {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    right: 0;
    top: 0;
  }
}
</style>
