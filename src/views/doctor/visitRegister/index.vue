<template>
  <div class="container">
    <van-form validate-first class="form">
      <div class="form-item border">
        <span class="required">*</span>
        <van-field
          label="拜访目的："
          v-model="form.purpose"
          readonly
          placeholder="请选择"
          @click="purposePicker=true"
        />

        <van-popup v-model="purposePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="purposeColumns"
            @confirm="purposeConfirm"
            @cancel="purposePicker = false"
          />
        </van-popup>
      </div>
      <div class="form-item border">
        <span class="required">*</span>
        <van-field
          label="拜访结果："
          v-model="form.resultId"
          readonly
          placeholder="请选择"
          @click="resultIdPicker=true"
        />
        <van-popup v-model="resultIdPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="resultIdColumns"
            @confirm="resultIdConfirm"
            @cancel="resultIdPicker = false"
          />
        </van-popup>
      </div>
      <div class="form-item border">
        <span class="required">*</span>
        <van-field
          label="是否有药："
          v-model="form.isHasDrug"
          readonly
          placeholder="请选择"
          @click="MedPicker=true"
        />
        <van-popup v-model="MedPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="MedColumns"
            @confirm="MedConfirm"
            @cancel="MedPicker = false"
          />
        </van-popup>
      </div>
      <div class="form-item">
        <span class="required">*</span>
        <van-field name="rate" label="医生态度：" class="rate">
          <template #input>
            <van-rate v-model="form.attitude" icon="like" color="red" void-icon="like-o" />
          </template>
        </van-field>
      </div>
      <div class="form-item border rili">
        <span class="required"></span>
        <van-field
          readonly
          clickable
          name="calendar"
          :value="form.nextVisitTime"
          label="下次拜访时间："
          placeholder="请选择日期"
          @click="showCalendar = true"
        />
        <van-calendar v-model="showCalendar" color="#009FDA" @confirm="onConfirmDate" />
      </div>
      <div class="form-item area">
        <span class="required"></span>
        <van-field
        class="area-cell"
          v-model="form.remark"
          rows="5"
          autosize
          label="留言："
          type="textarea"
          placeholder="请输入留言"
        />
      </div>
    </van-form>
    <div class="submit" @click="onSubmit">保存</div>
    <van-dialog v-model="show" @confirm="confirm">
      <div class="pop-title">保存成功</div>
      <p class="desc">您已成功保存医生招募信息</p>
    </van-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date.js";
import { queryRecruitList, visitSubmit } from "@/api/visit";
import { isEmpty } from "@/utils/validate";
import { Toast } from "vant";
export default {
  filters: {
    //时间转换
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {
      form: {
        purpose: "招募医生", // 拜访目的
        resultId: null, //拜访结果
        isHasDrug: null, // 是否有药
        attitude: null,
        nextVisitTime: null, // 下次拜访时间
        remark: null
      },
      required: true,
      resultIdList: [],
      purposeColumns: ["招募医生"],
      resultIdColumns: [],
      MedColumns: ["有", "无", "未知", "临采"],
      MedList: [
        {
          value: 1,
          label: "有"
        },
        {
          value: 0,
          label: "无"
        },
        {
          value: -1,
          label: "未知"
        },
        {
          value: 2,
          label: "临采"
        }
      ],
      purposePicker: false,
      resultIdPicker: false,
      MedPicker: false,
      showCalendar: false,
      pickerVisible: true,
      show: false
    };
  },
  created() {
    this.getRecruitList();
  },
  methods: {
    // 获取招募结果列表
    getRecruitList() {
      queryRecruitList().then(res => {
        this.resultIdList = res;
        const list = [];
        res.forEach(item => {
          list.push(item.purposeName);
        });
        this.resultIdColumns = list;
      });
    },

    // 拜访目的确认
    purposeConfirm(value, index) {
      console.log(value, index);
      this.form.purpose = value;
      this.purposePicker = false;
    },
    // 拜访结果
    resultIdConfirm(value) {
      this.form.resultId = value;
      this.resultIdPicker = false;
    },
    // 是否有药
    MedConfirm(value) {
      this.form.isHasDrug = value;
      this.MedPicker = false;
    },
    // 选择日期
    onConfirmDate(date) {
      this.form.nextVisitTime = formatDate(date, "yyyy-MM-dd");
      this.showCalendar = false;
    },
    //非空验证
    validate() {
      const form = this.form;
      switch (true) {
        case isEmpty(form.purpose):
          Toast("拜访目的必选项，请选择");
          break;
        case isEmpty(form.resultId):
          Toast("拜访结果必选项，请选择");
          break;
        case isEmpty(form.isHasDrug):
          Toast("是否有药必选项，请选择");
          break;
        case isEmpty(form.attitude):
          Toast("医生态度必选项，请选择");
          break;
        default:
          return true;
      }
    },
    confirm() {
      this.$router.go(-1);
    },
    // 提交信息
    onSubmit() {
      const { customerCode, productId } = this.$route.query;
      // console.log(this.form, params);
      if (this.validate()) {
        const params = {
          purpose: 1,
          customerCode,
          productId: +productId,
          attitude: this.form.attitude,
          nextVisitTime: this.form.nextVisitTime,
          remark: this.form.remark
        };
        params.resultId = this.resultIdList.find(
          item => item.purposeName === this.form.resultId
        ).purposeId;
        params.isHasDrug = this.MedList.find(
          item => item.label === this.form.isHasDrug
        ).value;
        visitSubmit(params).then(() => {
          this.show = true;
        });
      }
    }
  }
};
</script>

