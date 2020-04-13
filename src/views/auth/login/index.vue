<template>
  <div class="login-con">
    <div class="login-content">
      <div class="logo">
        <img src="@/assets/png/logo.png" alt />
      </div>
      <van-form class="login-input">
        <van-field v-model="email" name="邮箱" placeholder="请输入邮箱" class="item border first" />
        <van-field
          v-model="code"
          class="item border"
          center
          name="验证码"
          type="digit"
          placeholder="请输入验证码"
          maxlength="5"
        >
          <template #button>
            <van-button
              class="check_code code_btn"
              v-show="show"
              size="small"
              native-type="button"
              @click="getCode"
            >获取</van-button>
            <span class="check_code" v-show="!show">{{count}} s</span>
          </template>
        </van-field>

        <van-button class="login" round block native-type="submit" @click="onSubmit">登录</van-button>
      </van-form>
    </div>

    <p class="copyRight">©北京诺信创联科技有限公司</p>
  </div>
</template>
<script>
import { checkEmail, checkCode } from "@/utils/validate";
import { getPinCode, login } from "@/api/auth";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      code: "",
      show: true,
      count: "",
      timer: null,
      accountPlaceholder: "请输入邮箱",
      accountText: "请输入验证码"
    };
  },
  mounted(){
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
  },
  methods: {
    onSubmit() {
      if (checkEmail(this.email) && checkCode(this.code)) {
        login({ email: this.email, code: this.code }).then(res => {
          // console.log(res, "登录信息");
          localStorage.setItem("auth", JSON.stringify(res));
          localStorage.setItem("token", res.token);

          this.$router.push("/home");
        });
      }
    },

    getCode() {
      const TIME_COUNT = 60;
      if (checkEmail(this.email))
        getPinCode(this.email).then(() => {
          // console.log(res);
          Toast("发送成功");
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        });
      // .catch(err => {
      //   console.log(err);
      // });
    }
  }
};
</script>
<style lang="less" >
.login-con {
  height: 100%;
  .login-content{
    height: calc(100% - 0.4rem);
    overflow: hidden;
  }
  .logo {
    width: 3.3rem;
    margin: 1.06rem auto;
    margin: 0.56rem auto;
  }
  .check_code {
    height: 0.56rem;
    padding: 0 0.38rem;
    color: #1e3f64;
    font-size: 0.28rem;
    &.code_btn {
      padding: 0 0.36rem;
      font-size: 0.28rem;
      border-radius: 0.1rem;
      color: #ffffff;
      background-image: linear-gradient(to right, #2dbdcb, #009fda);
    }
  }
  .van-form {
    width: 6.6rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    .item {
      margin-top: 0.6rem;
      height: 0.8rem;
      font-size: 0.28rem;
      color: rgba(193, 207, 222, 1);
      position: relative;
      &.first {
        &::before {
          background-size: 100% 100%;
          top: calc(50% - 0.16rem);
          content: " ";
          display: block;
          position: absolute;
          width: 0.32rem;
          height: 0.32rem;
          top: calc(50% - 0.16rem);
          background: url("../../../assets/svg/auth/email.svg") no-repeat;
          background-size: 100% 100%;
        }
      }
      &::before {
        content: " ";
        display: block;
        position: absolute;
        width: 0.32rem;
        height: 0.32rem;
        top: calc(50% - 0.16rem);
        background: url("../../../assets/svg/auth/code.svg") no-repeat;
        background-size: 100% 100%;
      }
      .van-field__body {
        padding-left: 0.6rem;
      }
      .van-button--small {
        line-height: 1.5;
      }
    }
    .icon {
      position: absolute;
      width: 0.32rem;
      left: -5.6rem;
      top: calc(50% - 0.16rem);
      &.icon-code {
        left: -4.3rem;
      }
    }
    .border {
      border-bottom: 1PX solid #d1d6de;
    }
    .login-input {
      padding: 0 0.3rem;
      margin-top: 0.86rem;
    }
    .login {
      margin: 0 auto;
      width: 6.2rem;
      height: 0.94rem;
      margin-top: 1.48rem;
      background-image: linear-gradient(to right, #2dbdcb, #009fda);
      font-size: 0.36rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  .copyRight {
    width: 100%;
    margin:0 auto ;
    color: #c1cfde;
    height: 0.4rem;
    text-align: center;
  }
}
</style>