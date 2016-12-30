Page({
  data: {
    access_token: "",
    password: ""
  },

  onLogin: function (event) {

    var thiz = this

    wx.request({
      url: 'https://sso.lincoln.com.cn/EAI/oauth/token',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic ZWFpLWNsaWVudDo="
      },

      data: {
        username: "testchan@163.com",
        password: "qwer1234",
        grant_type: "password"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        thiz.setData({
          access_token: res.data.access_token, token_type: "bearer",
          refresh_token: "10719522-46d0-4e16-8a6d-9224dd4c2122", expires_in: 3323,
          scope: "read"
        })

        thiz.getUserInfo(res.data.access_token)
      }
    })
  },

  getUserInfo: function (accessttToken) {
    var infoThis = this
    wx.request({
      url: 'https://cnapi.cv.ford.com/api/sessions/',
      data: {
        lighthouseToken: accessttToken
      },
      method: 'PUT',
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res.data)
        infoThis.setData({
          authToken: res.data.authToken
        })

        infoThis.getVehicleStatus(res.data.authToken)
      }
    })
  },
  getVehicleStatus: function (authtoken) {
    var date = new Date
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours() - 8
    var minute = date.getMinutes()
    var second = date.getSeconds()

    var lrdt = [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute, second].map(formatNumber).join(':')
    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    wx.request({
      url: 'https://cnapi.cv.ford.com/api/users/vehicles/?lrdt=0001-01-01T00:00:00',
      header: {
        "auth-token": authtoken
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      },

    })
  },
  onUsernameInput: function (event) {
    this.setData({

    })
  },

  onPasswordInput: function (event) {
    this.setData({

    })
  }
})