<style lang='less'>
.container {
  padding: 0.32rem 0.24rem;
  .van-dialog {
    .pop-title {
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      margin-top: 0.34rem;
      text-align: center;
      color: #252a36;
    }
    .van-dialog__confirm {
      height: 0.88rem;
      background: rgba(248, 251, 255, 1);
      border-radius: 0rem 0rem 0.12rem 0.12rem;
      border-top: 1PX solid #ddecfd;
      color: #5f7b9a;
      font-size: 0.28rem;
    }
    .desc {
      text-align: center;
      padding-top: 0.36rem;
      padding-bottom: 0.4rem;
    }
  }

  .form {
    .form-item {
      display: flex;
      align-content: center;
      // align-items: ;
      &.area {
        .van-field__body {
          border-radius: 0.08rem;
          border: 1PX solid rgba(37, 42, 54, 0.2);
        }
      }
      &.border {
        border-bottom: 0;
        .van-field__body {
          height: 0.64rem;
          border: 1PX solid rgba(37, 42, 54, 0.2);
          position: relative;
          &::after {
            position: absolute;
            content: " ";
            width: 0.24rem;
            height: 0.14rem;
            background: url("./assets/bottom.svg") no-repeat;
            background-size: 100% 100%;
            right: 0.2rem;
          }
        }
      }
      &.rili {
        .van-field__body {
          width: 4.2rem !important;
          &::after {
            position: absolute;
            content: " ";
            width: 0.3rem;
            height: 0.28rem;
            background: url("./assets/rili.svg") no-repeat;
            background-size: 100% 100%;
            right: 0.2rem;
          }
        }
      }
    
      .van-cell {
        padding-left: 0;
        align-items: center;
        &.rate{
          .van-field__body{
            padding: 0;
          }
        }
         &.area-cell{
           align-items: flex-start;
        }
        &::after {
          border: 0;
        }
        .van-field__label {
          width: auto;
        }
        .van-field__body {
          border-radius: 0.08rem;
          padding-left: 0.2rem;
          margin-left: 0.2rem;
          width: 4.8rem;
        }
        .van-rate__icon {
          font-size: 0.6rem;
        }
        .van-cell__title {
          color: rgba(37, 42, 54, 0.5);
        }
      }
      .required {
        color: #ff3400;
        width: 0.2rem;
        line-height: 1rem;
      }
    }
  }
  .submit {
    // width: ;
    font-size: 0.32rem;
    width: 6.4rem;
    height: 0.88rem;
    background: linear-gradient(to bottom right, #08acf4, #009fda);
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.88rem;
    color: #ffffff;
    margin: 3.36rem auto 0;
  }
}
</style>