<template>
  <div class="addDoctor">
    <div class="fromData">
      <div class="from_row">
        <span class="required">*</span>
        <van-field v-model="form.hcpName.value" label="医生姓名：" placeholder="请输入" maxlength="20" />
      </div>
      <div class="from_row">
        <span class="required">*</span>
        <van-field name="radio" label="医生性别：">
          <template #input>
            <van-radio-group v-model="form.gender.value" direction="horizontal">
              <van-radio
                v-for="item in genderList"
                :key="item.value"
                :name="item.value"
              >{{item.label}}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="from_row right-arrow">
        <span class="required">*</span>
        <van-field
          class="input_tag"
          v-model="form.title.value"
          label="医生职称："
          readonly
          placeholder="请选择"
          @click="titlePicker=true"
        />
        <van-popup v-model="titlePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="titleList"
            @confirm="titleConfirm"
            @cancel="titlePicker = false"
          />
        </van-popup>
      </div>
      <div class="from_row">
        <span class="required">*</span>
        <div class="fied-wrapper">
          <div class="van-cell__title van-field__label">
            <span>所在医院：</span>
          </div>
          <con-input
            @fuzzySearchChange="hospitalChange"
            :inputData="hospitalInput"
            @selected="hospitalSelected"
          ></con-input>
        </div>
      </div>
      <div class="from_row">
        <span class="required">*</span>
        <div class="fied-wrapper">
          <div class="van-cell__title van-field__label">
            <span>所在科室：</span>
          </div>
          <con-input
            @fuzzySearchChange="deptChange"
            :inputData="deptInput"
            @selected="deptSelected"
          ></con-input>
        </div>
      </div>

      <div class="from_row">
        <span class="required">*</span>
        <van-field class="input_tag" v-model="form.hcpPhone.value" label="联系方式：" placeholder="请输入" maxlength="11" />
      </div>
      <div class="from_row">
        <van-field class="input_tag" v-model="form.wechat.value" label="医生微信：" placeholder="请输入" />
      </div>
      
      <div class="from_row right-arrow">
        <van-field
          class="input_tag"
          v-model="form.position.value"
          label="医生职务："
          readonly
          placeholder="请选择"
          @click="positionPicker=true"
        />
        <van-popup v-model="positionPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="positionList"
            @confirm="positionConfirm"
            @cancel="positionPicker = false"
          />
        </van-popup>
      </div>
    </div>
    <div class="title">
      带有"
      <span>*</span>"表示必填项
    </div>
    <div class="btn">
      <p class="btn_d" @click="saveInfo">保存</p>
    </div>
    <van-dialog v-model="show" @confirm="confirm">
      <div class="pop-title">{{showTitle}}</div>
      <p class="desc">您已成功保存医生信息</p>
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import conInput from "@/components/ConInput";
import { isEmpty, checkPhone } from "@/utils/validate";
import {
  queryHospitalList,
  queryTitlelList,
  queryPositionlList,
  queryDepartmentlList,
  addDoctor,
  getDoctor,
  updateDoctor
} from "@/api/addDoctor";
import { Toast } from "vant";
export default {
  components: {
    conInput
  },
  data() {
    return {
      show: false,
      loading: false,
      showTitle: "保存成功",
      positionPicker: false,
      titlePicker: false,
      // 性别
      genderList: [
        {
          value: 0,
          label: "男"
        },
        {
          value: 1,
          label: "女"
        },
        {
          value: 2,
          label: "未知"
        }
      ],
      // 医院
      hospitalInput: {
        placeholder: "请输入并选择",
        searchD: [],
        key: "name",
        inputV: "",
        itemSelected: null
      },
      // 科室
      deptInput: {
        placeholder: "请输入并选择",
        searchD: [],
        key: "name",
        inputV: "",
        itemSelected: null
      },

      titleList: [], // 职称
      positionList: [], // 职务
      // 表单
      form: {
        hcpName: {
          value: null,
          required: true,
          label: "医生姓名"
        },
        gender: {
          value: 0,
          required: true,
          label: "性别"
        },
       title : {
          value: null,
          required: true,
          label: "医生职称"
        },
        hospitalName: {
          value: null,
          required: true,
          label: "所在医院"
        },
        department: {
          value: null,
          required: true,
          label: "所在科室"
        },

        hcpPhone: {
          value: null,
          required: true,
          label: "联系方式"
        },
        wechat: {
          value: null,
          required: false,
          label: "医生微信"
        },
        position: {
          value: null,
          required: false,
          label: "医生职务"
        }
      }
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, "");
    },
    // 拜访结果
    titleConfirm(value) {
      this.form.title.value = value;
      this.titlePicker = false;
    },
    // 拜访结果
    positionConfirm(value) {
      this.form.position.value = value;
      this.positionPicker = false;
    },
    // 获取职称 职务list
    getLists() {
      const { customerCode } = this.$route.query;
      if (customerCode && customerCode.length > 0) {
        document.title = "医生信息";
        getDoctor(customerCode).then(res => {
          console.log(res);
          for (let key in res) {
            if (this.form[key]) {
              this.form[key].value = res[key];
              if (key === "hospitalName") {
                this.hospitalInput.inputV = res[key];
              } else if (key === "department") {
                this.deptInput.inputV = res[key];
              }
            }
          }
          console.log(this.form);
        });
      }
      Promise.all([queryTitlelList(), queryPositionlList()]).then(res => {
        this.titleList = res[0] || [];
        this.positionList = res[1] || [];
      });
    },

    // 医院改变
    hospitalChange() {
      const val = this.hospitalInput.inputV;
      this.form.hospitalName.value = this.hospitalInput.inputV;
      this.queryHospital(val);
    },

    hospitalSelected(inputVal) {
      this.form.hospitalName.value = inputVal;
    },

    deptSelected(inputVal) {
      this.form.department.value = inputVal;
    },

    // 科室改变
    deptChange() {
      const val = this.deptInput.inputV;
      this.form.department.value = this.deptInput.inputV;
      this.queryDept(val);
    },

    // 查询医院
    queryHospital(query) {
      if (query.trim()) {
        queryHospitalList({ keyword: query, productId: 1 }).then(data => {
          this.hospitalInput.searchD = data || [];
        });
      } else {
        this.hospitalInput.searchD = [];
      }
    },
    // 查询科室
    queryDept(query) {
      if (query.trim()) {
        queryDepartmentlList({ keyword: query }).then(data => {
          this.deptInput.searchD = data || [];
        });
      } else {
        this.deptInput.searchD = [];
      }
    },

    // 验证
    validate() {
      const form = this.form;
      console.log(this.form)
      for (let key in form) {
        if (form[key].required) {
          if (isEmpty(form[key].value)) {
            Toast(`${form[key].label}是必填项，不能为空`);
            return false;
          }
          if (key === "hcpPhone" && !checkPhone(form[key].value)) {
            Toast(`${form[key].label}格式不正确`);
            return false;
          }
        }
      }
      return true;
    },
    confirm() {
      this.$router.go(-1);
    },

    // 保存
    saveInfo() {
      if (this.validate()) {
        const { customerCode, productId } = this.$route.query;
        const form = {};
        for (let key in this.form) {
          const item = this.form[key];
          form[key] = item.value;
        }
        if (customerCode && customerCode.length > 0) {
          updateDoctor({ ...form, productId, customerCode }).then(res => {
            console.log(res);
            this.show = true;
            this.showTitle = "更新成功";
          });
        } else {
          addDoctor({ ...form, productId }).then(res => {
            console.log(res);
            this.show = true;
            this.showTitle = "新增成功";
          });
        }

        // console.log(form);
      }
      // console.log(this.form);
    }
  }
};
</script>

