<template>
  <div class="points-container">
    <div class="points-header">
      <div class="rule">
        <img :src="require('@/assets/svg/icon/mendian-.svg')" alt class="imgs" />
        <span class="titlerule" @click="$router.push('/poinits/pointsrule')">积分规则</span>
      </div>
      <div class="inside-title">
        <span>{{point}}</span>
      </div>
      <div class="inside-detail">
        <span @click="$router.push('/poinits/subsidiary')">积分明细</span>
        <span class="long">|</span>
        <span @click="$router.push('/poinits/changerecord')">兑换记录</span>
      </div>
    </div>
    <div class="points-content">
      <div class="center">
        <van-tabs v-model="active">
          <van-tab title="积分兑换">
            <Change></Change>
          </van-tab>
          <van-tab title="积分排行">
            <Ranking></Ranking>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Change from "./components/Change";
import Ranking from "./components/Ranking";
import { getUserScore } from "@/api/point";
export default {
  components: {
    Change,
    Ranking
  },
  data() {
    return {
      active: 0,
      page: {
        pageSize: 6,
        page: 1
      },
      list: [],
      point: 0
    };
  },
  methods: {
    //获取用户积分
    getUser() {
      getUserScore().then(res => {
         if(res){
             this.point = res;
         }else{
           this.point=0
         }
      });
    }
  },
  created() {},
  mounted() {
    this.getUser();
  }
};
</script>

<style lang='less'>
.points-container {  
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .points-header {
    width: 7.5rem;
    height: 2.8rem;
    background: url("../../../assets/svg/icon/backPicture.svg");
    .rule {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: right;
      padding-right: 0.3rem;
      .imgs {
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.12rem;
        line-height: 0.24rem;
        align-content: center;
        vertical-align: middle;
        line-height: 0;
      }
      .titlerule {
        width: 0.96rem;
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.24rem;
        vertical-align: middle;
      }
    }
    .inside-title {
      margin-top: -0.24rem;
      width: 100%;
      text-align: center;
      margin-bottom: 0.16rem;
      span {
        display: inline-block;
        color: #fff;
        font-weight: 500;
        width: 1.7rem;
        font-size: 0.72rem;
      }
    }
    .inside-detail {
      text-align: center;
      color: #fff;
      .long {
        color: #fff;
        margin: 0 0.3rem;
      }
    }
  }
  .points-content {
    z-index: 200;
    flex: 1;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.4rem 0.4rem 0rem 0rem !important;
    margin-top: -0.42rem;
    display: flex;
    flex-direction: column;
    .van-tab {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      background: none !important;
      position: relative;
      font-size: 0.28rem;
      color: #252a36;
      height: 0.94rem;
    }
    .center {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .van-hairline--top-bottom::after {
        border: 0;
      }
      .van-tabs__wrap {
        width: 100%;
        height: 1rem;
      }
      .van-tabs__nav {
        background: none !important;
      }
      .van-tabs__nav--line {
        width: 100%;
        .van-tab.van-tab--active.van-ellipsis {
          display: flex;
          justify-content: center;
        }
      }
      .van-tab--active {
        border: 0 !important;
        color: #252a36 !important;
        font-size: 0.28rem !important;
        font-weight: bold;
      }
      .van-tabs__line {
        background: #009fda !important;
        width: 0.56rem !important;
        height: 0.06rem !important;
      }
      .van-tabs--line .van-tabs__wrap {
        width: 7.5rem;
        height: 0.94rem !important;
        margin-bottom: 0.3rem;
      }
      .van-list__finished-text {
        width: 100%;
      }
    }
  }
  .van-tab__text{
    font-size: 0.32rem;
  }
  .van-tabs{
    height: 100%;
    .van-tabs__content{
    height: 100%;
     .van-tab__pane{
    height: 100%;
  }
  }
  }
}
</style>