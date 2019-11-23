/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  报溢/报损单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    :title="drawerData.type == 1 ? '报溢单-'+ drawerData.reportingLossesCode : '报损单-' + drawerData.reportingLossesCode"
    width="990px"
  >
    <div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <reportingInfo
              :disabled='true'
              :addForm='detailForm'
            />
            <goodsOverflow
              :detailForm='detailForm'
              :drawerData='drawerData'
            />
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import reportingInfo from '@/components/formComponents/reporting-info'
import goodsOverflow from '@/components/formComponents/goods-overflow';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '生成/创建时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      detailForm: {},
      isComponents: '',
      dialogData: {
        title: ''
      }
    };
  },
  components: {
    reportingInfo,
    goodsOverflow,
    SideDetail,
  },
  created() {
    this.wmsreportinglossesInfo()
  },
  methods: {
    //查看报溢报损详情
    wmsreportinglossesInfo() {
      this.$api.seePsiWmsService.wmsreportinglossesInfo(null, this.drawerData.id)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.drawerData.createTime
          this.status[1].value = this.drawerData.creatorName
          this.status[2].value = this.drawerData.deptName
          this.status[3].value = this.detailForm.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
        })
        .finally(() => {

        })
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
