<template>
  <section class="online-content">
    <div class="flex-r-bc section-header">
      <div class="flex-r-cc">
        <div class="section-img">
          <img src="@/assets/svg/resume/online-visit.svg" alt />
        </div>
        <span class="section-title">线上拜访</span>
      </div>
      <div class="more-inf" @click="goPage('VisitRecord',doctorDetail.customerCode,0)">拜访记录</div>
    </div>
    <div class="card" v-if="doctorVisitInfo.callDate ">
      <div class="card-section">
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">代表姓名：</span>
            <span class="card-val">{{doctorVisitInfo.callDate.drugUserName}}</span>
          </p>
          <span class="card-time">{{doctorVisitInfo.callDate.dateStr}}</span>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">拜访方式：</span>
            <span class="card-val">{{doctorVisitInfo.callDate.visitChannelStr}}</span>
          </p>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">拜访目的：</span>
            <span class="card-val">{{doctorVisitInfo.callDate.purposeItem}}</span>
          </p>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">拜访结果：</span>
            <span class="card-val">
              <span v-for="(ele,i) in  doctorVisitInfo.callDate.visitResultList"  :key="i">{{ele}} </span>
             
            </span>
          </p>
        </div>
        <!-- <div class="flex-r-bc">
          <p class="card-item">
            <span>医生态度：</span>
            <span class="card-val">{{doctorVisitInfo.callDate.attitude}}分</span>
          </p>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span>备注：</span>
            <span class="card-val">{{doctorVisitInfo.callDate.remark}}</span>
          </p>
        </div>-->
      </div>
      <!-- <div
        class="card-button"
        v-for="(item,i) in doctorVisitInfo.callDate.visitResultList"
        :key="i"
      >
        <span class="left-btn">{{item}}</span>
      </div>-->
    </div>
    <div class="card" v-if="doctorVisitInfo.wxData">
      <div class="card-section">
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">代表姓名：</span>
            <span class="card-val">{{doctorVisitInfo.wxData.nickname}}</span>
          </p>
          <span class="card-time">{{doctorVisitInfo.wxData.dateStr}}</span>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">拜访方式：</span>
            <span class="card-val">微信拜访</span>
          </p>
        </div>
      </div>
      <div class="card-button visit">
        <span class="right-btn" @click="goPage('VisitRecord',doctorDetail.customerCode,2)">查看聊天记录</span>
      </div>
    </div>
    <div class="card" v-if="doctorVisitInfo.shareData">
      <div class="card-section">
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">代表姓名：</span>
            <span class="card-val">{{doctorVisitInfo.shareData.drugUserName}}</span>
          </p>
          <span class="card-time">{{doctorVisitInfo.shareData.dateStr}}</span>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">拜访方式：</span>
            <span class="card-val">内容分享</span>
          </p>
        </div>
        <div class="flex-r-bc">
          <p class="card-item">
            <span class="item-name">文章标题：</span>
            <span class="card-val">{{doctorVisitInfo.shareData.title}}</span>
          </p>
        </div>
      </div>
      <div class="card-button visit share">
        <div class="left-button">
          <div class="card-icon">
            <div class="eyes">
              <img src="@/assets/svg/resume/eyes.svg" alt />
            </div>
            {{doctorVisitInfo.shareData.readCount}}次
          </div>
          <div class="card-icon">
            <div class="time">
              <img src="@/assets/svg/resume/time.svg" alt />
            </div>
            {{doctorVisitInfo.shareData.readTime}}min
          </div>
        </div>
        <span class="right-btn" @click="goPage('VisitRecord',doctorDetail.customerCode,1)">查看记录</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    doctorDetail: {
      type: Object,
      default: () => {
        return {};
      }
    },
    productId: {
      type: Number,
      default: 1
    },
    doctorVisitInfo: {
      type: Object,
      default: () => {
        return {
          callDate: null,
          shareData: null,
          wxData: null,
          doctorConceptData: null
        };
      }
    }
  },
  methods: {
    goPage(name,customerCode,num) {
      console.log(name,customerCode,num)
      this.$router.push({
        name,
        query: { customerCode, productId: this.productId,num }
      });
    }
  },
  mounted() {
    console.log(this.doctorDetail, this.doctorVisitInfo);
  }
};
</script>

<style lang='less'>
.online-content {
  .card {
    .share {
      display: flex;
      align-items: center;
      justify-content: space-between !important;
      .left-button {
        display: flex;
        line-height: 1.5;
        .card-icon {
          display: flex;
          margin-right: 0.8rem;
        }
        .eyes {
          width: 0.38rem;
          margin-right: 0.14rem;
        }
        .time {
          width: 0.28rem;
          margin-right: 0.14rem;
        }
      }
    }
  }
}

//  .section .card .card-button.visit
</style>