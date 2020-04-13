<template>
  <div class="resume-container">
    <!-- <div class="resume-time">
      <span class="starttime">数据更新于2018-8-1</span>
      <span class="endtime">预计下次更新：2018-11-1</span>
    </div>-->
    <div class="resume-header">
      <div class="body">
        <Detail :doctorDetail="doctorDetail" :hcpId="hcpId" :auth="auth" />
      </div>
    </div>
    <div class="section">
      <section
        class="visit"
        v-if="auth.appWebAuthorityList&&auth.appWebAuthorityList.includes('myVisit')"
      >
        <div class="flex-r-bc section-header">
          <div class="flex-r-cc">
            <div class="section-img">
              <img src="@/assets/svg/resume/my-visit.svg" alt />
            </div>
            <span class="section-title">我的拜访</span>
          </div>
          <div class="more-inf" @click="goPage('MoreRecords')">更多记录</div>
        </div>
        <div
          class="visit-btn"
          @click="visitRegister('VisitRegister')"
          :class="doctorDetail.recruitStatus && 'isRecruit'"
        >拜访登记</div>
      </section>
      <Online
        :doctorDetail="doctorDetail"
        :doctorVisitInfo="doctorVisitInfo"
        :productId="productId"
      />
      <Idea
        :doctorConceptData="doctorVisitInfo.doctorConceptData"
        :doctorDetail="doctorDetail"
        :productId="productId"
      />
    </div>
  </div>
</template>

<script>
import Online from "./components/Online";
import Idea from "./components/Idea";
import Detail from "./components/Detail";
import { doctorDetail } from "@/api/doctorList";
import { getDoctorVisitInfo } from "@/api/doctorResume";
export default {
  name: "resume",
  components: { Online, Idea, Detail },
  data() {
    return {
      visible: false,
      hcpId: 1,
      auth: {},
      doctorList: [
        {
          title: "医生观念",
          value: "尝试使用森福罗"
        },
        {
          title: "是否主动提及森福罗：",
          value: "是"
        },
        {
          title: "目标患者量/月：",
          value: "小于5"
        },
        {
          title: "半年内是否处方：",
          value: "否"
        }
      ],
      doctorVisitInfo: {},
      list: [
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ]
        }
      ],
      doctorDetail: {},
      productId: 0
    };
  },
  created() {
    this.getDetail();
    this.doctorVisitInit();
    this.productId = Number(this.$route.query.productId);
    this.auth = JSON.parse(localStorage.getItem("auth"));

    // this.hcpId=Number(this.$route.query.hcpId)
  },
  methods: {
    clicl() {
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    goPage(name) {
      let { customerCode } = this.doctorDetail;
      let productId = Number(this.$route.query.productId);
      this.$router.push({
        name,
        query: {
          customerCode,
          productId
        }
      });
    },
    getDetail() {
      const { customerCode, naxionsHcpId, productId } = this.$route.query;
      doctorDetail(customerCode, {
        naxionsHcpId: naxionsHcpId,
        productId: productId
      }).then(res => {
        console.log(res);
        this.doctorDetail = res;
      });
    },
    // 获取整体信息
    doctorVisitInit() {
      const { customerCode, productId } = this.$route.query;
      getDoctorVisitInfo(customerCode, productId).then(res => {
        console.log(res, 111);
        this.doctorVisitInfo = res;
      });
    },

    // 跳转拜访登记页面
    visitRegister() {
      const { customerCode, productId } = this.$route.query;
      if (this.doctorDetail&&this.doctorDetail.recruitStatus === 0) {
        this.$router.push({
          name: "VisitRegister",
          query: {
            customerCode,
            productId
          }
        });
      }
    }
  }
};
</script>

<style lang="less" >
.resume-container {
  height: 100%;
  background: #f8f8f8;
  .body {
    background: #ffffff;
  }
  .resume-time {
    color: #a0a0a0;
    height: 0.4rem;
    background: #f8f8f8;
    .starttime {
      margin-left: 0.2rem;
    }
    .endtime {
      margin-left: 0.8rem;
    }
  }
  .section {
    // height: calc(100% - 4.2rem);
    background: #ffffff;
    padding: 0 0.2rem;
    padding-bottom: 0.36rem;
    .section-header {
      padding-top: 0.4rem;
      .section-title {
        font-size: 0.32rem;
        font-weight: bold;
        margin-left: 0.2rem;
      }
      .section-img {
        width: 0.4rem;
      }
      .more-inf {
        color: #a0a0a0;
        margin-right: 0.44rem;
        position: relative;
        &::after {
          content: " ";
          display: block;
          position: absolute;
          width: 0.12rem;
          height: 0.24rem;
          right: -0.24rem;
          background: url("../../../assets/svg/my/arrow.svg") no-repeat 100%
            100%;
          top: calc(50% - 0.12rem);
        }
      }
    }
    .card {
      box-shadow: 0 0 0.16rem 0 rgba(6, 22, 37, 0.21);
      margin-top: 0.24rem;
      border-radius: 0.08rem;
      .card-time {
        color: #009fda;
      }
      .card-section {
        padding: 0 0.2rem 0.2rem;
        border-bottom: 1PX solid #f5f5f5;
        .card-item {
          margin-top: 0.28rem;
          .item-name {
            width: 0.6rem;
            color: #a0a0a0;
          }
        }
      }
      .card-button {
        padding: 0.2rem;
        height: 0.88rem;

        &.visit {
          display: flex;
          justify-content: flex-end;
        }
        .left-btn {
          display: inline-block;
          border-radius: 0.08rem;
          line-height: 0.88rem;
          line-height: 1;
          padding: 0.1rem 0.18rem;
          border: 1PX solid rgba(255, 62, 0, 1);
          color: #ff3e00;
        }
        .right-btn {
          color: #ffffff;
          border-radius: 0.04rem;
          padding: 0 0.18rem;
          background: #009fda;
          height: 0.48rem;
          line-height: 0.48rem;
        }
      }
    }
    .visit {
      background: #ffffff;
      .visit-btn {
        height: 0.8rem;
        width: 6.3rem;
        background-image: linear-gradient(to bottom right, #08acf4, #009fda);
        border-radius: 0.08rem;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        line-height: 0.8rem;
        margin: 0.36rem auto 0;
        &.isRecruit {
          background: #ccc;
        }
      }
    }
  }
}
</style>>
