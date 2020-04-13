<template>
  <div class="no-data">
    <div class="no-data-wrapper">
      <div class="img-icon"></div>
      <p class="tips">暂无数据</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .no-data-wrapper {
    .img-icon {
      width: 2rem;
      height: 1.2rem;
      background-color: #ffffff;
      background-image: url("./nodata.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 100% 100%;
    }
    .tips {
      font-size: 0.32rem;
      line-height: 0.4rem;
      color: #a0a0a0;
      text-align: center;
      margin-top: 0.2133rem;
    }
  }
}
</style>