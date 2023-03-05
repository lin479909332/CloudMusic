<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home"
import { onMounted, reactive } from "vue";
export default {
  setup() {
    // 变为响应式
    const state = reactive({
      // 轮播图图片
      images: []
    });
    onMounted(async () => {
      // axios.get("http://localhost:3000/banner?type=2").then((res) => {
      //   state.images = res.data.banners
      // })
      let res = await getBanner();
      state.images = res.data.banners
    })
    return { state };
  },
}
</script>
<style lang="less">
#swiperTop {
  //需要在上面自己添加一个id
  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe-item {
      padding: 0 0.2rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }

    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>