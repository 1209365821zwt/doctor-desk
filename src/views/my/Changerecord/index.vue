<template>
  <div class="record-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
      v-if="noData==false"
    >
      <van-cell v-for="(item,index) in List" :key="index" class="record-item">
        <dl class="already">
          <dt>
            <div class="imgs">
              <img :src="item.giftImagePath" alt />
            </div>
            <div class="spans">
              <span class="title">{{item.exchangeGiftName}}</span>
              <span class="num">x{{item.exchangeNum}}</span>
              <span class="point">{{item.requiredIntegral}}积分</span>
            </div>
          </dt>
          <dd>
            <span
              class="time"
            >{{(item.exchangeState==1 ? item.timeOfApplicationForExchange : item.exchangeTime) | formatDate}}</span>
            <img
              :src="require(`@/assets/svg/icon/${item.exchangeState == 1 ? 'alredychange' :'nochange'}.svg`)"
              alt
              class="status"
            />
          </dd>
        </dl>
      </van-cell>
    </van-list>
    <div class="noData" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import { changeList } from "@/api/point";
import { formatDate } from "@/utils/date.js";
import NoData from "@/components/NoData";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      List: [],
      page: {
        pageSize: 6,
        pageNo: 0
      },
      noData: false
    };
  },
  filters: {
    //时间转换
    formatDate(time) {
      const date = new Date(+time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  components: {
    NoData
  },
  methods: {
        //我的关注获取数据
    onLoad() {
      changeList({
        pageNo: ++this.page.pageNo,
        pageSize: this.page.pageSize
      }).then(res => {
        console.log(res);
        this.loading = false;
        if (res && res.total === 0) {
          this.finished = true;
          this.noData = true;
        } else if (!res || !res.records || res.records.length === 0) {
          this.finished = true;
        } else {
          this.List.push(...res.records);
          this.total = res.total;
          if (this.List.length >= this.total) {
            this.finished = true;
          }
        }
      }).catch(()=>{
        this.finished = true;
        this.noData= true;
        this.$forceUpdate();
      });
    },
    //获取数据
  //   getList() {
  //     let params = {};
  //     params = {
  //       pageNo: ++this.page.page,
  //       pageSize: this.page.pageSize
  //     };
  //     changeList(params)
  //       .then(res => {
  //         console.log(res);
  //         if (!res || !res.records || res.records.length === 0) {
  //           this.noData = true;
  //           this.finished = true;
  //         } else {
  //           this.noData = false;
  //           this.List.push(...res.records);
  //         }
  //       })
  //       .catch(() => {
  //         this.noData = true;
  //         this.$forceUpdate();
  //       });
  //   }
  },
  created() {
  },
  mounted() {}
};
</script>

<style lang='less'>
.record-container {
  width: 100%;
  height: 100%;
  .noData {
    height: 100%;
  }
  .van-image {
    width: 100%;
  }
  .van-cell {
    padding: 0;
    
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0 0 0.4rem;
    .record-item {
      width: 100%;
      height: 100%;
      height: 1.62rem;
      border-bottom: 1PX solid #EEF0F4;
      .already {
        width: 100%;
        height: 100%;
        display: flex;
        dt {
          height: 100%;
          display: flex;
          .imgs {
            width: 1.24rem;
            height: 1.24rem;
            margin-right: 0.24rem;
            margin-top: 0.2rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .spans {
            .title {
              display: block;
              margin-top: 0.3rem;
              height: 0.28rem;
              font-size: 0.28rem;
              font-weight: 400;
              color: rgba(37, 42, 54, 1);
              line-height: 0.28rem;
              margin-bottom: 0.12rem;
            }
            .num {
              display: block;

              height: 0.24rem;
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(37, 42, 54, 0.5);
              line-height: 0.24rem;
              margin-bottom: 0.24rem;
            }
            .point {
              display: block;

              height: 0.24rem;
              font-size: 0.24rem;
              font-weight: 400;
              line-height: 0.24rem;
            }
          }
        }
        dd {
          flex: 1;
          text-align: right;
          position: relative;
          .time {
            display: block;
            margin-top: 0.32rem;
            padding-right: 0.3rem;
            color:rgba(37,42,54,0.5);
          }
          .status {
            width: 1.48rem;
            height: 0.8rem;
            position: absolute;
            bottom: 0;
            right: 0rem;
          }
        }
      }
    }
  }
}
</style>