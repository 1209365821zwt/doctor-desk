<template>
  <div class="talk-container">
    <div class="visiter-header">
      <div class="representative">
        <span class="spans">拜访代表</span>
        <div class="select">
          <van-dropdown-menu class="time-menu">
            <van-dropdown-item v-model="value" :options="options" @change="handChange" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>

    <div class="talk-content" v-if="noData===false">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="talk-content"
      >
        <van-cell v-for="(item,index) in navlist" :key="index" class="visiter-content">
          <dl>
            <div v-if="item.userType==1" class="flagone">
              <dt>
                <img :src="require('./assets/service.png')" alt />
              </dt>
              <dd>
                <span>{{item.messageTime}}</span>
                <div class="two">
                  <p>{{item.message}}</p>
                </div>
              </dd>
            </div>
            <div v-else-if="item.userType==2" class="flagtwo">
              <dd>
                <span>{{item.messageTime}}</span>
                <div class="two">
                  <p>{{item.message}}</p>
                </div>
              </dd>
              <dt>
                <img :src="require('./assets/doctor.png')" alt />
              </dt>
            </div>
          </dl>
        </van-cell>
      </van-list>
    </div>
    <div class="nodata" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import { getTalkList, getRepList } from "@/api/doctorList";
import NoData from "@/components/NoData";
export default {
  components: {
    NoData
  },
  data() {
    return {
      navlist: [],
      value: null,
      options: [
        {
          text:'全部',
          value:null
        }
      ],
      noData: false,
      page: {
        page: 0,
        pageSize: 10
      },
      total: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    //获取拜访代表数据
    getList() {
      let { productId } = this.$route.query;
      getRepList(productId).then(res => {
        res.forEach(item => {
          this.options.push({ value: item.id, text: item.name });
        });
      });
    },
    //改变值
    handChange(value) {
      this.value = value;
      this.page.page=0;
      this.noData=false;
      this.navlist=[];
      this.finished=false;
      this.loading=true;
      this.onLoad();
  
    },
        //数据加载，筛选分页数据
    onLoad() {
      let {customerCode} =this.$route.query
      getTalkList({
        page: ++this.page.page,
        pageSize: this.page.pageSize,
        customerCode: customerCode,
        drugUserId: this.value
      }).then(res => {
        this.loading = false;
        console.log(res)
        console.log(res,'talk')
        if (res && res.totalElements === 0) {
          this.finished = true;
          this.noData = true;
        } else if (!res || !res.content || res.content.length === 0) {
          this.finished = true;
        } else {
            this.noData=false;
            this.navlist.push(...res.content);
            this.total = res.totalElements;
          if (this.navlist.length >= this.total) {
            this.finished = true;
          }
        }
      }).catch(()=>{
        this.finished = true;
        this.noData=true
        this.$forceUpdate()
      });
    },
    getlist() {
      getTalkList().then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang='less'>
.talk-container {
  height: 100%;
  box-sizing: border-box;
  .nodata {
    height: calc(100% - 1.5rem);
  }
  .visiter-header {
    // height: 1rem;
    margin: 0.36rem 0.4rem 0.32rem;

    .representative {
      flex: 1;
      display: flex;
      .select {
        width: 1.8rem;
        text-align: center;
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
            height: 0.6rem;
            text-align: left;
            padding: 0 0.24rem;
            border-radius: 0.08rem;
            border: 1PX solid rgba(37, 42, 54, 0.2);
            font-size: 0.28rem;
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
  .talk-content {
   .van-cell{
     padding: 0;
  }
    .van-cell:not(:last-child)::after{
    border: 0;
  }
    .visiter-content {
      width: 100%;
      margin-bottom: 0.32rem;
      dl {
        .flagone {
           width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          dt {
           margin-top: 0.22rem;
           margin-right: 0.32rem;
            img {
              width: 0.96rem;
              height: 0.96rem;
            }
          }
          dd {
            // flex: 1;
            margin-right: 0.6rem;
            span {
              display: block;
              color: #838383;
              font-size: 0.24rem;
            }
            .two {
              position: relative;
              width: 5.44rem;
              background: #eee;
              border-radius: 0.12rem;
              // margin-left: 0.12rem;
              padding: 0.18rem 0.4rem;
            }
            .two::after {
              position: absolute;
              top: 30%;
              left: -2.2%;
              padding: 2.2%;
              border: inherit;
              border-right: none;
              border-top: none;
              content: "";
              background: inherit;
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }
        .flagtwo {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          dt {
           padding-right: 0.2rem;
           margin-top: 0.22rem;
            img{
              width: 0.96rem;
              height: 0.96rem;
            }
          }
          dd {
            flex: 1;
            margin-left: 0.6rem;
            span {
              display: block;
              color: #838383;
              font-size: 0.24rem;
            }
            .two {
              position: relative;
              width: 5.44rem;
              background: #eee;
              border-radius: 0.12rem;
              // margin-left: 0.12rem;
              padding: 0.18rem 0.4rem;
            }
            .two::after {
              position: absolute;
              top: 30%;
              right: -2.2%;
              padding: 2.2%;
              border: inherit;
              border-right: none;
              border-top: none;
              content: "";
              background: inherit;
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              transform: rotate(45deg);
            }
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