<!--
 * @Author: 高大鹏
 * @Date: 2019-11-20 11:47:43
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-06 14:22:36
 * @Description: description
 -->

<template>
  <el-dialog :visible="visible" @close="close" title="选择公司" v-dialogDrag width="60%">
    <div class="d-relative">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="item.label" :name="item.value" v-for="item of availableTabs" :key="item.value"></el-tab-pane>
      </el-tabs>
      <el-popover placement="bottom" v-model="filterPopover" trigger="click" width="250">
        <el-link
          :underline="false"
          @click="filterPopover = false"
          class="el-icon-close close fr"
          style="margin-top:2px;"
          title="关闭"
        ></el-link>
        <dFilter v-model="queryForm" :options="filterOptions" @change="reload" />
        <el-button
          size="mini"
          class="tool-item"
          slot="reference"
          title="筛选"
          icon="iconfont icon-filter"
        ></el-button>
      </el-popover>
    </div>

    <d-table
      :api="apiPath"
      :params="queryForm"
      :reserve-selection="true"
      rowKey="id"
      @selection-change="handleSelectionChange"
      class="college-main remove-selection"
      ref="multipleTable"
      style="height:calc(100vh - 240px)"
    >
      <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
      <el-table-column label="编号" min-width="200" prop="code"></el-table-column>
      <el-table-column label="名称" min-width="100" prop="companyName">
        <template
          slot-scope="{row}"
        >{{row.companyName || row.clientName || row.supplierName || row.serviceName}}</template>
      </el-table-column>
      <el-table-column label="状态" min-width="130" prop="state">
        <template slot-scope="{row}">{{row.state ? '停用' : '启用'}}</template>
      </el-table-column>
      <el-table-column label="联系人" min-width="140" prop="linkManName">
        <template slot-scope="{row}">{{row.linkManName || row.linkMan}}</template>
      </el-table-column>
      <el-table-column label="联系电话" min-width="140" prop="phone"></el-table-column>
    </d-table>

    <div class="ac">
      <el-button @click="close" size="small">关 闭</el-button>
      <el-button @click="save" size="small" type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  name: 'CommodityChoose',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    },
    show:{
      type: Array,
    }
  },
  data () {
    return {
      activeName: '0',
      activeTabs:[
        {label:'客户',value:'0'},
        {label:'供应商',value:'1'},
        {label:'服务商',value:'2'},
      ],
      filterPopover: false,
      apiPath: 'seePsiCommonService.commonclientinfoPagelist',
      queryForm: {
        page: 1, limit: 15
      },
      filterOptions: [
        { label: '编号', prop: 'code', default: true },
        {          label: '状态',
          prop: 'state',
          type: 'select',
          default: true,
          options: [
            { label: '全部', value: null },
            { label: '启用', value: 0 },
            { label: '停用', value: 1 }
          ]
        },
        { label: '联系电话', prop: 'phone', default: true }
      ],
      defaultFilter: [
        { label: '编号', prop: 'code', default: true },
        {          label: '状态',
          prop: 'state',
          type: 'select',
          default: true,
          options: [
            { label: '全部', value: null },
            { label: '启用', value: 0 },
            { label: '停用', value: 1 }
          ]
        },
        { label: '联系电话', prop: 'phone', default: true }
      ],
      multipleSelection: []
    };
  },
  watch: {
    visible () {
      if (this.visible) {
        this.multipleSelection = [];
      }
    },
    activeName (newValue) {
      let method
      switch (parseFloat(newValue)) {
        case 2:
          method = 'commonserviceproviderList'
          this.filterOptions = this.defaultFilter.concat([{ label: '服务商名称', prop: 'serviceName', default: true }, { label: '联系人', prop: 'linkMan', default: true }])
          break;
        case 1:
          method = 'commonsupplierinfoPagelist'
          this.filterOptions = this.defaultFilter.concat([{ label: '供应商名称', prop: 'supplierName', default: true }, { label: '联系人', prop: 'linkManName', default: true }])
          break;
        default:
          method = 'commonclientinfoPagelist'
          this.filterOptions = this.defaultFilter.concat([{ label: '客户名称', prop: 'companyName', default: true }, { label: '联系人', prop: 'linkManName', default: true }])
          break;
      }
      this.apiPath = 'seePsiCommonService.' + method
      this.reload()
    }
  },
  computed: {
    availableTabs(){
      if(this.show&&this.show.length){
        return this.activeTabs.filter(item=>this.show.includes(parseInt(item.value)))
      }else return this.activeTabs
    }
  },
  mounted(){
    this.activeName = this.availableTabs[0].value;
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    save () {
      this.$emit('choose', [Object.assign(this.multipleSelection[0], { clientType: this.activeName })]);
      this.close();
    },
    selectable (row, index) {
      if (this.multipleSelection.length > 0) {
        return this.multipleSelection.every(
          item => item.code === row.code
        );
      }
      return true;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    reload () {
      this.$refs.multipleTable&&this.$refs.multipleTable.reload()
    },
    closeFilter () {

    }
  }
};
</script>
<style lang="scss" scoped>
.tool-item {
  position: absolute;
  right: 10px;
  top: 0px;
}

/deep/ .el-tabs__nav-scroll {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/deep/ .el-table__body-wrapper {
  z-index: 3;
}

/deep/ .el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}

.choose-container {
  border: 1px solid #f2f2f2;
  height: 500px;

  .choose-aside {
    border-right: 1px solid #f2f2f2;
  }
}

/deep/ .remove-selection {
  .el-table__header {
    .el-table-column--selection {
      .cell {
        text-align: center;

        .el-checkbox {
          display: none;
        }

        &:before {
          content: "选择";
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
