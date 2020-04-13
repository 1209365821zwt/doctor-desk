<template>
  <div class="search-container">
    <div class="search-header flex-r-cc">
      <div class="search">
        <van-search
          v-model="form.name"
          shape="round"
          background="#FFFFFF"
          placeholder="请输入医院、科室、姓名"
          @search="searchDoctor"
        />
      </div>
      <span class="cancel" @click="cancel">取消</span>
    </div>
    <div class="search-wrapper">
      <div class="btn-box" v-if="!searched && nodataFlag===false">
        <div class="btn-box-in flex-r-bc">
          <span>搜索历史</span>
          <span @click="del">
            <img src="@/assets/svg/icon/del.svg" alt />
          </span>
        </div>
        <div class="searchL" v-if="searchList.length>0">
          <p v-for="(item,index) in searchList" :key="index" @click="searchDocList(item)">{{item}}</p>
        </div>
      </div>
      <div class="search-list" v-else-if="nodataFlag === false && searched ">
        <p class="result-count">{{totalElements}}个搜索结果</p>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="content"
        >
          <van-cell
            v-for="(item,index) in hcpList"
            :key="index"
            @click="goDetail(item)"
            class="scroll-item"
          >
            <div class="item-header">
              <span class="hcp-name" v-html="item.hcpName"></span>
              <span class="zhicheng">
                <span v-html="item.academicTitle"></span>
                <span v-if="item.academicTitle !=='' && item.executeTitle!==''"> | </span>
                <span v-html="item.executeTitle"></span>
              </span>
            </div>
            <p>
              <span v-html="item.hospitalName"></span>
              <span v-if="item.department !=='' && item.hospitalName!==''"> | </span>
              <span v-html="item.department"></span>
            </p>
          </van-cell>
        </van-list>
      </div>
      <div class="nodata" v-else>
        <NoData />
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "@/components/NoData";
import { querySearchHistory, delHistory, queryDoctorList } from "@/api/search";

export default {
  components: { NoData },
  data() {
    return {
      auth: null,
      nodataFlag: false,
      searched: false,
      searchList: [],
      list: [],
      hcpList: [],
      keyword: "陈",
      loading: false,
      productId: 1,
      finished: false,
      totalElements: 0,
      form: {
        name: "",
        page: 0,
        pageSize: 10,
        productId: 1
      }
    };
  },
  created() {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.productId = this.$route.query.productId || 1;
    this.getHistory();
  },
  methods: {
    // 去医生详情
    goDetail(item) {
      this.$router.replace({
        name: "DoctorResume",
        query: {
          customerCode: item.customerCode,
          productId: item.productId,
          naxionsHcpId: item.naxionsHcpId
        }
      });
    },
    // 取消搜索
    cancel() {
      this.$router.back();
    },
    // 删除搜索历史
    del() {
      this.searchList = [];
      delHistory(this.productId).then(() => {
        this.Toast("删除成功");
      });
    },
    // 搜索医生
    searchDocList(item) {
      this.form.name = item;
      this.form.page = 0;
      this.searched = true;
      this.loading = true;
      this.finished = false;
      this.onLoad();
    },
    // 搜索
    searchDoctor() {
      if (this.form.name.length > 0) {
        this.searched = true;
        this.nodataFlag = false;
        this.hcpList = [];
        this.form.page = 0;
        this.loading = true;
        this.finished = false;
        this.onLoad();
      }
    },
    // 列表数据
    onLoad() {
      queryDoctorList({
        ...this.form,
        page: ++this.form.page,
        productId: this.productId
      })
        .then(res => {
          // console.log(res);
          this.loading = false;
          if (res && res.totalElements === 0) {
            this.finished = true;
            this.nodataFlag = true;
          } else if (!res || !res.content || res.content.length === 0) {
            this.finished = true;
          } else {
            const hcpList = this.replaceData(res.content);
            console.log(hcpList);
            this.totalElements = res.totalElements;
            this.hcpList.push(...hcpList);
            if (this.hcpList.length >= res.totalElements) {
              this.finished = true;
            }
          }
        })
        .catch(() => {
          this.finished = true;
          this.nodataFlag = true;
          this.$forceUpdate();
        });
    },
    // 获取历史记录
    getHistory() {
      querySearchHistory({
        productId: this.$route.query.productId || 1,
        saleRepCode: this.auth.email
      }).then(res => {
        this.searchList = res || [];
      });
    },
    replace(msg) {
      // 匹配关键字正则
      const replaceReg = new RegExp(this.form.name, "g");
      // 高亮替换v-html值
      const replaceString =
        '<span class="search-text">' + this.form.name + "</span>";
      return msg.replace(replaceReg, replaceString);
    },
    // 替换数据
    replaceData(data) {
      if (data) {
        data.map(item => {
          // 替换医生姓名
          item.hcpName = this.replace(item.hcpName);
          // 替换医院名称
          item.hospitalName = this.replace(item.hospitalName);
          // 替换科室
          item.department = this.replace(item.department);
        });
      }
      return data;
    }
  }
};
</script>

<style lang='less' >

.search-container {
  width: 100%;
  height: 100%;
  background: #f8f8f8;

  .search-header {
    height: 1rem;
    background: #ffffff;
    padding: 0 0.32rem 0 0.3rem ;
    .search {
      width: 5.9rem;
     
      .van-search {
        height: 1rem;
        padding: 0;
        height: 0.6rem;
        width:5.6rem;
      }
      .van-cell {
        font-size:0.28rem;
      }
    }
    .cancel {
      color: #009fda;
      font-size: 0.32rem;
    }
  }
  .search-wrapper {
    margin-top: 0.04rem;
    background: #ffffff;
    height: calc(100% - 1rem);
    .nodata {
      height: 100%;
    }
    .result-count {
      height: 0.56rem;
      line-height: 0.56rem;
      color: #252a36;
      text-indent: 0.2rem;
      background: #f8f8f8;
    }

    .content {
      background-color: #fff;
      .van-cell {
        border-bottom: 1PX solid #e8e8e8;
        // line-height: 0.5333rem;
        color: #252a36;
        padding: 0.24rem 0.3rem;
        background: url("./icon_search_right@3x.png");
        background-repeat: no-repeat;
        background-size: 0.16rem 0.32rem;
        background-position: 97.33% center;
        .search-text {
          color: #ff6100;
        }
        .item-header {
          .hcp-name {
            font-size: 0.32rem;
            font-family: PingFangSC-Semibold;
          }

          .zhicheng {
            color: #252a36;
            font-size: 0.28rem;
            margin-left: 0.2rem;
          }
        }
      }
      li:nth-last-child(1)::after {
        border: 0;
      }
    }
    .btn-box {
      width: 100%;
      padding: 0.4rem 0.32rem;
      .btn-box-in {
        font-size: 0.28rem;
        color: rgba(37, 42, 54, 0.5);
      }
      .searchL {
        display: flex;
        flex-wrap: wrap;
        p {
          padding: 0.16rem 0.32rem;
          border: 1PX solid rgba(37, 42, 54, 0.2);
          border-radius: 0.08rem;
          color: #252a36;
          background: rgba(253, 252, 252, 1);
          margin-top: 0.32rem;
          margin-right: 0.32rem;
        }
      }
    }
  }
}
</style>