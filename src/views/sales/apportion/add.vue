/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 16:37:52
 * @Description: 客户管理-新增客户
*/
<template>
  <div>

    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-position="top"
    >

      <d-tabs :style="{maxHeight:'calc(100vh - 180px)'}">
        <d-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        />
        <!-- 分摊信息 -->
        <apportion-info id="apportionInfo" />
        <!-- 商品信息 -->
        <commodity-info-edit id="commodityInfEdit" />
        <!-- 备注信息 -->
        <extras-info id="extrasInfo" />
      </d-tabs>
      <div class="ac pt20">
        <el-button
          @click="dialogData.visible = false"
          size="small"
        >取消</el-button>
        <el-button
          type="primary"
          @click="saveHandle()"
          size="small"
        >保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: ['dialogData'],
  data() {
    return {
      // tab操作栏
      tabs: {
        apportionInfo: '分摊信息',
        commodityInfEdit: '商品信息',
        extrasInfo: '备注信息',
      },
      activeName: 'baseInfo',
      form: {},
    }
  },
  methods: {
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
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
