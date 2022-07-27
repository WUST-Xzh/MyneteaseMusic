<template>
  <div class="navbar">
    <!-- 导航栏左边 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <!-- 导航栏中部 -->
    <div class="center">
      <slot name="center"></slot>
    </div>
    <!-- 导航栏右边 -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name:'NavBar'
  }
</script>


<style lang="scss" scoped>
.navbar{
  display:flex;
  justify-content: center;
  align-items: center;
  .left,.right{
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
  }
  .center{
    flex:1;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
  }
}


</style>