/*
 * @Author: 赵伦
 * @Date: 2019-10-28 14:36:37
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 16:11:46
 * @Description: 选择员工-弹框
*/
 <template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialogMeta.visible"
      title="选择员工"
      top="20px"
      v-dialogDrag
      width="800px"
    >
      <div>
        <el-row>
          <el-col :span="8">
            <div class="h500 wfull border-right-dash pr10">
              <el-container>
                <el-header style="padding:0;height:82px;">
                  <div class="d-bg-gray p10 mb5">部门列表</div>
                  <el-autocomplete
                    :fetch-suggestions="filterPeople"
                    @select="choosePeople"
                    class="wfull"
                    placeholder="请输入成员名称"
                    v-model="searchPeople"
                    value="value"
                    value-key="employeeName"
                  ></el-autocomplete>
                </el-header>
                <el-main style="padding:0;">
                  <div class="tree-table mt10">
                    <el-tree
                      :data="deptTree"
                      :default-expanded-keys="expandedIds"
                      :filter-node-method="filterNode"
                      :props="treeProps"
                      @node-click="handleNodeClick"
                      auto-expand-parent
                      class="filter-tree"
                      node-key="id"
                      ref="tree"
                    ></el-tree>
                  </div>
                </el-main>
              </el-container>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="h500 wfull pl10 d-auto-y" ref="scrollContainer">
              <div class="pre-choose-list" v-if="preChooseList.length">
                <div class="pl10">已选择</div>
                <span :key="item.userId" @click="delPreChoose(item)" class="pre-choose-people" v-for="item of preChooseList">
                  <span :class="{selected:item.$$selected}" @click="removePreChoose(item)" class="close" title="移除">×</span>
                  <peopleCard :selected="item.$$selected" :user="item"></peopleCard>
                </span>
              </div>
              <div class="pl10" v-if="deptName">{{deptName}}部门成员</div>
              <multiSelect
                :list="employList"
                :multi="dialogMeta.isMulti"
                :value="selectedIds"
                @change="peopleChanged"
                identity="userId"
                ref="peopleList"
                v-model="selectedIds"
              >
                <template v-slot:card="{item,selected}">
                  <peopleCard :selected="selected" :user="item"></peopleCard>
                </template>
              </multiSelect>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="ac" slot="footer">
        <el-button @click="save" size="small" type="primary">确定</el-button>
        <el-button @click="close" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import multiSelect from 'see-web-basic/dist/components/duty-setting/duty-multiselect'; // 排列卡片多选
import peopleCard from 'see-web-basic/dist/components/duty-setting/duty-peoplecard'; // 责任人卡片
/**
 * 责任人选择弹框
 * @author 赵伦
 * @date 2019/3/25
 */
