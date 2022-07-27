<template>
  <div class="searchDetail">
    <!-- 顶部导航栏 -->
    <div class="tabBar">
      <span class="tarBar-item" v-for="(item, index) in tabBar" :key="index">{{
        item
      }}</span>
    </div>
    <!-- 单曲列表 -->
    <div class="singleMusic">
      <div class="singleMusic-top">
        <span>单曲</span>
        <more :contentStr="'播放'"></more>
      </div>
      <div class="singleMusic-bottom">
        
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue'
import { reactive, toRefs } from "@vue/reactivity";

import More from '@/components/More/More'
export default {
  name: "SearchDetail",
  components:{
    More
  },
  setup() {
    const instance=getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    const state = reactive({
      tabBar: ["综合", "单曲", "歌单", "视频", "歌手", "播客"],
      singleMusic: [],
    });
    bus.on("Details", (val) => {
      state.singleMusic = val;
      console.log(state.singleMusic);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.searchDetail {
  margin-top: 1rem;
  border-radius: 1rem;
  .tabBar {
    height: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .singleMusic{
    .singleMusic-top{
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.05rem solid #ccc;
      span{
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
}
</style>
