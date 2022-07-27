<template>
  <el-scrollbar height="10rem">
    <div class="scrollbar-flex-content">
      <music-item></music-item>
    </div>
  </el-scrollbar>
</template>

<script>
import MusicItem from "@/components/MusicItem/MusicItem";

export default {
  name: "MyScroll",
  components:{
    MusicItem
  }
};
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
}
</style>
