<template>
  <div>
    <el-dialog
      title="工作交接"
      width="720px"
      :visible="visible"
      @close="close"
      destroy-on-close
    >
      <d-table
        api="seeOaService.absenceapplicationGetWorkHandoverList"
        :paging="false"
      >
        <el-table-column
          prop="userName"
          label="交接人"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        >
          <template slot-scope="{ row }">
            {{row.startTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="180"
        >
          <template slot-scope="{row}">
            {{row.endTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="180"
        >
          <template slot-scope="{row}">
            <span
              class="d-pointer d-text-blue"
              @click="handover(row)"
            >切换</span>
          </template>
        </el-table-column>
      </d-table>

      <div class="ac mt10">
        <el-button
          size="small"
          @click="close"
        >取 消</el-button>
        <el-button
          size="small"
          @click="close"
          type="primary"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        account: '',// string",
        companyCode: '',// string",
        finger: '',// string",
        from: 1,//  0,
        isMarket: false,
        syscode: '',// string",
        token: '',// string"
      },
    }
  },
  components: {

  },
  computed: {

  },
  mounted() {
  },
  watch: {

  },
  methods: {
    handover(row) {
      let userInfo = this.$local.fetch('userInfo')
      this.form.syscode = userInfo.syscode
      this.form.token = localStorage.token
      this.form.finger = localStorage.finger
      this.form.companyCode = userInfo.companyCode
      this.form.account = row.account
      this.loginBusinessLoginSwitchUser(this.form)
    },
    // 切换用户
    async loginBusinessLoginSwitchUser(form) {
      this.$api.systemService.loginBusinessLoginSwitchUser(form)
        .then(async res => {
          let token = res.data.token || ''
          localStorage.token = token
          localStorage.finger = this.form.finger
          this.getNavData()
            .then(() => {
              // location.reload()
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(error => {

        })
        .finally(() => {

        })
    },
    // 获取菜单权限
    getNavData() {
      return Promise.all([
        this.$api.bizSystemService.getUserAuth(this.form.syscode).then(res => {
          if (res && res.code === 200) {
            const loginData = res.data || [{ url: '/' }];
            let authorityBtn = {}; // 按钮权限
            this.$local.save('authorityBtn', authorityBtn);
          }
        }),
        // 获取当前用户可操作的系统/平台列表
        this.getsyslist(),
        // 根据token查询用户信息
        this.$api.bizSystemService.getUserDetail().then(res => {
          if (res.code === 200) {
            const data = res.data;
            const rmDeptEntity = data.rmDeptEntity || {}; // 部门
            const rmRoleEntities = data.rmRoleEntities || []; // 人员

            let userInfo = {
              avatarUrl: data.avatarUrl,
              userName: data.name,
              userId: data.id,
              deptId: data.deptId, // 部门id
              syscode: this.$local.fetch('userInfo').syscode, // 子系统编码
              employeeId: data.employeeId, //员工id
              email: data.email, // 员工email
              companyCode: data.companyCode, // 公司code
              account: data.account, // 帐号
              companyName: data.companyEntity.companyName, // 公司名字
              roleType: rmRoleEntities[0] && rmRoleEntities[0].id, // 人员权限
              deptName: rmDeptEntity.deptName, // 部门名字
              roleName: rmRoleEntities[0] && rmRoleEntities[0].roleName // 角色名字
            };
            this.$local.save('userInfo', userInfo);
            // 用户数据权限
            this.$local.save('dataAuthList', data.dataAuthList || []);
            // 用户按钮数据权限
            this.$local.save(
              'bizDataAuthCfgList',
              data.bizDataAuthCfgList || []
            );

          }
        })
      ]);
    },

    // 获取当前用户可操作的系统/平台列表
    getsyslist() {
      return this.$api.bizSystemService.getsyslist().then(res => {
        localStorage.setItem('syslist', JSON.stringify(res.data || [])); // 存储该用户拥有的平台权限
      });
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>