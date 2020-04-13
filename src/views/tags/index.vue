<template>
  <div class="container">
    <div class="content">
      <ul>
        <li
          class="item"
          v-for="(item,i) in List"
          :class="item.selected && 'selected'"
          :key="i"
          @click="selected(item)"
        >{{item.labelName}}</li>
      </ul>
    </div>
    <div class="btns">
      <div class="confirm" @click="confirm">保存</div>
    </div>
  </div>
</template>

<script>
import { getLabelList, settingLabels } from "@/api/doctorList";
import { Toast } from "vant";
export default {
  data() {
    return {
      List: []
    };
  },
  methods: {
    // 选择
    selected(item) {
      console.log(item);
      item.selected = !item.selected;
      this.$forceUpdate();
    },
    // 重置
    reset() {
      this.list.map(item => {
        item.selected = false;
      });
    },
    confirm() {
      const { naxionsHcpId } = this.$route.query;
      // console.log(hcpId)
      const list = [];
      this.List.forEach(item => {
        item.selected && list.push(item.id);
      });
      settingLabels(naxionsHcpId, list).then(() => {
        Toast("设置成功");
        this.$router.go(-1);
      });
    },
    getList() {
      let { hcpLabel } = this.$route.query;
      getLabelList().then(res => {
        this.List = res;
        this.List.forEach(item => {
          item.selected = false;
          hcpLabel.forEach(event => {
            if (event.labelId == item.id) {
              item.selected = true;
            }
          });
        });
      });
    }
  },
  mounted() {
    this.getList();
    //  const { hcpId } = this.$route.query;
    //   console.log(hcpId)
  }
};
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  .content {
    height: calc(100% - 1.68rem);
    padding: 0.4rem 0.4rem 0;
    ul {
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
  }
  .btns {
    height: 1.68rem;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0 auto;
    .confirm {
      margin: 0 auto;
      width: 6.7rem;
      height: 0.88rem;
      background: #009fda;
      border-radius: 0.08rem;
      color: #ffffff;
    }
  }
}
</style>