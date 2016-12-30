var initData = 'this is first line\nthis is second line'
var extraLine = [];
Page({
  data: {
    text: "初始数据"
  },
  add: function(e) {
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
  }
})