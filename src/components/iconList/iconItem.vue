<template>
  <!-- 图标布局，分为上下 -->
  <div class="iconItem">
    <div class="icon-top">
      <span class="iconfont" :class="iconclass"></span>
    </div>
    <div class="icon-bottom">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "iconItem",
  props: ["title", "iconclass"],
};
</script>

<style lang="scss" scoped>
.iconItem{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-top{
    position: relative;
    width: 3rem;
    aspect-ratio: 1;
    border-radius: 1.5rem;
    background-color: red;
    .iconfont{
      position:absolute;
      left: 1.5rem;
      top: 1.5rem;
      transform: translate(-50%,-50%);
      color: white;
      font-size: 1.5rem;
    }
  }
  .icon-bottom{
    margin-top: 0.2rem;
    font-size: 0.6rem;
  }
}
</style>
