/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 新增调拨单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="新增调拨单"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
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
            >调拨信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >调出商品</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main
        style="padding:0;"
        :style="{maxHeight:'calc(100vh - 240px)'}"
      >
        <el-form
          :model="allForm"
          class="p10"
          ref='allForm'
        >
          <allocationInfo
            @changeWmsId='changeWmsId'
            v-if="visible = true"
            ref="deliverEdit"
            :form='allForm'
          />
        </el-form>
        <merchandiseTransferred
          v-if="visible = true"
          ref="logisticsEdit"
          :form='allForm'
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
        @click="wmsallocationorderSave"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import allocationInfo from '@/components/formComponents/allocation-info';
import merchandiseTransferred from '@/components/formComponents/merchandise-transferred';

export default {
  components: {
    allocationInfo,
    merchandiseTransferred
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      allForm: {
        allocationType: 2,//调拨方式
        putawayWmsId: '',//调入库房
        facilitatorId: '',//服务商id
        facilitatorName: '',//服务商名称
        serveType: '',//服务类型
        waybillCode: '',//运单编号
        logisticsFees: '',//物流费用
        note: '',//备注
        serviceGrade: '',
        wmsCommodityIdList: [],//调出库房商品ids
        wmsNames: [],//庫房名稱
        source: '新增',
      }
    };
  },
  created() {

  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    //库房切换，下边选择的东西清空掉
    changeWmsId() {
      this.$refs.logisticsEdit.changeWmsId()
    },
    close() {
      this.$emit('update:visible', false)
    },
    //新增调拨单的保存
    wmsallocationorderSave() {
      this.$refs['allForm'].validate((valid) => {
        if (valid) {
          let arr = this.$refs.logisticsEdit.upTableData || []
          this.allForm.wmsCommodityList = arr
          console.log(arr, 'arrarrarrarrarrarr')
          // arr.forEach((item) => {
          //   this.allForm.wmsNames.push(item.name)
          // })
          if (arr.length > 0) {
            this.$api.seePsiWmsService.wmsallocationorderSave(this.allForm)
              .then(res => {
                this.close()
                this.$emit('reload')
              })
              .finally(() => {

              })
          } else {
            this.$message({
              type: 'error',
              message: '请选择至少一件商品!'
            })
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>