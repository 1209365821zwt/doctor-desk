<template>
  <div class="visitrecord-container">
    <van-tabs v-model="active">
      <van-tab title="拜访记录">
        <Visiter></Visiter>
      </van-tab>
      <van-tab title="内容分享">
        <Content></Content>
      </van-tab>
      <van-tab title="聊天记录">
        <Talk></Talk>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Content from "./components/Content";
import Talk from "./components/Talk";
import Visiter from "./components/Visiter";
export default {
  components: {
    Content,
    Talk,
    Visiter
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  created() {
    console.log(this.$route.query.num)
    this.active = this.$route.query.num;
  }
};
</script>

<style lang='less'>
.visitrecord-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-tabs {
    height: 100%;
    position: relative;
    font-size: 0.28rem;
    color: #252a36;
    .van-tabs__wrap {
      height: 0.94rem;
      border-bottom: 1PX solid #eee;
    }
    .van-tab--active {
      border: 0;
      color: #252a36;
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
    }
    .van-tabs__line {
      background: #009fda !important;
      width: 0.56rem !important;
      height: 0.06rem !important;
    }
  }

  .van-tabs__content {
    height: calc(100% - 0.94rem);
    .van-tab__pane {
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>