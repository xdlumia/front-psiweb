/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 新增组装单
*/
<template>
  <el-dialog
    width='80%'
    :visible.sync="visible"
    @close="close"
    title="新增组装单"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{ 
                maxHeight:maxHeight+'px'
            }"
        style="padding:0;"
      >
        <el-form
          :model="form"
          class="p10"
        >
          <commodityInfoAssemble
            :addForm='form'
            ref="commodityInfoEdit"
          />
          <assembleInfo
            ref="assembleInfo"
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
import commodityInfoAssemble from './commodity-info-assemble';
import assembleInfo from '@/components/formComponents/assemble-info';

export default {
  components: {
    commodityInfoAssemble,
    assembleInfo
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    isSelfMotion: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 200;
    }
  },
  data() {
    return {
      activeName: '',
      form: {
        note: '',
        commodityList: []
      }
    };
  },
  mounted() { },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    returnList(arr) {
      let list = []
      arr.forEach((item) => {
        // if (Object.values(item).length > 0) {
        //   list.push(item)
        // }
        if (item.num) {
          list.push(item)
        }
      })
      return list
    },
    //保存
    submit() {
      let list = this.returnList(this.$refs.commodityInfoEdit.tableData)
      if (list.length < 1) {
        this.$message({
          type: 'error',
          message: '请至少选择一个商品!'
        })
      } else {
        this.$api.seePsiWmsService.wmsassembleorderSave({ assembleCommoditySaveVoList: list, isSelfMotion: this.isSelfMotion, note: this.form.note, source: '新增' })
          .then(res => {
            this.$emit('reload')
            this.close()
          })
          .finally(() => {
          })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>