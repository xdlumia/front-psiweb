/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  借入借出任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible="visible"
    @close="close"
    :title="`借入借出任务-${codeSlice(code)}`"
    width="990px"
  >
    <div>
      <div class="drawer-header">
        <el-button
          v-if="(detailForm.borrowLoanType == 0) && authorityButtons.includes('psi_wms_borrow_05') && detailForm.isCanReturn"
          @click="backVisible=true,isComponents = 'borrowPayback',dialogData.title='借入归还-'+codeSlice(detailForm.borrowLoanTaskCode)"
          size="mini"
          type="primary"
        >归还</el-button>
        <el-button
          v-if="(detailForm.borrowLoanType == 1) && authorityButtons.includes('psi_wms_borrow_04') && detailForm.isCanReturn"
          @click="backVisible=true,isComponents = 'lendBack',dialogData.title='借出返还-'+codeSlice(detailForm.borrowLoanTaskCode)"
          size="mini"
          type="primary"
        >返还</el-button>
        <el-button
          v-if="(detailForm.borrowLoanState == 2 || detailForm.borrowLoanState == 4 || detailForm.borrowLoanState == 9) && (inNum < inAllNum) && authorityButtons.includes('psi_wms_borrow_06')"
          @click="backVisible=true,isComponents = 'borrowScanCode',dialogData.title='借入扫码-'+codeSlice(detailForm.borrowLoanTaskCode)"
          size="mini"
          type="primary"
        >借入扫码</el-button>
        <el-button
          v-if="(detailForm.borrowLoanState == 3 || detailForm.borrowLoanState == 5 || detailForm.borrowLoanState == 8) && (inNum < inAllNum) && authorityButtons.includes('psi_wms_borrow_07')"
          @click="backVisible=true,isComponents = 'lendScanCode',dialogData.title='借出扫码-'+codeSlice(detailForm.borrowLoanTaskCode)"
          size="mini"
          type="primary"
        >借出扫码</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <el-tab-pane label="详情">
          <el-form
            size="mini"
            :model="detailForm"
            v-if="detailForm"
          >
            <borrowIn
              :data="detailForm"
              disabled
            />
            <borrowGoods
              :data="detailForm"
              v-if="detailForm"
              disabled
            />
            <el-dialog
              :visible.sync="backVisible"
              :title="dialogData.title"
              v-dialogDrag
            >
              <components
                :is='isComponents'
                :data='detailForm'
                @close='close'
                @reload='reload'
              >
              </components>
            </el-dialog>
            <!-- <borrowPayback :visible='backVisible' />
            <lendBack :visible='lendVisible' />
            <borrowScanCode :visible='borrowVisible' />
            <lendScanCode :visible='lendCodeVisible' /> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="借入借出单"
          name='orderBorrow'
        >
          <FullscreenWrap v-if="activeName == 'orderBorrow'">
            <orderBorrow
              v-if="activeName == 'orderBorrow'"
              :button="false"
              :params="{page:1,limit:15,relationCode:detailForm.borrowLoanTaskCode}"
            ></orderBorrow>
          </FullscreenWrap>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import borrowIn from '@/components/formComponents/borrow-in'
import borrowGoods from '@/components/formComponents/borrow-goods';
import SideDetail from '@/components/side-detail';
import borrowPayback from './borrow-payback';//借入归还
import lendBack from './lend-back';//借出返还
import borrowScanCode from './borrow-scan-code';//借入扫码
import lendScanCode from './lend-scan-code';//借出扫码

export default {
  props: ['drawerData', 'visible', 'code'],
  data() {
    return {
      status: [{ label: '借入/借出状态', value: '-' }, { label: '生成时间', value: '-', isTime: true }, { label: '单据创建人', value: '-' }, { label: '创建部门', value: '-' }, { label: '来源', value: '-' }],
      backVisible: false,
      lendVisible: false,
      borrowVisible: false,
      lendCodeVisible: false,
      isComponents: 'borrowPayback',
      dialogData: {
        title: ''
      },
      activeName: '',
      inNum: 0,
      inAllNum: 0,
      state: {
        2: '待借入',
        3: '待借出',
        4: '部分借入',
        5: '部分借出',
        6: '待归还',
        7: '待返还',
        8: '部分返还',
        9: '部分归还',
        10: '完成返还',
        11: '完成归还',
        '-1': '终止',
      },
      detailForm: {}
    };
  },
  components: {
    borrowIn,
    borrowGoods,
    borrowPayback,
    SideDetail,
    lendBack,
    borrowScanCode,
    lendScanCode
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    close() {
      // this.backVisible = false
      this.$emit('update:visible', false)
    },
    reload() {
      this.wmsallocationorderInfo()
      this.$emit('reload')
    },
    //查看调拨单详情
    wmsallocationorderInfo() {
      this.$api.seePsiWmsService.wmsborrowloantaskGetByCode(null, this.code)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.borrowLoanState] || '全部'
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
          this.detailForm.commodityList = this.detailForm.commodityShowList || [];
          if (res.data.commodityShowList.length > 0) {
            this.init(res.data.commodityShowList)
          }

        })
        .finally(() => {

        })
    },
    init(list) {
      list.forEach((item) => {
        this.inNum = this.inNum + (item.borrowLoanAccomplishNum || 0)
        this.inAllNum = this.inAllNum + (item.borrowLoanNum || 0)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
