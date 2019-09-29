<template>
  <div style="height:100vh;">
    <div class="login-content">
      <div class="login-mian">
        <div class="login-header">
          <img class="logo" src="@/assets/img/alogo.svg" alt="">
          <h2>α公寓管理系统</h2>
          <!-- <h2>α公寓管理系统</h2> -->
          <!-- <p>分散式公寓-租住平台</p> -->
        </div>
        <el-form :model="loginForm" ref="loginForm" class="login-info">
          <!-- 帐号 -->
          <el-form-item prop="account"
          :rules="[
            { required: true, message: '请输入用户名',},
            { min: 2, max: 15, message: '长度在 2 到 15 个字符',}
            ]">
            <el-input type="text" prefix-icon="iconfont icon-user" v-model="loginForm.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input type="password" prefix-icon="iconfont icon-password" v-model="password" placeholder="请输入密码" v-on:keyup.13.native="loginBtn"></el-input>
          </el-form-item>
          <div style="margin-bottom:10px; height:25px;">
            <el-checkbox-group v-model="remember">
              <el-checkbox label="记住密码" name="type"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-form-item>
            <el-button style="width: 100%" type="primary" :loading="loading" @click="loginBtn()">{{loadingText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-footer ">
        <p>copyright © 2018
          <a href="/" target="_blank">fanteren</a>
        </p>
        <p>
          <span>
            <a href="/" target="_blank">帮助</a>
          </span>
          <span>
            <a href="/" target="_blank">隐私</a>
          </span>
          <span>
            <a href="/" target="_blank">条款</a>
          </span>
        </p>
      </div>
    </div>
    <el-dialog
      title="重置密码"
      :visible.sync="updatePasswordVisible"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeUpdatepwd"
      width="420px">
      <el-form ref="updateForm" :model="updateForm" label-width="80px" size="medium">
        <p class="mb10 d-flex-lr">
          <i class="el-icon-warning d-text-orange f18 mr10"></i>
          <span>系统检测到您使用的是初始密码或密码安全级别不够，为确保您的数据安全，请更改您的密码！</span>
        </p>
        <!-- <el-form-item class="w320" prop="pwd" label="新密码" :rules="{ validator: newPassword,trigger: 'blur'}">
          <el-popover
            placement="right-start"
            width="w160"
            trigger="click">
            <div class="f13 pw-verify">
              <p>密码至少包含:</p>
              <p><i class="el-icon-success" :class="{active:pwVerify.upperCase}"></i>1个大写字母</p>
              <p><i class="el-icon-success" :class="{active:pwVerify.upperLower}"></i>1个小写字母</p>
              <p><i class="el-icon-success" :class="{active:pwVerify.number}"></i>1个数字</p>
              <p><i class="el-icon-success" :class="{active:pwVerify.length}"></i>8个字符</p>
            </div>
          <el-input slot="reference" v-model="updateForm.pwd" @input="verifyPassword" type="password" prefix-icon="iconfont icon-password" placeholder="请输8-20位包含大小写字母数字的密码" v-on:keyup.13.native="loginBtn"></el-input>
          </el-popover>
        </el-form-item> -->
        <el-form-item class="w320" prop="pwd" label="新密码" :rules="[{required:true,message:'请输入密码',},{min:8,max:20,message:'密码长度为8-20位', trigger: 'blur'}]">
          <el-input v-model="updateForm.pwd" type="password" prefix-icon="iconfont icon-password" placeholder="请输8-20位字符串" v-on:keyup.13.native="loginBtn"></el-input>
        </el-form-item>

        <el-form-item class="w320" prop="verifyPwd" label="确认密码"  :rules="{ validator: vePassword,trigger: 'blur'}">
          <el-input type="password" prefix-icon="iconfont icon-password" v-model="updateForm.verifyPwd" placeholder="请确认密码" v-on:keyup.13.native="savePassword"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="ac">
        <el-button  size="medium" @click="closeUpdatepwd">取 消</el-button>
        <el-button  size="medium" type="primary" @click="savePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Fingerprint2 from 'fingerprintjs2'
import { Base64 } from 'js-base64'
export default {
  name: 'login',
  data () {
    return {
      authorityBtn: {},
      updatePasswordVisible: false, // 修改密码是否显示
      updateForm: {
        operationSource: 1, // 为1 属于用户修改界面
        pwd: '', // 加密后的
        verifyPwd: ''
      },
      pwVerify: {
        upperCase: false,
        upperLower: false,
        number: false,
        length: false
      },
      // 更改密码的时候新密码验证
      newPassword: (rule, value, callback) => {
        if (!this.pwVerify.upperCase || !this.pwVerify.upperLower || !this.pwVerify.number || !this.pwVerify.length) {
          callback(new Error('密码不符合要求'))
        } else {
          callback()
        }
      },
      // 确认新密码验证
      vePassword: (rule, value, callback) => {
        if (this.updateForm.pwd != this.updateForm.verifyPwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },

      loading: false,
      loadingText: '立即登录',
      remember: true, // 是否记住密码
      password: '',
      loginForm: {
        account: '',
        pwd: '',
        finger: '',
        from: 1
      }
    }
  },
  computed: {
    syscode () {
      return this.isRentSystem ? 'asystem' : 'asysbusiness'
    }
  },
  created () {
    // 读取用户信息
    let userInfo = this.$local.fetch('userInfo')
    // 记住密码
    let account = userInfo.account
    let pwd = ''
    try {
      pwd = Base64.decode(userInfo.pwd)
    } catch (err) {
      pwd = ''
    }
    this.loginForm.account = account
    this.password = pwd
    this.loginForm.syscode = this.syscode
    // 载入页面获取当前页面名称
    document.title = this.$route.meta.title
  },
  mounted () {},
  methods: {
    // 登录
    loginBtn () {
      this.loading = true
      this.loadingText = '登录中'
      // 获取浏览器指纹
      new Fingerprint2({
        excludeSessionStorage: true
      }).get((finger, components) => {
        localStorage.setItem('finger', finger)
        this.loginForm.finger = finger // 获取指纹
        this.loginForm.pwd = Base64.encode(this.password)
        this.$api.systemService.login(this.loginForm)
          .then(res => {
            let token = res.data.token || ''
            localStorage.token = token
            // return
            axios.defaults.headers.finger = localStorage.finger
            axios.defaults.headers.token = localStorage.token
            this.updateForm.id = res.data.id
            // 判断用户是否修改过密码 1修改过 0 没有修过
            if (res.data.modifyPwdState == 0) {
              // 显示修改密码弹出框
              this.updatePasswordVisible = true
              this.loading = false
              this.loadingText = '立即登录'
              return
            }
            // 获取用户详情
            this.getUserDetail()
            // 获取其他平台系统列表
            this.getsyslist()
          })
          .catch(ero => {
            this.loading = false
            this.loadingText = '立即登录'
          })
      })
    },
    // 保存修改过的密码
    savePassword () {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          let params = {
            operationSource: 1,
            pwd: Base64.encode(this.updateForm.pwd),
            id: this.updateForm.id
          }
          this.$api.systemService.updatePassword(params)
            .then(res => {
              // 保存成功之后在获取数据
              this.loginForm.pwd = params.pwd
              // 获取用户详情
              this.getUserDetail()
              // 获取其他平台系统列表
              this.getsyslist()
            })
        }
      })
    },
    // 关闭修改密码弹出框
    closeUpdatepwd () {
      this.updatePasswordVisible = false
      localStorage.token = ''
      axios.defaults.headers.token = ''
    },
    // 验证所更改的密码
    verifyPassword (val) {
      let reg = {
        upperCase: /[A-Z]/,
        upperLower: /[a-z]/,
        number: /[0-9]/,
        length: /^.{8,20}$/
      }
      for (let key in reg) {
        this.pwVerify[key] = reg[key].test(val)
      }
    },
    // 获取用户详情
    getUserDetail () {
      this.$api.bizSystemService.getUserDetail({syscode: this.$local.fetch('userInfo').syscode})
        .then(res => {
          let data = res.data || {}
          let rmDeptEntity = data.rmDeptEntity || {} // 部门
          let rmRoleEntities = data.rmRoleEntities || [] // 人员
          // 存储用户信息
          this.$local.save('userInfo', {
            userName: data.name,
            userId: data.id,
            deptId: data.deptId, // 部门id
            companyCode: data.companyCode, // 公司code
            syscode: this.syscode, // 子系统编码
            account: this.remember ? this.loginForm.account : '', // 是否记住帐号
            pwd: this.remember ? this.loginForm.pwd : '', // 是否记住密码
            companyName: res.data.companyEntity.companyName, // 公司名字
            roleType: rmRoleEntities[0] && rmRoleEntities[0].id, // 人员权
            deptName: rmDeptEntity.deptName, // 部门名字
            roleName: rmRoleEntities[0] && rmRoleEntities[0].roleName // 角色名字
          })
          // 用户数据权限
          this.$local.save('dataAuthList', data.dataAuthList || [])
          // 用户按钮数据权限
          this.$local.save('bizDataAuthCfgList', data.bizDataAuthCfgList || [])
          // 获取用户权限
          this.getUserAuth()
        })
    },
    // 获取用户权限
    getUserAuth () {
      this.$api.bizSystemService.getUserAuth(this.syscode)
        .then(res => {
          const loginData = res.data || [{url: '/'}]
          localStorage.setItem('navData', JSON.stringify(loginData)) // 存储导航信息
          this.authorityBtn = {} // 按钮权限
          this.authorityHandle(loginData)
          localStorage.setItem(
            'authorityBtn',
            JSON.stringify(this.authorityBtn)
          )
          // 登录成功后跳转到 登录前的页面 或首页
          let routerReplace = sessionStorage.getItem('loginRedirect') || '/'
          router.replace({
            path: routerReplace
          })
        }).finally(() => {
          this.loading = false
          this.loadingText = '立即登陆'
        })
    },
    // 获取其他平台系统列表
    getsyslist () {
      this.$api.bizSystemService.getsyslist() // 获取当前用户可操作的系统/平台列表
        .then(res => {
          let syslist = res.data
          localStorage.setItem('syslist', JSON.stringify(syslist))// 存储该用户拥有的平台权限
        })
    },
    // 递归获取所有目录下的权限按钮
    authorityHandle (authorityData) {
      authorityData.forEach((item, index) => {
        if (item.code !== '') {
          this.authorityBtn[item.code] = item.buttonsCode
        }
        // 存在children 递归
        if (item.children && item.children[0]) {
          this.authorityHandle(item.children)
        }
      })
    }
  }
}
</script>
<style scoped >
.login-content {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background: url("../assets/img/loginbg.jpg") center;
  width: 100%;
  background-size: cover;
}

.login-mian {
  padding: 60px 0 0;
  width: 325px;
  margin: 0 auto;
  flex: 1 1 0%;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}
.login-header .logo{
  display: block;
  height: 100px;
  margin:0 auto
}

.login-header p {
  font-weight: 300;
  color: #999;
}
.login-footer {
  margin: 0 auto 10px;
}
.login-footer p a {
  padding: 0 5px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
<style>
.pw-verify i{ color:#e6e6e6; margin-right:5px;}
.pw-verify i.active{ color:#67C23A;}
</style>
