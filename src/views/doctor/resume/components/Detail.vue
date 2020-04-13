<template>
  <div class="container">
    <div class="wrapper">
      <div class="header">
        <div class="top">
          <div class="top-wrapper">
            <span class="name">{{doctorDetail.hcpName}}</span>
            <span class="aca-title">
              {{doctorDetail.academicTitle}}
              <span
                v-show="doctorDetail.academicTitle && doctorDetail.executeTitle"
              >/</span>
              {{doctorDetail.executeTitle}}
            </span>
            <span class="star">
              <img
                v-show="doctorDetail.followStat===0"
                src="./assets/star.svg"
                alt
                @click="focuStatus(doctorDetail.followStat,doctorDetail.naxionsHcpId)"
              />
              <img
                v-show="doctorDetail.followStat===1"
                src="./assets/lightstar.svg"
                alt
                @click="focuStatus(doctorDetail.followStat,doctorDetail.naxionsHcpId)"
              />
            </span>
          </div>
          <div
            class="right"
            v-if="auth.appWebAuthorityList.includes('doctorDetail')"
            @click="changeDetail"
          >医生信息</div>
        </div>
        <div class="middle">{{doctorDetail.hospitalName}} {{doctorDetail.department}}</div>
        <div class="sign">
          <div class="tag">
            <div class="tags">
              <div class="tag-blue" v-for="(event) in doctorDetail.hcpLabel" :key="event.labelName">
                <span>{{event.labelName}}</span>
              </div>
            </div>
            <div class="tags">
              <div
                class="tag-green"
                v-for="(item) in doctorDetail.saleName"
                :key="item.saleName"
              >{{item.roleName +' : '+ item.repName}}</div>
            </div>
          </div>
          <div class="shezhi" @click="set(doctorDetail.hcpLabel)">
            <div class="shezhi-img">
              <img src="./assets/shezhi.svg" alt />
            </div>设置
          </div>
        </div>
      </div>
      <div class="body">
        <ul class="content" v-show="show" @click="handShow">
          <div
            v-if="doctorDetail.description || (doctorDetail.academyList&&doctorDetail.academyList.length>0) || doctorDetail.specialty"
          >
            <li class="item" v-if="doctorDetail.specialty">
              <div class="radio">
                <img src="./assets/radio.svg" alt />
              </div>
              <div class="item-con" v-if="doctorDetail.specialty">
                <div class="title">专业擅长</div>
                <div class="item-content">{{doctorDetail.specialty}}</div>
              </div>
            </li>
            <li class="item" v-if="doctorDetail.academyList && doctorDetail.academyList.length>0">
              <div class="radio">
                <img src="./assets/radio.svg" alt />
              </div>
              <div class="item-con">
                <div class="title">学会任职</div>
                <div class="item-content">
                  <div
                    class="item-content-item"
                    v-for="(item,i) in doctorDetail.academyList"
                    :key="i"
                  >
                    <span>{{item.name}}</span>
                    <span>{{item.job}}</span>
                  </div>
                </div>
              </div>
            </li>
            <li class="item" v-if="doctorDetail.description">
              <div class="radio">
                <img src="./assets/radio.svg" alt />
              </div>
              <div class="item-con" v-if="doctorDetail.description">
                <div class="title">职业经历</div>
                <div class="item-content clear">{{doctorDetail.description}}</div>
              </div>
            </li>
          </div>
          <div class="noData" v-else>
            <NoData />
          </div>
        </ul>
        <div :class="show==false ? 'hide' : 'show'" @click="handShow">
          <p class="resume-doctor">{{show?'':'医生简历'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { followHcp } from "@/api/myFocus";
import { Toast } from "vant";
import NoData from "@/components/NoData";
export default {
  components: { NoData },
  props: {
    doctorDetail: {
      type: Object,
      default: () => {
        return {};
      }
    },
    hcpId: {
      type: Number
    },
    auth: {
      type: Object
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    set(hcpLabel) {
      console.log(this.doctorDetail);
      this.$router.push({
        name: "DoctorSign",
        query: {
          from: "DoctorResume",
          naxionsHcpId: this.doctorDetail.naxionsHcpId,
          hcpLabel
        }
      });
    },
    focuStatus(status, hcpId) {
      const { productId } = this.$route.query;
      if (status == 1) {
        this.doctorDetail.followStat = 0;
      } else {
        this.doctorDetail.followStat = 1;
      }
      followHcp(hcpId, productId).then(() => {
        if (this.doctorDetail.followStat === 1) {
          Toast("关注成功");
        } else {
          Toast("取消关注");
        }
      });
    },
    handShow() {
      this.show = !this.show;
    },
    // 修改医生信息
    changeDetail() {
      console.log(this.$route);
      const { customerCode, productId } = this.$route.query;
      this.$router.push({
        name: "AddDoctor",
        query: {
          customerCode,
          productId
        }
      });
    }
  },
  created() {}
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  padding: 0.2rem 0;
  background: url("./assets/back.svg") no-repeat;
  background-size: contain;
  .wrapper {
    width: 7.1rem;
    margin: 0 auto;
    padding-top: 0.4rem;
    .noData {
      padding: 0.4rem 0;
    }
    .header {
      padding-left: 0.4rem;
      background: url("./assets/top.svg") no-repeat;
      background-size: cover;
    }
    .item-content {
      line-height: 0.36rem;
      padding-top: 0.12rem;
      padding-bottom: 0.18rem;
      &.clear {
        padding-bottom: 0;
      }
    }
    .hide {
      height: 0.82rem;
      text-align: center;
      background-color: #ffffff;
      background-image: url("./assets/backgroundUp.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      &::after {
        content: " ";
        position: absolute;
        width: 0.2rem;
        height: 0.1rem;
        right: calc(50% - 0.1rem);
        background: url("./assets/up.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        bottom: 0.2rem;
      }
    }
     .resume-doctor{
        padding-top: 0.12rem;
      }
    .show {
      height: 0.82rem;
      text-align: center;
      background-color: #ffffff;
      background-image: url("./assets/backgroundUp.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
     
      &::after {
        content: " ";
        position: absolute;
        width: 0.2rem;
        height: 0.1rem;
        right: calc(50% - 0.1rem);
        background: url("./assets/down.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        bottom: 0.2rem;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding-top: 0.32rem;
      line-height:0.36rem;
      .top-wrapper {
        display: flex;
        line-height:0.36rem;
        align-items: flex-end;
      }
      .aca-title{
        line-height: 0.3rem;
      }
      .name {
        font-size: 0.36rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height:0.36rem;
        padding-right: 0.16rem;
      }
      .star {
        width: 0.52rem;
        line-height:0.36rem;
        display: inline-block;
        margin-left: 0.2rem;
      }
      .right {
        width: 1.6rem;
        height: 0.52rem;
        line-height: 0.52rem;
        text-indent: 0.36rem;
        color: #ffffff;
        background: linear-gradient(
          270deg,
          rgba(59, 203, 165, 1) 0%,
          rgba(0, 194, 162, 1) 100%
        );
        border-radius: 0.4rem 0 0 0.4rem;
      }
    }
    .middle {
      padding-top: 0.24rem;
      line-height: 0.28rem;
    }
    .sign {
      padding-top: 0.2rem;
      display: flex;
      padding-bottom: 0.24rem;
      align-items: center;
      justify-content: space-between;
      .tags {
        display: flex;
        flex-wrap: wrap;
      }
      .tag {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex: 1;
        .tag-blue {
          border-radius: 0.2rem;
          color: #009fda;
          background: #edf5ff;
          padding: 0.08rem 0.16rem;
          margin-right: 0.24rem;
          margin-bottom: 0.2rem;
        }
        .tag-green {
          border-radius: 0.2rem;
          color: #1ac9ac;
          background: #edfdfa;
          padding: 0.08rem 0.16rem;
        }
      }
      .shezhi {
        align-self: flex-start;
        background: rgba(246, 246, 246, 1);
        border-radius: 0.08rem;
        border: 1PX solid rgba(37, 42, 54, 0.2);
        display: flex;
        width: 1.2rem;
        align-items: center;
        padding: 0.12rem 0.14rem;
        margin-right: 0.16rem;
        .shezhi-img {
          width: 0.22rem;
          margin-right: 0.08rem;
        }
      }
    }
    .content {
      padding: 0.32rem 0.38rem 0;
      box-shadow: 0rem 0.08rem 0.12rem 0rem rgba(8, 172, 244, 0.15);
    }
    .item {
      display: flex;
      .radio {
        width: 0.28rem;
        margin-right: 0.12rem;
      }
      .item-con {
        flex: 1;
        .title {
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .item-con {
          padding-top: 0.12rem;
        }
      }
    }
  }
}
</style>

