<template>
  <div class="detail-container">
    <div class="headtitle">
      <div class="imgs">
        <img :src="detail.giftImagePath" alt />
      </div>
    </div>
    <div class="content">
      <div class="left">
        <span class="title">{{detail.giftName}}</span>
        <span class="num">可兑换{{detail.quantityOfExchange}}套</span>
      </div>

      <div class="right">
        <span class="points">{{detail.requiredIntegra}}积分</span>
      </div>
    </div>
    <div class="describe">
      <div class="header">
        <span class="icon"></span>
        <h4>礼品描述</h4>
      </div>
      <p>{{detail.giftDescribe}}</p>
    </div>
    <div class="footer">
      <van-cell is-link @click="showPopup" class="button">申请兑换</van-cell>
      <van-popup v-model="show" close-icon="close" position="bottom" :style="{ height: '30%' }">
        <div class="dialog">
          <span class="title">需支付</span>
          <span class="points">{{num*Number(detail.requiredIntegra) }}积分</span>
        </div>
        <div class="downDialog">
          <span class="num">数量</span>
          <div class="numButton">
            <van-stepper
              v-model="value"
              disable-input
              @plus="handadd"
              @minus="handDown"
              :max="detail.quantityOfExchange"
            />
          </div>
        </div>
        <div class="bottom" @click="handClick">确定</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { detailList, exchangeGift } from "@/api/point";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      value: 1,
      detail: {},
      num: 1
    };
  },
  methods: {
    //改变状态
    showPopup() {
      this.show = true;
    },
    //兑换成功
    handClick() {
      this.show = false;
      let id = this.$route.query.id;
      exchangeGift({
        id: +id,
        exchangeNum: Number(this.num)
      }).then(() => {
        Toast("兑换成功");
      });
    },
    //兑换数据详情
    init() {
      let id = this.$route.query.id;
      detailList(id)
        .then(res => {
          if (res) {
            this.detail = { ...res };
          }
        })
        .catch(() => {
          Toast("暂无数据");
        });
    },
    //数量增加
    handadd() {
      this.num = this.value + 1;
    },
    //数量减少
    handDown() {
      let values = this.value - 1;
      this.num = values;
    }
  },
  created() {
    this.init();
    console.log(process);
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
.detail-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  .headtitle {
    height: 4rem;
    margin: 0.2rem auto;
    .imgs {
      width: 4.18rem;
      height: 4rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    display: flex;
    padding: 0 0.4rem;
    margin-top: 0.2rem;
    margin-bottom: 0.6rem;
    .left {
      .title {
        display: block;
        width: 1.6rem;
        height: 0.32rem;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(37, 42, 54, 1);
        line-height: 0.32rem;
        margin-bottom: 0.24rem;
      }
      .num {
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(37, 42, 54, 0.5);
        line-height: 0.24rem;
      }
    }
    .right {
      flex: 1;
      text-align: right;
      .points {
        width: 1.08rem;
        height: 0.28rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(242, 66, 9, 1);
        line-height: 0.28rem;
      }
    }
  }
  .describe {
    .header {
      display: flex;
      padding-left: 0.4rem;
      margin-bottom: 0.24rem;
      span {
        width: 0.08rem;
        height: 0.32rem;
        background: rgba(0, 159, 218, 1);
        border-radius: 0.05rem;
        margin-right: 0.16rem;
      }
      h4 {
        width: 1.28rem;
        height: 0.32rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(37, 42, 54, 1);
        line-height: 0.32rem;
      }
    }
    p {
      padding-left: 0.6rem;
      width: 6.58rem;
      height: 2.52rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(37, 42, 54, 1);
      line-height: 0.36rem;
    }
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 0.8rem;
    padding-left: 0.56rem;
    .button {
      width: 6.4rem;
      height: 0.88rem;
      background: linear-gradient(to right, #08acf4, #009fda);
      i {
        display: none;
      }
    }
    .van-popup {
      height: 3.68rem !important;
    }
    .van-cell__value--alone {
      text-align: center;
      color: #fff;
    }
    .dialog {
      margin-left: 0.4rem;
      border-bottom: 0.04rem dotted #f0f0f0;
      margin-bottom: 0.38rem;
      .title {
        display: block;
        margin-top: 0.4rem;
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(37, 42, 54, 1);
        line-height: 0.24rem;
        margin-bottom: 0.2rem;
      }
      .points {
        display: block;
        height: 0.28rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(242, 66, 9, 1);
        line-height: 0.28rem;
        margin-bottom: 0.3rem;
      }
    }
    .downDialog {
      display: flex;
      padding-left: 0.4rem;
      .num {
        height: 0.28rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(37, 42, 54, 1);
        line-height: 0.28rem;
      }
      .numButton {
        flex: 1;
        margin-left: 60%;
      }
    }
    .bottom {
      width: 100%;
      height: 0.88rem;
      bottom: 0;
      position: absolute;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      color: #fff;
      background: linear-gradient(to right, #08acf4, #009fda);
    }
  }
}
</style>