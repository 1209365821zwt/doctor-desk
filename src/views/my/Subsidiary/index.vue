<template>
  <div class="subsidiary-containers">
    <van-list
      v-model="loading"
      @load="onLoad"
      :finished="finished"
      class="list"
      v-if="noData==false"
      finished-text="没有更多了"
    >
      <van-cell v-for="(item,index) in List" :key="index" class="dls">
        <dl>
          <dt>
            <div class="name">
              <span >{{item.typeName}}</span>
            </div>
            <span class="time">{{item.updateTime }}</span>
          </dt>
          <dd>
            <div class="point">
              <span v-if="item.type==0">+{{item.variableIntegral}}积分</span>
              <span v-else-if="item.type==1" class="del">-{{item.variableIntegral}}积分</span>
            </div>
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
import { getIntegralRecord } from "@/api/point";
import { formatDate } from "@/utils/date";
import NoData from "@/components/NoData";
export default {
  components: {
    NoData
  },
  
  data() {
    return {
      List: [],
      page: {
        pageSize: 5,
        page: 0
      },
      noData: false,
      finished: false,
      loading: false
    };
  },
  methods: {
    getList() {
      getIntegralRecord({
        pageNo: ++this.page.page,
        pageSize: this.page.pageSize
      }).then(res => {
        console.log(res);
        if (!res || !res.records || !res.records.length) {
          this.noData = true;
        } else {
          this.noData = false;
          this.List = res.records;
          res.records.forEach(item => {
            item.updateTime = formatDate(
              new Date(+item.updateTime),
              "yyyy-MM-dd"
            );
          });
        }
      });
    },
    //加载数据
    onLoad() {
      if (this.loading) {
        getIntegralRecord({
          pageNo: ++this.page.page,
          pageSize: this.page.pageSize
        })
          .then(res => {
            this.loading = false;
            if (!res.records || res.records.length == 0) {
              this.finished = true;
              this.noData = true;
            } else {
              this.noData=false
              this.List.push(...res.records);
              res.records.forEach(item => {
                item.updateTime = formatDate(
                  new Date(+item.updateTime),
                  "yyyy-MM-dd"
                );
              });
              this.total = res.total;
              if (this.List.length >= this.total) {
                this.finished = true;
              }
            }
          })
          .catch(() => {
            this.finished = true;
            this.noData=true
            this.$forceUpdate();
          });
      }
    },
    init() {
      this.List.forEach(item => {
        item.updateTime = formatDate(new Date(item.updateTime), "yyyy-MM-dd");
        console.log(item.updateTime);
      });
    }
  },
  created() {
    // this.getList();
    // this.init()
  },
  mounted() {}
};
</script>

<style lang='less'>
.subsidiary-containers {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .noData {
    height: 100%;
  }
  .list {
    width: 100%;
    // padding: 0 0.4rem;
    .van-cell:not(:last-child)::after {
      border: 0;
    }

    .van-cell {
      width: 100%;
      padding: 0;
      padding-left:0.4rem;
      height: 1.4rem;
      dl {
        height: 100%;
        display: flex;
        border-bottom: 1PX solid #EEF0F4;
        align-items: center ;
      }
      dt {

        .name {
          display: block;
          height: 0.28rem;
          font-size: 0.28rem;
          font-weight: normal;
          color: rgba(37, 42, 54, 1);
          line-height: 0.28rem;
          margin-bottom: 0.24rem;
        }
        .time {
          display: block;
          height: 0.24rem;
          font-size: 0.24rem;
          font-weight: normal;
          color: rgba(37, 42, 54, 0.5);
          line-height: 0.24rem;
        }
      }
      dd {
        height: 100%;
        line-height: 1.4rem;
        text-align: right;
        flex: 1;
        padding-right: 0.4rem;
        .point {
          display: inline-block;
          line-height: 1.4rem;
          height: 0.32rem;
          font-size: 0.32rem;
          font-weight: normal;
          color: rgba(14, 180, 138, 1);
          .del{
           color: #F24209; 
          }
        }
      }
    }
  }
}
</style>