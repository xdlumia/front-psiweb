/*
 * @Author: web.王晓冬
 * @Date: 2019-09-26 11:19:17
 * @LastEditors: web.高大鹏
 * @LastEditTime: 2019-10-26 11:39:38
 * @Description: layout 页面架构
 */
<template>
  <d-layout v-model="isLockkScreen">
    <img slot="logo" src="@/assets/img/logo.png" alt />
    <div style="height: 100vh" v-loading="loading">
      <el-container class="d-container">
        <!-- 头部区域 -->
        <el-header height="60px" class="header-top d-hidden">
          <!-- 菜单 -->
          <el-menu :default-active="path" mode="horizontal" :router="true" :unique-opened="true">
            <el-menu-item class="header-logo pl0" index="/">
              <img
                class="header-img"
                :src="this.$store.state.company.companyInfo.picUrl?this.$store.state.company.companyInfo.picUrl:require('@/assets/img/logo.png')"
              />
              <div class="d-inline">
                <h3>
                  <strong>{{this.$store.state.company.companyInfo.picName ? this.$store.state.company.companyInfo.picName : '进销存战役'}}</strong>
                </h3>
                <!-- <p> 帮助房地产中介提升企业产能 </p> -->
              </div>
            </el-menu-item>
            <el-menu-item style="height: 32px;line-height: 33px;margin-top: 10px;">
              <el-badge :value="12" class="backlog-wrapper">
                <el-button icon="el-icon-tickets" round size="small" class="backlog">待办事项</el-button>
              </el-badge>
            </el-menu-item>
            <!-- 如果type类型是菜单就不会有二级目录(最多只有2级菜单)
                1:目录
            2:菜单-->
            <el-menu-item
              v-for="(menu,index) of navMenu"
              :key="index"
              :index="menu.url"
              v-if="menu.type == 2"
            >{{menu.name}}</el-menu-item>
            <!-- 二级菜单 -->
            <el-submenu v-else :index="index+''">
              <template slot="title">{{menu.name}}</template>
              <div style="display:flex;">
                <!-- 二级菜单按 5长度 折行 -->
                <div
                  v-for="(chunkMenu, chunkMenuKey) in chunk(menu.children, WRAP_LENGTH)"
                  :key="chunkMenuKey"
                  :style="{display: menu.children && menu.children[0].children ? 'flex' : ''}"
                  :class="[!(menu.children && menu.children[0].children) ? 'pr10 pl10' : '']"
                >
                  <div v-for="(submenu,submenuKey) in chunkMenu" :key="submenuKey">
                    <!-- 二级菜单渲染 -->
                    <el-menu-item v-if="submenu.type===2" :index="submenu.url+''">{{submenu.name}}</el-menu-item>
                    <!-- 三级菜单渲染 -->
                    <div v-else class="hfull pb5" style="display:flex;flex-direction:column;">
                      <h4 class="mt5 mb10 menu-title">{{submenu.name}}</h4>
                      <!-- 三级菜单按 5长度 分割 -->
                      <div class="hfull mb10" style="display:flex;">
                        <div
                          class="pr10 pl10"
                          v-for="(chunkSubmenu, key) in chunk(submenu.children, WRAP_LENGTH)"
                          :key="key"
                          :style="{'border-right': submenuKey >= menu.children.length - 1 ? 'none' : '1px dashed #ccc'}"
                        >
                          <el-menu-item
                            v-for="(childMenu,childMenuKey) of chunkSubmenu"
                            :key="childMenuKey"
                            :index="childMenu.url+''"
                          >{{childMenu.name}}</el-menu-item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-submenu>

            <!-- 更多应用 -->
            <!-- <el-submenu v-if="sysList.length || moremenu.length" index=" ">
              <template slot="title">更多应用</template>
              <el-menu-item v-for="(sys, index) in sysList" :key="index" index>
                <a
                  class="d-block"
                  target="_blank"
                  :href="sys.sysurl+'?token='+token+'&finger='+finger"
                >
                  <span style="color:#909399">{{sys.sysname}}</span>
                </a>
              </el-menu-item>

              <el-menu-item
                v-for="item of moremenu"
                :key="item.id"
                :index="item.url+''"
              >{{item.name}}</el-menu-item>
            </el-submenu>-->

            <!-- 用户详情 -->
            <el-submenu index="user" class="fr">
              <template slot="title">
                <img
                  class="user-head"
                  style="object-fit: cover;"
                  :src="userInfo.avatarUrl || avatarUrl"
                />
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
const WRAP_LENGTH = 5
import chunk from '@/utils/chunk'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      avatarUrl: require('@/assets/img/adminimg.png'),
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
      path: '',
      chunk,
      WRAP_LENGTH
    };
  },
  computed: {
    syscode() {
      return this.isRentSystem ? 'asystem' : 'asysbusiness';
    },
    // 去掉菜单里的更多应用
    navMenu() {
      const navData = this.$local.fetch('navData') || [];
      return navData.filter(item => item.code != 'moremenu');
    },
    // 获取更多应用菜单
    moremenu() {
      const navData = this.$local.fetch('navData') || [];
      let moreMenuList = [];
      navData.forEach(item => {
        if (item.code == 'moremenu') {
          moreMenuList = item.children || [];
        }
      });
      return moreMenuList;
    },
    sysList() {
      return (
        !this.loading &&
        (this.$local.fetch('syslist') || []).filter(item => {
          if (process.env.NODE_ENV === 'development') {
            if (item.syscode === 'asystem') {
              item.sysurl = '/decentralized';
            } else if (item.syscode === 'asysbusiness') {
              item.sysurl = '/centralized';
            }
          }

          return item.syscode !== this.syscode;
        })
      );
    }
  },

  created() {
    // let companyInfo = this.$local.fetch('companyInfo')
    // this.$store.commit('companyInfo',companyInfo)
    // 判断当前是否从别的平台跳转到当前
    const urlParams = this.$route.query || {};
    const token = urlParams.token;
    const finger = urlParams.finger;
    // 首次进入 高亮导航
    this.path =
      this.$route.path.indexOf('/housecondition') !== -1
        ? '/housecondition'
        : this.$route.path;

    if (urlParams.token) {
      localStorage.setItem('token', token);
      localStorage.setItem('finger', finger);
      this.token = token;
      this.finger = finger;
      this.loading = true;

      this.getNavData()
        .then(() => {
          // 获取公共的信息
          this.navData = JSON.parse(localStorage.getItem('navData')) || [];
          this.syslist = JSON.parse(localStorage.getItem('syslist')) || [];
          this.syslist.forEach(item => {
            this.syslistCodeArr.push(item.syscode);
          });
          // 登录成功后返回到首页
          this.$router.replace({
            // path: this.navData[0] ? this.navData[0].url : '/'
            path: '/'
          });
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.token = localStorage.token;
      this.finger = localStorage.finger;

      // 获取公共的信息
      this.navData = JSON.parse(localStorage.getItem('navData')) || [];
      this.syslist = JSON.parse(localStorage.getItem('syslist')) || [];
      this.syslist.forEach(item => {
        this.syslistCodeArr.push(item.syscode);
      });
    }
  },
  beforeMount() { },
  watch: {
    isLockkScreen(val) {
      if (!val) {
        this.token = localStorage.token;
      }
    },
    $route: {
      handler(a) {
        this.path =
          a.path.indexOf('/housecondition') !== -1 ? '/housecondition' : a.path;
      },
      immediate: true
    }
  },
  methods: {
    handleSelect() { },
    // 退出登录
    logout() {
      localStorage.token = '';
      localStorage.timer = '';
      sessionStorage.setItem('loginRedirect', '');
      this.$router.push({ path: '/login' });
    },

    getCityInfo(item) {
      // 点击列表下的城市  updateCityInfo
      this.cityInfo = item;
      this.$local.save('cityInfo', this.cityInfo);
      const params = {
        cityId: this.cityInfo.id,
        userId: JSON.parse(localStorage.userInfo).userId,
        type: '1' // type,1个人，0公司
      };
      this.$api.seeHouseConfigService
        .updateCityInfo(params) // 保存城市
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '切换城市成功！'
            });
            // 切换成功刷新当前页面
            location.reload();
          }
        })
        .finally(() => {
          this.isCityChange = false;
        });
    },
    // 获取菜单权限
    getNavData() {
      return Promise.all([
        this.$api.bizSystemService.getUserAuth(this.syscode).then(res => {
          if (res && res.code === 200) {
            const loginData = res.data || [{ url: '/' }];
            // 存储菜单
            // localStorage.setItem("navData", JSON.stringify(loginData));
            this.authorityBtn = {}; // 按钮权限
            this.authorityHandle(loginData);
            // 存储功能权限
            localStorage.setItem(
              'authorityBtn',
              JSON.stringify(this.authorityBtn)
            );
            this.$local.save('authorityBtn', this.authorityBtn);
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

            this.userInfo = {
              avatarUrl: data.avatarUrl,
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
            };

            // 用户数据权限
            this.$local.save('dataAuthList', data.dataAuthList || []);
            // 用户按钮数据权限
            this.$local.save(
              'bizDataAuthCfgList',
              data.bizDataAuthCfgList || []
            );

            this.$local.save('userInfo', this.userInfo);
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
    // 递归处理权限数据
    authorityHandle(authorityData) {
      authorityData.forEach(item => {
        if (item.code !== '') {
          this.authorityBtn[item.code] = item.buttonsCode;
        }
        // 存在children 递归
        if (item.children && item.children[0]) {
          this.authorityHandle(item.children);
        }
      });
    },
    fsearchCityName() {
      const params = {
        cityName: this.searchCityName
      };
      this.$api.seeHouseConfigService
        .getCityList(params) // 获取城市列表
        .then(res => {
          if (res.code == 200) {
            // 搜索到的城市列表
            this.cityList = res.data || {};
            // 获取城市列表的首字母数组
            const objectKeys = Object.keys(this.cityList);
            if (objectKeys.length) {
              // 获取到子一个城市的首字母
              const firstKey = objectKeys[0];
              // 根据城市首字母查询cityClass 数组项
              const findTeen = (classify, key) =>
                classify.find(v => v.includes(key));
              this.activeName = findTeen(this.cityClass, firstKey);
            }
          }
        });
    }
  }
};
</script>
<style lang="scss">
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
    width: 40px;
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
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.user-info {
  display: inline-block;
  line-height: 20px;
}
.menu-title {
  color: #1790ff;
  padding: 0 20px;
  font-weight: bold;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #1790ff;
}
.backlog-wrapper {
  .el-badge__content {
    top: 5px;
    right: 13px;
  }
  .backlog {
    background: #36cfc9;
    border-color: #36cfc9;
    color: #fff;
    font-size: 14px;
    .el-icon-tickets {
      color: #fff;
    }
  }
}
</style>
