export default {
  pages: [
    'pages/meditation/index',
    'pages/exercise/index',
    'pages/brain/index',
    'pages/community/index',
    'pages/mine/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // tabBar: {
  //   list: [
  //     {
  //       pagePath: "pages/index/index",
  //       "text": "首页"
  //     },
  //     {
  //       pagePath: "pages/hello/index",
  //       "text": "日志"
  //     }
  //   ]
  // },
  tabBar: {
    custom: false,
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#0ddadb",
    list: [{
      pagePath: "pages/meditation/index",
      text: "冥想"
    }, {
      pagePath: "pages/exercise/index",
      text: "锻炼"
    }, {
      pagePath: "pages/brain/index",
      text: "大脑"
    }, {
      pagePath: "pages/community/index",
      text: "社区"
    }, {
      pagePath: "pages/mine/index",
      text: "我的"
    }]
  },
  usingComponents: {}
}
