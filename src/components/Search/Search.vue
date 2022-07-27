<template>
  <div class="search">
    <!-- 头部 -->
    <header>
      <el-icon><Back /></el-icon>
      <input type="search" @change="search" ref="input" />
    </header>
    <router-view></router-view>
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

import { onMounted, getCurrentInstance, ref, reactive, toRefs } from "vue";
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
    });

    onMounted(() => {
      _getHotSearchDetails().then((res) => {
        // console.log(res);
        state.listInfo = res.data.data.slice(0, 10);
        bus.emit("searchList", state.listInfo);
      });
    });

    function search() {
      _getSearch(state.input.value).then((res) => {
        console.log(res);
        //点击搜索需要跳转到搜索页面
        const data = res.data.result;
        bus.emit("Details", data.songs);
        router.push({ path: "/search/searchDetail" });
      });
    }
    return {
      search,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0 1.2rem;
  margin-top: 0.8rem;
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
}
</style>
