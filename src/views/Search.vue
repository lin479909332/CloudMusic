<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="蔡徐坤" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if='item.mvid != 0'>
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/home"
export default {
  data() {
    return {
      // 搜索过的关键词
      keyWordList: [],
      // 输入框当前的搜索关键词
      searchKey: "",
      // 搜出来的歌曲
      searchList: []
    }
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
  },
  methods: {
    // 按下回车后
    async enterKey() {
      if (this.searchKey.trim() != "" && this.searchKey.trim() != undefined) {
        this.keyWordList.unshift(this.searchKey);
        // 数组去重 （先把数组变成一个去重后的类数组的set对象，再展开，后面再用数组包裹
        this.keyWordList = [...new Set(this.keyWordList)];
        // 固定长度
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
      }
      // 保存到localStorage里
      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
      // 搜索歌曲
      let res = await getSearchMusic(this.searchKey);
      // console.log(res);
      this.searchList = res.data.result.songs;
      this.searchKey = "";
    },
    // 删除搜索记录的按钮
    delHistory() {
      this.keyWordList = [];
      localStorage.removeItem("keyWordList");
    },
    // 点击历史记录搜索歌曲
    async searchHistory(item) {
      let res = await getSearchMusic(item);
      // console.log(res);
      this.searchList = res.data.result.songs;
    },
    // 点击歌曲后
    updateIndex(item) {
      // 部分参数和以前不一样这里需要修正一下
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      // 
      this.$store.commit("pushPlayList", item);
      this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: .1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: .2rem;
  position: relative;

  .searchSpan {
    font-weight: 700;
  }

  .spanKey {
    padding: .1rem .2rem;
    background-color: rgb(218, 204, 205);
    border-radius: .4rem;
    margin: .1rem .2rem;
    display: inline-block;
  }

  .icon {
    width: .5rem;
    height: .5rem;
    position: absolute;
    right: .2rem;
  }
}

.itemList {
  width: 100%;
  padding: .2rem;

  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;

      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }

      div {
        p {
          width: 4.54rem;
          height: .4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        span {
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }

        margin-left: 0.3rem;
      }
    }

    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;

      .icon {
        fill: #999;
      }

      .bofang {
        position: absolute;
        left: 0;
      }

      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>