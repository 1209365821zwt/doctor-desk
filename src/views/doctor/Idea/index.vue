<template>
  <div class="idea-container">
    <div class="idea-center" v-if="noData==false">
      <div class="recipe-wrapper">
        <div class="head-title">
          <span class="icon"></span>
          <h4>处方观念</h4>
        </div>
        <div class="recipe-content">
          <ul>
            <li>
              <span>医生潜力 :</span>
              <b>{{idea.potential[prescripList.potential]}}</b>
            </li>
            <li>
              <span>是否覆盖 :</span>
              <b>{{idea.cover[prescripList.cover]}}</b>
            </li>
            <li>
              <span>是否有药 :</span>
              <b>{{idea.hasDrug[prescripList.hasDrug]}}</b>
            </li>
            <li>
              <span>是否招募 :</span>
              <b>{{idea.recruit[prescripList.recruit]}}</b>
            </li>
            <li>
              <span>是否是目标客户 :</span>
              <b>{{idea.target[prescripList.target]}}</b>
            </li>
          </ul>
          <ul>
            <li v-for="(item,index) in prescriptAndProductInfo" :key="index" :class="index===prescriptAndProductInfo.length-1 && 'last'">
              <span>{{item.dynamicFieldName}} :</span>
              <b>{{item.dynamicFieldValue}}</b>
            </li>
          </ul>
        </div>
      </div>
      <div class="memo-wrapper">
        <div class="head-title">
          <span class="icon"></span>
          <h4>拜访备忘录</h4>
        </div>
        <div class="memo-content">
          <ul>
            <li>
              <span>拜访结果 :</span>
              <div v-if="visitResult && visitResult.length">
                <b v-for="item in visitResult" :key="item">{{item}}</b>
              </div>
              <div v-else>
                <b>暂无结果</b>
              </div>
            </li>
            <li>
              <div v-if="visitResultList">
                <div v-if="visitResultList.length">
                  <b v-for="(item) in visitResultList" :key="item.dynamicFieldName">
                    <span>{{item.dynamicFieldName}} :</span>
                    <b>{{item.dynamicFieldValue}}</b>
                  </b>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <NoData></NoData>
    </div>
  </div>
</template>

<script>
import { getproduct } from "@/api/doctorList";
import NoData from "@/components/NoData";
import { idea } from "../../../constant/index";
export default {
  components: {
    NoData
  },
  data() {
    return {
      productDynam: [],
      prescriptAndProductInfo:[],
      visitResultList: [],
      visitResult: {},
      prescripList: {},
      noData: false,
      productDynams: [],
      idea
    };
  },
  methods: {
    //获取医生观念数据
    getList() {
      const { customerCode, productId } = this.$route.query;
      console.log(customerCode, productId);
      getproduct(customerCode, productId)
        .then(res => {
          console.log(res);
          if (res == null || !res) {
            this.noData = true;
          } else {
            this.noData = false;
            this.prescriptAndProductInfo = res.dynamicFieldData.prescriptAndProductInfo
              ? res.dynamicFieldData.prescriptAndProductInfo
              : [];
            this.visitResultList = res.dynamicFieldData.visitInfo
              ? res.dynamicFieldData.visitInfo
              : [];
            this.visitResult = res.visit.visitResult;
            this.prescripList = res.prescription;
          }
        })
        .catch(() => {
          this.noData = true;
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang='less' scoped>
.idea-container {
  background: rgba(238, 240, 244, 1);
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 0.2rem;
  .last{
    border: 0;
  }
  .idea-center {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .noData {
    background: #fff;
    height: 100%;
  }
  .recurit-wrapper {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 0.08rem;
    .head-title {
      display: flex;
      padding-left: 0.2rem;
      margin-top: 0.32rem;
      margin-bottom: 0.46rem;
      .icon {
        width: 0.08rem;
        height: 0.32rem;
        background: rgba(0, 159, 218, 1);
        border-radius: 0.06rem;
        margin-right: 0.16rem;
      }
      h4 {
        height: 0.32rem;
        font-size: 0.32rem;
        font-weight: normal;
        color: rgba(37, 42, 54, 1);
        line-height: 0.32rem;
      }
    }
    .recurit-content {
      padding: 0 0.4rem;
      ul {
        li {
          display: flex;
          margin-bottom: 0.52rem;
          span {
            height: 0.28rem;
            font-size: 0.28rem;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.28rem;
          }
          b {
            height: 0.28rem;
            font-size: 0.28rem;
            font-weight: 400;
            color: rgba(37, 42, 54, 1);
            line-height: 0.28rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
  .recipe-wrapper {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 0.08rem;
    .head-title {
      display: flex;
      padding-left: 0.2rem;
      margin-top: 0.32rem;
      margin-bottom: 0.25rem;
      .icon {
        width: 0.08rem;
        height: 0.32rem;
        background: rgba(0, 159, 218, 1);
        border-radius: 0.06rem;
        margin-right: 0.16rem;
      }
      h4 {
        height: 0.32rem;
        font-size: 0.32rem;
        font-weight: normal;
        color: rgba(37, 42, 54, 1);
        line-height: 0.32rem;
      }
    }
    .recipe-content {
      padding: 0 0.4rem;
      ul {
        li {
          display: flex;
          padding: 0.28rem 0;
          border-bottom: 1PX solid #EEF0F4;
          span {
            height: 0.28rem;
            font-size: 0.28rem;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.28rem;
          }
          b {
            height: 0.28rem;
            font-size: 0.28rem;
            font-weight: 400;
            color: rgba(37, 42, 54, 1);
            line-height: 0.28rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
  .memo-wrapper {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    .head-title {
      display: flex;
      padding-left: 0.2rem;
      margin-top: 0.32rem;
      margin-bottom: 0.25rem;
      .icon {
        width: 0.08rem;
        height: 0.32rem;
        background: rgba(0, 159, 218, 1);
        border-radius: 0.06rem;
        margin-right: 0.16rem;
      }
      h4 {
        height: 0.32rem;
        font-size: 0.32rem;
        font-weight: normal;
        color: rgba(37, 42, 54, 1);
        line-height: 0.32rem;
      }
    }
    .memo-content {
      padding: 0 0.4rem;
      ul {
        li {
          display: flex;
          padding: 0.28rem 0;
          border-bottom: 1PX solid #EEF0F4;
          span {
            height: 0.28rem;
            font-size: 0.28rem;
            font-weight: 400;
            color: rgba(37, 42, 54, 0.5);
            line-height: 0.28rem;
          }
          div {
            line-height: 0.28rem;
            b {
              height: 0.28rem;
              font-size: 0.28rem;
              font-weight: 400;
              color: rgba(37, 42, 54, 1);
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>