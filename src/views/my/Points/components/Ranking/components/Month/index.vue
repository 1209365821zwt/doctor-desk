<template>
  <div class="month-container">
    <div class="photo-header" v-if="excellentList.length">
      <dl v-for="(item,index) in excellentList" :key="index" class="overhidden">
        <div v-if="index===1" class="second">
          <dt>
            <div class="firstname">
              <span v-if="excellentList[1].userName==null">{{"".trim().substr(-2,2)}}</span>
              <span v-else>{{excellentList[1].userName.trim().substr(-2,2)}}</span>
            </div>
            <!-- <img src alt class="imgs" /> -->
            <span>
              <img :src="require('@/assets/svg/icon/second.svg')" alt class="imgsecond" />
            </span>
          </dt>
          <dd>
            <span class="name">{{excellentList[1].userName}}</span>
            <span class="points">积分值：{{excellentList[1].score}}</span>
          </dd>
        </div>
        <div v-if="index===0" class="first">
          <dt>
            <div class="firstname">
              <span v-if="excellentList[0].userName==null">{{"".trim().substr(-2,2)}}</span>
              <span v-else>{{excellentList[0].userName.trim().substr(-2,2)}}</span>
            </div>
            <!-- <img :src="item.img" alt class="imgs" /> -->
            <span>
              <img :src="require('@/assets/svg/icon/first.svg')" alt class="imgfirst" />
            </span>
          </dt>
          <dd>
            <span class="name">{{excellentList[0].userName}}</span>
            <span class="points">积分值：{{excellentList[0].score}}</span>
          </dd>
        </div>
        <div v-if="index===2" class="three">
          <dt>
            <div class="firstname">
              <span v-if="excellentList[2].userName==null">{{"".trim().substr(-2,2)}}</span>
              <span v-else>{{excellentList[2].userName.trim().substr(-2,2)}}</span>
            </div>
            <!-- <img :src="item.img" alt class="imgs" /> -->
            <span>
              <img :src="require('@/assets/svg/icon/three.svg')" alt class="imgthree" />
            </span>
          </dt>
          <dd>
            <span class="name">{{excellentList[2].userName}}</span>
            <span class="points">积分值：{{excellentList[2].score}}</span>
          </dd>
        </div>
      </dl>
    </div>
    <van-list
      v-if="show"
      v-model="loading"
      :finished="finished"
      finished-text="到底了~"
      @load="onLoad"
      class="list-content"
    >
      <van-cell v-for="(item,i) in List" :key="i" :class="{'border' : i==List.length-1}">
        <div class="lists">
          <span class="number">{{i+4}}</span>
          <div class="listPhoto">
            <div class="firstname">
              <span v-if="item.userName==null">{{"".trim().substr(-2,2)}}</span>
              <span v-else>{{item.userName.trim().substr(-2,2)}}</span>
            </div>
            <!-- <img src alt /> -->
          </div>
          <span class="name">{{item.userName}}</span>
          <h4 class="points">{{item.score}}</h4>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { ranking } from "@/api/point";

