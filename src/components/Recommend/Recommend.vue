<template>
  <!-- 布局分为上下，上面又分为左右 -->
  <div class="recommend">
    <!-- 分为左边标题显示和右边更多 -->
    <div class="recommend-top">
      <h3>推荐歌单</h3>
      <more class="more" :contentStr="'更多>'"></more>
    </div>
    <div class="recommend-bottom">
      <!-- 显示歌单列表 -->
      <my-scroll></my-scroll>
    </div>
  </div>
</template>

<script>
import More from "@/components/More/More";
import MusicItem from "@/components/MusicItem/MusicItem";
import MyScroll from '@/components/MyScroll/MyScroll'

import { ref, onMounted,getCurrentInstance } from "vue";

import { _getRecommendList } from "@/axios/recommend";
// 推荐歌单组件
export default {
  name: "Recommend",
  components: {
    More,
    MusicItem,
    MyScroll
  },
  setup() {
    const instance=getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    onMounted(async () => {
      await _getRecommendList(10).then((res) => {
        console.log(res);
        bus.emit("recommendList",res.data.result)
        
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  margin-top: 1rem;
  .recommend-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }
  .recommend-bottom{
    margin-top: 1rem;
  }
}
</style>
