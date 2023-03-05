import { getMusicLyric } from '@/request/api/item';
import { getPhoneLogin } from "@/request/api/home"
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }]
    }],
    playListIndex: 0, //正在播放的音乐在列表里的下标，默认是0也就是第一首
    isBtnShow: true, //暂停按钮是否显示
    detailShow: false,  //曲盘播放页面是否显示
    lyricList: {}, //歌词
    currentTime: 0, //歌曲当前时间
    duration: 0,  //歌曲的总时长
    isLogin: false, //用户是否登录
    isFooterShow: true,//判断底部组件是否需要显示
    token: "", //登录token
    user: {},  //用户信息
  },
  getters: {
  },
  mutations: {
    updateIsBtnShow(state, value) {
      state.isBtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
      //console.log(state.playList);
    },
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
      //console.log(state.currentTime);
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    updateIsFooterShow(state, value) {
      state.isFooterShow = value;
    },
    updateIsLogin(state, value) {
      state.isLogin = value;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", state.token)
    },
    updateUser(state, value) {
      state.user = value;
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value);
      //console.log(res);
      context.commit("updateLyricList", res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await getPhoneLogin(value);
      //console.log(res);
      return res;
    }
  },
  modules: {
  }
})
