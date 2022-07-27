<template>
  <div id="iconList">
    <icon-item v-for="item in iconList" :title="item.title" :iconclass="item.iconclass"></icon-item>
  </div>
</template>

<script>
import iconItem from "./iconItem.vue";
export default {
  name: "iconList",
  data() {
    return {
      iconList: [
        { title: "每日推荐", iconclass: "icon-rili" },
        { title: "私人FM", iconclass: "icon-shouyinji" },
        { title: "歌单", iconclass: "icon-gedan" },
        { title: "排行榜", iconclass: "icon-paihangbang--" },
      ],
    };
  },
  components: {
    iconItem
  },
};
</script>

<style lang="scss" scoped>
#iconList{
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.6rem;
}
</style>
