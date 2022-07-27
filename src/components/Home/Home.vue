<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-31liebiao"></span>
      </template>
      <template v-slot:center>
        <div v-for="item in title" :key="item">{{ item }}</div>
      </template>
      <template v-slot:right>
        <span class="iconfont icon-sousuo_o" @click="search"></span>
      </template>
    </nav-bar>
    <!-- 轮播图 -->
    <banner :bannerList="bannerList"></banner>
    <!-- 图标列表 -->
    <icon-list></icon-list>
    <!-- 推荐歌单 -->
    <recommend></recommend>
  </div>
</template>

<script>
import NavBar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import iconList from "../iconList/iconList";
import Recommend from "../Recommend/Recommend";

import { _getbanner } from "@/axios/banner";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
/* eslint-disable */
export default {
  name: "Home",
  components: {
    NavBar,
    iconList,
    Recommend,
    Banner,
  },
  setup() {
    const router = useRouter();
    const title = ["我的", "发现", "云村", "视频"];
    //获取banner数据
    let bannerList = ref([]);
    onMounted(async () => {
      await _getbanner(1).then((res) => {
        bannerList.value = res.data.banners;
      });
    });

    function search() {
      router.push({ path: "/search" });
    }
    return {
      title,
      bannerList,
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 1.5rem;
}
</style>
