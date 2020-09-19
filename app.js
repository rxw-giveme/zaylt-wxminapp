//app.js
App({
  globalData: {
    userInfo: null,
    usrBaseInfo: null,
    usrDesInfo: null,
    list: [], //存放tabBar的数据
    // url:'https://dev.inininininin.com/ylt',
    // domain:'https://dev.inininininin.com',
    url:'https://zaylt.njshangka.com/ylt',
    domain:'https://zaylt.njshangka.com',
    token: '',//'1984750073886',
    userToken:'',
    clinicId:'',
    clinicName:'',
    hospitalId: '',
    hospitalName:'',
    managerName:'',
    managerId:'',
    phone: '',
    userId: '',
    clinicaddress:'',
    hospitaladdress:'',
    license: '',
    cover: '',
    authenticationIs: '',
    src:'', 
    Version:'1.0.2009190837',
    versionIntro: '修复了部分BUG\n优化了部分体验',
    lastClient:'',
    longitude:'',
    latitude: '',
    speed: '',
  },
  onLaunch: function () {
    this.globalData.usrBaseInfo = '123'
  
   

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

   
    const vm = this
    wx.getSystemInfo({
      success: function(res) {
        let titleBarHeight = 0
        if (res.model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        // that.setData({
          vm.globalData.statusBarHeight= res.statusBarHeight,
          vm.globalData.titleBarHeight= titleBarHeight
        // });
      },
      failure() {
        vm.globalData.statusBarHeight= res.statusBarHeight,
          vm.globalData.titleBarHeight= titleBarHeight
      }
    })
    
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      highAccuracyExpireTime:'3000',
      success: function (res) {
        vm.globalData.longitude = res.longitude
        vm.globalData.latitude = res.latitude
        vm.globalData.speed = res.speed
      }
    })
  },
  getUsrInfo: function (cb) {
    var that = this
    if (this.globalData.usrDesInfo) {
      typeof cb == "function" && cb(this.globalData.usrBaseInfo)
    } else {
      /*wx.redirectTo({
        url: '登录页面',
      })*/
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.usrBaseInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.usrBaseInfo)
            }
          })
        }
      })
    }
  },
  getUsrDes: function (cb) {
    var that = this
    if (this.globalData.usrDesInfo) {
      typeof cb == "function" && cb(this.globalData.usrBaseInfo)
    } else {
      wx.redirectTo({
        url: 'String',
      })
    }
  },
  dateChange: function (data) {
    var date = new Date(data)
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  cover(_cover) {
    var that = this
    if (_cover && _cover.slice(0, 1) != 'h') {
      _cover = this.globalData.domain + _cover
    }
    return _cover
  },
  loginRefresh:{}
})
