/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  拆卸任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="close"
    :title="`拆卸任务-${detailForm.disassemblyTaskCode}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          @click="wmsdisassemblytaskStart"
          size="mini"
          type="primary"
        >确认收到并开始</el-button>
        <el-button
          @click="disassembleVisible =true"
          size="mini"
          type="primary"
        >拆卸</el-button>
        <el-button
          @click="wmsdisassemblytaskHangTask"
          size="mini"
          type="primary"
        >挂起</el-button>
        <el-button
          @click="wmsdisassemblytaskContinueTask"
          size="mini"
          type="primary"
        >继续</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form>
            <dismantlingMerchandise :data="detailForm" />
            <form-card
              class="choose-man"
              title="人员分配"
            >
              <el-row>
                <el-col :span="20">
                  <div class="d-text-black">拆卸人</div>
                  <div class="d-text-qgray mt5 mb20">{{detailForm.disassemblyPersonName}}</div>
                </el-col>
                <el-col :span="20">
                  <div class="d-text-black">备注</div>
                  <div class="d-text-qgray mt5">{{detailForm.note}}</div>
                </el-col>

              </el-row>
            </form-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="拆卸单"
          name='orderUnpack'
        >
          <orderUnpack
            v-if="activeName == 'orderUnpack'"
            :button="false"
            :params="{page:1,limit:15,relationCode:detailForm.disassemblyTaskCode}"
          ></orderUnpack>
        </el-tab-pane>
      </el-tabs>
      <hangUp
        @reload='reload'
        :visible.sync='hangVisible'
        @close='hangVisible = false'
        :data="detailForm"
      />
      <disassembleGoodsChoose
        :visible.sync='disassembleVisible'
        :data="detailForm"
        @close='disassembleVisible = false'
      />
    </div>
  </SideDetail>

</template>
<script>
import dismantlingMerchandise from '@/components/formComponents/dismantling-merchandise'
import disassembleGoodsChoose from '@/components/formComponents/disassemble-goods-choose'
import hangUp from '@/components/formComponents/hang-up';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '拆卸状态', value: '待拆卸' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      hangVisible: false,
      generateVisible: false,
      disassembleVisible: false,
      detailForm: {},
      activeName: '',
      state: {
        '-1': '终止',
        '0': '未开始',
        '1': '待拆卸',
        '2': '部分拆卸',
        '3': '完成拆卸',
      }
    };
  },
  components: {
    dismantlingMerchandise,
    SideDetail,
    // hangUp,
    // disassembleGoodsChoose
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    //查看拆卸任务详情
    wmsallocationorderInfo() {
      this.$api.seePsiWmsService.wmsdisassemblytaskGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.disassemblyTaskState]
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    reload() {
      this.$emit('reload')
    },
    //确认并开始拆卸任务
    wmsdisassemblytaskStart() {
      this.$confirm('确认收到并开始拆卸任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsdisassemblytaskStart(null, this.drawerData.id)
          .then(res => {
            this.$emit('reload')
          })
          .finally(() => {

          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    //挂起
    wmsdisassemblytaskHangTask() {
      this.hangVisible = true
    },
    //继续
    wmsdisassemblytaskContinueTask() {
      // this.$confirm('是否继续拆卸任务?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      this.$api.seePsiWmsService.wmsdisassemblytaskContinueTask({ id: this.detailForm.id })
        .then(res => {
          this.$emit('reload')
        })
        .finally(() => {

        })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   });
      // })

    }
  },
}
</script>
<style lang='scss' scoped>
</style>
