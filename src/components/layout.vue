<template>
  <d-layout v-model="isLockkScreen">
    <img slot="logo" src="@/assets/img/alogo.svg" alt>
    <div style="height: 100vh" v-loading="loading">
      <el-container class="d-container">
        <!-- 头部区域 -->
        <el-header height="60px" class="header-top">
          <!-- 菜单 -->
          <el-menu
            :default-active="path"
            mode="horizontal"
            :router="true"
            :unique-opened="true"
          >
            <el-menu-item class="header-logo pl0" index="/">
              <img
                class="header-img"
                :src="this.$store.state.company.companyInfo.picUrl?this.$store.state.company.companyInfo.picUrl:require('@/assets/img/alogo.svg')">
              <div class="d-inline">
                <h3>
                  <strong>{{this.$store.state.company.companyInfo.picName ? this.$store.state.company.companyInfo.picName : 'α公寓管理系统'}}</strong>
                </h3>
                <!-- <p> 帮助房地产中介提升企业产能 </p> -->
              </div>
            </el-menu-item>
            <!--城市切换模块-->
            <div class="fl hfull mt10 mr20">
              <el-popover placement="bottom" width="500" trigger="click">
                <div class="cityChangeDrop d-bg-white mt0">
                  <div class="p10 wfull hfull mt0" style="box-sizing: border-box;">
                    <div class="cityChangeTop wfull mt0 ac">
                      <span class="f14 d-text-gray b">城市切换</span>
                    </div>

                    <div class="cityChangeInput wfull mt0">
                      <el-form>
                      <el-input
                        style="width: 60%;"
                        class="mt5"
                        size="small"
                        name=""
                        @keyup.native="fsearchCityName"
                        v-model="searchCityName"
                        placeholder="请输入内容"
                      ></el-input>
                      <el-button
                        @click="fsearchCityName"
                        class="ml5"
                        style="margin-top: 8px;"
                        size="small"
                      >确定</el-button>
                      </el-form>
                    </div>
                    <div class="cityChangeTab">
                      <el-tabs class="wfull" v-model="activeName">
                        <el-tab-pane
                          v-for="(item,index) of cityClass"
                          :label="item"
                          :name="item"
                          :key="index"
                        ></el-tab-pane>
                      </el-tabs>
                      <div class="ac d-text-gray" v-if="!Object.keys(cityList).length>0">无此城市</div>
                      <div class="d-auto-y wfull mt0" style="max-height: 240px;">
                        <div
                          v-for="(val, key, index) of cityList"
                          class="mt0 wfull mb10"
                          :key="index"
                        >
                          <div v-if="activeName.indexOf(key) > -1">
                            <div class="d-hidden">
                              <div class="fl mt5 ac" style="width: 10%;">
                                <span class="f14 d-text-black">{{key}}</span>
                              </div>
                              <div class="fr mt5" style="width: 90%;">
                                <span
                                  v-for="(item1,index1) of val"
                                  :key="index1"
                                  @click="getCityInfo(item1)"
                                  class="f14 d-text-black mr20 fl mb10 d-pointer city-pointer"
                                >{{item1.name}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  slot="reference"
                  class="d-pointer mt5 d-text-black"
                  style="background: #F2F2F2;padding:7px 17px;border-radius: 20px;"
                >
                  {{cityInfo.name}}
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </el-popover>
            </div>
            <!-- 如果type类型是菜单就不会有二级目录(最多只有2级菜单)
                1:目录
            2:菜单-->
            <el-menu-item
              v-for="(item,index) of navMenu"
              :key="index"
              :index="item.url"
              v-if="item.type == 2"
            >{{item.name}}</el-menu-item>
            <!-- 二级菜单 -->
            <el-submenu v-else :index="index+''">
              <template slot="title">{{item.name}}</template>
              <el-menu-item
                v-for="(item1,index1) of item.children"
                :key="index1"
                :index="item1.url+''"
              >{{item1.name}}</el-menu-item>
            </el-submenu>

            <!-- 更多应用 -->
            <el-submenu v-if="sysList.length || moremenu.length" index=" ">
              <template slot="title">更多应用</template>
              <el-menu-item v-for="(sys, index) in sysList" :key="index" index>
                <a class="d-block" target="_blank" :href="sys.sysurl+'?token='+token+'&finger='+finger">
                    <span style="color:#909399">{{sys.sysname}}</span>
                </a>
              </el-menu-item>

              <el-menu-item  v-for="item of moremenu" :key="item.id" :index="item.url+''">
                {{item.name}}
              </el-menu-item>
            </el-submenu>

            <!-- 用户详情 -->
            <el-submenu index="user" class="fr">
              <template slot="title">
                <img class="user-head" src="@/assets/img/adminimg.png">
                <div class="user-info">
                  <p>{{userInfo.roleName}}</p>
                  <p class="f12">{{userInfo.userName}}</p>
                </div>
              </template>
              <el-menu-item @click="logout" index="/login" class="f12">退出</el-menu-item>
            </el-submenu>
            <!-- 版本更新 -->
            <el-submenu index="/version" class="fr head-version">
              <template slot="title">
                <i class="el-icon-info"></i>
              </template>
              <el-menu-item index="/version" class="f12">版本更新</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>

        <!-- 中间内容区域 -->
        <el-main class="scroll-wrap">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </div>
  </d-layout>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      isLockkScreen: false,
      loading: false,
      authorityBtn: {},
      isCityChange: false, // 城市是否显示
      cityList: [], // 城市列表
      cityInfo: '',
      syslist: [],
      cityClass: ['ABC', 'DEF', 'GHJ', 'KLM', 'NPQ', 'RST', 'WXYZ'],
      activeName: 'ABC',
      syslistCodeArr: [],
      searchCityName: '', // 搜索城市名字
      userInfo: this.$local.fetch('userInfo'),
      navData: [], // 所有权限码
      token: '',
      finger: '',
      path: ''
    }
  },
  computed: {
    syscode () {
      return this.isRentSystem ? 'asystem' : 'asysbusiness'
    },
    // 去掉菜单里的更多应用
    navMenu () {
      let navData = this.$local.fetch('navData') || []
      return navData.filter(item => item.code != 'moremenu')
    },
    // 获取更多应用菜单
    moremenu () {
      let navData = this.$local.fetch('navData') || []
      let moreMenuList = []
      navData.forEach(item => {
        if (item.code == 'moremenu') {
          moreMenuList = item.children || []
        }
      })
      return moreMenuList
    },
    sysList () {
      return (
        !this.loading &&
        (this.$local.fetch('syslist') || []).filter(item => {
          if (process.env.NODE_ENV === 'development') {
            if (item.syscode === 'asystem') {
              item.sysurl = '/decentralized'
            } else if (item.syscode === 'asysbusiness') {
              item.sysurl = '/centralized'
            }
          }

          return item.syscode !== this.syscode
        })
      )
    }
  },

  created () {
    // let companyInfo = this.$local.fetch('companyInfo')
    // this.$store.commit('companyInfo',companyInfo)
    // 判断当前是否从别的平台跳转到当前
    let urlParams = this.$route.query || {}
    let token = urlParams.token
    let finger = urlParams.finger
    // 首次进入 高亮导航
    this.path = this.$route.path.indexOf('/housecondition') !== -1 ? '/housecondition' : this.$route.path

    if (urlParams.token) {
      localStorage.setItem('token', token)
      localStorage.setItem('finger', finger)
      this.token = token
      this.finger = finger
      this.loading = true

      this.getNavData()
        .then(() => {
          // 获取公共的信息
          this.navData = JSON.parse(localStorage.getItem('navData')) || []
          this.syslist = JSON.parse(localStorage.getItem('syslist')) || []
          this.syslist.forEach(item => {
            this.syslistCodeArr.push(item.syscode)
          })
          // 登录成功后返回到首页
          this.$router.replace({
            // path: this.navData[0] ? this.navData[0].url : '/'
            path: '/'
          })
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.token = localStorage.token
      this.finger = localStorage.finger

      // 获取公共的信息
      this.navData = JSON.parse(localStorage.getItem('navData')) || []
      this.syslist = JSON.parse(localStorage.getItem('syslist')) || []
      this.syslist.forEach(item => {
        this.syslistCodeArr.push(item.syscode)
      })
    }
  },
  beforeMount () {},
  watch: {
    isLockkScreen (val) {
      if (!val) {
        this.token = localStorage.token
      }
    },
    '$route': {
      handler (a) {
        this.path = a.path.indexOf('/housecondition') !== -1
          ? '/housecondition'
          : a.path
      },
      immediate: true
    }
  },
  methods: {
    handleSelect () {},
    // 退出登录
    logout () {
      localStorage.token = ''
      localStorage.timer = ''
      sessionStorage.setItem('loginRedirect', '')
      this.$router.push({ path: '/login' })
    },

    getCityInfo (item) {
      // 点击列表下的城市  updateCityInfo
      this.cityInfo = item
      this.$local.save('cityInfo', this.cityInfo)
      let params = {
        cityId: this.cityInfo.id,
        userId: JSON.parse(localStorage.userInfo).userId,
        type: '1' // type,1个人，0公司
      }
      this.$api.seeHouseConfigService
        .updateCityInfo(params) // 保存城市
        .then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '切换城市成功！'
            })
            // 切换成功刷新当前页面
            location.reload()
          }
        })
        .finally(() => {
          this.isCityChange = false
        })
    },
    // 获取菜单权限
    getNavData () {
      return Promise.all([
        this.$api.bizSystemService.getUserAuth(this.syscode).then(res => {
          if (res && res.code === 200) {
            const loginData = res.data || [{ url: '/' }]
            // 存储菜单
            // localStorage.setItem("navData", JSON.stringify(loginData));
            this.authorityBtn = {} // 按钮权限
            this.authorityHandle(loginData)
            // 存储功能权限
            localStorage.setItem(
              'authorityBtn',
              JSON.stringify(this.authorityBtn)
            )
            this.$local.save('authorityBtn', this.authorityBtn)
          }
        }),
        // 获取当前用户可操作的系统/平台列表
        this.getsyslist(),
        // 根据token查询用户信息
        this.$api.bizSystemService.getUserDetail().then(res => {
          if (res.code === 200) {
            let data = res.data
            let rmDeptEntity = data.rmDeptEntity || {} // 部门
            let rmRoleEntities = data.rmRoleEntities || [] // 人员

            this.userInfo = {
              userName: data.name,
              userId: data.id,
              deptId: data.deptId, // 部门id
              syscode: 'asystem', // 子系统编码
              companyCode: data.companyCode, // 公司code
              account: data.account, // 帐号
              companyName: data.companyEntity.companyName, // 公司名字
              roleType: rmRoleEntities[0] && rmRoleEntities[0].id, // 人员权限
              deptName: rmDeptEntity.deptName, // 部门名字
              roleName: rmRoleEntities[0] && rmRoleEntities[0].roleName // 角色名字
            }

            // 用户数据权限
            this.$local.save('dataAuthList', data.dataAuthList || [])
            // 用户按钮数据权限
            this.$local.save('bizDataAuthCfgList', data.bizDataAuthCfgList || [])

            this.$local.save('userInfo', this.userInfo)
          }
        })
      ])
    },
    // 获取当前用户可操作的系统/平台列表
    getsyslist () {
      return this.$api.bizSystemService.getsyslist().then(res => {
        localStorage.setItem('syslist', JSON.stringify(res.data || [])) // 存储该用户拥有的平台权限
      })
    },
    // 递归处理权限数据
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
    },
    fsearchCityName () {
      let params = {
        cityName: this.searchCityName
      }
      this.$api.seeHouseConfigService
        .getCityList(params) // 获取城市列表
        .then(res => {
          if (res.code == 200) {
            // 搜索到的城市列表
            this.cityList = res.data || {}
            // 获取城市列表的首字母数组
            let objectKeys = Object.keys(this.cityList)
            if (objectKeys.length) {
              // 获取到子一个城市的首字母
              let firstKey = objectKeys[0]
              // 根据城市首字母查询cityClass 数组项
              const findTeen = (classify, key) =>
                classify.find(v => v.includes(key))
              this.activeName = findTeen(this.cityClass, firstKey)
            }
          }
        })
    }
  }
}
</script>
<style lang="scss" >
.message-notice {
  display: inline-block;
  margin-right: 15px;
  vertical-align: -8px;
}
.el-menu--horizontal > .header-logo.el-menu-item.is-active,
.el-menu--horizontal > .header-logo.el-menu-item {
  border-bottom: none;
}
.header-logo {
  margin-right: 30px;
  .header-img {
    display: inline-block;
    height: 40px;
    width:40px;
    border-radius: 50%;
    object-fit: cover;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.head-user-info {
  position: absolute;
  top: 0;
  right: 0;
}
.head-version .el-submenu__icon-arrow {
  display: none;
}
.user-head {
  display: inline-block;
  margin-right: 5px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.user-info {
  display: inline-block;
  line-height: 20px;
}
</style>
