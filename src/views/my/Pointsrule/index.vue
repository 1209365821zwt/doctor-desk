<template>
  <div class="pointsrule-container">
    <div class="headtitle">
      <span class="title">招募积分</span>
      <i></i>
    </div>
    <div class="recruit">
      <h4>按招募时间</h4>
      <ol class="lists">
        <li>
          <span>1.</span>招募期第1-2周：成功招募一个医生获得10积分;
        </li>
        <li>
          <span>2.</span>招募期第3-4周：成功招募一个医生获得9积分;
        </li>
        <li>
          <span>3.</span>招募期第5-6周：成功招募一个医生获得8积分;
        </li>
        <li>
          <span>4.</span>招募期第7-8周：成功招募一个医生获得7积分;
        </li>
        <li>
          <span>5.</span>招募期第8周以后：成功招募一个医生获得6积分;
        </li>
      </ol>
    </div>
    <div class="hoslevel">
      <h4>按招募医生所在医院级别</h4>
      <p>
        招募的医生为三级医院医生，获得10积分；<br/>
        招募的医生为二级医院医生，获得8积分；<br/>
        招募的医生为一级医院医生，获得5积分；<br/>
        招募的医生为其他级别医院医生，获得3积分。
      </p>
    </div>
    <div class="hoslevel">
      <h4>按招募医生职称</h4>
      <p>
        招募的医生职称为主任医师获得10积分；<br/>
        招募的医生职称为副主任医师获得9积分；<br/>
        招募的医生职称为主治医师获得6积分；<br/>
        招募的医生职称为住院医师获得4积分；<br/>
        招募的医生职称为其他职称获得3积分。
      </p>
    </div>
    <div class="content">
      <div class="contenttitle">
        <span class="title">使用积分</span>
        <i></i>
      </div>
      <ol class="lists">
        <li>
          <span>1.</span>
          <div>
            打开HCP360一次并停留超过1分钟获得1积分，当
            日最多可获得10积分;
          </div>
        </li>
        <li>
          <span>2.</span>
          <div>通过HCP360新增一个医生信息获得5积分;</div>
        </li>
        <li>
          <span>3.</span>
          <div>在HCP360上进行一次拜访登记获得5积分;</div>
        </li>
        <!-- <li>
          <span>4.</span>
          <div>查看一次线上代表的拜访记录或医生观念获得1积分，当日最多可获得10积分。</div>
        </li> -->
      </ol>
    </div>

    <div class="center">
      <div class="contenttitle">
        <span class="title">积分兑换</span>
        <i></i>
      </div>
      <ol class="lists">
        <li>
          <span>1.</span>  通过招募医生和使用HCP360获得的总积分可以兑换奖励。
        </li>
        <li>
          <span>2.</span> 在兑换详情页点击“申请兑换”按钮提交申请，优甲乐产品组线下进行奖励兑换。
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.pointsrule-container {
  width: 100%;
  height: 100%;
  padding: 0 0.4rem;
  display: flex;
  flex-direction: column;
  .headtitle {
    margin-top: 0.6rem;
    position: relative;
    margin-bottom: 0.3rem;
    .title {
      display: inline-block;
      height: 0.32rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(37, 42, 54, 1);
      line-height: 0.32rem;
      position: absolute;
      bottom: 0.08rem;
    }
    i {
      display: block;
      width: 1.72rem;
      height: 0.24rem;
      background: linear-gradient(
        90deg,
        rgba(242, 66, 9, 0.2) 0%,
        rgba(255, 255, 255, 0.5) 100%
      );
    }
  }
  .recruit {
    margin-bottom: 0.54rem;
    h4 {
      height: 0.28rem;
      font-size: 0.28rem;
      font-weight: 600;
      color: rgba(37, 42, 54, 1);
      line-height: 0.28rem;
      margin-bottom: 0.18rem;
    }
  }
  .hoslevel {
    margin-bottom: 0.54rem;
    h4 {
      height: 0.28rem;
      font-size: 0.28rem;
      font-weight: 600;
      color: rgba(37, 42, 54, 1);
      line-height: 0.28rem;
      margin-bottom: 0.18rem;
    }
    p {
      // height: 1.2rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(37, 42, 54, 1);
      line-height: 0.4rem;
    }
  }
  .contenttitle {
    position: relative;
    margin-bottom: 0.3rem;
    .title {
      display: inline-block;
      height: 0.32rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(37, 42, 54, 1);
      line-height: 0.32rem;
      position: absolute;
      bottom: 0.08rem;
    }
    i {
      display: block;
      width: 1.72rem;
      height: 0.24rem;
      background: linear-gradient(
        90deg,
        rgba(242, 66, 9, 0.2) 0%,
        rgba(255, 255, 255, 0.5) 100%
      );
    }
  }
  .lists {
    width: 100%;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(37, 42, 54, 1);
    li {
      line-height: 0.4rem;
      display: flex;
    }
  }
  .content {
    margin-bottom: 0.54rem;
  }
  .center {
     margin-bottom: 0.54rem;
    .lists {
      width: 100%;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(37, 42, 54, 1);
      li {
        line-height: 0.4rem;
      }
    }
  }
}
</style>