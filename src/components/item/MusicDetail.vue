<template>
  <img class="bgimg" :src="musicList.al.picUrl" alt="">
  <div class="detailTop">
    <div class="detailTopLeft">
      <!-- 返回箭头 -->
      <svg class="icon" aria-hidden="true" @click="goHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <!-- 左上角作者名 -->
        <Vue3Marquee style="color: #fff;">{{ musicList.al.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <!-- 右箭头 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <!-- 分享 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow" @click="this.isLyricShow = true">
    <img class="img_needle" :class="{ img_needle_active: !isBtnShow }" src="@/assets/needle-ab.png" alt="">
    <img class="img_cd" src="@/assets/cd.png" alt="">
    <img class="img_ar" :class="[isBtnShow ? 'img_ar_paused' : 'img_ar_active']" :src="musicList.al.picUrl" alt="">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="this.isLyricShow = false">
    <p v-for="item in lyric" :key="item"
      :class="{ active: currentTime * 1000 >= item.time && currentTime * 1000 < item.next }">
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <!-- 爱心 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <!-- 下载按钮 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <!-- 音乐长篇 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <!-- 评论 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <!-- 列表 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" v-model="currentTime" min="0" :max="duration" step="0.05">
    </div>
    <div class="footer">
      <!-- 循环 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 播放 -->
      <svg class="icon bofang" aria-hidden="true" v-show="isBtnShow" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <!-- 暂停 -->
      <svg class="icon bofang" aria-hidden="true" v-show="!isBtnShow" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <!-- 列表 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      isLyricShow: false
    }
  },
  mounted() {
    //console.log(this.musicList);
    //console.log(this.lyricList.lyric);
  },
  props: ["musicList", "play", "isBtnShow", "getDuration"],
  computed: {
    ...mapState(["lyricList", "currentTime", "playListIndex", "playList", "duration"]),
    // 处理歌词
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(item.indexOf('[') + 1, item.indexOf(':'));
          let sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'));
          let mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'));
          let lrc = item.slice(item.indexOf(']') + 1, item.length);
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
          // 歌词到了最后没有下一句了
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = Number.MAX_SAFE_INTEGER;
          } else {
            // 获取下一句歌词的时间（毫秒）
            item.next = arr[i + 1].time
          }
        });
      }
      //console.log(arr);
      return arr;
    }
  },
  watch: {
    currentTime(newValue) {
      // 获取当前正在唱的歌词标签
      let p = document.querySelector("p.active");
      //console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      // 播放完后自动下一首
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    }
  },
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    // 点击左侧箭头返回
    goHome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    // 上一首 下一首
    goPlay(num) {
      let index = this.playListIndex + num;
      // 如果是第一首歌还点上一首就返回到最后一首
      if (index < 0) {
        index = this.playList.length - 1
        // 如果是最后一首歌还点下一首就返回到第一首
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  components: {
    Vue3Marquee,
  }
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: .2rem;
  margin-top: .1rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .detailTopLeft {
    display: flex;
    align-items: center;

    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;

      span {
        color: #999;
      }

      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}

.musicLyric {
  width: 100%;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .5rem;
  overflow: scroll;
  scroll-behavior: smooth;

  p {
    color: rgb(190, 181, 181);
    margin-bottom: .3rem;
  }

  .active {
    color: #fff;
    font-size: .4rem;
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all .7s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all .7s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // 动画：动画名 时间 匀速 无限循环
    animation: rotate_ar 10s linear infinite;
  }

  // 动画开始样式
  .img_ar_active {
    animation-play-state: running;
  }

  // 动画暂停样式
  .img_ar_paused {
    animation-play-state: paused;
  }

  // 动画
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .range {
    width: 100%;
    height: 0.06rem;
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>