<style lang="less">
.addDoctor {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
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
  .fromData {
    background: #ffffff;
    margin-bottom: 0.16rem;
    font-size: 0.28rem;
    .input_tag {
      &::after {
        border: 0;
      }
    }
    .van-cell {
      padding: 0;
    }
    .from_row {
      padding: 0 0.46rem;
      height: 0.9rem;
      align-items: center;
      font-size: 0.28rem;
      border-bottom: 1PX solid #f5f5f5;
      position: relative;
      line-height: 0.88rem;
      display: -webkit-flex;
      display: flex;
      display: -webkit-box;
      position: relative;
      &.right-arrow {
        &::after {
          position: absolute;
          content: " ";
          width: 0.28rem;
          height: 0.16rem;
          right: 0.46rem;
          background: url("./right.svg") no-repeat;
          background-size: 100% 100%;
        }
      }

      .fied-wrapper {
        display: flex;
        width: 100%;
      }
      .van-field__label {
        width: 1.6rem;
      }
      .required {
        color: #ff3400;
        font-weight: bolder;
        position: absolute;
        left: 0.26rem;
      }
    }
  }
  .btn {
    margin-top: 2.47rem;
    .btn_d {
      height: 0.8rem;
      width: 6.3rem;
      background-image: linear-gradient(to bottom right, #08acf4, #009fda);
      border-radius: 0.08rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
      line-height: 0.8rem;
      margin: 0.36rem auto 0;
    }
  }
  .title {
    color: rgba(37, 42, 54, 0.3);
    text-indent: 0.46rem;
    span {
      color: #ff3400;
    }
  }
}
</style>
