<template>
  <div class="search">
    <!-- 头部 -->
    <header>
      <el-icon @click="back"><Back /></el-icon>
      <input type="search" @change="search" @input="searchTip" ref="input" />
    </header>
    <!-- 提示信息 -->
    <div v-if="isSuggest" class="suggestMsg">
      <div class="suggestMsg-item" v-for="item in suggestMsg">
        <div class="suggetsMsg-item-left">
          <span class="iconfont icon-sousuo_o"></span>
        </div>
        <div class="suggetsMsg-item-right">
          <span>{{ add(item.name) }}</span>
        </div>
      </div>
    </div>
    <!-- 开启缓存 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import {
  _getSearch,
  _getKeyword,
  _getHotsearch,
  _getHotSearchDetails,
  _getSearchSuggest,
  _getSearchMultiMatch,
} from "@/axios/search";

import { onMounted, getCurrentInstance, reactive, toRefs, provide } from "vue";
import { useRouter } from "vue-router";

//搜索功能
export default {
  name: "search",

  setup() {
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    const router = useRouter();
    const state = reactive({
      input: null,
      listInfo: [],
      suggestMsg: [],
      isSuggest: false,
      singleMusicDetails: [],
    });
    provide("singleMusicDetails", state);
    onMounted(() => {
      _getHotSearchDetails().then((res) => {
        // console.log(res);
        state.listInfo = res.data.data.slice(0, 10);
        bus.emit("searchList", state.listInfo);
      });
    });

    function search() {
      _getSearch(state.input.value).then((res) => {
        //点击搜索需要跳转到搜索页面
        state.singleMusicDetails = res.data.result.songs;
        router.push({ path: "/search/searchDetail" });
        state.isSuggest = false;
      });
    }

    function back() {
      router.go(-1);
    }
    function searchTip() {
      if (state.input.value == "") {
        state.isSuggest = false;
      } else {
        _getSearchSuggest(state.input.value).then((res) => {
          state.suggestMsg = res.data.result.songs;
          state.isSuggest = true;
        });
      }
    }

    function add(name) {
      return state.input.value + " " + name;
    }
    return {
      search,
      ...toRefs(state),
      searchTip,
      add,
      back,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0 1.2rem;
  margin-top: 0.8rem;
  position: relative;
  header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    .el-icon {
      font-size: 2.2rem;
    }
    input {
      font-size: 1.4rem;
      padding: 0.6rem 0;
      outline: none;
      width: calc(95% - 3.5rem);
      border: 0;
      border-bottom: 1px solid #000;
      margin-left: 1rem;
    }
  }
  .suggestMsg {
    position: fixed;
    left: 1rem;
    top: 3rem;
    width: 100%;
    background-color: #fff;
    z-index: 5;
    .suggestMsg-item {
      display: flex;
      align-items: center;
      height: 3rem;
      .suggetsMsg-item-left {
        .iconfont {
          font-size: 1.2rem;
        }
      }
      .suggetsMsg-item-right {
        margin-left: 0.5rem;
        flex: 1;
        border-bottom: 0.02rem solid #ccc;
        padding: 1rem 0;
      }
    }
  }
}
</style>
