/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 17:51:56
 * @Description: 确定配置信息
*/
<template>
  <div v-loading="loading">
    <div
      class="d-flex"
      style="width:80%; margin:30px auto"
    >
      <!-- 选择类型 -->
      <el-select
        v-model="clientno"
        size="small"
        placeholder="请选择"
      >
        <el-option
          v-for="item in 2"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input
        class="mr5 ml5"
        size="small"
        v-model="clientno"
        placeholder="请输入客户编号或名称"
      >
        <button slot="append">搜索</button>
      </el-input>
      <div
        class="f16 b d-flex"
        style="white-space:nowrap;align-items:center;"
      >已选商品
        <el-popover
          placement="bottom-end"
          width="400"
          trigger="click"
        >
          <el-table :data="gridData">
            <el-table-column
              width="50"
              property="date"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  class="d-text-blue"
                  @click="editClick(scope.row)"
                >删除</span>
              </template>
            </el-table-column>
            <el-table-column
              property="name"
              label="商品编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              property="address"
              label="商品名称"
            ></el-table-column>
          </el-table>
          <span
            slot="reference"
            class="f24 el-icon-s-goods"
          ></span>
        </el-popover>

      </div>
    </div>
    <el-divider></el-divider>
    <quotationInfo
      v-for="item of 4"
      :key="item"
      title="1.商品名称：R730塔式服务器"
    >
      <div slot="body">
        这是个表单数据
      </div>
    </quotationInfo>
  </div>
</template>
<script>
import quotationInfo from '@/components/formComponents/quotation-info'
export default {
  props: [],
  components: {
    quotationInfo
  },
  data() {
    return {
      loading: false,
      // 当前操作步骤
      clientno: '',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
  mounted() {
    // this.currStep()
  },
  methods: {
    // 点击步骤条触发
    editClick() {

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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
