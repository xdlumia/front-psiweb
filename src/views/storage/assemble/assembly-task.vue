/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 14:57:47
 * @Description: 生成拣货单和组装任务
*/
<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    title="生成拣货单和组装任务"
    @close='close'
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{maxHeight:'calc(100vh - 200px)'}"
        style="padding:0;"
      >
        <el-form
          ref="form"
          :model="form"
          class="p10"
        >
          <pickAssemble
            ref="pickAssemble"
            :data='data'
          />
          <chooseAssembly
            ref="chooseAssembly"
            :data='form'
          />
        </el-form>

      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pickAssemble from '@/components/formComponents/pick-assemble';
import chooseAssembly from '@/components/formComponents/choose-assembly';

export default {
  components: {
    pickAssemble,
    chooseAssembly
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      loading: false,
      form: {
        note: '',
        assemblePerson: '',
        pickingPerson: '',
        assembleOrderCode: '',
        employeeName: '',
        employeeAssembleName: ''
      }
    };
  },
  mounted() { },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    submit() {
      let isNum = this.data.commodityList.some((item) => {
        return item.num >= 1
      })
      isNum ?
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$api.seePsiWmsService.wmsassembletaskSave({
              assembleCommoditySaveVoList: this.data.commodityList,
              assembleOrderCode: this.data.assembleOrderCode,
              note: this.form.note,
              assemblePerson: this.form.assemblePerson,
              pickingPerson: this.form.pickingPerson
            })
              .then(res => {
                this.$emit('reload')
                this.close()
              })
              .finally(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        :
        this.$message({
          message: '请至少添加一个分配数量！',
          type: 'error',
          showClose: true,
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>