<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
import ItemMusicList from "@/components/item/ItemMusicList.vue"
import { useRoute } from "vue-router";
import { getMusicItemList, getItemList } from "@/request/api/item"
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      // 歌单详情数据
      playlist: {},
      // 歌单列表数据
      itemList: []
    })
    onMounted(async () => {
      // 获取歌单详情页id
      let id = useRoute().query.id
      // 发请求获取歌单详情
      let res = await getMusicItemList(id);
      //console.log(res);
      state.playlist = res.data.playlist;
      // 发请求获取歌单列表
      let result = await getItemList(id);
      //console.log(result);
      state.itemList = result.data.songs;
      // 用json形式保存数据到sessionStorage里
      sessionStorage.setItem("itemDetail", JSON.stringify(state))
    })
    return { state }
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  }
}
</script>