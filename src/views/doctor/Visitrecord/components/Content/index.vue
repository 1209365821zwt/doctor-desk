<template>
  <div class="content-container">
    <div class="visiter-header">
      <div class="visiter-time">
        <span class="spans">拜访时间</span>
        <div class="select">
          <van-dropdown-menu class="time-menu">
            <van-dropdown-item v-model="value" :options="option" @change="handValueChange" />
          </van-dropdown-menu>
        </div>
      </div>
      <div class="representative">
        <span class="spans">拜访代表</span>
        <div class="select">
          <van-dropdown-menu class="time-menu">
            <van-dropdown-item v-model="valueRep" :options="options" @change="handChange" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>

    <div class="main-visiter" v-if="noData===false">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item,index) in List" :key="index" class="visiter-content">
          <div class="card">
            <div class="header">
              <span class="time">{{item.shareTime}}</span>
              <span class="name">{{item.drugUserName}}</span>
              <span class="status">
                <span v-if="item.shareType==2">微信</span>
                <span v-else-if="item.shareType==2">短信</span>
                <span v-else>邮件</span>
              </span>
            </div>
            <div class="center">
              <div class="headtitle">
                <span class="title">
                  标题：
                  <b class="inside">{{item.title}}</b>
                </span>
              </div>
              <div class="read-content">
                <span class="title">
                  阅读次数：
                  <b class="inside">{{item.readCount}}次</b>
                </span>
                <span class="title">
                  阅读时长：
                  <b class="inside">{{item.readTime}}分钟</b>
                </span>
                <span class="title">
                  是否有用：
                  <b class="inside">
                    <span v-if="item.useful==1">有用</span>
                    <span v-else-if="item.useful==0">没用</span>
                    <span v-else-if="item.useful==null">没有评论</span>
                  </b>
                </span>
                <span class="title">
                  是否转发：
                  <b class="inside">
                    <span v-if="item.forward==1">是</span>
                    <span v-else-if="item.forward==0">否</span>
                  </b>
                </span>
                <div class="title">
                  评论：
                  <span v-if="item.useful==null" class="remark">没有评论</span>
                  <div v-else-if="item.commentList.length>0" class="remark">
                   <span v-for="event in item.commentList" :key="event.contentId">
                    <i>{{event.commentTime}}</i>
                    <div>{{event.comment}}</div>
                  </span>
                  </div>
               
                </div>
              </div>
              <div v-if="item.questionnaire" class="answer">
                <span class="result">答题结果</span>

                <dl class="questionnaire">
                  <dt>
                    <span>{{item.questionnaire.questionnaireTitle}}</span>
                  </dt>
                  <dd>
                    <span>{{item.questionnaire.answerTime}}</span>
                    <b>回答{{item.questionnaire.answerNum}}题</b>
                  </dd>
                </dl>
              </div>
            </div>
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
import { getContentList, getRepList } from "@/api/doctorList";
import NoData from "@/components/NoData";
export default {
  components: {
    NoData
  },
  data() {
    return {
      value: 0,
      valueRep: null,
      loading: false,
      finished: false,
      noData: false,
      option: [
        { text: "全部", value: 0 },
        { text: "近一个月", value: 1 },
        { text: "近三个月", value: 2 }
      ],
      options: [{ text: "全部", value: null }],
      page: {
        page: 0,
        pageSize: 10
      },
      total: 0,
      List: [],
      drugUserId: null
    };
  },
  methods: {
    //数据加载，筛选分页数据
    onLoad() {
      let { customerCode } = this.$route.query;
      getContentList({
        page: ++this.page.page,
        pageSize: this.page.pageSize,
        customerCode: customerCode,
        drugUserId: this.drugUserId,
        timeType: this.value
      })
        .then(res => {
          this.loading = false;
          if (res && res.totalElements === 0) {
            this.finished = true;
            this.noData = true;
          } else if (
            res === null ||
            !res ||
            !res.content ||
            res.content.length === 0
          ) {
            this.finished = true;
            this.noData = true
          } else {
            this.noData = false;
            this.List.push(...res.content);
            this.total = res.totalElements;
            if (this.List.length >= this.total) {
              this.finished = true;
            }
          }
        })
        .catch(() => {
          this.finished = true;
          this.noData = true
          this.$forceUpdate();
        });
    },
    //添加拜访代表数据
    getList() {
      let { productId } = this.$route.query;
      getRepList(productId).then(res => {
        if (res) {
          res.forEach(item => {
            this.options.push({ value: item.id, text: item.name });
          });
        }
      });
    },
    //发生改变
    handChange(value) {
      this.drugUserId = value;
      this.page.page = 0;
      this.finished = false;
      this.List = [];
      this.noData = false;
      this.loading = true;
      this.onLoad();
    },
    handValueChange(value) {
      this.value = value;
      this.page.page = 0;
      this.finished = false;
      this.List = [];
      this.noData = false;
      this.loading = true;
      this.onLoad();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang='less'>
.content-container {
  height: 100%;
  .nodata {
    height:calc(100% - 1.5rem);
  }
  .visiter-header {
    height: 1rem;
    display: flex;
    padding: 0.34rem 0.4rem 0;
    .visiter-time {
      flex: 1;
      display: flex;
      .select {
        width: 2.08rem;
        text-align: center;
        margin-right: 0.4rem;
        span {
          height: auto;
        }
        .van-dropdown-menu {
          height: auto;
        }
        .time-menu {
          width: 100%;
          .van-dropdown-menu__title {
            width: 100%;
            text-align: left;
            padding: 0 0.24rem;
            border-radius: 0.08rem;
            border: 1PX solid rgba(37, 42, 54, 0.2);
            font-size: 0.28rem;
            height: 0.6rem;
            line-height: 0.6rem;
            &::after {
              top: 50%;
              right: 0.2rem;
            }
          }
        }
      }
      .spans {
        text-align: center;
        color: #252a36;
        font-size: 0.28rem;
        white-space: nowrap;
        line-height: 0.6rem;
        margin-right: 0.16rem;
      }
    }
    .representative {
      flex: 1;
      display: flex;
      .select {
        width: 1.52rem;
        text-align: center;
        span {
          height: auto;
        }
        .van-dropdown-menu {
          height: auto;
        }
        .time-menu {
          width: 100%;
          .van-dropdown-menu__title {
            width: 100%;
            text-align: left;
            padding: 0 0.24rem;
            border-radius: 0.08rem;
            border: 1PX solid rgba(37, 42, 54, 0.2);
            font-size: 0.28rem;
            height: 0.6rem;
            line-height: 0.6rem;
            &::after {
              top: 50%;
              right: 0.2rem;
            }
          }
        }
      }
      .spans {
        text-align: center;
        color: #252a36;
        font-size: 0.28rem;
        white-space: nowrap;
        line-height: 0.6rem;
        margin-right: 0.16rem;
      }
    }
  }
  .main-visiter {
    height: calc(100% - 1rem);
    flex: 1;
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    .visiter-content {
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 0.3rem;
      box-shadow: 0rem -0.04rem 0.16rem 0rem rgba(6, 22, 37, 0.21);
      .card {
        background: #fff;
        display: flex;
        flex-direction: column;
        // padding: 0.28rem;
        .header {
          display: flex;
          height: 0.4rem;
          line-height: 0.4rem;
          margin-bottom: 0.1rem;
          .time {
            margin-right: 0.24rem;
            font-size: 0.28rem;
            color:#252A36 ;
          }
          .name {
            margin-right: 0.2rem;
            font-size: 0.28rem;
            color:#252A36 ;
          }
          .status {
            height:0.36rem;
            border-radius:0.2rem;
            font-size: 0.24rem;
            color:rgba(0,159,218,1);
            padding: 0 0.16rem;
            line-height: 0.36rem;
            border-radius:0.2rem;
            box-sizing: content-box;
            border:1PX solid rgba(0,159,218,1);
          }
        }
        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          .headtitle {
            margin-bottom: 0.1rem;
            .title {
              color: #a0a0a0;
              font-size: 0.24rem;
              line-height: 0.28rem;
              line-height: 0.24rem;
              .inside {
                color: #252a36;
                font-size: 0.24rem;
                font-weight: normal;
              }
            }
          }
          .read-content {
            display: flex;
            flex-wrap: wrap;
            .title {
              width: 40%;
              color: #a0a0a0;
              font-size: 0.24rem;
              margin-right:0.6rem;
              margin-bottom: 0.2rem;
              .inside {
                color: #252a36;
                font-size: 0.24rem;
                font-weight: normal;
              }
              .remark{
                color: #252A36;
              }

            }
          }
          .answer {
            .result {
              display: block;
              color: #a0a0a0;
              margin-bottom: 0.28rem;
            }
            .questionnaire {
              width: 6.7rem;
              background: rgba(245, 248, 251, 1);
              border-radius: 0.12rem;
              margin-bottom: 0.4rem;
              padding-left: 0.24rem;
              dt {
                padding-top: 0.2rem;
                span {
                  display: block;
                  width: 2.16rem;
                  height: 0.24rem;
                  font-size: 0.24rem;
                  color: rgba(37, 42, 54, 1);
                  line-height: 0.24rem;
                }
              }
              dd {
                span {
                  display: inline-block;
                  margin-right: 0.32rem;
                  color:#A0A0A0;
                  font-size: 0.24rem;
                  padding:0.2rem 0;
                }
                b{
                  color: #252A36;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>