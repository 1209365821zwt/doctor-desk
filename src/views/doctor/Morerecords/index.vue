<template>
  <div class="records-container">
    <div class="records-wrapper" v-if="noData===false">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="main-visiter"
      >
        <van-cell v-for="(item,index) in List" :key="index" class="records-contant">
          <div class="card">
            <div class="time">{{item.createTime}}</div>
            <div class="contant">
              <span class="title">
                拜访目的：
                <b class="inside">
                  <span v-if="item.purpose==1">招募医生</span>
                </b>
              </span>
              <span class="title">
                拜访结果：
                <b class="inside">
                  <span v-for="event in resultList" :key="event.id">
                    <span v-show="item.resultId==event.id">{{event.text}}</span>
                  </span>
                </b>
              </span>
              <span class="title">
                是否有药：
                <b class="inside">
                  <span v-if="item.isHasDrug==1">有</span>
                  <span v-else-if="item.isHasDrug==0">无</span>
                  <span v-else-if="item.isHasDrug==-1">未知</span>
                  <span v-else-if="item.isHasDrug==2">临采</span>
                </b>
              </span>
              <span class="title">
                医生态度：
                <b class="inside">{{item.attitude}}分</b>
              </span>
            </div>
             <div class="nextVisit">
              <span class="title">
                下次拜访时间:
                <b class="inside">{{item.nextVisitTime || '无'}}</b>
              </span>
          </div>
            <span class="remark">
              备注：
              <b class="inside">{{item.remark  || '无'}}</b>
            </span>
          </div>
         
        </van-cell>
      </van-list>
    </div>
    <div class="nodata" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import { getVisitList } from "@/api/recruit";
import NoData from "@/components/NoData";

export default {
  components: {
    NoData
  },
  data() {
    return {
      List: [],
      page: {
        page: 1,
        pageSize: 5
      },
      resultList: [
        {
          id: 1,
          text: "非联系人"
        },
        {
          id: 2,
          text: "非目标医生"
        },
        {
          id: 3,
          text: "退出项目"
        },
        {
          id: 4,
          text: "稍后致电"
        },
        {
          id: 5,
          text: "医生拒绝"
        },
        {
          id: 6,
          text: "招募成功"
        },
        {
          id: 12,
          text: "信息验证成功"
        },
        {
          id: null,
          text: "未知"
        }
      ],
      total: 0,
      loading: false,
      finished: false,
      noData: false
    };
  },
  methods: {
    onLoad() {
      let { customerCode, productId } = this.$route.query;
      getVisitList({
        page: ++this.page.page,
        pageSize: this.page.pageSize,
        customerCode,
        productId
      }).then(res => {
        console.log(res);
        this.loading = false;
        if (res && res.totalElements === 0) {
          this.finished = true;
          this.noData = true;
        } else if (!res || !res.content || res.content.length === 0) {
          this.finished = true;
        } else {
          this.List.push(...res.content);
          this.total = res.totalElements;
          if (this.List.length >= this.total) {
            this.finished = true;
          }
        }
      }).catch(()=>{
        this.finished= true;
      });
    }
  },
  created() {}
};
</script>

<style lang='less' scoped>
.records-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .records-header {
    width: 100%;
    height: 1.28rem;
    background: rgb(255, 255, 255, 1);
    border-bottom: 1PX solid #eee;
  }
  .records-wrapper {
    margin-top: 0.16rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
    .records-contant {
      width: 7.2rem;
      margin: auto;
      margin-bottom: 0.3rem;
      box-shadow: 0 0 0.16rem 0 rgba(6, 22, 37, 0.21);
      .card {
        width: 100%;
        height: 100%;
        padding: 0.08rem;
        .time {
          height: 0.25rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(37, 42, 54, 1);
          line-height: 0.25rem;
        }
        .contant {
          margin-top: 0.28rem;
          display: flex;
          flex-wrap: wrap;
          .title {
            width: 45%;
            margin-bottom: 0.2rem;
            font-size: 0.24rem;
            color: #a0a0a0;
            .inside {
              color: #252a36;
              font-size: 0.24rem;
              font-weight: normal;
            }
          }
        }
        .nextVisit{
          .title{
            font-size: 0.24rem;
            color: #a0a0a0;
          }
            .inside {
              color: #252a36;
              font-size: 0.24rem;
              font-weight: normal;
            }
        }
        .remark {
          display: inline-block;
          font-size: 0.24rem;
          color: #a0a0a0;
          margin-top: 0.2rem;
          .inside {
            color: #252a36;
            font-size: 0.24rem;
            font-weight: normal;
          }
        }
      }
    }
  }
  .nodata {
    height: 100%;
  }
}
</style>