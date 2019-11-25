/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 18:18:58
 * @Description: 拆卸单
*/
<template>
  <sideDetail :status="status" :visible.sync="showDetailPage" @close="close" title="拆卸单" v-loading="loading" width="990px">
    <template slot="button">
      <el-button
        @click="$submission('seePsiWmsService.wmsdisassemblyorderSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0].includes(detail.disassemblyOrderState)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsdisassemblyorderPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.disassemblyOrderState)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsdisassemblyorderReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.disassemblyOrderState)"
      >驳回</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsdisassemblyorderTermination',[null,detail.id],'终止')"
        size="mini"
        type="danger"
        v-if="detail&&[2].includes(detail.disassemblyOrderState)"
      >终止</el-button>
      <el-button @click="showTask=true" size="mini" type="primary" v-if="detail&&[2].includes(detail.disassemblyOrderState)">生成拆卸任务</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="detail&&[0].includes(detail.disassemblyOrderState)">编辑</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsdisassemblyorderLogicDelete',{
          id:detail.id
        },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0].includes(detail.disassemblyOrderState)"
      >删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <detailApproveWrap :busType="11" :id="detail.id" v-if="detail&&showDetailPage">
          <el-form :model="detail" v-if="showDetailPage">
            <goodsUnpack :data="detail" disabled id="goodsUnpack" />
            <extrasInfo :data="detail" :needUpload="false" disabled id="extrasInfo" />
          </el-form>
        </detailApproveWrap>
      </el-tab-pane>
      <el-tab-pane label="拆卸任务" name="unpack">
        <FullscreenWrap v-if="showDetailPage&&!loading&&detail&&tabStatus.unpack">
          <StorageDisassemble :button="false" :params="{page:1,limit:15,disassemblyOrderCode:detail.disassemblyOrderCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Task
      :rowData="{
        disassemblyOrderCode:detail.disassemblyOrderCode,
        commodityList:detail.commodityList.filter(item=>((item.disassemblyNum || 0) - (item.accomplishDisassemblyNum || 0))>0)
      }"
      :visible.sync="showTask"
      @reload="setEdit(),getDetail()"
      source="拆卸单"
      v-if="showTask"
    />
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),getDetail()" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import Task from './task';
import Edit from './edit'; // 拆卸单详情
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    Task,
    Edit
  },
  data() {
    return {
      showEdit: false,
      showTask: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待执行',
        '3': '部分完成',
        '4': '已完成',
        '-1': '终止'
      }
    };
  },
  computed: {
    status() {
      // prettier-ignore
      if (!this.detail) return [];
      else {
          return [
              { label: '状态', value: this.stateText[this.detail.disassemblyOrderState] },
              { label: '单据创建人', value: this.detail.creatorName },
              { label: '创建部门', value: this.detail.deptName },
              { label: '创建时间', value: this.detail.createTime, isTime: true },
              { label: '来源', value: this.detail.source }
          ];
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsdisassemblyorderGetByCode(
          null,
          this.code
        );
        (data.commodityList || []).map(item => {
          item.children = item.childrenCommodityList;
          delete item.childrenCommodityList;
        });
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>