<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-show="isBtnShow" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-show="!isBtnShow" @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%', height: '100%' }">
      <!-- 把当前正在播放的歌曲、播放的方法、播放按钮的显示状态切换方法 传递过去 -->
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isBtnShow="isBtnShow" :getDuration="getDuration" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MusicDetail from "@/components/item/MusicDetail.vue"
export default {
  data() {
    return {
      // 控制定时器的
      interVal: 0
    }
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isBtnShow", "detailShow"])
  },
  mounted() {
    //console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.getDuration();
  },
  methods: {
    play() {
      // 判断音乐是否处于播放状态
      if (this.$refs.audio.paused) {
        // 切换为播放状态
        this.$refs.audio.play();
        // 通过mutations改变vuex里的值
        this.updateIsBtnShow(false);
        // 播放时就更新时间
        this.updateTime();
      } else {
        // 切换为暂停状态
        this.$refs.audio.pause();
        // 通过mutations改变vuex里的值
        this.updateIsBtnShow(true)
        // 暂停时清除定时器
        clearInterval(this.interVal);
      }
    },
    // 更新播放时间的
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    // 获取歌曲的总时长
    getDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    ...mapMutations(["updateIsBtnShow", "updateDetailShow", "updateCurrentTime", "updateDuration"])
  },
  watch: {
    // 监听下标变换
    playListIndex() {
      // 切换歌曲后自动播放
      this.$refs.audio.autoplay = true;
      // 如果当前是暂停状态，就改变一下图标
      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false);
      }
      // 获取歌词
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    },
    // 监听播放列表变换
    playList() {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsBtnShow(false);
      }
      // 播放列表变换 获取歌词
      //this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    }
  },
  components: {
    MusicDetail,
  }
}
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #aaa;
  display: flex;
  padding: .2rem;
  justify-content: space-between;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>