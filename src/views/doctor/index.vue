<template>
  <div class="main-container">
    <div class="header flex-r-ac">
      <div class="search" @click="search('Search')">
        <van-search v-model="searchVal" shape="round" background="#FFFFFF" placeholder="请输入搜索关键词" />
      </div>
      <div class="screen" @click="setLabel">
        <img src="@/assets/svg/screen.svg" alt />
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-header flex-r-bc">
        <div class="product">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="form.productId"
              :options="productList"
              @change="selectProduct"
            />
          </van-dropdown-menu>
        </div>
        <div
          class="addDoc"
          @click="addDoctor"
          v-if="auth.appWebAuthorityList&&auth.appWebAuthorityList.includes('addDoctor')"
        >新增医生+</div>
      </div>
      <div class="scroll-wrapper">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="content"
        >
          <van-cell
            v-for="(item,i) in doctorList"
            :key="i"
            class="flex-r-ac item"
            @click="jumpPage('DoctorResume',item)"
          >
            <div class="firstname">{{item.hcpSurname}}</div>
            <div class="item-des">
              <div class="des-name">
                <span class="name">{{item.hcpName}}</span>
                <span class="zhicheng">
                 {{item.executeTitle||null}}<span v-show="item.executeTitle && item.academicTitle">/</span>{{item.academicTitle || null}}
              </span>
              </div>
              <div class="margin-2">
                <span class="hosptial zhicheng">{{item.hospitalName}}</span>
                <span class="zhicheng">{{item.department}}</span>
              </div>
              <ul class="flex-r-ac sing-wrapper" v-if="item.labelList.length>0">
                <li
                  v-for="(ele,index) in item.labelList"
                  :key="index"
                  class="sign"
                >{{ele.labelName}}</li>
              </ul>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
    <van-dialog v-model="show" title="筛选" show-cancel-button @confirm="confirm">
      <ul class="ul">
        <li
          class="item"
          v-for="(item,i) in labelList"
          :class="item.selected && 'selected'"
          :key="i"
          @click="selected(item)"
        >{{item.labelName}}</li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
import {
  queryProduct,
  queryDoctorList,
  queryLabelList
} from "@/api/doctorList";

export default {
  name: "doctor",
  components: {},
  data() {
    return {
      searchVal: null,
      list: [],
      auth: {},
      show: false,
      finished: false,
      form: {
        productId: 1,
        pageSize: 6,
        page: 0,
        labelIds: []
      },
      doctorList: [],
      totalElements: 0,
      productList: [],
      loading: false,
      labelList: []
    };
  },
  created() {
    document.title = "医生列表";
    this.auth = JSON.parse(localStorage.getItem("auth"));
    // console.log(this.auth, 111);
    this.getProduct();
    this.getLabelList();
  },

  methods: {
    //获取产品列表
    getProduct() {
      queryProduct().then(res => {
        console.log(res);
        res.forEach(ele => {
          this.productList.push({
            text: ele.name,
            value: ele.id
          });
        });
      });
      // this.getDoctorList();
    },
    // 获取标签列表
    getLabelList() {
      queryLabelList().then(res => {
        console.log(res);
        res.forEach(item => {
          this.labelList.push({
            id: item.id,
            labelName: item.labelName,
            selected: false
          });
        });
      });
    },
    // 筛选产品
    selectProduct(val) {
      console.log(val);
      this.resetCondition();
      this.onLoad();
    },
    // 获取列表数据
    onLoad() {
      queryDoctorList({ ...this.form, page: ++this.form.page })
        .then(res => {
          this.loading = false;
          if (!res.content || res.content.length === 0) {
            console.log(res.content);
            this.finished = true;
          } else {
            this.doctorList.push(...res.content);
            this.totalElements = res.totalElements;
            if (this.doctorList.length >= res.totalElements) {
              this.finished = true;
            }
          }
        })
        .catch(() => {
          this.finished = true;
        });
    },

    // 设置标签
    setLabel() {
      this.show = true;
    },

    // 确认筛选
    confirm() {
      const selectList = [];
      this.labelList.forEach(item => {
        item.selected && selectList.push(item.id);
      });
      this.form.labelIds = selectList;
      this.resetCondition();
      this.onLoad();
    },
    
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
    // 选取标签
    selected(item) {
      item.selected = !item.selected;
    },
    // 跳转搜索页
    search() {
      this.$router.push({
        name: "Search",
        query: {
          productId: this.form.productId
        }
      });
    },
    // 重置搜索条件
    resetCondition() {
      this.finished = false;
      this.form.page = 0;
      this.doctorList = [];
      this.loading = true;
    },
    // 新增医生
    addDoctor() {
      this.$router.push({
        name: "AddDoctor",
        query: {
          productId: this.form.productId
        }
      });
    }
  }
};
</script>

<style lang='less' >
.main-container {
  height: calc(100% - 1rem);
  overflow-y: scroll;
  background: #f8f8f8;
  .header {
    height: 1rem;
    background: #ffffff;
    padding-left:  0.3rem;
    padding-right: 0.24rem;
    .van-search{
      height: 1rem ;
      padding: 0;
    }
    .van-cell--borderless{
      padding-right: 0;
    }
    .van-search__content{
      height: 0.64rem;
    }
    .search {
      width: 6rem;
      overflow: hidden;
      background: #ffffff;
    }
    .screen {
      width: 0.4rem;
    }
  }
  .van-dropdown-menu__title{
   padding-left: 0 !important;
}
  
  .ul {
    display: flex;
    flex-wrap: wrap;
    .item {
      box-sizing: content-box;
      box-shadow: 0 0 0 1PX rgba(37, 42, 54, 0.2);
      color: #252a36;
      height: 0.64rem;
      padding: 0 0.28rem;
      line-height: 0.64rem;
      border-radius: 0.32rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      &.selected {
        box-shadow: none;
        background: #edf5ff;
        color: #009fda;
      }
    }
  }
    .van-dropdown-menu__title{
            padding-left: 0;
          }
  .content-wrapper {
    background: #ffffff;
    margin-top: 0.12rem;
    overflow: hidden;
    height: calc(100% - 1.12rem);
    .content-header {
      height: 0.76rem;
      padding: 0 0.3rem;
      border-bottom: 1PX solid #f8f8f8;
      .product {
        height: 0.76rem;
        .van-dropdown-menu {
          height: 0.76rem;
        
        }
      }
      .addDoc {
        height: 0.42rem;
        width: 1.46rem;
        text-align: right;
        color: #009fda;
        float: right;
        border-left: 1PX solid #f8f8f8;
      }
    }
    .wrapper {
      overflow: hidden;
      position: relative;
    }
    .scroll-wrapper {
      height: calc(100% - 0.88rem);
      position: relative;
      overflow-y: scroll;
      // margin-top: 0.1rem;
      overflow-x: hidden;
      .item {
        justify-content: start;
        align-items: flex-start;
        padding: 0.4rem 0.24rem 0.24rem;
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
          margin: 0.2rem 0;
          line-height: 0.28rem;
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
  }
}
</style>