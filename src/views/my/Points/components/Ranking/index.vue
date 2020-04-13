<template>
  <div class="ranking-container">
    <div class="caption">
      <span class="week" @click="handweek" :class="{'active':ind===0 }">周榜</span>
      <span class="month" @click="handmonth" :class="{'action' :ind===1}">总榜</span>
    </div>
    <div class="content" v-if="noData===false">
      <div class="ranking-center">
        <Week v-if="ind===0"></Week>
        <Month v-if="ind===1"></Month>
      </div>
      <div class="ranking-footer">
        <div class="footer-wrapper" v-if="ind===0">
          <div class="footer-left">
            <div class="row">
              <span>{{selfRank.rowNo}}</span>
            </div>
            <div class="imgs">
              <div class="firstname">
                <span v-if="selfRank.userName==null">{{"".trim().substr(-2,2)}}</span>
                <span v-else>{{selfRank.userName.substr(-2,2)}}</span>
              </div>
              <!-- <img src alt /> -->
            </div>
            <b class="userName">{{selfRank.userName}}(自己)</b>
          </div>

          <h4 class="score">{{selfRank.score}}</h4>
        </div>
        <div class="footer-wrapper" v-else-if="ind===1">
          <div class="footer-left">
            <div class="row">
              <span>{{selfRank.rowNo}}</span>
            </div>
            <div class="imgs">
              <!-- <img src alt /> -->
              <div class="firstname">
                <span v-if="selfRank.userName==null">{{"".trim().substr(-2,2)}}</span>
                <span v-else>{{selfRank.userName.substr(-2,2)}}</span>
              </div>
            </div>
            <b class="userName">{{selfRank.userName}}(自己)</b>
          </div>

          <h4 class="score">{{selfRank.score}}</h4>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import Week from "./components/Week";
import Month from "./components/Month";
import { rankingNo } from "@/api/point";
import NoData from "@/components/NoData";
export default {
  components: {
    Week,
    Month,
    NoData
  },
  data() {
    return {
      ind: 0,
      page: {
        pageNo: 1,
        pageSize: 6
      },
      excellentList: [],
      List: [],
      selfRank: {},
      MonthList: [],
      MonthExcellentList: [],
      weekstate: 0,
      monthstate: 1,
      noData: false
    };
  },
  methods: {
    handweek() {
      this.ind = 0;
      this.ranking();
    },
    handmonth() {
      this.ind = 1;
      this.ranking();
    },
    //代表自己的排名
    ranking() {
      rankingNo(this.ind)
        .then(res => {
          if(!res || !res.rowNo){
             this.noData = true;
          }else if(res && res.rowNo == -1){
            this.noData = true;
          } else  {
            this.noData = false;
            this.selfRank = res;
          }
        })
        .catch(() => {
          this.noData = true;
          this.$forceUpdate();
        });
    },
  },
  mounted() {
    this.ranking();
  },
  created(){
  }
};
</script>

<style lang='less' scoped>
.ranking-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
    .noData {
    height: calc(100% - 3rem);
  }
  .caption {
    width: 2.34rem;
    height: 0.6rem;
    border-radius: 0.32rem;
    border: 1PX solid rgba(242, 66, 9, 1);
    margin-left: 0.52rem;
    margin-bottom: 0.1rem;
    box-sizing: content-box;
    .week {
      display: inline-block;
      width: 1.17rem;
      font-size: 0.28rem;
      font-weight: 400;
      line-height: 0.6rem;
      text-align: center;
      color: #f24209;
      &.active {
        display: inline-block;
        height: 0.6rem;
        background: rgba(242, 66, 9, 1);
        border-radius: 0.3rem 0rem 0rem 0.3rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1) !important;
        line-height: 0.6rem;
        text-align: center;
      }
    }
    .month {
      display: inline-block;
      width: 1.17rem;
      font-size: 0.28rem;
      font-weight: 400;
      line-height: 0.6rem;
      text-align: center;
      color: #f24209;
      &.action {
        display: inline-block;
        height: 0.6rem;
        background: rgba(242, 66, 9, 1);
        border-radius: 0rem 0.3rem 0.3rem 0rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1) !important;
        line-height: 0.6rem;
        text-align: center;
      }
    }
  }
  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .ranking-center {
      flex: 1;
      width: 100%;
      position: scroll;
    }
    .ranking-footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      background: #ffffff;
      box-shadow: 0rem -0.04rem 0.16rem 0rem rgba(6, 22, 37, 0.21);
      padding-right: 0.46rem;
      .footer-wrapper {
        height: 100%;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        margin-left: 0.3rem;
        line-height: 1.28rem;
        justify-content: space-between;
        .footer-left {
          display: flex;
          align-items: center;
        }
        .row {
          width: 0.66rem;
          height: 0.44rem;
          background: rgba(237, 245, 255, 1);
          border-radius: 0.22rem;
          text-align: center;
          line-height: 0.44rem;
          margin-right: 0.36rem;
          span {
            width: 0.34rem;
            font-size: 0.28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(0, 159, 218, 1);
            line-height: 0.28rem;
          }
        }
        .imgs {
          margin-right: 0.34rem;
          .firstname {
            margin: 0.3rem auto;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            font-size: 0.2rem;
            line-height: 0.8rem;
            color: #009fda;
            text-align: center;
            border: 1PX solid #e6e9ef;
            font-weight: bold;
          }
        }
        .userName {
          width: 1.96rem;
          font-size: 0.28rem;
          font-weight: normal;
          color: rgba(37, 42, 54, 1);
        }
      }
    }
  }
  
 
 
}
</style>