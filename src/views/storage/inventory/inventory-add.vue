/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 14:16:25
 * @Description: 新增盘点单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="新增盘点单"
    @close='close'
    v-dialogDrag
  >
    <el-container
      :style="{maxHeight:'calc(100vh - 180px)'}"
      style="padding:0;"
      class="d-auto-y"
    >
      <el-header
        class="d-bg-white"
        style="height:54px;padding:0;"
      >
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane name="deliverEdit">
            <span
              slot="label"
              v-anchor:deliverEdit
            >盘点信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >盘点商品</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main style="padding:0;max-height:700px;">
        <el-form
          ref='addform'
          :model="addform"
          class="p10"
        >
          <inventoryInfo
            @changeRecord='changeRecord'
            ref="deliverEdit"
            :addform='addform'
          />
        </el-form>
        <inventoryCommodities
          v-if="addform.type == 2"
          ref="changeRecord"
          :addform='addform'
        />
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
import inventoryInfo from '@/components/formComponents/inventory-info';
import inventoryCommodities from '@/components/formComponents/inventory-commodities';

export default {
  components: {
    inventoryInfo,
    inventoryCommodities
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      button: true,
      addform: {
        creatorName: '',
        wmsName: '',
        wmsId: '',//库房id
        source: '新增',//
        blitemPerson: '',//盘点人
        type: 1,//盘点类型  1 全盘  2抽盘
        note: '',//备注
        commodityCodeList: [],//商品列表
        result: '',//盘点结果（1-盘盈 2-盘亏 3-有盈亏 4-吻合）
      }
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    returnList(arr) {
      let list = []
      arr.forEach((item) => {
        if (Object.keys(item).length > 0) {
          list.push(item)
        }
      })
      return list
    },
    //库房 切换，清空下边的已选商品
    changeRecord() {
      if (this.addform.type == 2) {
        this.$refs.changeRecord.changeRecord()
      }

    },
    //点一下保存
    submit() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          this.$confirm('该库房暂未锁定,锁定后才可以进行盘点(抽盘只锁定抽盘商品库存)', '提示', {
            confirmButtonText: '一键锁定',
            cancelButtonText: '暂不盘点',
            type: 'warning'
          }).then(() => {
            if (this.addform.type == 2) {
              this.addform.commodityCodeList = this.returnList(this.$refs.changeRecord.tableData)
            } else {
              this.addform.commodityCodeList = []
            }
            this.$api.seePsiWmsService.wmsblitemSave(this.addform)
              .then(res => {
                this.$emit('reload')
                this.close()
              })
              .finally(() => {
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>