/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 23:17:25
 * @Description: 新增组装单
*/
<template>
  <el-dialog
    v-loading='loading'
    width='80%'
    :visible.sync="visible"
    @close="close"
    title="新增组装单"
    v-dialogDrag
  >
    <div slot="title">
      <span>新增组装单</span>
      <span class="fr mr20">
        <el-button
          type="primary"
          @click="submit"
          size="mini"
        >保 存</el-button>
        <el-button
          @click="close"
          size="mini"
        >关 闭</el-button>
      </span>
    </div>
    <el-container>
      <el-main
        :style="{maxHeight:'calc(100vh - 120px)'}"
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
    <!-- <span
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
    </span> -->
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
      loading: false,
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
          message: '未选择商品或组装数量为空！'
        })
      } else {
        this.loading = true
        this.$api.seePsiWmsService.wmsassembleorderSave({ assembleCommoditySaveVoList: list, isSelfMotion: this.isSelfMotion, note: this.form.note, source: '新增' })
          .then(res => {
            this.$emit('reload')
            this.close()
          })
          .finally(() => {
            this.loading = false
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