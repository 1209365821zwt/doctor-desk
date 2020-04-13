<template>
  <div class="scroll-wrapper">
    <van-list
      v-if="noData===false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="content"
    >
      <van-cell v-for="(item,i) in followList" :key="i" class="flex-r-ac item"  @click="jumpPage('DoctorResume',item)">
        <div class="firstname">{{item.hcpName.slice(0,1)}}</div>
        <div class="item-des">
          <div class="des-name">
            <span class="name">{{item.hcpName}}</span>
            <span class="zhicheng">
              {{item.executeTitle || null}}<span v-show="item.executeTitle && item.academicTitle">/</span>{{item.academicTitle || null}}
            </span>
          </div>
          <div class="margin-2">
            <span class="hosptial zhicheng">{{item.hospitalName}}</span>
            <span class="zhicheng">{{item.department}}</span>
          </div>
          <ul class="flex-r-ac sing-wrapper">
            <li v-for="(ele,index) in item.labels" :key="index" class="sign" v-show="ele.labelName">{{ele.labelName}}</li>
          </ul>
        </div>
      </van-cell>
    </van-list>
    <div class="nodata" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import { myFollows } from "@/api/myFocus";
import NoData from "@/components/NoData";
export default {
  components: {
    NoData
  },
  data() {
    return {
      finished: false,
      loading: false,
      followList: [],
      noData: false,
      page: {
        pageNo: 0,
        pageSize: 10
      },
      total: 0
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    //我的关注获取数据
    onLoad() {
      myFollows({
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
          this.noData=true
        } else {
          this.noData=false
          this.followList.push(...res.records);
          this.total = res.total;
          if (this.followList.length >= this.total) {
            this.finished = true;
          }
        }
      }).catch(()=>{
        this.finished = true;
        this.noData= true;
        this.$forceUpdate();
      });
    },
    // 跳转详情
    jumpPage(name, item) {
      this.$router.push({
        name,
        query: {
          customerCode: item.customerCode,
          productId: item.productId,
          naxionsHcpId: Number(item.naxionsHcpId)
        }
      });
    },
  }
};
</script>

<style lang='less'>
.scroll-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nodata{
    height: 100%;
  }
  .item {
    justify-content: start;
    align-items: flex-start;
    padding: 0.4rem 0.24rem;
    border-bottom: 1PX solid #f4f4f4;
    .van-cell__value--alone {
      display: flex;
    }
    .firstname {
      margin-right: 0.32rem;
      width: 0.88rem;
      height: 0.88rem;
      background: #009fda;
      border-radius: 0.5rem;
      font-size: 0.4rem;
      line-height: 0.88rem;
      color: #fff;
      text-align: center;
    }
    .item-des {
      flex: 1;
    }
    .name {
      font-size: 0.32rem;
      line-height: 0.32rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: rgba(37, 42, 54, 1);
      margin-right: 0.16rem;
    }
    .zhicheng {
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(37, 42, 54, 0.9);
      line-height: 0.28rem;
    }
    .hosptial {
      margin-right: 0.16rem;
      margin-bottom: 0.1rem;
    }
    .margin-2 {
      line-height: 0.28rem;
      margin: 0.2rem 0;
    }
    .sing-wrapper {
      flex-wrap: wrap;
      justify-content: flex-start;
      .sign {
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.14rem;
        background: #edf5ff;
        color: #009fda;
        border-radius: 0.4rem;
      }
    }
  }
}
</style>