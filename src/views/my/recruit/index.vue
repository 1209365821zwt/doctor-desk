<template>
  <div class="recruit-container">
    <div class="noData" v-show="noData">
      <noData></noData>
    </div>
    <div class="main-container" v-show="!noData">
      <div class="date"></div>
      <div :id="id" :style="{width: width, height: height}"></div>
      <div class="text">
        <ul>
          <li class="lis">
            <span>目标医生(人)</span>
            <div class="list">
              <van-field
                clickable
                v-model="targetNum"
                type="digit"
                @focus="handFacus"
                @input="handValue"
                @blur="handBlur"
                :class="show ? 'active' : ''"
              ></van-field>
              <!-- <i>
                <img :src="require('../../../assets/svg/icon/change.svg')" alt />
              </i>-->
            </div>
          </li>
          <li>
            <span>已招募(人)</span>
            <div class="list" :style="{display:'flex',lineHeight:'0.8rem'}">
              <van-field
                clickable
                :value="visitedNum"
                :style="{flex:'1',background:'none'}"
                readonly
              ></van-field>
            </div>
          </li>
          <li>
            <span>未招募(人)</span>
            <div class="list" :style="{display:'flex',lineHeight:'0.8rem'}">
              <van-field
                clickable
                :value="novisitvalue"
                :style="{flex:'1',background:'none'}"
                readonly
              ></van-field>
            </div>
          </li>
        </ul>
      </div>
      <div id="myCharts" :style="{width: width, height: '6rem',marginTop:'-0.3rem'}"></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { getNum, setVisitNum } from "@/api/recruit";
import noData from "@/components/NoData";
// import {getDay} from '@/utils/date'
export default {
  name: "hello",
  components: {
    noData
  },
  props: {
    id: {
      type: String,
      default: "myChart"
    },
    height: {
      type: String,
      default: "5.4rem"
    },
    width: {
      type: String,
      default: window.innerWidth + "px"
    }
  },
  data() {
    return {
      seriesColor: ["#0074B8", "#FFAE39"],
      lineColor: ["#3F9CDA", "#FF5300"],
      targetNum: "0",
      visitedNum: "0",
      novisitvalue: 0,
      dateList: [],
      totalNumList: [],
      targetNumList: [],
      noData: true,
      show: false
    };
  },
  mounted() {
    this.getRecruit();
    this.drawPie();
    this.drawLines();
  },
  created() {},
  methods: {
    //分别获取图饼和折线图数据
    getRecruit() {
      getNum().then(res => {
        if (res === null || !res || !res.weekData || !res.weekData.length) {
          this.noData = true;
        } else {
          this.noData = false;
          const { targetNum, visitedNum, weekData } = res;
          // console.log(res);
          this.targetNum = targetNum;
          this.visitedNum = visitedNum;
          this.novisitvalue = targetNum - visitedNum;
          if (this.novisitvalue < 0) {
            this.novisitvalue = 0;
          }
          weekData &&
            weekData.length &&
            weekData.forEach(item => {
              this.dateList.push(item.date);
              this.totalNumList.push(item.totalNum);
            });
          for (let i = 0; i <= 6; i++) {
            this.targetNumList.push(this.targetNum);
          }
        }
        this.drawPie();
        this.drawLines();
      });
    },
    //输入目标医生触发，修改目标医生数据
    handValue() {
      this.show = true;
      console.log(this.show);
      if (this.targetNum - this.visitedNum < 0 || this.targetNum == "") {
        this.targetNum = this.visitedNum;
        Toast("目标不能少于已招募人");
      }
      this.novisitvalue = this.targetNum - this.visitedNum;
      if (this.novisitvalue <= 0) {
        this.novisitvalue = 0;
      }
    },
    handFacus() {
      this.show = true;
    },
    //编辑完毕触发折线图目标人数发生相应的改变
    handBlur() {
      this.show = false;
      this.targetNumList = [];
      if (this.targetNumList.length == 0) {
        for (let i = 0; i <= 6; i++) {
          this.targetNumList.push(this.targetNum);
        }
      }
      setVisitNum(this.targetNum).then(() => {
        Toast("修改成功");
      });
      this.drawPie();
      this.drawLines();
    },
    // 招募率饼图
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById(this.id));
      // 绘制图表
      // console.log(this.visitedNum)
      myChart.setOption({
        title: {
          text: `${
            this.targetNum == 0
              ? "0%"
              : Math.round((this.visitedNum / this.targetNum) * 10000) / 100.0 +
                "%"
          }`,
          subtext: "招募率",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 30,
            fontWeight: "bold",
            color: ["#000"],
             padding: [0, 0]
          },
          subtextStyle: {
            color: "#252A36",
            fontSize: 13,
            fontFamily: "normal",
              padding: [0, 0]
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "销量",
            type: "pie",
            color: this.seriesColor,
            radius: ["50%", "70%"],
            data: [
              { value: this.visitedNum, name: "已招募" },
              { value: this.novisitvalue, name: "未招募" }
            ]
          }
        ]
      });
    },
    // 累计招募折线
    drawLines() {
      let myChart = this.$echarts.init(document.getElementById("myCharts"));
      myChart.setOption({
        title: {
          show: true,
          text: "累计招募人数",
          x: "1.5%",
          y: "10%",
          textStyle: {
            fontSize: 11,
            fontWeight: "normal",
            color: "#92949A"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dateList,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#92949A", //更改坐标轴文字颜色
              fontSize: 11 //更改坐标轴文字大小
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#92949A", //更改坐标轴文字颜色
              fontSize: 11 //更改坐标轴文字大小
            }
          }
        },

        series: [
          {
            name: "目标人数",
            type: "line",
            color: "#FF5300",
            data: this.targetNumList
          },
          {
            name: "招募人数",
            type: "line",
            color: "#3F9CDA",
            data: this.totalNumList
          }
        ]
      });
    }
  }
};
</script>
<style lang='less'>
.recruit-container{
   width: 100%;
   height: 100%;
    .noData {
    height: calc(100%);
  }
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  .date {
    display: flex;
  }
}
:root {
  .text {
    ul {
      display: flex;
      padding-left: 0.96rem;
      .lis {
        margin-right: 0.82rem;
        span {
          display: block;
          height: 0.24rem;
          font-size: 0.24rem;
          color: #ccc;
          margin-bottom: 0.1rem;
        }
        .list {
          display: flex;
          margin-top: 0.2rem;
          .van-cell {
            // line-height: 0.3rem;
            .van-field__control {
              color: #252a36;
              font-weight: bold;
              font-size: 0.4rem;
              line-height: 0.4rem;
              width: 1rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: -0.15rem;
              margin-left: -0.3rem;
            }
          }
          .van-field {
            width: 1.54rem;
            height: 0.56rem;
            background: "none";
            background: url("../../../assets/svg/icon/change.svg") no-repeat
              100% 100%;
            background-position: 95% 55%;
            &.active {
              border-radius: 0.04rem;
              border: 1PX solid rgba(37, 42, 54, 0.2);
              background: none;
            }
          }
          .van-cell:not(:last-child)::after {
            display: none;
          }
          i {
            width: "0.3rem";
            height: "0.3rem";
            position: absolute;
            left: 2.3rem;
          }
        }
      }
      li {
        span {
          display: block;
          height: 0.24rem;
          font-size: 0.24rem;
          color: #ccc;
          margin-bottom: 0.1rem;
        }
        .list {
          .van-field__control {
            color: #252a36;
            font-weight: bold;
            font-size: 0.4rem;
            margin-left: -0.3rem;
            //  width: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
 
}
</style>