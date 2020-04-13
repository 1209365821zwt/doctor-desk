<template>
  <div class="my-container">
    <div class="my-header">
      <div class="avant">
        {{person.repName.trim().substr(-2,2)}}
        <!-- <img src alt /> -->
      </div>
      <div class="person-wrapper">
        <div class="flex">
          <span class="name">{{person.repName}}</span>
          <div class="sign">{{person.roleName}}</div>
        </div>
        <p class="parent">直属上级: {{person.dmName || '-'}}</p>
        <div class="email-wrapper">
          <div class="email">
            <img src="@/assets/svg/my/email.svg" alt />
          </div>
          {{person.email}}
        </div>
      </div>
    </div>
    <div class="section">
      <ul>
        <li v-for="item in list" :key="item.value" class="item" @click="go(item.value)">
          <div class="icon">
            <img :src="item.icon" alt />
          </div>
          <span>{{item.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getFirstName} from '@/utils/common'
export default {
  name: "my",
  data() {
    return {
      list: [
        {
          label: "我的招募",
          value: "/my/recruit",
          icon: require("@/assets/svg/my/zhaomu.svg"),
          key: "myRecruit"
        },
        {
          label: "我的关注",
          value: "my/follow",
          icon: require("@/assets/svg/my/focus.svg")
        },
        {
          label: "我的积分",
          value: "/my/points",
          icon: require("@/assets/svg/my/scro.svg"),
          key: "myPoints"
        }
      ],
      person: {}
    };
  },
  mounted() {
    document.title = "我的";
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    this.list = this.list.filter(item => {
      if (item.key && auth.appWebAuthorityList.includes(item.key)) {
        console.log(item)
        return item;
      } else if (!item.key) {
        return item;
      }
    });
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
  },
  created() {
    this.person = JSON.parse(localStorage.getItem("auth"));
    this.person.firstName = getFirstName(this.person.repName)[0]
  }
};
</script>
<style lang="less" scoped>
.my-container {
  height: calc(100% - 1rem);
  .item {
    width: 100%;
    height: 1rem;
    font-size: 0.28rem;
    text-align: left;
    line-height: 1rem;
    border-bottom: 1PX solid #eef0f4;
    text-indent: 0.84rem;
    position: relative;
    &::after {
      content: " ";
      display: block;
      position: absolute;
      right: 0.2rem;
      top: calc(50% - 0.16rem);
      width: 0.16rem;
      height: 0.28rem;
      background: url("../../assets/svg/my/arrow.svg") no-repeat;
      background-size: 100% 100%;
    }
    .icon {
      position: absolute;
      left: -0.56rem;
      width: 0.36rem;
    }
  }
}

.my-header {
  height: 3.14rem;
  width: 100%;
  background: url("../../assets/png/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  padding: 0.72rem 0.64rem;
  .flex{
    display: flex;
    align-items: center;
    height: 0.4rem;
  }
  .avant {
    width: 1.28rem;
    height: 1.28rem;
    line-height: 1.28rem;
    text-align: center;
    color: #009FDA;
    border-radius: 50%;
    font-size: 0.32rem;
    background: #fff;
    font-weight: bold;
  }
  .person-wrapper {
    padding-left: 0.4rem;
    color: #ffffff;
    .name {
      font-size: 0.4rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .sign {
      padding: 0 0.16rem;
      border: 1PX solid #ffffff;
      height:0.4rem;
      line-height: 0.4rem;
      border-radius: 0.4rem;
      font-size: 0.24rem;
      margin-left: 0.16rem;
    }
    .parent {
      margin-top: 0.2rem;
      font-size: 0.28rem;
    }
    .email-wrapper {
      margin-top: 0.2rem;
      display: flex;
      .email {
        width: 0.28rem;
        margin-right: 0.16rem;
      }
    }
  }
}
</style>