export default {
  components: {
    multiSelect,
    peopleCard
  },
  props: ['dialogMeta'],
  data() {
    return {
      searchPeople: '', // 筛选人员列表
      expandedIds: [], // 展开的id
      deptTree: [], // 部门树
      treeProps: {
        children: 'children', // 树形子数据字段
        label: 'deptName' // 树形显示字段
      },
      employList: [], // 人员显示列表
      selectedIds: [], // 选中的人员ids
      userList: [], // 所有的用户列表
      tree: [], // 初始树列表
      deptId: '', //选中的部门ID
      deptName: '', //选中的部门名
      parentData: {}, // 父级关系
      flatList: [],
      allowDiffDept: true, // 是否允许跨部门选择
      preChooseList: [], // 之前选择的人
      saving: false // 保存操作
    };
  },
  computed: {
    canSave() {
      if (this.selectedIds.length) {
        return true;
      }
      return this.preChooseList.some(item => item.$$selected);
    }
  },
  created() {
    // this.getList();
  },
  mounted() {},
  watch: {},
  methods: {
    // 获取初始树形结构和所有的人员列表
    async getList() {
      let {
        data
      } = await this.$api.seeContractDutyService.queryUserListByRightCode({
        // rightCode: 'asystem_business_receive_approve_3003',
        rightCode: this.dialogMeta.funcCode
      });
      let { deptTree, userlist } = data;
      this.deptTree = deptTree;
      this.tree = [].concat(deptTree);
      this.expandedIds = [this.deptTree[0].id];
      this.userList = userlist;
      let findData = this.findParent(this.tree);
      this.parentData = findData.parentData;
      this.flatList = findData.allList;
      this.handleNodeClick(this.deptTree[0]);
      if (this.dialogMeta.userIds) {
        this.selectedIds = this.dialogMeta.userIds;
        this.savePreSelectPeople();
        this.userList.some(item => {
          if (this.dialogMeta.userIds.includes(item.userId)) {
            this.expandedIds = [item.deptId];
            this.flatList.some(dept => {
              if (dept.id == item.deptId) {
                this.handleNodeClick(dept);
                this.savePreSelectPeople();
                return true;
              }
            });
            return true;
          }
        });
      }
    },
    // 查找父级关系列表
    findParent(tree, parent) {
      let parentData = {};
      let allList = [];
      tree.map(item => {
        allList.push(item);
        if (parent) {
          parentData[item.id] = {
            id: parent.id,
            name: parent.deptName
          };
        }
        if (item.children) {
          let { parentData: _parentData, allList: _allList } = this.findParent(
            item.children,
            item
          );
          Object.assign(parentData, _parentData);
          allList = allList.concat(_allList);
        }
      });
      return { parentData, allList };
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    // 处理树形节点点击
    async handleNodeClick(data) {
      // 点击部门
      if (this.deptId != data.id) {
        this.deptName = data.deptName;
        this.typeName = data.typeName;
        this.deptId = data.id;
        this.deptName = data.deptName;
        this.totalCode = data.totalCode;
        this.employList = this.userList.filter(
          item => item.deptId == this.deptId
        );
        this.savePreSelectPeople();
      }
    },
    removePreChoose(item) {
      this.preChooseList.some((p, i) => {
        if (p == item) {
          this.preChooseList.splice(i, 1);
          this.selectedIds = this.selectedIds.filter(id => id != p.userId);
          return true;
        }
      });
    },
    /**保存其他部门已经选择的人 */
    savePreSelectPeople() {
      if (this.allowDiffDept) {
        let preList = this.preChooseList.filter(item => item.$$selected);
        let preUserIds = preList.map(item => item.userId);
        let notIncludes = this.selectedIds.filter(
          id => !preUserIds.includes(id)
        );
        let users = this.userList.filter(item =>
          notIncludes.includes(item.userId)
        );
        let nowSelected = [];
        this.employList.map(item => {
          if (preUserIds.includes(item.userId)) {
            nowSelected.push(item.userId);
          }
        });
        this.selectedIds = nowSelected;
        this.preChooseList = preList
          .concat(users)
          .sort((a, b) => (a.deptId < b.deptId ? -1 : 1))
          .map(item => {
            this.$set(item, '$$selected', true);
            return item;
          });
      }
    },
    /**删除其他部门已经选择的人 */
    delPreChoose(user) {
      user.$$selected = !user.$$selected;
      if (!user.$$selected) {
        if (this.selectedIds.includes(user.userId)) {
          this.selectedIds = this.selectedIds.filter(id => id != user.userId);
        }
      }
    },
    filterPeople(text, cb) {
      // 输入框过滤人员列表
      if (text) {
        let users = this.userList
          .filter(item => new RegExp(`${text}`).test(item.employeeName))
          .sort((a, b) => (a > b ? 1 : -1));
        cb(users);
      } else cb([]);
    },
    // 自动补充选择某个人
    async choosePeople(data) {
      this.expandedIds = [data.deptId];
      let node;
      this.flatList.some(item => {
        if (item.id == data.deptId) {
          node = item;
          return true;
        }
      });
      if (node) {
        this.handleNodeClick(node);
        this.selectedIds.push(data.userId);
        await this.sleep(200);
        this.scrollToPeople(data.userId);
      }
    },
    sleep(timeout) {
      return new Promise(r => {
        setTimeout(() => r(), timeout);
      });
    },
    /**自动滚动到某个人 */
    async scrollToPeople(userId) {
      let dom;
      let peopleDom;
      this.$refs.peopleList.$children.map(item => {
        if (item.user.userId == userId) {
          peopleDom = item.$el;
          dom = item.$el.parentElement;
        }
      });
      if (dom) {
        peopleDom.classList.remove('checked');
        await this.sleep(500);
        let top = dom.offsetTop;
        this.$refs.scrollContainer.scrollTop = top;
        peopleDom.classList.add('checked');
      }
    },
    peopleChanged(newV, oldV, list) {
      if (this.allowDiffDept) {
        let delV = oldV.filter(item => !newV.includes(item));
        this.preChooseList.map(item => {
          if (delV.includes(item.userId)) {
            item.$$selected = false;
          } else if (newV.includes(item.userId)) {
            item.$$selected = true;
          }
        });
      }
    },
    // 关闭当前弹框
    close(users) {
      this.$emit('close', users);
      this.$emit('update:visible', false);
    },
    // 保存选择数据
    async save() {
      let selectedIds = this.selectedIds;
      if (this.allowDiffDept) {
        selectedIds = [].concat(
          this.selectedIds,
          this.preChooseList
            .filter(item => item.$$selected)
            .map(item => item.userId)
        );
        selectedIds = selectedIds.filter(
          (item, index) => selectedIds.indexOf(item) == index
        );
      }
      // if (selectedIds.length) {
      let {
        funcCode,
        funcDesc,
        syscode,
        objectIds,
        objectNames
      } = this.dialogMeta;
      await this.$confirm(
        `即将修改【${objectNames.join(
          ','
        )}】等楼盘的${funcDesc},是否确认修改？`,
        '确认信息',
        {
          distinguishCancelAndClose: true,
          type: 'warning',
          confirmButtonText: '确认',
          cancelButtonText: '放弃'
        }
      );
      try {
        this.saving = true;
        await this.$api.seeContractDutyService.getCfgObjectDataAuthSave(
          Object.assign(
            {
              objectType: 'lp',
              targetUserIds: selectedIds
            },
            { funcCode, funcDesc, syscode, objectIds }
          )
        );
        // 向父级传递回显信息
        let users = this.userList
          .filter(item => selectedIds.includes(item.userId))
          .map(item => {
            return {
              funcCode,
              funcDesc,
              empobj: item
            };
          });
        this.saving = false;
        this.close(users);
      } catch (e) {
        this.saving = false;
      }
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.border-right-dash {
  border-right: 2px dashed #ededed;
}
.tree-table {
  height: calc(100% - 50px);
  overflow-y: auto;
}
.float-savebtn {
  margin-right: 30px;
}
.h500 {
  height: 500px;
}
.pre-choose-list {
  width: 100%;
  display: inline-block;
  .pre-choose-people {
    position: relative;
    display: inline-block;
    .close {
      position: absolute;
      right: 14px;
      top: 13px;
      z-index: 1;
      cursor: pointer;
      line-height: 12px;
      color: #189eff;
      &.selected {
        color: #fff;
      }
      &:hover {
        color: #ec5555;
      }
    }
  }
}
</style>

