<template>
  <div class="loading">
    <div class="loading-circle">
      <van-loading color="#1989fa" />
    </div>
  </div>
</template>
<style lang='less'>
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1000;
  .loading-circle {
    position: absolute;
    top: calc(50% - 0.2rem);
    left: calc(50% - 0.2rem);
  }
}
</style>