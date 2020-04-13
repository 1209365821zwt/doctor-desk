<template>
  <div class="tab">
    <van-tabbar v-model="active" v-if="isShowTabbar">
      <van-tabbar-item
        v-for="item in menuList"
        :key="item.key"
        :name="item.key"
        @click.native="goPage('/'+item.key)"
      >
        <span>{{item.word}}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      menuList: [
        {
          inactive: require("@/assets/svg/icon/doctor.svg"),
          active: require("@/assets/svg/icon/doctorCheck.svg"),
          word: "医生",
          key: "home"
        },
        {
          inactive: require("@/assets/svg/icon/my.svg"),
          active: require("@/assets/svg/icon/myCheck.svg"),
          word: "我的",
          key: "my"
        }
      ]
    };
  },
  computed: {
    isShowTabbar() {
      const routeList = this.$route.path.split("/");
      const routeLength = routeList.length;
      return routeLength > 2 ? false : true;
    },
    showItem() {
      const routeList = this.$route.path.split("/");
      return routeList[1] === "" ? "home" : routeList[1];
    }
  },
  watch: {
    $route() {
      this.active = this.$route.path.split("/")[1];
    }
  },
  methods: {
    goPage(path) {
      this.$route.path.split("/")[1] !== this.active &&
        this.$router.push({ path });
    }
  }
};
</script>

<style lang="less" >
.tab {
  .van-tabbar {
    box-shadow: 0rem -0.04rem 0.16rem 0rem rgba(6, 22, 37, 0.21);
    background: #ffffff;
    height: 1rem;
  }

  .tabbar-item {
    display: inline-block;
    color: #bbc0c3;
    &.check {
      color: #009fda;
    }

    .icon {
      width: 0.34rem;
    }
  }
}
.mint-tab-item {
  vertical-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbc0c3;
  img {
    width: 0.34rem;
    margin: auto;
  }
  &.check {
    color: #009fda;
  }
}
</style>