export default {
  data() {
    return {
      excellentList: [],
      finished: false,
      loading: false,
      List: [],
      page: {
        pageNo: 0,
        pageSize: 6
      },
      show: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    //月榜排行,加载数据
    onLoad() {
      ranking(1, {
        pageNo: ++this.page.pageNo,
        pageSize: this.page.pageSize
      })
        .then(res => {
          this.loading = false;
          if (!res || !res.records || res.records.length === 0) {
            this.finished = true;
          } else {
            if (this.List.length === 0 || this.List === []) {
              this.excellentList = res.records.slice(0, 3);
              this.List = res.records.slice(3);
              this.finished = true;
            } else {
              this.List.push(...res.records);
              if (this.List.length >= res.total) {
                this.finished = true;
              }
            }
          }
        })
        .catch(() => {
          this.finished = true;
          this.$forceUpdate();
        });
    },
    init() {
      ranking(1, {
        pageNo: 1,
        pageSize: this.page.pageSize
      })
        .then(res => {
          if (res.current == 1 && res && res.total) {
            if (res.total <= 3) {
              this.excellentList = res.records.slice(0, res.total);
              this.List = [];
            } else {
              this.show = true;
              this.finished = false;
              this.page.pageNo = 0;
            }
          }
        })
        .catch(() => {
          this.finished = false;
          this.show = true;
        });
    }
  }
};
</script>

<style lang='less'>
.month-container {
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  .photo-header {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    position: relative;
    dl {
      .second {
      position: absolute;
      height: 3rem;
      left: 0.6rem;
        dt {
          margin-top: 0.65rem;
          position: relative;
          .firstname {
            margin: 0.2rem auto;
            font-weight: bold;
            width: 1.52rem;
            height: 1.52rem;
            border-radius: 50%;
            font-size: 0.32rem;
            line-height: 1.52rem;
            color: #009fda;
            text-align: center;
            border: 1PX solid #e6e9ef;
          }
          .imgsecond {
            width: 0.6rem;
            height: 0.62rem;
            position: absolute;
            left: 1rem;
            top: -0.3rem;
          }
        }
        dd {
          width: 2rem;
          .name {
            display: block;
            font-size: 0.28rem;
            color: #252a36;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
          }
          .points {
            width: 100%;
            display: inline-block;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;          }
        }
      }
    }
    dl{
     .first {
       position: absolute;
      height: 3rem;
      left: 50%;
      margin-left: -0.9rem;
        dt {
          margin-top: 0.45rem;
          position: relative;
          .firstname {
            margin: 0.2rem auto;
            width: 1.72rem;
            height: 1.72rem;
            border-radius: 50%;
            font-size: 0.42rem;
            line-height: 1.72rem;
            color: #009fda;
            text-align: center;
            border: 1PX solid #e6e9ef;
            font-weight: bold;
          }
          .imgfirst {
            width: 0.6rem;
            height: 0.62rem;
            position: absolute;
            left: 1.1rem;
            top: -0.3rem;
          }
        }
        dd {
          width: 2rem;
          .name {
            display: block;
            font-size: 0.28rem;
            color: #252a36;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
          }
          .points {
            width: 100%;
            display: inline-block;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
        }
      }
    }
    dl{
     .three {
      position: absolute;
      height: 3rem;
      right: 0.6rem;
        dt {
          margin-top: 0.9rem;
          position: relative;
          .firstname {
            margin: 0.2rem auto;
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 50%;
            font-size: 0.28rem;
            line-height: 1.24rem;
            color: #009fda;
            text-align: center;
            border: 1PX solid #e6e9ef;
            font-weight: bold;
          }
          .imgthree {
            width: 0.6rem;
            height: 0.62rem;
            position: absolute;
            left: 0.8rem;
            top: -0.3rem;
          }
        }
        dd {
          width: 1.6rem;
          .name {
            display: block;
            font-size: 0.28rem;
            color: #252a36;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
          }
          .points {
            width: 100%;
            display: inline-block;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
        }
      }
    }
  }
  .list-content {
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    overflow-y: auto;
    &.van-list {
      .van-cell.border {
        &::after {
          border: 0;
        }
      }
      .border {
        border: 0;
      }
    }
    .van-list__finished-text {
      font-size: 0.2rem;
      margin-top: -0.3rem;
    }
    .lists {
      width: 100%;
      height: 1.4rem;
      position: relative;
      display: flex;
      .number {
        width: 1.2rem;
        height: 0.28rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(37, 42, 54, 1);
        line-height: 1.5rem;
        text-align: center;
      }
      .listPhoto {
        margin-right: 0.4rem;
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
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        display: block;
        line-height: 1.5rem;
      }
      .points {
        display: block;
        // margin-left: 50%;
        line-height: 1.5rem;
        position: absolute;
        right: 0.5rem;
      }
    }
  }
  .overhidden {
    max-width: 29%;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  :root {
    .van-list__finished-text {
      font-size: 0.2rem;
    }
  }
}
</style>