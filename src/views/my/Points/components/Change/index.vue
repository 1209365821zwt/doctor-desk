<template>
  <div class="change-container">
    <div class="center">
      <van-list v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了" v-if="noData===false">
        <van-cell v-for="(item,index) in list" :key="index" class="content">
          <dl @click="handclick(item.id)">
            <dt>
              <img :src="item.giftImagePath" alt />
            </dt>
            <dd>
              <span class="title">{{item.giftName}}</span>
              <span class="num">
                <span class="points">{{item.requiredIntegra}}</span>积分
              </span>
            </dd>
          </dl>
        </van-cell>
      </van-list>
         <div class="noData" v-else>
      <NoData></NoData>
    </div>
    </div>
 
  </div>
</template>

<script>
import { pageList } from "@/api/point";
import NoData from '@/components/NoData'
export default {
  components:{
    NoData
  },
  data() {
    return {
      list: [],
      finished: false,
      error: false,
      loading: false,
      refreshing: false,
      noData:false,
      page: {
        pageNo: 0,
        pageSize: 4
      },
      total: 0
    };
  },
  methods: {
    //跳转详情页面
    handclick(id) {
      this.$router.push({
        path: "/poinits/detail",
        query: { id: id }
      });
    },
    //加载数据
    onLoad() {
      if (this.loading) {
        pageList({
          pageNo: ++this.page.pageNo,
          pageSize: this.page.pageSize
        }).then(res => {
          this.loading = false;
          if (!res.records || res.records.length == 0) {
            this.finished = true;
            this.noData=true;
          } else {
            this.noData=false;
            this.list.push(...res.records);
            this.total = res.total;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          }
        }).catch(()=>{
        this.finished = true;
        this.noData=true
        this.$forceUpdate()
      });
      }
    },
  },
  created() {
  },
  mounted() {}
};
</script>

<style lang='less'>
.change-container {
  width: 100%;
  height: 100%;
  .points-content{
    width: 100%;
    height: 100%;
   .noData{
    height: calc(100% - 1rem) ;
  }
  }
  .center {
    width: 100%;
    height: 100%;
    .van-list__loading {
      margin: 0 auto;
    }
    .van-list {
      padding: 0.1rem 0.6rem 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .van-list__finished-text {
      margin: 0 auto;
    }
    .van-cell {
      width: 3rem;
      height: 3.16rem;
      background: rgba(255, 255, 255, 1);
      box-shadow:0rem 0rem 0.16rem 0rem rgba(0,0,0,0.08);
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      padding: 0;
      dl {
        line-height: 1.5;
        dt {
          width: 2.12rem;
          height: 2.12rem;
          margin: 0 auto;
          img {
            height: 100%;
          }
        }
        dd {
          .title {
            margin-top: 0.1rem;
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 0.28rem;
            line-height: 0.28rem;
            color: #252a36;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .num {
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 0.28rem;
             white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .points {
              color: #F24209;
              font-size: 0.28rem;
            }
          }
        }
      }
    }
  }
}
</style>