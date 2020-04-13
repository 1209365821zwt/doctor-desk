<template>
  <div class="visiter-container">
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
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in List" :key="index" class="visiter-content">
          <div class="card">
            <div class="header">
              <span class="time">{{item.createTime}}</span>
              <span class="name">{{item.drugUserName}}</span>
              <span class="status">
                <span>{{item.statusName==='noanswer' ? '未接通' : '接通'}}</span>
              </span>
              <!-- <span class="play">
                <span>{{item.callTime}}</span>
                <img src="@/assets/svg/icon/bofang.svg" alt />
              </span>-->
            </div>
            <div class="center">
              <span class="title">
                拜访方式：
                <b class="inside">{{item.visitChannelStr}}</b>
              </span>
              <span class="title">
                医生态度：
                <b class="inside" v-show="item.attitude">{{item.attitude}}分</b>
                <b class="inside" v-show="item.attitude==null"></b>
              </span>
              <span class="title">
                拜访结果：
                <b class="inside" v-show="item.visitResultList">
                  <span v-for="event in item.visitResultList" :key="event">{{event}}</span>
                </b>
                <b class="inside" v-show="item.visitResultList.length==0">
                  <span>暂无结果</span>
                </b>
              </span>
              <span class="remark title">
                备注：
                <b class="inside" v-show="item.remark">{{item.remark}}</b>
                <b class="inside" v-show="item.remark==null">暂无备注</b>
              </span>
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
import { getVisitList, getRepList } from "@/api/doctorList";
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
      page: {
        page: 0,
        pageSize: 10
      },
      drugUserId: null,
      option: [
        { text: "全部", value: 0 },
        { text: "近一个月", value: 1 },
        { text: "近三个月", value: 2 }
      ],
      options: [
        {
          text: "全部",
          value: null
        }
      ],
      List: [],
      total: 0
    };
  },
  methods: {
    //数据加载，筛选分页数据
    onLoad() {
      let productId = Number(this.$route.query.productId);
      let { customerCode } = this.$route.query;
      console.log(this.$route.query, 111);
      getVisitList({
        page: ++this.page.page,
        pageSize: this.page.pageSize,
        productId,
        customerCode: customerCode,
        drugUserId: this.drugUserId,
        timeType: this.value
      })
        .then(res => {
          this.loading = false;
          console.log(res, 2222);
          if (res && res.totalElements === 0) {
            this.finished = true;
            this.noData = true;
          } else if (!res || !res.content || res.content.length === 0) {
            this.finished = true;
            this.noData = true;
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
          this.noData = true;
          this.$forceUpdate();
        });
    },
    //获取拜访代表数据
    getList() {
      let { productId } = this.$route.query;
      getRepList(productId).then(res => {
        res.forEach(item => {
          this.options.push({ value: item.id, text: item.name });
        });
      });
    },
    //改变
    handChange(value) {
      this.List = [];
      this.drugUserId = value;
      this.page.page = 0;
      this.finished = false;
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
.visiter-container {
  height: 100%;
  .nodata {
    height: calc(100% - 1.5rem);
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
          height: auto;
          .van-dropdown-menu__title {
            width: 100%;
            text-align: left;
            padding: 0 0.24rem;
            border-radius: 0.08rem;
            font-size: 0.28rem;
            height: 0.6rem;
            border: 1PX solid rgba(37, 42, 54, 0.2);
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
    flex: 1;
    height: calc(100% - 1.2rem);
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    .visiter-content {
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 0.3rem;
      box-shadow: 0rem -0.04rem 0.16rem 0rem rgba(6, 22, 37, 0.21);
      padding: 0.32rem 0.24rem 0.16rem;
      .card {
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;

        .header {
          // padding-top: 0.2rem;
          display: flex;
          height: 0.4rem;
          line-height: 0.4rem;
          margin-bottom: 0.28rem;
          .time {
            margin-right: 0.24rem;
            font-size: 0.28rem;
            color: #252a36;
          }
          .name {
            margin-right: 0.2rem;
            font-size: 0.28rem;
            color: #252a36;
          }
          .status {
            height: 0.36rem;
            border-radius: 0.2rem;
            border: 1PX solid rgba(0, 172, 127, 1);
            font-size: 0.24rem;
            line-height: 0.36rem;
            box-sizing: content-box;
            color: rgba(0, 172, 127, 1);
            padding: 0 0.16rem;
          }
        }
        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          .title {
            color: #a0a0a0;
            font-size: 0.24rem;
            margin-bottom: 0.28rem;
            line-height: 0.24rem;
            .inside {
              font-size: 0.24rem;
              color: #252a36;
              font-weight: normal;
            }
          }
          .remark {
            line-height: 0.4rem;
          }
        }
      }
    }
  }
  .van-dropdown-item__content {
    max-height: 40%;
  }
}
</style>